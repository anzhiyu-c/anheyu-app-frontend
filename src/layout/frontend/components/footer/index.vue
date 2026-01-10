<template>
  <footer
    v-if="siteConfig"
    id="footer-container"
    ref="footerRef"
    class="footer-container"
  >
    <div class="footer-wrap">
      <div v-if="footerConfig.socialBar" class="footer-social-bar">
        <el-tooltip
          v-for="item in footerConfig.socialBar.left"
          :key="item.link"
          :content="item.title"
          placement="top"
          :show-arrow="false"
          :offset="12"
          popper-class="custom-tooltip"
          :transition-props="{ onEnter, onLeave }"
        >
          <a
            class="social-link"
            :href="item.link"
            :aria-label="item.title"
            target="_blank"
            rel="noopener external nofollow noreferrer"
          >
            <!-- 图片 URL -->
            <img
              v-if="isImageUrl(item.icon)"
              :src="item.icon"
              :alt="item.title"
              class="social-icon-img"
            />
            <!-- Iconify 图标 -->
            <IconifyIconOnline
              v-else-if="isIconifyIcon(item.icon)"
              :icon="item.icon"
              class="social-icon-iconify"
            />
            <!-- 其他图标 (anzhiyu/fa) -->
            <i v-else :class="getIconClass(item.icon)" />
          </a>
        </el-tooltip>

        <el-tooltip
          v-if="footerConfig.socialBar.centerImg"
          content="返回顶部"
          placement="top"
          :show-arrow="false"
          :offset="12"
          popper-class="custom-tooltip"
          :transition-props="{ onEnter, onLeave }"
          @click="scrollToTop"
        >
          <img
            class="footer-back-to-top lazy-image"
            alt="返回顶部"
            :data-src="footerConfig.socialBar.centerImg"
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2aWV3Qm94PSIwIDAgMSAxIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cmVjdCB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8L3N2Zz4="
            width="50"
            height="50"
            loading="lazy"
            @click="scrollToTop"
          />
        </el-tooltip>

        <el-tooltip
          v-for="item in footerConfig.socialBar.right"
          :key="item.link"
          :content="item.title"
          placement="top"
          :show-arrow="false"
          :offset="12"
          popper-class="custom-tooltip"
          :transition-props="{ onEnter, onLeave }"
        >
          <a
            class="social-link"
            :href="item.link"
            :aria-label="item.title"
            target="_blank"
            rel="noopener external nofollow noreferrer"
          >
            <!-- 图片 URL -->
            <img
              v-if="isImageUrl(item.icon)"
              :src="item.icon"
              :alt="item.title"
              class="social-icon-img"
            />
            <!-- Iconify 图标 -->
            <IconifyIconOnline
              v-else-if="isIconifyIcon(item.icon)"
              :icon="item.icon"
              class="social-icon-iconify"
            />
            <!-- 其他图标 (anzhiyu/fa) -->
            <i v-else :class="getIconClass(item.icon)" />
          </a>
        </el-tooltip>
      </div>

      <div v-if="footerConfig.project?.list?.length" class="footer-link-grid">
        <div
          v-for="group in footerConfig.project.list"
          :key="group.title"
          class="footer-group"
        >
          <div class="footer-title">{{ group.title }}</div>
          <div class="footer-links">
            <a
              v-for="link in group.links"
              :key="link.link"
              class="footer-item"
              :href="link.link"
              :title="link.title"
              target="_blank"
              rel="noopener"
            >
              {{ link.title }}
            </a>
          </div>
        </div>

        <div v-if="footerConfig.list?.randomFriends > 0" class="footer-group">
          <div class="footer-title-group">
            <div class="footer-title">友链</div>
            <el-tooltip
              content="换一批友情链接"
              placement="top"
              :show-arrow="false"
              :offset="8"
              popper-class="custom-tooltip"
              :transition-props="{ onEnter, onLeave }"
            >
              <button
                type="button"
                class="random-friends-btn"
                aria-label="换一批友情链接"
                @click="refreshFriendLinks"
              >
                <i
                  class="anzhiyufont anzhiyu-icon-arrow-rotate-right"
                  :class="{ 'is-animating': isAnimating }"
                  :style="{ transform: `rotate(${rotationCount * 360}deg)` }"
                />
              </button>
            </el-tooltip>
          </div>
          <div class="footer-links">
            <a
              v-for="friend in displayedFriends"
              :key="friend.name"
              class="footer-item"
              :href="friend.href"
              :title="friend.name"
              target="_blank"
              rel="noopener nofollow"
            >
              {{ friend.name }}
            </a>
            <router-link to="/link" class="footer-item" title="更多友情链接"
              >更多</router-link
            >
          </div>
        </div>
      </div>

      <!-- 页脚运行时间模块 -->
      <div
        v-if="footerConfig.runtime?.enable && footerConfig.runtime?.launch_time"
        class="footer-runtime-board"
      >
        <div v-if="currentStatusImg" class="status-img-row">
          <img
            ref="statusBadgeRef"
            class="status-badge"
            :src="currentStatusImg"
            :title="currentStatusDesc"
            alt="工作状态"
            @error="handleStatusImgError"
            @load="handleStatusImgLoad"
          />
        </div>
        <div class="runtime-info-row">
          <span class="runtime-text">
            本站居然运行了 {{ runtimeDays }} 天
          </span>
          <span class="runtime-time">
            {{ runtimeTime }}
          </span>
          <component
            :is="useRenderIcon('fa:heartbeat', { style: { color: 'red' } })"
            class="heartbeat-icon"
          />
        </div>
      </div>

      <div
        v-if="footerConfig.custom_text"
        class="footer-custom-text"
        v-html="footerConfig.custom_text"
      />

      <p
        v-if="footerConfig.badge?.enable && footerConfig.badge?.list?.length"
        class="footer-badges"
      >
        <el-tooltip
          v-for="badge in footerConfig.badge.list"
          :key="badge.shields"
          :content="badge.message"
          placement="top"
          :show-arrow="false"
          :offset="8"
          popper-class="custom-tooltip"
          :transition-props="{ onEnter, onLeave }"
        >
          <a
            class="badge-link"
            target="_blank"
            :href="badge.link"
            rel="external nofollow noreferrer"
          >
            <img :src="badge.shields" :alt="badge.message" />
          </a>
        </el-tooltip>
      </p>
    </div>

    <div v-if="footerConfig.bar" class="footer-bottom-bar">
      <div class="bar-content">
        <div class="bar-left">
          <div
            v-if="footerConfig.owner"
            class="copyright-info"
            v-html="copyrightText"
          />
          <div
            v-if="policeRecordNumber || icpNumber || uptimeKumaConfig?.enable"
            class="record-info"
          >
            <el-tooltip
              v-if="policeRecordNumber"
              content="前往全国互联网安全管理服务平台的备案信息查询页面"
              placement="top"
              :show-arrow="false"
              :offset="8"
              popper-class="custom-tooltip"
              :transition-props="{ onEnter, onLeave }"
            >
              <a
                class="record-link police-record-link"
                href="http://www.beian.gov.cn/portal/registerSystemInfo"
                target="_blank"
                rel="noopener"
              >
                <img
                  v-if="policeRecordIcon"
                  :src="policeRecordIcon"
                  alt="公安备案"
                  class="police-record-icon"
                />
                {{ policeRecordNumber }}
              </a>
            </el-tooltip>
            <el-tooltip
              v-if="icpNumber"
              content="前往工业和信息化部政务服务平台的备案信息查询页面"
              placement="top"
              :show-arrow="false"
              :offset="8"
              popper-class="custom-tooltip"
              :transition-props="{ onEnter, onLeave }"
            >
              <a
                class="record-link"
                href="https://beian.miit.gov.cn/"
                target="_blank"
                rel="noopener"
              >
                {{ icpNumber }}
              </a>
            </el-tooltip>

            <!-- Uptime Kuma 状态显示 -->
            <el-tooltip
              v-if="uptimeKumaConfig?.enable"
              content="查看我的项目状态"
              placement="top"
              :show-arrow="false"
              :offset="8"
              popper-class="custom-tooltip"
              :transition-props="{ onEnter, onLeave }"
            >
              <a
                class="uptime-status-indicator"
                :class="uptimeStatusClass"
                :href="uptimeKumaConfig.page_url || '#'"
                :target="uptimeKumaConfig.page_url ? '_blank' : undefined"
                rel="noopener"
              >
                <span class="status-dot" />
                <span class="status-text">{{ uptimeStatusText }}</span>
              </a>
            </el-tooltip>
          </div>
        </div>
        <div class="bar-right">
          <template v-for="link in footerConfig.bar.linkList" :key="link.text">
            <a
              v-if="isInternalLink(link.link)"
              class="bar-link"
              :href="link.link"
              @click="handleInternalLinkClick($event, link.link)"
            >
              {{ link.text }}
            </a>
            <a
              v-else
              class="bar-link"
              :href="link.link"
              target="_blank"
              rel="noopener"
            >
              {{ link.text }}
            </a>
          </template>

          <el-tooltip
            v-if="footerConfig.bar.cc && footerConfig.bar.cc.link"
            content="CC BY-NC-ND 4.0 协议"
            placement="top"
            :show-arrow="false"
            :offset="8"
            popper-class="custom-tooltip"
            :transition-props="{ onEnter, onLeave }"
          >
            <a
              class="bar-link cc-link"
              :href="footerConfig.bar.cc.link"
              aria-label="CC BY-NC-ND 4.0 协议"
              target="_blank"
              rel="noopener"
            >
              <i class="anzhiyufont anzhiyu-icon-copyright-line" />
              <i class="anzhiyufont anzhiyu-icon-creative-commons-by-line" />
              <i class="anzhiyufont anzhiyu-icon-creative-commons-nc-line" />
              <i class="anzhiyufont anzhiyu-icon-creative-commons-nd-line" />
            </a>
          </el-tooltip>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSiteConfigStore } from "@/store/modules/siteConfig";
