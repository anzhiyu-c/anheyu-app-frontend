import type { ReactNode } from "react";
import type { Element as DomElement } from "domhandler";
import { ElementType, isTag } from "domelementtype";
import parse, { type DOMNode } from "html-react-parser";

// 允许出现在 <head> 中的标签集合。
// 管理员配置 CUSTOM_HEADER_HTML 时，非白名单标签会被静默过滤，
// 避免攻击者借助错放到 head 的节点（如 iframe）形成滥用。
const HEAD_ALLOWED_TAGS = new Set(["meta", "link", "script", "style", "base", "title", "noscript"]);

// 这些 head 标签的子节点应为原始文本（CSS/JS/标题），不能用空节点替换，
// 否则 html-react-parser 的 replace 会把 <style> 内文本当成「多余节点」清空。
const HEAD_TAGS_WITH_RAW_TEXT_CHILD = new Set(["style", "script", "title", "noscript"]);

// body 末尾（footer 注入）禁止的事件属性；全部事件 handler 一律拒绝，
// 避免管理员配置被绕过时直接 on* 注入执行任意脚本。
// 允许 <script> / <style> 存在（本来就是 admin-only 信任边界功能），
// 但禁止任何 on* 内联属性以及 javascript: 协议。
const DANGEROUS_EVENT_ATTR = /^on/i;
const DANGEROUS_URL_ATTR = new Set(["href", "src", "action", "formaction"]);
const DANGEROUS_URL_PROTOCOL = /^\s*javascript:/i;

// 跨源脚本/样式必须显式声明 integrity（Subresource Integrity，SRI）才允许加载，
// 防止 CDN 投毒后被植入恶意代码。同源资源不强制要求 SRI。
const ABSOLUTE_URL_PROTOCOL = /^(?:https?:)?\/\//i;
function isExternalUrl(url: string | undefined | null): boolean {
  if (!url) return false;
  return ABSOLUTE_URL_PROTOCOL.test(url.trim());
}

/**
 * sanitizeHeadElement 对单个 head 标签做安全过滤：
 *  - 跨源 <script src> 必须带 integrity 才允许保留；
 *  - 跨源 <link rel="stylesheet"> 同样要求 integrity；
 *  - 其它 on* / javascript: 由 renderCustomBodyHtml 已处理。
 * 返回 false 表示该节点应被丢弃。
 */
function sanitizeHeadElement(el: DomElement): boolean {
  const attribs = el.attribs ?? {};
  if (el.name === "script") {
    const src = attribs.src;
    if (isExternalUrl(src)) {
      if (!attribs.integrity) return false;
      // 同时要求 crossorigin，否则浏览器无法生效 SRI 校验
      if (!attribs.crossorigin) {
        attribs.crossorigin = "anonymous";
      }
    }
  } else if (el.name === "link") {
    const rel = (attribs.rel ?? "").toLowerCase();
    if (rel.includes("stylesheet") || rel === "preload" || rel === "modulepreload") {
      const href = attribs.href;
      if (isExternalUrl(href)) {
        if (!attribs.integrity) return false;
        if (!attribs.crossorigin) {
          attribs.crossorigin = "anonymous";
        }
      }
    }
  }
  // 任何 head 节点都不允许 on* 事件属性
  for (const k of Object.keys(attribs)) {
    if (DANGEROUS_EVENT_ATTR.test(k)) {
      delete attribs[k];
    }
  }
  return true;
}

const INVALID_OPEN_BRACKET_REGEX = /[‹＜]\s*(?=(?:\/)?[a-zA-Z!])/g;

/**
 * normalizeCustomHtml 把富文本编辑器常见的全角/兼容尖括号归一为 ASCII <，
 * 并统一换行符，防止管理员粘贴时因中文输入法把 `<` 误打成 `‹/＜` 导致 meta 不生效。
 */
export function normalizeCustomHtml(html: string): string {
  return html.replace(/\r\n/g, "\n").replace(INVALID_OPEN_BRACKET_REGEX, "<").trim();
}

/**
 * renderCustomHeadHtml 渲染 <head> 自定义片段。
 * - 非白名单标签直接丢弃（返回空 fragment）。
 * - 非元素节点（纯文本 / 注释 / doctype）也丢弃，避免多余文本节点被注入 head。
 */
