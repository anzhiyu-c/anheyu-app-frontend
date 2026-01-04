<!--
 * @Description: 移动端菜单组件
 * @Author: 安知鱼
 * @Date: 2025-09-16 13:16:41
 * @LastEditTime: 2025-11-17 14:11:23
 * @LastEditors: 安知鱼
-->
<template>
  <div id="sidebar-menus" :class="{ open: isOpen }">
    <!-- 站点数据统计 -->
    <div class="site-data">
      <div
        v-for="item in siteData"
        :key="item.name"
        class="data-item is-center"
      >
        <div class="data-item-link">
          <a
            :href="item.link"
            data-pjax-state=""
            @click="handleInternalLinkClick"
          >
            <div class="headline">{{ item.name }}</div>
            <div class="length-num" :class="item.class">{{ item.count }}</div>
          </a>
        </div>
      </div>
    </div>

    <!-- 功能区域 -->
    <span class="sidebar-menu-item-title">功能</span>
    <div class="sidebar-menu-item">
      <div
        title="显示模式切换"
        class="darkmode_switchbutton menu-child"
        :class="{ 'is-dark': dataTheme }"
        @click="switchDarkMode"
      >
        <i
          class="anzhiyufont"
          :class="
            dataTheme
              ? 'anzhiyufont anzhiyu-icon-circle-half-stroke'
              : 'anzhiyufont anzhiyu-icon-circle-half-stroke'
          "
        />
        <span>{{ dataTheme ? "浅色模式" : "深色模式" }}</span>
      </div>
    </div>

    <!-- 快捷菜单组 -->
    <div class="back-menu-list-groups">
      <div
        v-for="group in quickMenuGroups"
        :key="group.title"
        class="back-menu-list-group"
      >
        <div class="back-menu-list-title">{{ group.title }}</div>
        <div class="back-menu-list">
          <a
            v-for="item in group.items"
            :key="item.name"
            :href="item.href"
            :rel="item.rel"
            :title="`访问${item.name}`"
            :target="item.target"
            :data-pjax-state="item.dataPjaxState"
            class="back-menu-item"
            @click="item.target === '_self' ? handleInternalLinkClick() : null"
          >
            <img
              :alt="`${item.name}图标`"
              :src="item.icon"
              class="back-menu-item-icon"
            />
            <span class="back-menu-item-text">{{ item.name }}</span>
          </a>
        </div>
      </div>
    </div>

    <!-- 主菜单 -->
    <div class="menus_items">
      <div v-for="menu in mainMenus" :key="menu.name" class="menu-group">
        <div class="menu-group-title">{{ menu.name }}</div>
        <div class="menu-group-list">
          <!-- 如果菜单有子项，显示子项列表 -->
          <template v-if="menu.children && menu.children.length > 0">
            <template v-for="child in menu.children" :key="child.name">
              <a
                v-if="child.isExternal"
                :href="child.href"
                :target="child.target"
                :rel="child.rel"
                class="menu-group-item"
              >
                <i :class="['anzhiyufont', child.icon]" />
                <span>{{ child.name }}</span>
              </a>
              <a
                v-else-if="child.href === '/travelling'"
                href="#"
                class="menu-group-item"
                @click.prevent="handleTreasureLinkClick"
              >
                <i :class="['anzhiyufont', child.icon]" />
                <span>{{ child.name }}</span>
              </a>
              <a
                v-else-if="
                  child.href &&
                  (child.href.startsWith('http://') ||
                    child.href.startsWith('https://'))
                "
                :href="child.href"
                target="_blank"
                rel="noopener noreferrer"
                class="menu-group-item"
              >
                <i :class="['anzhiyufont', child.icon]" />
                <span>{{ child.name }}</span>
              </a>
              <!-- 后端渲染的页面（如 .xml, .json 等）使用原生跳转 -->
              <a
                v-else-if="isBackendRenderedPath(child.href)"
                :href="child.href"
                class="menu-group-item"
                @click="handleInternalLinkClick"
              >
                <i :class="['anzhiyufont', child.icon]" />
                <span>{{ child.name }}</span>
              </a>
              <router-link
                v-else
                :to="child.href"
                class="menu-group-item"
                @click="handleInternalLinkClick"
              >
                <i :class="['anzhiyufont', child.icon]" />
                <span>{{ child.name }}</span>
              </router-link>
            </template>
          </template>
          <!-- 如果菜单没有子项，直接显示该菜单本身 -->
          <template v-else>
            <a
              v-if="menu.isExternal"
              :href="menu.href"
              :target="menu.target"
              :rel="menu.rel"
              class="menu-group-item"
            >
              <i :class="['anzhiyufont', menu.icon]" />
              <span>{{ menu.name }}</span>
            </a>
            <a
              v-else-if="menu.href === '/travelling'"
              href="#"
              class="menu-group-item"
              @click.prevent="handleTreasureLinkClick"
            >
              <i :class="['anzhiyufont', menu.icon]" />
              <span>{{ menu.name }}</span>
            </a>
            <a
              v-else-if="
                menu.href &&
                (menu.href.startsWith('http://') ||
                  menu.href.startsWith('https://'))
              "
              :href="menu.href"
              target="_blank"
              rel="noopener noreferrer"
              class="menu-group-item"
            >
              <i :class="['anzhiyufont', menu.icon]" />
              <span>{{ menu.name }}</span>
            </a>
            <!-- 后端渲染的页面（如 .xml, .json 等）使用原生跳转 -->
            <a
              v-else-if="isBackendRenderedPath(menu.href)"
              :href="menu.href"
              class="menu-group-item"
              @click="handleInternalLinkClick"
            >
              <i :class="['anzhiyufont', menu.icon]" />
              <span>{{ menu.name }}</span>
            </a>
            <router-link
              v-else
              :to="menu.href"
              class="menu-group-item"
              @click="handleInternalLinkClick"
            >
              <i :class="['anzhiyufont', menu.icon]" />
              <span>{{ menu.name }}</span>
            </router-link>
          </template>
        </div>
      </div>
    </div>

    <!-- 标签云 -->
    <span class="sidebar-menu-item-title">标签</span>
    <div class="card-widget card-tags">
      <div v-if="tags.length > 0" class="card-tag-cloud">
        <a
          v-for="tag in tags"
          :key="tag.name"
          :href="tag.href"
          @click="handleInternalLinkClick"
        >
          {{ tag.name }}<sup>{{ tag.count }}</sup>
        </a>
      </div>
      <div v-else class="no-tags">
        <span class="no-tags-text">暂无标签</span>
      </div>
    </div>

    <!-- 网站信息 -->
    <span class="sidebar-menu-item-title">网站信息</span>
    <div class="webinfo">
      <div v-for="info in websiteInfo" :key="info.name" class="webinfo-item">
        <div class="webinfo-item-title">
          <i :class="info.icon" />
          <div class="item-name">{{ info.name }} :</div>
        </div>
        <div class="item-count">{{ info.value }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useArticleStore } from "@/store/modules/articleStore";
