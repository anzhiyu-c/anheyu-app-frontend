/*
 * @Description:
 * @Author: 安知鱼
 * @Date: 2026-01-30 16:51:16
 * @LastEditTime: 2026-01-31 14:30:00
 * @LastEditors: 安知鱼
 */
import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "";
const backendUrl = isDev
  ? process.env.BACKEND_URL || "http://localhost:8091"
  : process.env.API_URL || "http://anheyu:8091";

function parseRemotePatterns(rawList: (string | undefined)[]) {
  const patterns: { protocol: "http" | "https"; hostname: string; port?: string; pathname?: string }[] = [];
  for (const raw of rawList) {
    if (!raw) continue;
    try {
      const u = new URL(raw);
      patterns.push({
        protocol: u.protocol === "https:" ? "https" : "http",
        hostname: u.hostname,
        port: u.port || undefined,
        pathname: "/**",
      });
    } catch {
      // 忽略非法 URL
    }
  }
  return patterns;
}

const nextConfig: NextConfig = {
  turbopack: {
    // 固定 Turbopack 根目录，避免多 lockfile 场景下根目录误判
    root: __dirname,
  },
  output: "standalone",
  images: {
    // 默认开启 Next/Image 优化（AVIF/WebP/响应式 srcset），
    // 仅当显式设置 NEXT_DISABLE_IMAGE_OPTIMIZATION=1 时退化为原图直链。
    unoptimized: process.env.NEXT_DISABLE_IMAGE_OPTIMIZATION === "1",
    // 关闭 SVG 优化：文章/说说支持粘贴任意外部图片 URL，SVG 内可塞 <script> 形成 XSS。
    dangerouslyAllowSVG: false,
    contentDispositionType: "attachment",
    remotePatterns: [
      // 已知主机优先匹配（后端 / 站点域 / 自定义 CDN），便于做 host 级安全策略。
      ...parseRemotePatterns([
        backendUrl,
        siteOrigin,
        process.env.NEXT_PUBLIC_BACKEND_PUBLIC_URL,
        process.env.NEXT_PUBLIC_CDN_URL,
      ]),
      // 通配回退：文章/说说/相册等支持用户粘贴任意外部图片，无法预先枚举 host。
      // 通过 dangerouslyAllowSVG=false + contentDispositionType=attachment 收敛主要 XSS 面，
      // 滥用风险靠上游 CDN/WAF 的速率与流量监控兜底。
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },

  // 全局安全响应头：CSP / HSTS / X-Frame-Options / Referrer-Policy / Permissions-Policy。
  // CSP 采用宽松基线，后续可结合 nonce 收紧 script-src。
  async headers() {
    const csp = [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "img-src 'self' data: blob: https:",
      "media-src 'self' data: blob: https:",
      "font-src 'self' data: https:",
      "style-src 'self' 'unsafe-inline' https:",
      "script-src 'self' 'unsafe-inline' https:",
      "connect-src 'self' https:" + (siteOrigin ? ` ${siteOrigin}` : ""),
      "frame-ancestors 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; ");

    const securityHeaders: { key: string; value: string }[] = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
      { key: "Content-Security-Policy", value: csp },
    ];
    if (!isDev) {
      securityHeaders.push({
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      });
    }
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },

  // 代理配置 - 客户端请求代理到 Go 后端
  async rewrites() {
    // 开发环境使用 BACKEND_URL，生产环境使用 API_URL（Docker 内部网络）
    const backendUrl = isDev
      ? process.env.BACKEND_URL || "http://localhost:8091"
      : process.env.API_URL || "http://anheyu:8091";

    return {
      // beforeFiles: 在检查 public 目录之前执行（API 等必须代理的路径）
      beforeFiles: [
        // API 代理
        {
          source: "/api/:path*",
          destination: `${backendUrl}/api/:path*`,
        },
        // 文件直链代理（后端路由在 /api/f/ 下，需带 /api 前缀）
        {
          source: "/f/:path*",
          destination: `${backendUrl}/api/f/:path*`,
        },
        // 缓存文件代理
        {
          source: "/needcache/:path*",
          destination: `${backendUrl}/needcache/:path*`,
        },
      ],
      // afterFiles: 先检查 public 目录，找不到才代理到 Go 后端
      // sitemap.xml / robots.txt 由 Next.js 元数据约定处理（src/app/sitemap.ts、robots.ts）
      // RSS Feed 由 Route Handler 处理（src/app/rss.xml/route.ts 等），运行时读取后端地址
      afterFiles: [
        // 静态文件代理（后端上传的图片等，优先使用 public 目录中的默认文件）
        {
          source: "/static/:path*",
          destination: `${backendUrl}/static/:path*`,
        },
      ],
      fallback: [],
    };
  },
};

export default nextConfig;
