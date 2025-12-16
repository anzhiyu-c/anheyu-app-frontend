<script setup lang="ts">
import type { CommentSettingsInfo } from "../../../type";
import { ElMessage } from "element-plus";
import { Warning, CircleCheck } from "@element-plus/icons-vue";
import { useClipboard } from "@vueuse/core";
import { computed, ref, watch } from "vue";

defineOptions({
  name: "CommentSettingsForm"
});

const model = defineModel<CommentSettingsInfo>({ required: true });

const { copy } = useClipboard();
const handleCopy = (text: string) => {
  copy(text)
    .then(() => {
      ElMessage.success(`占位符 ${text} 已复制!`);
    })
    .catch(() => {
      ElMessage.error("复制失败");
    });
};

const tip = `https://api.day.app/YOUR_KEY/{{.TITLE}}/{{.BODY}}?isArchive=1&sound=health&icon={{.SITE_URL}}/favicon.ico&group={{.SITE_NAME}}&url={{.POST_URL}}`;

// JSON验证相关
const jsonValidationError = ref<string>("");
const isJsonValid = computed(() => !jsonValidationError.value);

// 验证JSON格式的函数
const validateJson = (jsonString: string) => {
  if (!jsonString.trim()) {
    jsonValidationError.value = "";
    return true;
  }

  try {
    JSON.parse(jsonString);
    jsonValidationError.value = "";
    return true;
  } catch (error) {
    if (error instanceof Error) {
      jsonValidationError.value = `JSON格式错误: ${error.message}`;
    } else {
      jsonValidationError.value = "JSON格式错误";
    }
    return false;
  }
};

// 获取当前webhook请求体的字符串表示
const getCurrentBodyString = () => {
  if (typeof model.value.webhookRequestBody === "string") {
    return model.value.webhookRequestBody;
  }
  return JSON.stringify(model.value.webhookRequestBody || {}, null, 2);
};

// 监听webhook请求体变化，实时验证JSON
watch(
  () => model.value.webhookRequestBody,
  newValue => {
    if (model.value.pushooChannel === "webhook") {
      validateJson(getCurrentBodyString());
    }
  },
  { immediate: true }
);

// 监听推送渠道变化，清理验证状态
watch(
  () => model.value.pushooChannel,
  newValue => {
    if (newValue !== "webhook") {
      jsonValidationError.value = "";
    } else {
      validateJson(getCurrentBodyString());
    }
  }
);

// 处理webhook请求体输入
const handleWebhookBodyInput = (value: string) => {
  try {
    // 尝试解析为对象存储
    const parsed = JSON.parse(value);
    model.value.webhookRequestBody = parsed;
    jsonValidationError.value = "";
  } catch {
    // 解析失败时暂时存储为字符串
    model.value.webhookRequestBody = value;
  }
};

// 格式化JSON的函数
const formatJson = () => {
  try {
    const currentString = getCurrentBodyString();
    if (currentString.trim()) {
      const parsed = JSON.parse(currentString);
      model.value.webhookRequestBody = parsed; // 存储为对象
      jsonValidationError.value = "";
      ElMessage.success("JSON格式化成功！");
    }
  } catch (error) {
    ElMessage.error("JSON格式错误，无法格式化");
  }
};
</script>