import { useCommentStore } from "@/store/modules/commentStore";
import { useSiteConfigStore } from "@/store/modules/siteConfig";
import { useDataThemeChange } from "@/layout/hooks/useDataThemeChange";

defineOptions({
  name: "MobileMenu"
});

// 定义 emits
const emit = defineEmits<{
  close: [];
}>();

// 定义 props
const props = defineProps<{
  isOpen?: boolean;
  navConfig?: {
    enable: boolean;
    menu: Array<{
      title: string;
      items: Array<{
        name: string;
        link: string;
        icon: string;
      }>;
    }>;
  };
  menuConfig?: Array<{
    title: string;
    type: "direct" | "dropdown";
    path?: string;
    icon?: string;
    isExternal?: boolean;
    items?: Array<{
      title: string;
      path: string;
      icon: string;
      isExternal: boolean;
    }>;
  }>;
}>();

// Store 相关
const articleStore = useArticleStore();
const commentStore = useCommentStore();
const siteConfigStore = useSiteConfigStore();

const { tags: tagList, categories: categoryList } = storeToRefs(articleStore);
const { globalCommentCount } = storeToRefs(commentStore);
const { getSiteConfig } = storeToRefs(siteConfigStore);

const { fetchTags, fetchCategories, navigateToRandomLink } = articleStore;
const { ensureGlobalCommentCount } = commentStore;