export function renderCustomHeadHtml(html: string): ReactNode {
  const normalizedHtml = normalizeCustomHtml(html);
  if (!normalizedHtml) {
    return null;
  }

  return parse(normalizedHtml, {
    trim: true,
    replace(domNode: DOMNode) {
      // 使用 isTag / type 判别，避免 instanceof 与解析器实际节点类不一致（双份 domhandler 时全被丢弃）
      if (isTag(domNode)) {
        const el = domNode as DomElement;
        if (!HEAD_ALLOWED_TAGS.has(el.name)) {
          return <></>;
        }
        // 跨源 script/link 强制 SRI；on* 事件属性一律剥离
        if (!sanitizeHeadElement(el)) {
          return <></>;
        }
        return undefined;
      }
      if (domNode.type === ElementType.Text) {
        const parent = domNode.parent;
        if (parent && isTag(parent)) {
          const p = parent as DomElement;
          if (HEAD_TAGS_WITH_RAW_TEXT_CHILD.has(p.name)) {
            return undefined;
          }
        }
      }
      return <></>;
    },
  });
}

/**
 * renderCustomBodyHtml 渲染 body 末尾自定义片段。
 * 与 head 不同，这里允许常规 HTML 元素，但强制剥离：
 *   - 任何 on* 事件属性（onclick/onerror/onload ...）
 *   - href/src/action/formaction 属性中以 javascript: 开头的值
 * 这是 admin 信任边界下的"深度防御"：即使后端配置被篡改，
 * 前端也不让内联事件属性 / javascript: 协议生效。
 */
export function renderCustomBodyHtml(html: string): ReactNode {
  const normalizedHtml = normalizeCustomHtml(html);
  if (!normalizedHtml) {
    return null;
  }

  return parse(normalizedHtml, {
    trim: false,
    replace(domNode: DOMNode) {
      if (!isTag(domNode)) {
        return;
      }
      const attribs = (domNode as DomElement).attribs;
      if (!attribs) {
        return;
      }
      for (const name of Object.keys(attribs)) {
        if (DANGEROUS_EVENT_ATTR.test(name)) {
          delete attribs[name];
          continue;
        }
        if (DANGEROUS_URL_ATTR.has(name.toLowerCase()) && DANGEROUS_URL_PROTOCOL.test(attribs[name] ?? "")) {
          delete attribs[name];
        }
      }
    },
  });
}

/**
 * extractCustomHeadElements 用于客户端运行时动态插入 head 片段（例如 theme 切换后重放）。
 * 过滤规则与 renderCustomHeadHtml 保持一致。
 */
export function extractCustomHeadElements(html: string): HTMLElement[] {
  if (typeof document === "undefined") {
    return [];
  }

  const normalizedHtml = normalizeCustomHtml(html);
  if (!normalizedHtml) {
    return [];
  }

  const template = document.createElement("template");
  template.innerHTML = normalizedHtml;

  return Array.from(template.content.childNodes)
    .filter(
      (node): node is HTMLElement =>
        node instanceof HTMLElement && HEAD_ALLOWED_TAGS.has(node.tagName.toLowerCase()),
    )
    .filter((el) => {
      // 与 SSR 渲染保持一致：跨源 script/link 必须带 integrity；
      // 同时剥离任何 on* 内联事件属性，防止客户端注入路径绕过白名单。
      const tag = el.tagName.toLowerCase();
      if (tag === "script") {
        const src = el.getAttribute("src");
        if (isExternalUrl(src)) {
          if (!el.hasAttribute("integrity")) return false;
          if (!el.hasAttribute("crossorigin")) {
            el.setAttribute("crossorigin", "anonymous");
          }
        }
      } else if (tag === "link") {
        const rel = (el.getAttribute("rel") || "").toLowerCase();
        if (rel.includes("stylesheet") || rel === "preload" || rel === "modulepreload") {
          const href = el.getAttribute("href");
          if (isExternalUrl(href)) {
            if (!el.hasAttribute("integrity")) return false;
            if (!el.hasAttribute("crossorigin")) {
              el.setAttribute("crossorigin", "anonymous");
            }
          }
        }
      }
      for (const attr of Array.from(el.attributes)) {
        if (DANGEROUS_EVENT_ATTR.test(attr.name)) {
          el.removeAttribute(attr.name);
        }
      }
      return true;
    });
}