<template>
  <div>
    <el-divider content-position="left">基础设置</el-divider>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="启用评论功能">
          <el-switch v-model="model.enable" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="启用登录后评论">
          <el-switch v-model="model.loginRequired" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="显示评论者UA">
          <el-switch v-model="model.showUA" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="显示评论者归属地">
          <el-switch v-model="model.showRegion" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="允许上传图片">
          <el-switch v-model="model.allowImageUpload" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="评论每页数量">
          <el-input-number v-model="model.pageSize" :min="1" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="博主标识(Master Tag)">
          <el-input v-model="model.masterTag" placeholder="例如：博主" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="博主邮箱 (用于身份识别)">
          <el-input v-model="model.bloggerEmail" placeholder="输入博主邮箱" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="匿名评论邮箱 (为空则使用网站拥有者邮箱)">
          <el-input
            v-model="model.anonymousEmail"
            placeholder="留空则使用前台网站拥有者邮箱"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="表情 CDN 链接 (.json)">
          <el-input v-model="model.emojiCDN" placeholder="输入表情包json链接" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="评论框占位文字">
      <el-input
        v-model="model.placeholder"
        type="textarea"
        :rows="2"
        placeholder="例如：欢迎留下宝贵的建议啦～"
      />
    </el-form-item>

    <el-divider content-position="left">安全与限制</el-divider>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="单IP每分钟评论数限制">
          <el-input-number v-model="model.limitPerMinute" :min="0" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="单条评论最大字数">
          <el-input-number v-model="model.limitLength" :min="0" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="违禁词列表 (逗号分隔，匹配到的评论将进入待审)">
      <el-input
        v-model="model.forbiddenWords"
        type="textarea"
        :rows="3"
        placeholder="例如：违禁词1,违禁词2"
      />
    </el-form-item>

    <el-divider content-position="left">AI敏感词检测</el-divider>
    <el-alert type="info" :closable="false" style="margin-bottom: 16px">
      <template #title>
        <div style="font-size: 14px; line-height: 1.6">
          基于AI的智能文本内容检测，支持中英文混合检测、智能变体识别（同音字、谐音字、形近字等）。请前往
          <a
            href="https://api.nsuuu.com/"
            target="_blank"
            style="color: var(--el-color-primary)"
            >鸭梨API (api.nsuuu.com)</a
          >
          了解更多。检测到违规内容的评论将进入待审状态。
        </div>
      </template>
    </el-alert>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="启用AI敏感词检测">
          <el-switch v-model="model.aiDetectEnable" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="AI检测API地址">
          <el-input
            v-model="model.aiDetectAPIURL"
            :disabled="!model.aiDetectEnable"
            placeholder="https://v1.nsuuu.com/api/AiDetect"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="AI检测API密钥 (如需要)">
          <el-input
            v-model="model.aiDetectAPIKey"
            type="password"
            show-password
            :disabled="!model.aiDetectEnable"
            placeholder="可选，部分API需要密钥"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-divider content-position="left">QQ信息查询配置</el-divider>
    <el-alert type="info" :closable="false" style="margin-bottom: 16px">
      <template #title>
        <div style="font-size: 14px; line-height: 1.6">
          用于在评论时输入QQ号自动获取昵称和头像。请前往
          <a
            href="https://api.nsuuu.com/"
            target="_blank"
            style="color: var(--el-color-primary)"
            >鸭梨API (api.nsuuu.com)</a
          >
          注册并获取API密钥。
        </div>
      </template>
    </el-alert>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="QQ API 地址">
          <el-input
            v-model="model.qqAPIURL"
            placeholder="https://v1.nsuuu.com/api/qqname"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="QQ API 密钥">
          <el-input
            v-model="model.qqAPIKey"
            type="password"
            show-password
            placeholder="在鸭梨API控制台获取"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-divider content-position="left">通知设置</el-divider>

    <el-alert type="info" :closable="false" style="margin-bottom: 20px">
      <template #title>
        <div style="font-size: 14px; line-height: 1.6">
          <strong>两级通知控制：</strong><br />
          1️⃣ 系统级开关（此处配置）- 管理员控制功能是否启用<br />
          2️⃣ 用户级偏好（用户中心）- 用户控制个人通知接收偏好<br />
          <small
            style="
              color: var(--anzhiyu-secondtext);
              margin-top: 6px;
              display: block;
            "
          >
            💡 最终判断公式：<strong>系统开关 AND 用户偏好</strong> =
            是否发送通知
          </small>
        </div>
      </template>
    </el-alert>

    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item>
          <template #label>
            <span>收到新评论时通知博主</span>
            <el-tooltip
              content="开启后，当网站收到新的顶级评论时，会通知博主（不包括回复评论）"
              placement="top"
            >
              <i
                class="anzhiyufont anzhiyu-icon-question-circle"
                style="
                  margin-left: 4px;
                  color: var(--anzhiyu-fontcolor);
                  cursor: help;
                "
              />
            </el-tooltip>
          </template>
          <el-switch v-model="model.notifyAdmin" />
          <span
            style="
              margin-left: 12px;
              font-size: 13px;
              color: var(--anzhiyu-secondtext);
            "
          >
            当访客发表新评论时，向博主邮箱/即时通知渠道发送通知
          </span>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item>
          <template #label>
            <span>开启评论回复通知功能</span>
            <el-tooltip
              content="开启后，当评论被他人回复时，原评论作者会收到通知（前提是用户允许接收通知）"
              placement="top"
            >
              <i
                class="anzhiyufont anzhiyu-icon-question-circle"
                style="
                  margin-left: 4px;
                  color: var(--anzhiyu-fontcolor);
                  cursor: help;
                "
              />
            </el-tooltip>
          </template>
          <el-switch v-model="model.notifyReply" />
          <span
            style="
              margin-left: 12px;
              font-size: 13px;
              color: var(--anzhiyu-secondtext);
            "
          >
            当评论被回复时，向被回复者发送邮件/即时通知（需用户在用户中心或发表评论时开启接收通知）
          </span>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <el-form-item>
          <template #label>
            <span>同时通过邮件和即时通知</span>
            <el-tooltip
              content="开启后，当配置了即时通知（Bark/Webhook）时，会同时发送邮件和即时通知；关闭则只发送即时通知"
              placement="top"
            >
              <i
                class="anzhiyufont anzhiyu-icon-question-circle"
                style="
                  margin-left: 4px;
                  color: var(--anzhiyu-fontcolor);
                  cursor: help;
                "
              />
            </el-tooltip>
          </template>
          <el-switch v-model="model.scMailNotify" />
          <span
            style="
              margin-left: 12px;
              font-size: 13px;
              color: var(--anzhiyu-secondtext);
            "
          >
            启用双重通知：同时发送邮件和即时通知（关闭则配置即时通知后不再发送邮件）
          </span>
        </el-form-item>
      </el-col>
    </el-row>

    <el-divider content-position="left">即时通知配置</el-divider>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form-item label="推送平台">
          <el-select
            v-model="model.pushooChannel"
            placeholder="选择推送平台"
            clearable
          >
            <el-option label="Bark" value="bark" />
            <el-option label="Webhook" value="webhook" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="推送URL">
          <el-input
            v-model="model.pushooURL"
            placeholder="例如：https://webhook.site/YOUR_UNIQUE_ID 或 https://api.day.app/YOUR_KEY/{{.TITLE}}/{{.BODY}}"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <!-- Webhook高级配置 -->
    <template v-if="model.pushooChannel === 'webhook'">
      <el-divider content-position="left">Webhook 高级配置</el-divider>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="自定义请求体模板">
            <div class="json-input-container">
              <el-input
                :model-value="
                  typeof model.webhookRequestBody === 'string'
                    ? model.webhookRequestBody
                    : JSON.stringify(model.webhookRequestBody || {}, null, 2)
                "
                type="textarea"
                :rows="6"
                :class="{
                  'json-error': !isJsonValid && getCurrentBodyString().trim()
                }"
                placeholder='{"title":"#{TITLE}","content":"#{BODY}","site_name":"#{SITE_NAME}","comment_author":"#{NICK}","comment_content":"#{COMMENT}","parent_author":"#{PARENT_NICK}","parent_content":"#{PARENT_COMMENT}","post_url":"#{POST_URL}","author_email":"#{MAIL}","author_ip":"#{IP}","time":"#{TIME}"}'
                @input="handleWebhookBodyInput"
              />
              <div class="json-actions">
                <el-button
                  size="small"
                  type="primary"
                  :disabled="!getCurrentBodyString().trim()"
                  @click="formatJson"
                >
                  格式化JSON
                </el-button>
              </div>

              <!-- 验证状态显示 -->
              <div v-if="jsonValidationError" class="json-validation-error">
                <el-icon><Warning /></el-icon>
                {{ jsonValidationError }}
              </div>
              <div
                v-else-if="getCurrentBodyString().trim() && isJsonValid"
                class="json-validation-success"
              >
                <el-icon><CircleCheck /></el-icon>
                JSON格式正确
              </div>
            </div>

            <div class="form-hint">
              留空则发送 GET 请求，填入内容则发送 POST 请求。支持 JSON
              格式，系统将自动设置 Content-Type。
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="自定义请求头">
            <el-input
              v-model="model.webhookHeaders"
              type="textarea"
              :rows="4"
              placeholder="Authorization: Bearer YOUR_TOKEN