// 主题切换相关
const { dataTheme, dataThemeChange } = useDataThemeChange();

// 响应式数据
const expandedMenus = ref<string[]>([]);

// 计算站点数据统计
const siteData = computed(() => {
  // 从配置中获取文章总数
  const totalPostCount =
    getSiteConfig.value?.sidebar?.siteinfo?.totalPostCount || 0;

  return [
    {
      name: "文章",
      link: "/archives",
      count: totalPostCount.toString(),
      class: ""
    },
    {
      name: "标签",
      link: "/tags",
      count: tagList.value.length.toString(),
      class: ""
    },
    {
      name: "分类",
      link: "/categories",
      count: categoryList.value.length.toString(),
      class: ""
    },
    {
      name: "评论",
      link: "/recentcomments",
      count: globalCommentCount.value.toString(),
      class: "twikoo_allcount"
    }
  ];
});

// 快捷菜单组 - 使用真实的 navConfig 数据
const quickMenuGroups = computed(() => {
  if (!props.navConfig?.menu) {
    return [];
  }
  console.log(props.navConfig);

  return props.navConfig.menu.map(group => ({
    title: group.title,
    items: group.items.map(item => ({
      name: item.name,
      href: item.link,
      rel: item.link.startsWith("http") ? "external nofollow" : undefined,
      target: item.link.startsWith("http") ? "_blank" : "_self",
      icon: item.icon,
      dataPjaxState: item.link.startsWith("http") ? undefined : ""
    }))
  }));
});

// 主菜单 - 使用真实的 menuConfig 数据
const mainMenus = computed(() => {
  if (
    !props.menuConfig ||
    !Array.isArray(props.menuConfig) ||
    props.menuConfig.length === 0
  ) {
    return [];
  }

  return props.menuConfig.map(menuItem => {
    // 如果没有type字段，根据数据特征判断类型
    const itemType =
      menuItem.type ||
      (menuItem.items && menuItem.items.length > 0 ? "dropdown" : "direct");

    if (itemType === "direct") {
      // 一级菜单：直接跳转
      return {
        name: menuItem.title,
        href: menuItem.path || "#",
        icon: menuItem.icon || "anzhiyu-icon-link",
        target: menuItem.isExternal ? "_blank" : "_self",
        rel: menuItem.isExternal ? "noopener noreferrer" : undefined,
        dataPjaxState: menuItem.isExternal ? undefined : "",
        isExternal: menuItem.isExternal,
        children: [] // 一级菜单没有子菜单
      };
    } else {
      // 二级菜单：有子菜单的下拉菜单
      return {
        name: menuItem.title,
        children: (menuItem.items || []).map(item => ({
          name: item.title,
          href: item.path,
          icon: item.icon,
          target: item.isExternal ? "_blank" : "_self",
          rel: item.isExternal ? "noopener noreferrer" : undefined,
          dataPjaxState: item.isExternal ? undefined : "",
          isExternal: item.isExternal
        }))
      };
    }
  });
});