import { onEnter, onLeave } from "@/utils/transitions";
import { getIconClass } from "@/utils/icon";
import { getRandomLinks } from "@/api/postLink";
import { useLazyLoading } from "@/composables/useLazyLoading";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import { IconifyIconOnline } from "@/components/ReIcon";

const route = useRoute();
const router = useRouter();

// 判断是否为图片 URL
const isImageUrl = (icon: string) => {
  return icon && (icon.startsWith("http://") || icon.startsWith("https://"));
};

// 判断是否为 Iconify 图标（包含 :）
const isIconifyIcon = (icon: string) => {
  return icon && icon.includes(":");
};

// 判断是否为内部链接
const isInternalLink = (link: string) => {
  if (!link) return false;
  return (
    link.startsWith("/") ||
    link.startsWith("#") ||
    (!link.startsWith("http://") && !link.startsWith("https://"))
  );
};

// 处理内部链接点击（支持同页面锚点跳转）
const handleInternalLinkClick = (event: MouseEvent, link: string) => {
  event.preventDefault();

  // 解析链接中的路径和哈希
  const [path, hash] = link.split("#");
  const currentPath = route.path;

  // 如果是同一页面的锚点链接
  if (hash && (path === currentPath || path === "")) {
    const targetElement = document.getElementById(hash);
    if (targetElement) {
      // 使用 scrollIntoView，配合 CSS scroll-margin-top 属性
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      // 更新 URL 哈希
      window.history.pushState(null, "", link);
    }
  } else {
    // 不同页面，使用 router 导航
    router.push(link);
  }
};