X-Custom-Header: custom-value
User-Agent: AnheyuBlog-Webhook/1.0"
            />
            <div class="form-hint">
              可选配置，每行一个请求头，格式：Header-Name: Header-Value
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </template>
    <div class="pushoo-hint">
      <b>推送平台说明:</b>
      <ul>
        <li>
          <b>Bark:</b>
          iOS推送服务，URL格式(示例)：
          {{ tip }}
        </li>
        <li>
          <b>Webhook:</b>
          自定义Webhook，支持灵活的请求体和请求头配置。可配置为GET或POST请求，支持JSON格式自动识别
        </li>
      </ul>
      <p>
        <b>通知逻辑:</b>
        如果配置了即时通知但未开启"同时通过邮件和IM通知"，则只发送即时通知，不发送邮件
      </p>
    </div>
    <div class="template-hint">
      <b>可用占位符:</b>
      <p><strong>Bark URL 占位符 (Go模板格式，点击可复制):</strong></p>
      <ul>
        <li @click="handleCopy('{{.TITLE}}')">
          <code v-pre>{{.TITLE}}</code
          >: 推送的默认标题
        </li>
        <li @click="handleCopy('{{.BODY}}')">
          <code v-pre>{{.BODY}}</code
          >: 推送的默认内容
        </li>
        <li @click="handleCopy('{{.SITE_NAME}}')">
          <code v-pre>{{.SITE_NAME}}</code
          >: 网站名称
        </li>
        <li @click="handleCopy('{{.POST_URL}}')">
          <code v-pre>{{.POST_URL}}</code
          >: 评论所在页面的链接
        </li>
        <li @click="handleCopy('{{.NICK}}')">
          <code v-pre>{{.NICK}}</code
          >: 新评论者的昵称
        </li>
        <li @click="handleCopy('{{.COMMENT}}')">
          <code v-pre>{{.COMMENT}}</code
          >: 新评论的内容 (纯文本)
        </li>
        <li @click="handleCopy('{{.PARENT_NICK}}')">
          <code v-pre>{{.PARENT_NICK}}</code
          >: 被回复者的昵称 (仅在回复时有效)
        </li>
        <li @click="handleCopy('{{.MAIL}}')">
          <code v-pre>{{.MAIL}}</code
          >: 新评论者的邮箱
        </li>
        <li @click="handleCopy('{{.IP}}')">
          <code v-pre>{{.IP}}</code
          >: 新评论者的IP地址
        </li>
        <li @click="handleCopy('{{.TIME}}')">
          <code v-pre>{{.TIME}}</code
          >: 评论发表时间
        </li>
      </ul>

      <p><strong>Webhook 占位符 (#{} 格式，点击可复制):</strong></p>
      <ul>
        <li @click="handleCopy('#{TITLE}')">
          <code>#{TITLE}</code>: 推送的默认标题
        </li>
        <li @click="handleCopy('#{BODY}')">
          <code>#{BODY}</code>: 推送的默认内容
        </li>
        <li @click="handleCopy('#{SITE_NAME}')">
          <code>#{SITE_NAME}</code>: 网站名称
        </li>
        <li @click="handleCopy('#{POST_URL}')">
          <code>#{POST_URL}</code>: 评论所在页面的链接
        </li>
        <li @click="handleCopy('#{NICK}')">
          <code>#{NICK}</code>: 新评论者的昵称
        </li>
        <li @click="handleCopy('#{COMMENT}')">
          <code>#{COMMENT}</code>: 新评论的内容 (纯文本)
        </li>
        <li @click="handleCopy('#{PARENT_NICK}')">
          <code>#{PARENT_NICK}</code>: 被回复者的昵称 (仅在回复时有效)
        </li>
        <li @click="handleCopy('#{PARENT_COMMENT}')">
          <code>#{PARENT_COMMENT}</code>: 被回复的评论内容 (仅在回复时有效)
        </li>
        <li @click="handleCopy('#{MAIL}')">
          <code>#{MAIL}</code>: 新评论者的邮箱
        </li>
        <li @click="handleCopy('#{IP}')">
          <code>#{IP}</code>: 新评论者的IP地址
        </li>
        <li @click="handleCopy('#{TIME}')">
          <code>#{TIME}</code>: 评论发表时间
        </li>
      </ul>
    </div>

    <el-divider content-position="left">邮件模板设置</el-divider>
    <el-form-item label="用户收到回复的邮件主题">
      <el-input
        v-model="model.mailSubject"
        placeholder="您在 {{.SITE_NAME}} 上的评论有了新回复"
      />
    </el-form-item>
    <el-form-item label="用户收到回复的邮件内容模板 (支持HTML)">
      <el-input v-model="model.mailTemplate" type="textarea" :rows="5" />
      <div v-pre class="template-hint">
        <b>可用占位符:</b>
        <ul>
          <li>
            <code>{{.SITE_NAME}}</code
            >: 您的网站名称
          </li>
          <li>
            <code>{{.SITE_URL}}</code
            >: 您的网站地址
          </li>
          <li>
            <code>{{.POST_URL}}</code
            >: 评论所在的文章链接
          </li>
          <li>
            <code>{{.NICK}}</code
            >: 新评论者的昵称
          </li>
          <li>
            <code>{{.COMMENT}}</code
            >: 新评论的内容 (HTML格式)
          </li>
          <li>
            <code>{{.IMG}}</code
            >: 新评论者的Gravatar头像链接
          </li>
          <li>
            <code>{{.PARENT_NICK}}</code
            >: 被回复者的昵称
          </li>
          <li>
            <code>{{.PARENT_COMMENT}}</code
            >: 被回复的评论内容 (HTML格式)
          </li>
          <li>
            <code>{{.PARENT_IMG}}</code
            >: 被回复者的Gravatar头像链接
          </li>
        </ul>
      </div>
    </el-form-item>

    <el-form-item label="博主收到新评论的邮件主题">
      <el-input
        v-model="model.mailSubjectAdmin"
        placeholder="{{.SITE_NAME}} 上有来自 {{.NICK}} 的新评论"
      />
    </el-form-item>
    <el-form-item label="博主收到新评论的邮件内容模板 (支持HTML)">
      <el-input v-model="model.mailTemplateAdmin" type="textarea" :rows="5" />
      <div v-pre class="template-hint">
        <b>可用占位符:</b>
        <ul>
          <li>
            <code>{{.SITE_NAME}}</code
            >: 您的网站名称
          </li>
          <li>
            <code>{{.SITE_URL}}</code
            >: 您的网站地址
          </li>
          <li>
            <code>{{.POST_URL}}</code
            >: 评论所在的文章链接
          </li>
          <li>
            <code>{{.NICK}}</code
            >: 新评论者的昵称
          </li>
          <li>
            <code>{{.COMMENT}}</code
            >: 新评论的内容 (HTML格式)
          </li>
          <li>
            <code>{{.IMG}}</code
            >: 新评论者的Gravatar头像链接
          </li>
          <li>
            <code>{{.MAIL}}</code
            >: 新评论者的邮箱地址
          </li>
          <li>
            <code>{{.IP}}</code
            >: 新评论者的IP地址
          </li>
        </ul>
      </div>
    </el-form-item>
  </div>
</template>

<style scoped>
.template-hint {
  padding: 8px 16px;
  margin-top: 6px;
  font-size: 13px;
  line-height: 1.6;
  color: var(--anzhiyu-fontcolor);
  background-color: var(--anzhiyu-secondbg);
  border-radius: 4px;
}

.template-hint b {
  font-weight: 600;
}

.template-hint ul {
  padding-left: 18px;
  margin: 6px 0 0;
  list-style-type: disc;
}

.template-hint li {
  margin-bottom: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.template-hint li:hover {
  color: var(--anzhiyu-theme);
  background-color: var(--anzhiyu-theme-op-light);
}

.template-hint code {
  padding: 2px 5px;
  margin-right: 8px;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  background-color: var(--anzhiyu-card-bg-grey);
  border-radius: 3px;
}

.pushoo-hint {
  padding: 12px 16px;
  margin-top: 8px;
  font-size: 13px;
  line-height: 1.6;
  color: var(--anzhiyu-fontcolor);
  background-color: var(--anzhiyu-theme-op-light);
  border: var(--style-border-always);
  border-radius: 4px;
}

.pushoo-hint b {
  font-weight: 600;
  color: var(--anzhiyu-blue);
}

.pushoo-hint ul {
  padding-left: 18px;
  margin: 6px 0;
  list-style-type: disc;
}

.pushoo-hint li {
  margin-bottom: 4px;
}

.pushoo-hint p {
  margin: 8px 0 0;
  font-style: italic;
}

/* JSON验证相关样式 */
.json-input-container {
  position: relative;
  width: 100%;
}

.json-actions {
  display: flex;
  margin-top: 8px;
  text-align: right;
}

.json-validation-error {
  display: flex;
  align-items: center;
  margin-top: 8px;
  font-size: 12px;
  color: var(--anzhiyu-red);
}

.json-validation-error .el-icon {
  margin-right: 4px;
}

.json-validation-success {
  display: flex;
  align-items: center;
  margin-top: 8px;
  font-size: 12px;
  color: var(--anzhiyu-green);
}

.json-validation-success .el-icon {
  margin-right: 4px;
}

/* JSON输入框错误状态样式 */
:deep(.json-error .el-textarea__inner) {
  border-color: var(--anzhiyu-red);
  box-shadow: 0 0 0 1px var(--anzhiyu-red) inset;
}

:deep(.json-error .el-textarea__inner:focus) {
  border-color: var(--anzhiyu-red);
  box-shadow: 0 0 0 1px var(--anzhiyu-red) inset;
}
</style>