// 标签云数据 - 使用真实数据
const tags = computed(() => {
  if (!tagList.value || tagList.value.length === 0) return [];

  // 生成颜色的辅助函数
  const generateTagColor = (index: number) => {
    const colors = [
      "#4fc08d",
      "#f7df1e",
      "#1572b6",
      "#339933",
      "#3178c6",
      "#61dafb",
      "#68217a",
      "#ff6b6b",
      "#e91e63",
      "#9c27b0",
      "#673ab7",
      "#3f51b5",
      "#2196f3",
      "#03a9f4",
      "#00bcd4",
      "#009688",
      "#4caf50",
      "#8bc34a",
      "#cddc39",
      "#ffeb3b",
      "#ffc107",
      "#ff9800",
      "#ff5722",
      "#795548",
      "#607d8b"
    ];
    return colors[index % colors.length];
  };

  // 生成字体大小的辅助函数
  const generateFontSize = (count: number, maxCount: number) => {
    const minSize = 1;
    const maxSize = 1.5;
    const ratio = maxCount > 0 ? count / maxCount : 0;
    return `${minSize + (maxSize - minSize) * ratio}em`;
  };

  const maxCount = Math.max(...tagList.value.map(tag => tag.count));

  return tagList.value.map((tag, index) => ({
    name: tag.name,
    href: `/tags/${tag.name}/`,
    fontSize: generateFontSize(tag.count, maxCount),
    color: generateTagColor(index),
    count: tag.count
  }));
});

// 赞助者数据
const sponsors = reactive([
  { name: "热心网友A", href: "https://example.com/" },
  { name: "热心网友B", href: "https://example.com/" },
  { name: "热心网友C", href: "https://example.com/" },
  { name: "热心网友D", href: "https://example.com/" }
]);

// 网站信息 - 与桌面端 CardWebInfo.vue 保持一致
const websiteInfo = computed(() => {
  const config = getSiteConfig.value;
  const siteinfo = config?.sidebar?.siteinfo || {};

  const info = [];

  if (siteinfo.totalPostCount !== undefined && siteinfo.totalPostCount !== -1) {
    info.push({
      name: "文章总数",
      icon: "anzhiyufont anzhiyu-icon-file-lines",
      value: siteinfo.totalPostCount.toString()
    });
  }

  if (siteinfo.runtimeEnable) {
    // 与桌面端逻辑完全一致：launch_time 从 footer.runtime.launch_time 获取
    let differenceInDays = 0;
    const launchTime = config?.footer?.runtime?.launch_time;
    if (launchTime) {
      try {
        const launchDate = new Date(launchTime);
        const currentDate = new Date();
        const differenceInTime = currentDate.getTime() - launchDate.getTime();
        differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
      } catch (error) {
        console.error("Invalid launch_time format:", launchTime);
        differenceInDays = 0;
      }
    }
    info.push({
      name: "建站天数",
      icon: "anzhiyufont anzhiyu-icon-stopwatch",
      value: `${differenceInDays} 天`
    });
  }

  if (siteinfo.totalWordCount !== undefined && siteinfo.totalWordCount !== -1) {
    info.push({
      name: "全站字数",
      icon: "anzhiyufont anzhiyu-icon-font",
      value: siteinfo.totalWordCount.toString()
    });
  }

  return info;
});

// 方法
const toggleSubmenu = (menuName: string) => {
  const index = expandedMenus.value.indexOf(menuName);
  if (index > -1) {
    expandedMenus.value.splice(index, 1);
  } else {
    expandedMenus.value.push(menuName);
  }
};

const handleTreasureLinkClick = () => {
  navigateToRandomLink();
  emit("close");
};

const switchDarkMode = () => {
  const newTheme = dataTheme.value ? "light" : "dark";
  dataThemeChange(newTheme);
};

// 后端渲染的页面路径（不应使用 Vue Router 跳转）
const BACKEND_RENDERED_EXTENSIONS = [".xml", ".json", ".txt", ".rss"];

// 判断是否为后端渲染的页面（如 sitemap.xml, atom.xml, rss.xml 等）
const isBackendRenderedPath = (link: string) => {
  if (!link) return false;
  const lowerLink = link.toLowerCase();
  return BACKEND_RENDERED_EXTENSIONS.some(ext => lowerLink.endsWith(ext));
};

// 处理内部链接点击，关闭侧边栏
const handleInternalLinkClick = () => {
  emit("close");
};

// 组件挂载时获取数据
onMounted(() => {
  // 获取标签和分类数据
  fetchTags();
  fetchCategories();
  // 确保获取全站评论总数（避免重复请求）
  ensureGlobalCommentCount();
});
</script>