interface FriendLink {
  name: string;
  href: string;
}

const siteConfigStore = useSiteConfigStore();
const siteConfig = computed(() => siteConfigStore.getSiteConfig);
const footerConfig = computed(() => siteConfig.value?.footer);
const icpNumber = computed(() => siteConfig.value?.ICP_NUMBER);
const policeRecordNumber = computed(
  () => siteConfig.value?.POLICE_RECORD_NUMBER
);
const policeRecordIcon = computed(() => siteConfig.value?.POLICE_RECORD_ICON);

const displayedFriends = ref<FriendLink[]>([]);
const rotationCount = ref(0);
const isAnimating = ref(false);

// 懒加载相关
const footerRef = ref<HTMLElement | null>(null);
const { initLazyLoading } = useLazyLoading({
  rootMargin: "50px",
  threshold: 0.1,
  showLoading: true
});

async function refreshFriendLinks() {
  if (isAnimating.value) return;
  if (!footerConfig.value?.list?.randomFriends) return;

  const count = Number(footerConfig.value.list.randomFriends);
  if (count <= 0) return;

  // 立即触发动画以提供即时反馈
  isAnimating.value = true;
  rotationCount.value++;

  try {
    const res = await getRandomLinks({ num: count });
    if (res.code === 200 && res.data && res.data.length > 0) {
      // 将 API 返回的数据映射为模板所需的格式
      displayedFriends.value = res.data.map(link => ({
        name: link.name,
        href: link.url
      }));
    } else {
      console.error("未能获取到随机友链或返回数据为空");
      displayedFriends.value = []; // 如果获取失败或无数据，清空列表
    }
  } catch (error) {
    console.error("请求随机友链失败", error);
    displayedFriends.value = []; // 出错时也清空列表
  } finally {
    // 等待动画结束后再重置状态
    setTimeout(() => {
      isAnimating.value = false;
    }, 300);
  }
}

const copyrightText = computed(() => {
  if (!footerConfig.value?.owner) return "";
  const since = footerConfig.value.owner.since;
  const author = footerConfig.value.owner.name;
  const authorLink = footerConfig.value.bar?.authorLink || "/about";
  const nowYear = new Date().getFullYear();
  let yearRange = String(nowYear);
  if (since && Number(since) !== nowYear) yearRange = `${since} - ${nowYear}`;
  const authorHtml = `<a class="bar-link" href="${authorLink}" target="_blank">${author}</a>`;
  return `&copy;${yearRange} By ${authorHtml}`;
});

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// 运行时间相关
const runtimeDays = ref(0);
const runtimeTime = ref("0 小时 0 分 0 秒");
const currentStatusImg = ref("");
const currentStatusDesc = ref("");
const statusBadgeRef = ref<HTMLImageElement | null>(null);
let runtimeInterval: number | null = null;

// 判断是否在工作时间（9:00-18:00）
const isWorkingHours = () => {
  const now = new Date();
  const hour = now.getHours();
  return hour >= 9 && hour < 18;
};

// 计算运行时间
const calculateRuntime = () => {
  if (!footerConfig.value?.runtime?.launch_time) return;

  try {
    const launchDate = new Date(footerConfig.value.runtime.launch_time);
    const currentDate = new Date();
    const differenceInTime = currentDate.getTime() - launchDate.getTime();

    // 计算天数
    runtimeDays.value = Math.floor(differenceInTime / (1000 * 3600 * 24));

    // 计算剩余的小时、分钟、秒
    const remainingTime = differenceInTime % (1000 * 3600 * 24);
    const hours = Math.floor(remainingTime / (1000 * 3600));
    const minutes = Math.floor((remainingTime % (1000 * 3600)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    runtimeTime.value = `${hours} 小时 ${minutes} 分 ${seconds} 秒`;

    // 更新状态图和描述
    // 优先使用对应时间段的图片，如果没有配置则回退到另一个时间段的图片
    if (isWorkingHours()) {
      currentStatusImg.value =
        footerConfig.value.runtime?.work_img ||
        footerConfig.value.runtime?.offduty_img ||
        "";
      currentStatusDesc.value =
        footerConfig.value.runtime?.work_description ||
        footerConfig.value.runtime?.offduty_description ||
        "";
    } else {
      currentStatusImg.value =
        footerConfig.value.runtime?.offduty_img ||
        footerConfig.value.runtime?.work_img ||
        "";
      currentStatusDesc.value =
        footerConfig.value.runtime?.offduty_description ||
        footerConfig.value.runtime?.work_description ||
        "";
    }
  } catch (error) {
    console.error("Invalid launch_time format:", error);
  }
};

// 处理状态图片加载错误
const handleStatusImgError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  console.error("[Footer Status Badge] 图片加载失败:", {
    src: img.src,
    work_img: footerConfig.value?.runtime?.work_img,
    offduty_img: footerConfig.value?.runtime?.offduty_img,
    isWorkingHours: isWorkingHours()
  });
  // 不隐藏图片，让浏览器自然处理
  // 如果确实无法加载，浏览器会显示破损图标，但至少用户知道有图片配置
};

// 处理状态图片加载成功
const handleStatusImgLoad = () => {
  // 图片加载成功，确保显示（移除可能存在的隐藏样式）
  const imgElement = document.querySelector(
    ".status-badge"
  ) as HTMLImageElement;
  if (imgElement && imgElement.style.display === "none") {
    imgElement.style.display = "";
  }
};

// --- Uptime Kuma 状态监控 ---
// 从状态页 URL 解析 API 地址和 slug
// 例如：https://status.example.com/status/main -> api_url: https://status.example.com, slug: main
const parseUptimeKumaUrl = (pageUrl: string) => {
  if (!pageUrl) return { api_url: "", slug: "" };
  const match = pageUrl.match(/^(https?:\/\/[^/]+)\/status\/(.+)$/);
  if (match) {
    return { api_url: match[1], slug: match[2] };
  }
  return { api_url: "", slug: "" };
};

const uptimeKumaConfig = computed(() => {
  const config = siteConfig.value?.footer?.uptime_kuma;
  if (!config) return null;
  const pageUrl = (config.page_url || "").replace(/\/$/, "");
  const { api_url, slug } = parseUptimeKumaUrl(pageUrl);
  return {
    enable: config.enable === true || config.enable === "true",
    api_url,
    slug,
    page_url: pageUrl
  };
});

// 状态：loading | ok | partial | error
const uptimeStatus = ref<"loading" | "ok" | "partial" | "error">("loading");
let uptimeKumaInterval: number | null = null;

const uptimeStatusClass = computed(() => {
  return {
    "status-loading": uptimeStatus.value === "loading",
    "status-ok": uptimeStatus.value === "ok",
    "status-partial": uptimeStatus.value === "partial",
    "status-error": uptimeStatus.value === "error"
  };
});

const uptimeStatusText = computed(() => {
  switch (uptimeStatus.value) {
    case "loading":
      return "状态获取中...";
    case "ok":
      return "所有业务正常";
    case "partial":
      return "部分服务异常";
    case "error":
      return "状态获取失败";
    default:
      return "";
  }
});

// 获取 Uptime Kuma 状态
const fetchUptimeKumaStatus = async () => {
  const config = uptimeKumaConfig.value;
  if (!config?.enable || !config.api_url || !config.slug) {
    console.warn("[Uptime Kuma] 配置不完整:", {
      enable: config?.enable,
      api_url: config?.api_url,
      slug: config?.slug
    });
    return;
  }

  const apiUrl = `${config.api_url}/api/status-page/heartbeat/${config.slug}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      console.error(`[Uptime Kuma] API 返回错误: ${response.status}`, apiUrl);
      uptimeStatus.value = "error";
      return;
    }

    const data = await response.json();

    // 检查所有监控项的状态
    // Uptime Kuma 返回格式: { heartbeatList: { [monitorId]: [heartbeats] }, uptimeList: { ... } }
    if (data.heartbeatList) {
      const monitors = Object.values(data.heartbeatList) as Array<
        Array<{ status: number }>
      >;
      let hasDown = false;

      for (const heartbeats of monitors) {
        if (heartbeats.length > 0) {
          // 获取最新的心跳状态，status: 1 = up, 0 = down
          const latestStatus = heartbeats[heartbeats.length - 1]?.status;
          if (latestStatus !== 1) {
            hasDown = true;
            break;
          }
        }
      }

      uptimeStatus.value = hasDown ? "partial" : "ok";
    } else {
      uptimeStatus.value = "ok";
    }
  } catch (error) {
    // CORS 跨域问题会导致 TypeError: Failed to fetch
    console.error(
      `[Uptime Kuma] 获取状态失败 (可能是 CORS 跨域问题):`,
      error,
      `\n请确保 Uptime Kuma 实例允许跨域访问，或配置反向代理。\nAPI 地址: ${apiUrl}`
    );
    uptimeStatus.value = "error";
  }
};

// 启动 Uptime Kuma 状态获取的函数
const startUptimeKumaPolling = () => {
  if (uptimeKumaInterval) {
    clearInterval(uptimeKumaInterval);
  }
  fetchUptimeKumaStatus();
  // 每5分钟更新一次状态
  uptimeKumaInterval = window.setInterval(fetchUptimeKumaStatus, 5 * 60 * 1000);
};

// 监听 uptimeKumaConfig 变化，确保配置加载后能正确初始化
// 这解决了未登录用户因 siteConfig 加载延迟导致 uptime 状态不显示的问题
watch(
  () => uptimeKumaConfig.value?.enable,
  (newEnable, oldEnable) => {
    if (newEnable && !oldEnable) {
      // 配置刚刚启用，开始获取状态
      startUptimeKumaPolling();
    } else if (!newEnable && oldEnable) {
      // 配置被禁用，清除定时器
      if (uptimeKumaInterval) {
        clearInterval(uptimeKumaInterval);
        uptimeKumaInterval = null;
      }
    }
  },
  { immediate: true }
);

onMounted(() => {
  if (footerConfig.value) refreshFriendLinks();
  // 初始化footer区域的懒加载
  if (footerRef.value) {
    initLazyLoading(footerRef.value);
  }

  // 初始化运行时间
  if (footerConfig.value?.runtime?.enable) {
    calculateRuntime();
    // 每秒更新一次运行时间
    runtimeInterval = window.setInterval(calculateRuntime, 1000);
  }

  // 注意：Uptime Kuma 的初始化已移至 watch 中处理
  // 这确保了即使 siteConfig 在 onMounted 之后加载，也能正确初始化
});

onUnmounted(() => {
  // 清除定时器
  if (runtimeInterval) {
    clearInterval(runtimeInterval);
  }
  if (uptimeKumaInterval) {
    clearInterval(uptimeKumaInterval);
  }
});
</script>

<style scoped lang="scss">
.footer-container {
  position: relative;
  margin-top: 1rem;
  color: var(--anzhiyu-fontcolor);
  background: linear-gradient(
    180deg,
    var(--anzhiyu-card-bg-none) 0,
    var(--anzhiyu-card-bg) 25%
  );
  /* 防止布局偏移：隔离布局计算 */
  contain: layout style;
}

.footer-wrap {
  position: relative;
  max-width: 1200px;
  /* 固定高度防止布局偏移 */
  min-height: 17.875rem;
  margin: 0 auto;
  /* 隔离内容布局 */
  contain: layout;
}

a {
  color: var(--anzhiyu-fontcolor);
  text-decoration: none;

  &:hover {
    color: var(--anzhiyu-main);
  }
}

.footer-social-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;

  .social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    margin: 1rem 27px;
    font-size: 1.5rem;
    color: var(--anzhiyu-card-bg);
    background: var(--anzhiyu-fontcolor);
    border-radius: 3rem;
    transition: 0.3s;

    .social-icon-img {
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
      object-fit: cover;
    }

    .social-icon-iconify {
      width: 1.2rem;
      height: 1.2rem;
    }

    &:hover {
      color: var(--anzhiyu-white);
      background: var(--anzhiyu-main);
      transform: scale(1.2);
    }
  }
}

.footer-back-to-top {
  width: 50px;
  height: 50px;
  margin: 0 1rem;
  cursor: pointer;
  object-fit: cover;
  border-radius: 50%;
  transition: cubic-bezier(0, 0, 0, 1.29) 0.5s !important;
  /* 防止图片加载导致的布局偏移 */
  display: inline-block;
  vertical-align: middle;

  &:hover {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
    transform: scale(1.2);
  }
}

.footer-link-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 2rem;
}

.footer-group {
  min-width: 130px;
  text-align: left;
}

.footer-title-group {
  display: flex;
  align-items: center;
}

.footer-title {
  margin-bottom: 0.8rem;
  margin-left: 4px;
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--anzhiyu-secondtext);
}

.random-friends-btn {
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
  margin-left: 0.5rem;
  font-size: 1.1rem;
  cursor: pointer;
  background: transparent;

  > i {
    display: inline-block;
    transition:
      transform 0.3s ease-out,
      opacity 0.3s ease-out;

    &.is-animating {
      opacity: 0.2;
    }
  }
}

.footer-links .footer-item {
  display: block;
  width: fit-content;
  max-width: 120px;
  padding: 0 4px;
  margin-right: 10px;
  margin-bottom: 0.5rem;
  overflow: hidden;
  font-size: 0.95rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 7px;

  &:hover {
    color: white;
    background: var(--anzhiyu-theme);
  }
}

.footer-custom-text {
  padding: 1rem 0;
  font-size: 0.9rem;
  color: var(--anzhiyu-gray);
  text-align: center;
}

.footer-badges {
  padding: 1.5rem 0;
  margin: 0;
  text-align: center;
}

.badge-link {
  display: inline-block;
  margin: 5px;

  img {
    height: 20px;
    vertical-align: middle;
  }
}

.footer-bottom-bar {
  display: flex;
  padding: 1.5rem 1rem;
  margin-top: 1rem;
  overflow: hidden;
  color: var(--anzhiyu-fontcolor);
  background: var(--anzhiyu-secondbg);
  transition: 0.3s;
}

.bar-content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  line-height: 1;
}

.bar-left {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
  min-height: 32px;
}

.bar-right {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  min-height: 32px;
}

.copyright-info :deep(a:hover) {
  color: var(--anzhiyu-main);
}

.record-info {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  font-size: 0.8rem;

  .record-link {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: var(--anzhiyu-secondtext);
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: var(--anzhiyu-main);
    }
  }

  .police-record-icon {
    width: 14px;
    height: 14px;
    object-fit: contain;
  }
}

// Uptime Kuma 状态样式
.uptime-status-indicator {
  display: inline-flex;
  gap: 0.35rem;
  align-items: center;
  font-size: 0.8rem;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);

    .status-dot {
      transform: scale(1.2);
    }
  }

  .status-dot {
    position: relative;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    transition:
      background-color 0.3s,
      transform 0.2s ease,
      box-shadow 0.3s;
  }

  .status-text {
    color: var(--anzhiyu-secondtext);
    transition: color 0.3s;
  }

  &.status-loading {
    .status-dot {
      background-color: #9ca3af;
      animation: statusPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
  }

  &.status-ok {
    .status-dot {
      background-color: #10b981;
      box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
      animation: statusGlow 2s ease-in-out infinite;
    }

    .status-text {
      color: #10b981;
    }

    &:hover .status-dot {
      box-shadow: 0 0 12px rgba(16, 185, 129, 0.8);
    }
  }

  &.status-partial {
    .status-dot {
      background-color: #f59e0b;
      box-shadow: 0 0 8px rgba(245, 158, 11, 0.6);
      animation: statusBlink 1.5s ease-in-out infinite;
    }

    .status-text {
      color: #f59e0b;
    }

    &:hover .status-dot {
      box-shadow: 0 0 12px rgba(245, 158, 11, 0.8);
    }
  }

  &.status-error {
    .status-dot {
      background-color: #ef4444;
      box-shadow: 0 0 8px rgba(239, 68, 68, 0.6);
      animation: statusBlink 1s ease-in-out infinite;
    }

    .status-text {
      color: #ef4444;
    }

    &:hover .status-dot {
      box-shadow: 0 0 12px rgba(239, 68, 68, 0.8);
    }
  }
}

// 状态正常时的柔和呼吸动画
@keyframes statusGlow {
  0%,
  100% {
    box-shadow: 0 0 6px rgba(16, 185, 129, 0.5);
    opacity: 1;
  }

  50% {
    box-shadow: 0 0 10px rgba(16, 185, 129, 0.8);
    opacity: 0.9;
  }
}

// 加载中的脉冲动画
@keyframes statusPulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.5;
    transform: scale(0.9);
  }
}

// 异常/错误时的闪烁动画
@keyframes statusBlink {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }
}

:deep(.bar-link),
.bar-link {
  margin-top: 8px;
  margin-bottom: 8px;
  font-size: 1rem;
  font-weight: 700;
  color: var(--anzhiyu-fontcolor);
  white-space: nowrap;
  text-decoration: none;

  &:hover {
    color: var(--anzhiyu-main);
  }
}

.cc-link {
  display: flex;
  align-items: center;

  i {
    margin: 0 2px;
  }
}

.police-record-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;

  .police-record-icon {
    width: 14px;
    height: 14px;
    object-fit: contain;
  }
}

@media (width >= 1200) {
  .footer-link-grid {
    gap: 8rem;
  }
}

// 页脚运行时间模块样式
.footer-runtime-board {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  margin: 1rem 0;
  font-size: 12px;
  color: var(--anzhiyu-fontcolor);

  .status-img-row {
    display: flex;
    justify-content: center;

    .status-badge {
      width: 100%;
      max-width: 130px;
      height: auto;
      border-radius: 0;
    }
  }

  .runtime-info-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    flex-wrap: wrap;

    .runtime-text {
      font-weight: 500;
      line-height: 1.5;
    }

    .runtime-time {
      display: inline-block;
      font-weight: 600;
      border-radius: 10px;
      text-align: center;
    }

    .heartbeat-icon {
      display: inline-flex;
      align-items: center;
      font-size: 16px;
      animation: heartbeat 1.3s ease-in-out infinite;
    }
  }

  @keyframes heartbeat {
    0%,
    100% {
      transform: scale(1);
    }
    10%,
    30% {
      transform: scale(0.9);
    }
    20%,
    40%,
    60%,
    80% {
      transform: scale(1.1);
    }
    50%,
    70% {
      transform: scale(1.05);
    }
  }
}

// 懒加载相关样式
.lazy-image {
  background-color: var(--anzhiyu-secondbg);
  background-image: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.04),
    transparent
  );
  background-size: 200% 100%;
  animation: loading 1.5s infinite;

  &.lazy-loading {
    filter: blur(5px);
    transition: filter 0.3s ease;
  }

  &.lazy-loaded {
    animation: none;
    background: none;
    filter: none;
  }

  &.lazy-error {
    background: var(--anzhiyu-secondbg);
    opacity: 0.5;
  }
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

@media (width <= 768px) {
  .footer-back-to-top {
    display: none;
  }
  .footer-container {
    z-index: 99;
    background: var(--anzhiyu-card-bg);
    margin-top: -1px;
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
    touch-action: pan-y;
  }
}
</style>