<style scoped lang="scss">
#sidebar-menus {
  position: fixed;
  top: 2vh;
  right: -100%;
  width: 300px;
  height: 96vh;
  background: var(--anzhiyu-card-bg);
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  transition: right 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1010;
  overflow-y: auto;
  padding: 20px 15px;
  border-radius: 10px;
  &::-webkit-scrollbar {
    display: none;
  }

  &.open {
    right: 10px;
  }

  /* 滚动条样式 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--anzhiyu-scrollbar);
    border-radius: 3px;
  }
}

/* 站点数据统计 */
.site-data {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 20px;
  background: var(--anzhiyu-card-bg);
  border-radius: 8px;
  border: var(--style-border-always);

  .data-item {
    text-align: center;

    &.is-center {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .data-item-link {
      width: 100%;

      a {
        display: block;
        padding: 15px 10px;
        color: var(--anzhiyu-fontcolor);
        text-decoration: none;
        transition: all 0.3s ease;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .headline {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 5px;
        }

        .length-num {
          color: var(--anzhiyu-fontcolor);
          font-size: 20px;
          font-weight: 700;
          line-height: 1;
        }
      }
    }
  }
}

/* 分割线 */
hr {
  border: none;
  height: 1px;
  background: var(--anzhiyu-card-border);
  margin: 20px 0;
}

/* 标题样式 */
.sidebar-menu-item-title {
  display: block;
  padding-left: 5px;
  font-size: 12px;
  color: var(--anzhiyu-secondtext);
  line-height: 3;

  .sidebar-menu-item-title-link {
    float: right;
    font-size: 12px;
    color: var(--anzhiyu-theme);
    text-decoration: none;
    font-weight: normal;

    &:hover {
      color: var(--anzhiyu-main);
    }
  }
}

/* 功能区域 */
.sidebar-menu-item {
  margin-bottom: 20px;

  .darkmode_switchbutton {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 15px;
    background: var(--anzhiyu-background);
    border-radius: 8px;
    color: var(--anzhiyu-fontcolor);
    text-decoration: none;
    transition: all 0.3s ease;
    cursor: pointer;
    border: var(--style-border);

    &.is-dark {
      color: var(--anzhiyu-white);
      background: var(--anzhiyu-orange);
    }

    i {
      font-size: 16px;
      transition: transform 0.3s ease;
    }

    span {
      font-size: 14px;
      font-weight: 500;
    }

    &:active i {
      transform: scale(0.95);
    }
  }
}

/* 快捷菜单组 */
.back-menu-list-groups {
  .back-menu-list-group {
    margin-bottom: 20px;

    .back-menu-list-title {
      font-size: 12px;
      color: var(--anzhiyu-secondtext);
      margin-bottom: 10px;
      padding: 0 5px;
    }

    .back-menu-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 8px;

      .back-menu-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 12px 8px;
        background: var(--anzhiyu-background);
        border-radius: 8px;
        text-decoration: none;
        color: var(--anzhiyu-fontcolor);
        transition: all 0.3s ease;
        border: var(--style-border);

        &:hover {
          transform: translateY(-2px);
        }

        .back-menu-item-icon {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          margin-bottom: 6px;
          object-fit: cover;
        }

        .back-menu-item-text {
          font-size: 12px;
          text-align: center;
          font-weight: 500;
        }
      }
    }
  }

  .back-menu-bottom-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 12px 15px;
    background: var(--anzhiyu-theme);
    color: var(--anzhiyu-white);
    border-radius: 8px;
    text-decoration: none;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
      background: var(--anzhiyu-main);
    }

    .back-menu-bottom-btn-icon {
      width: 24px;
      height: 24px;
      border-radius: 4px;
      object-fit: cover;
    }

    .back-menu-bottom-btn-text {
      flex: 1;
    }
  }
}

/* 主菜单 */
.menus_items {
  margin-bottom: 25px;
}
.menus_items .menu-group {
  margin-bottom: 15px;
}
.menus_items .menu-group:last-child {
  margin-bottom: 0;
}
.menus_items .menu-group .menu-group-title {
  margin: 0 0 12px 5px;

  font-size: 12px;
  color: var(--anzhiyu-secondtext);
  margin-bottom: 10px;
  padding: 0 5px;
}
.menus_items .menu-group .menu-group-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
.menus_items .menu-group .menu-group-list .menu-group-item {
  display: flex;
  align-items: center;
  padding: 5px 15px;
  background: var(--anzhiyu-background);
  border-radius: 12px;
  text-decoration: none;
  color: var(--anzhiyu-fontcolor);
  font-size: 12px;
  transition: all 0.3s ease;
  border: var(--style-border);
  flex-direction: column;
}
.menus_items .menu-group .menu-group-list .menu-group-item:hover {
  color: var(--anzhiyu-theme);
  transform: scale(1.03);
}
.menus_items .menu-group .menu-group-list .menu-group-item i {
  font-size: 1rem;
  width: 22px;
  text-align: center;
}

/* 标签云 */
.card-widget {
  border-radius: 6px;
  padding: 0;
  margin-bottom: 20px;
  background: none;
  border: none;
  box-shadow: none;

  .card-tag-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    a {
      display: inline-block;
      padding: 4px 8px;
      background: var(--anzhiyu-card-bg);
      border: 1px solid var(--anzhiyu-card-border);
      border-radius: 8px;
      text-decoration: none;
      font-size: 1rem;
      transition: all 0.3s ease;

      &:hover {
        background: var(--anzhiyu-theme);
        border-color: var(--anzhiyu-theme);
        color: var(--anzhiyu-white) !important;
      }

      sup {
        font-size: 10px;
        margin-left: 2px;
        opacity: 0.8;
      }
    }
  }

  .no-tags {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;

    .no-tags-text {
      color: var(--anzhiyu-secondtext);
      font-size: 13px;
      font-style: italic;
      opacity: 0.8;
    }
  }
}

/* 赞助区域 */
.power-list {
  .power-item {
    .power-item-body {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px;

      .power-item-link {
        a {
          display: block;
          padding: 8px 12px;
          background: var(--anzhiyu-background);
          border-radius: 6px;
          color: var(--anzhiyu-fontcolor);
          text-decoration: none;
          font-size: 12px;
          text-align: center;
          transition: all 0.3s ease;

          &:hover {
            background: var(--anzhiyu-theme);
            color: var(--anzhiyu-white);
            transform: translateY(-1px);
          }
        }
      }
    }
  }
}

/* 网站信息 */
.webinfo {
  .webinfo-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 15px;
    background: var(--anzhiyu-background);
    border-radius: 8px;
    margin-bottom: 8px;

    .webinfo-item-title {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--anzhiyu-fontcolor);
      font-size: 13px;

      i {
        font-size: 14px;
      }

      .item-name {
        font-weight: 500;
      }
    }

    .item-count {
      font-size: 13px;
    }
  }
}

/* 响应式设计 */
@media (max-width: 480px) {
  #sidebar-menus {
    width: 280px;
  }

  .site-data {
    gap: 8px;

    .data-item .data-item-link a {
      padding: 12px 8px;

      .headline {
        font-size: 13px;
      }

      .length-num {
        font-size: 16px;
      }
    }
  }

  .back-menu-list-groups .back-menu-list-group .back-menu-list {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 6px;

    .back-menu-item {
      padding: 10px 6px;

      .back-menu-item-icon {
        width: 28px;
        height: 28px;
      }

      .back-menu-item-text {
        font-size: 11px;
      }
    }
  }
}

/* 暗色主题适配 */
[data-theme="dark"] {
  #sidebar-menus {
    background: var(--anzhiyu-card-bg);
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.3);
  }

  .card-tag-cloud a {
    background: var(--anzhiyu-card-bg);
    border-color: var(--anzhiyu-card-border);
  }
}
</style>
