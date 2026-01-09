/*
 * @Description: 系统配置相关的常量，与后端 Go 定义和 API 响应保持同步。
 * @Author: 安知鱼
 * @Date: 2025-06-21 18:42:04
 * @LastEditTime: 2025-12-29 12:53:53
 * @LastEditors: 安知鱼
 */

// 定义了 localStorage 存储的键名
export const LOCAL_STORAGE_KEY = "site_config_cache";

/**
 * 定义配置键的类型，增强类型安全
 */
export type SettingKey = string;

// --- 站点基础配置 (可暴露给前端) ---
const KeyAppName: SettingKey = "APP_NAME";
const KeySiteURL: SettingKey = "SITE_URL";
const KeySubTitle: SettingKey = "SUB_TITLE";
const KeyAppVersion: SettingKey = "APP_VERSION";
const KeyApiURL: SettingKey = "API_URL";
const KeyAboutLink: SettingKey = "ABOUT_LINK";
const KeyIcpNumber: SettingKey = "ICP_NUMBER";
const KeyPoliceRecordNumber: SettingKey = "POLICE_RECORD_NUMBER";
const KeyPoliceRecordIcon: SettingKey = "POLICE_RECORD_ICON";
const KeySiteKeywords: SettingKey = "SITE_KEYWORDS";
const KeySiteDescription: SettingKey = "SITE_DESCRIPTION";
const KeyUserAvatar: SettingKey = "USER_AVATAR";
const KeyLogoURL: SettingKey = "LOGO_URL";
const KeyLogoURL192: SettingKey = "LOGO_URL_192x192";
const KeyLogoURL512: SettingKey = "LOGO_URL_512x512";
const KeyLogoHorizontalDay: SettingKey = "LOGO_HORIZONTAL_DAY";
const KeyLogoHorizontalNight: SettingKey = "LOGO_HORIZONTAL_NIGHT";
const KeyIconURL: SettingKey = "ICON_URL";
const KeyDefaultThumbParam: SettingKey = "DEFAULT_THUMB_PARAM";
const KeyDefaultBigParam: SettingKey = "DEFAULT_BIG_PARAM";
const KeyGravatarURL: SettingKey = "GRAVATAR_URL";
const KeyDefaultGravatarType: SettingKey = "DEFAULT_GRAVATAR_TYPE";
const KeyThemeColor: SettingKey = "THEME_COLOR";
const KeySiteAnnouncement: SettingKey = "SITE_ANNOUNCEMENT";
const KeyCustomHeaderHTML: SettingKey = "CUSTOM_HEADER_HTML";
const KeyCustomFooterHTML: SettingKey = "CUSTOM_FOOTER_HTML";
const KeyCustomCSS: SettingKey = "CUSTOM_CSS";
const KeyCustomJS: SettingKey = "CUSTOM_JS";
const KeyCustomSidebar: SettingKey = "CUSTOM_SIDEBAR";
const KeyCustomPostTopHTML: SettingKey = "CUSTOM_POST_TOP_HTML";
const KeyCustomPostBottomHTML: SettingKey = "CUSTOM_POST_BOTTOM_HTML";
const KeyDefaultThemeMode: SettingKey = "DEFAULT_THEME_MODE";
const KeyUploadAllowedExtensions: SettingKey = "UPLOAD_ALLOWED_EXTENSIONS";
const KeyUploadDeniedExtensions: SettingKey = "UPLOAD_DENIED_EXTENSIONS";
const KeyEnableExternalLinkWarning: SettingKey = "ENABLE_EXTERNAL_LINK_WARNING";

// --- Header/Nav 配置 ---
const KeyHeaderMenu: SettingKey = "header.menu";
const KeyHeaderNavTravel: SettingKey = "header.nav.travelling";
const KeyHeaderNavClock: SettingKey = "header.nav.clock";
const KeyHeaderNavMenu: SettingKey = "header.nav.menu";
const KeyHomeTop: SettingKey = "HOME_TOP";
const KeyCreativity: SettingKey = "CREATIVITY";

// --- 页面一图流配置 ---
const KeyPageOneImageConfig: SettingKey = "page.one_image.config";
const KeyHitokotoAPI: SettingKey = "page.one_image.hitokoto_api";
const KeyTypingSpeed: SettingKey = "page.one_image.typing_speed";

// --- Sidebar 配置 ---
const KeySidebarAuthorEnable: SettingKey = "sidebar.author.enable";
const KeySidebarAuthorDescription: SettingKey = "sidebar.author.description";
const KeySidebarAuthorStatusImg: SettingKey = "sidebar.author.statusImg";
const KeySidebarAuthorSkills: SettingKey = "sidebar.author.skills";
const KeySidebarAuthorSocial: SettingKey = "sidebar.author.social";
const KeySidebarWechatEnable: SettingKey = "sidebar.wechat.enable";
const KeySidebarWechatFace: SettingKey = "sidebar.wechat.face";
const KeySidebarWechatBackFace: SettingKey = "sidebar.wechat.backFace";
const KeySidebarWechatBlurredBackground: SettingKey =
  "sidebar.wechat.blurBackground";
const KeySidebarWechatLink: SettingKey = "sidebar.wechat.link";
const KeySidebarTagsEnable: SettingKey = "sidebar.tags.enable";
const KeySidebarTagsHighlight: SettingKey = "sidebar.tags.highlight";
const KeySidebarSiteInfoTotalPostCount: SettingKey =
  "sidebar.siteinfo.totalPostCount";
const KeySidebarSiteInfoRuntimeEnable: SettingKey =
  "sidebar.siteinfo.runtimeEnable";
const KeySidebarSiteInfoTotalWordCount: SettingKey =
  "sidebar.siteinfo.totalWordCount";
const KeySidebarArchiveDisplayMonths: SettingKey =
  "sidebar.archive.displayMonths";
const KeySidebarCustomShowInPost: SettingKey = "sidebar.custom.showInPost";
const KeySidebarTocCollapseMode: SettingKey = "sidebar.toc.collapseMode";
const KeySidebarSeriesPostCount: SettingKey = "sidebar.series.postCount";

// 友链配置
const KeyFriendLinkDefaultCategory: SettingKey = "FRIEND_LINK_DEFAULTCATEGORY";
const KeyFriendLinkApplyCondition: SettingKey = "FRIEND_LINK_APPLY_CONDITION";
const KeyFriendLinkApplyCustomCode: SettingKey =
  "FRIEND_LINK_APPLY_CUSTOM_CODE";
const KeyFriendLinkApplyCustomCodeHtml: SettingKey =
  "FRIEND_LINK_APPLY_CUSTOM_CODE_HTML";
// 友链申请表单 placeholder 配置
const KeyFriendLinkPlaceholderName: SettingKey = "FRIEND_LINK_PLACEHOLDER_NAME";
const KeyFriendLinkPlaceholderURL: SettingKey = "FRIEND_LINK_PLACEHOLDER_URL";
const KeyFriendLinkPlaceholderLogo: SettingKey = "FRIEND_LINK_PLACEHOLDER_LOGO";
const KeyFriendLinkPlaceholderDescription: SettingKey =
  "FRIEND_LINK_PLACEHOLDER_DESCRIPTION";
const KeyFriendLinkPlaceholderSiteshot: SettingKey =
  "FRIEND_LINK_PLACEHOLDER_SITESHOT";
// 友链通知配置
const KeyFriendLinkNotifyAdmin: SettingKey = "FRIEND_LINK_NOTIFY_ADMIN";
const KeyFriendLinkPushooChannel: SettingKey = "FRIEND_LINK_PUSHOO_CHANNEL";
const KeyFriendLinkPushooURL: SettingKey = "FRIEND_LINK_PUSHOO_URL";
const KeyFriendLinkWebhookRequestBody: SettingKey =
  "FRIEND_LINK_WEBHOOK_REQUEST_BODY";
const KeyFriendLinkWebhookHeaders: SettingKey = "FRIEND_LINK_WEBHOOK_HEADERS";
const KeyFriendLinkScMailNotify: SettingKey = "FRIEND_LINK_SC_MAIL_NOTIFY";
const KeyFriendLinkMailSubjectAdmin: SettingKey =
  "FRIEND_LINK_MAIL_SUBJECT_ADMIN";
const KeyFriendLinkMailTemplateAdmin: SettingKey =
  "FRIEND_LINK_MAIL_TEMPLATE_ADMIN";
// 友链审核邮件通知配置
const KeyFriendLinkReviewMailEnable: SettingKey =
  "FRIEND_LINK_REVIEW_MAIL_ENABLE";
const KeyFriendLinkReviewMailSubjectApproved: SettingKey =
  "FRIEND_LINK_REVIEW_MAIL_SUBJECT_APPROVED";
const KeyFriendLinkReviewMailTemplateApproved: SettingKey =
  "FRIEND_LINK_REVIEW_MAIL_TEMPLATE_APPROVED";
const KeyFriendLinkReviewMailSubjectRejected: SettingKey =
  "FRIEND_LINK_REVIEW_MAIL_SUBJECT_REJECTED";
const KeyFriendLinkReviewMailTemplateRejected: SettingKey =
  "FRIEND_LINK_REVIEW_MAIL_TEMPLATE_REJECTED";

// --- 前台及页脚配置 ---
const KeyFrontDeskSiteOwnerName: SettingKey = "frontDesk.siteOwner.name";
const KeyFrontDeskSiteOwnerEmail: SettingKey = "frontDesk.siteOwner.email";
const KeyFooterOwnerName: SettingKey = "footer.owner.name";
const KeyFooterOwnerSince: SettingKey = "footer.owner.since";
const KeyFooterCustomText: SettingKey = "footer.custom_text";
const KeyFooterRuntimeEnable: SettingKey = "footer.runtime.enable";
const KeyFooterRuntimeLaunchTime: SettingKey = "footer.runtime.launch_time";
const KeyFooterRuntimeWorkImg: SettingKey = "footer.runtime.work_img";
const KeyFooterRuntimeWorkDesc: SettingKey = "footer.runtime.work_description";
const KeyFooterRuntimeOffDutyImg: SettingKey = "footer.runtime.offduty_img";
const KeyFooterRuntimeOffDutyDesc: SettingKey =
  "footer.runtime.offduty_description";
const KeyFooterSocialBarCenterImg: SettingKey = "footer.socialBar.centerImg";
const KeyFooterListRandomFriends: SettingKey = "footer.list.randomFriends";
const KeyFooterBarAuthorLink: SettingKey = "footer.bar.authorLink";
const KeyFooterBarCCLink: SettingKey = "footer.bar.cc.link";
const KeyFooterBadgeEnable: SettingKey = "footer.badge.enable";
const KeyFooterBadge: SettingKey = "footer.badge.list";
const KeyFooterSocialBarLeft: SettingKey = "footer.socialBar.left";
const KeyFooterSocialBarRight: SettingKey = "footer.socialBar.right";
const KeyFooterList: SettingKey = "footer.project.list";
const KeyFooterBarLinkList: SettingKey = "footer.bar.linkList";

// --- Uptime Kuma 状态监控配置 ---
const KeyFooterUptimeKumaEnable: SettingKey = "footer.uptime_kuma.enable";
const KeyFooterUptimeKumaPageURL: SettingKey = "footer.uptime_kuma.page_url";

// --- 文章配置 ---
const KeyDefaultCover: SettingKey = "post.default.cover";
const KeyPostExpirationTime: SettingKey = "post.expiration_time";
const KeyDoubleColumn: SettingKey = "post.default.double_column";
const KeyPostDefaultPageSize: SettingKey = "post.default.page_size";
const Key404PageDefaultImage: SettingKey = "post.page404.default_image";
const KeyPostRewardEnable: SettingKey = "post.reward.enable";
const KeyPostRewardWeChatQR: SettingKey = "post.reward.wechat_qr";
const KeyPostRewardAlipayQR: SettingKey = "post.reward.alipay_qr";
const KeyPostRewardWeChatEnable: SettingKey = "post.reward.wechat_enable";
const KeyPostRewardAlipayEnable: SettingKey = "post.reward.alipay_enable";
const KeyPostRewardButtonText: SettingKey = "post.reward.button_text";
const KeyPostRewardTitle: SettingKey = "post.reward.title";
const KeyPostRewardWeChatLabel: SettingKey = "post.reward.wechat_label";
const KeyPostRewardAlipayLabel: SettingKey = "post.reward.alipay_label";
const KeyPostRewardListButtonText: SettingKey = "post.reward.list_button_text";
const KeyPostRewardListButtonDesc: SettingKey = "post.reward.list_button_desc";
const KeyPostCodeBlockCodeMaxLines: SettingKey =
  "post.code_block.code_max_lines";
const KeyPostCodeBlockMacStyle: SettingKey = "post.code_block.mac_style";

// 文章复制版权配置
const KeyPostCopyEnable: SettingKey = "post.copy.enable";
const KeyPostCopyCopyrightEnable: SettingKey = "post.copy.copyright_enable";
const KeyPostCopyCopyrightOriginal: SettingKey = "post.copy.copyright_original";
const KeyPostCopyCopyrightReprint: SettingKey = "post.copy.copyright_reprint";

// 文章目录 Hash 更新配置
const KeyPostTocHashUpdateMode: SettingKey = "post.toc.hash_update_mode";

// 文章页面波浪区域配置
const KeyPostWavesEnable: SettingKey = "post.waves.enable";

// 文章底部版权声明配置
const KeyPostCopyrightOriginalTemplate: SettingKey =
  "post.copyright.original_template";
const KeyPostCopyrightReprintTemplateWithUrl: SettingKey =
  "post.copyright.reprint_template_with_url";
const KeyPostCopyrightReprintTemplateWithoutUrl: SettingKey =
  "post.copyright.reprint_template_without_url";

// 文章订阅配置
const KeyPostSubscribeEnable: SettingKey = "post.subscribe.enable";
const KeyPostSubscribeButtonText: SettingKey = "post.subscribe.button_text";
const KeyPostSubscribeDialogTitle: SettingKey = "post.subscribe.dialog_title";
const KeyPostSubscribeDialogDesc: SettingKey = "post.subscribe.dialog_desc";
const KeyPostSubscribeMailSubject: SettingKey = "post.subscribe.mail_subject";
const KeyPostSubscribeMailTemplate: SettingKey = "post.subscribe.mail_template";

// --- 装备页面配置 ---
const KeyPostEquipmentBannerBackground: SettingKey =
  "equipment.banner.background";
const KeyPostEquipmentBannerTitle: SettingKey = "equipment.banner.title";
const KeyPostEquipmentBannerDescription: SettingKey =
  "equipment.banner.description";
const KeyPostEquipmentBannerTip: SettingKey = "equipment.banner.tip";
const KeyPostEquipmentList: SettingKey = "equipment.list";

// --- 最近评论页面配置 ---
const KeyRecentCommentsBannerBackground: SettingKey =
  "recent_comments.banner.background";
const KeyRecentCommentsBannerTitle: SettingKey = "recent_comments.banner.title";
const KeyRecentCommentsBannerDescription: SettingKey =
  "recent_comments.banner.description";
const KeyRecentCommentsBannerTip: SettingKey = "recent_comments.banner.tip";

// --- 关于页面配置 ---
const KeyAboutPageName: SettingKey = "about.page.name";
const KeyAboutPageDescription: SettingKey = "about.page.description";
const KeyAboutPageAvatarImg: SettingKey = "about.page.avatar_img";
const KeyAboutPageSubtitle: SettingKey = "about.page.subtitle";
const KeyAboutPageAvatarSkillsLeft: SettingKey =
  "about.page.avatar_skills_left";
const KeyAboutPageAvatarSkillsRight: SettingKey =
  "about.page.avatar_skills_right";
const KeyAboutPageAboutSiteTips: SettingKey = "about.page.about_site_tips";
const KeyAboutPageMap: SettingKey = "about.page.map";
const KeyAboutPageSelfInfo: SettingKey = "about.page.self_info";
const KeyAboutPagePersonalities: SettingKey = "about.page.personalities";
const KeyAboutPageMaxim: SettingKey = "about.page.maxim";
const KeyAboutPageBuff: SettingKey = "about.page.buff";
const KeyAboutPageGame: SettingKey = "about.page.game";
const KeyAboutPageComic: SettingKey = "about.page.comic";
const KeyAboutPageLike: SettingKey = "about.page.like";
const KeyAboutPageMusic: SettingKey = "about.page.music";
const KeyAboutPageCareers: SettingKey = "about.page.careers";
const KeyAboutPageSkillsTips: SettingKey = "about.page.skills_tips";
const KeyAboutPageStatisticsBackground: SettingKey =
  "about.page.statistics_background";
const KeyAboutPageCustomCode: SettingKey = "about.page.custom_code";
const KeyAboutPageCustomCodeHtml: SettingKey = "about.page.custom_code_html";

// --- 关于页面板块开关配置 ---
const KeyAboutPageEnableAuthorBox: SettingKey = "about.page.enable.author_box";
const KeyAboutPageEnablePageContent: SettingKey =
  "about.page.enable.page_content";
const KeyAboutPageEnableSkills: SettingKey = "about.page.enable.skills";
const KeyAboutPageEnableCareers: SettingKey = "about.page.enable.careers";
const KeyAboutPageEnableStatistic: SettingKey = "about.page.enable.statistic";
const KeyAboutPageEnableMapAndInfo: SettingKey =
  "about.page.enable.map_and_info";
const KeyAboutPageEnablePersonality: SettingKey =
  "about.page.enable.personality";
const KeyAboutPageEnablePhoto: SettingKey = "about.page.enable.photo";
const KeyAboutPageEnableMaxim: SettingKey = "about.page.enable.maxim";
const KeyAboutPageEnableBuff: SettingKey = "about.page.enable.buff";
const KeyAboutPageEnableGame: SettingKey = "about.page.enable.game";
const KeyAboutPageEnableComic: SettingKey = "about.page.enable.comic";
const KeyAboutPageEnableLikeTech: SettingKey = "about.page.enable.like_tech";
const KeyAboutPageEnableMusic: SettingKey = "about.page.enable.music";
const KeyAboutPageEnableCustomCode: SettingKey =
  "about.page.enable.custom_code";
const KeyAboutPageEnableComment: SettingKey = "about.page.enable.comment";

const KeyMusicPlayerEnable: SettingKey = "music.player.enable";
const KeyMusicPlayerPlaylistID: SettingKey = "music.player.playlist_id";
const KeyMusicPlayerCustomPlaylist: SettingKey = "music.player.custom_playlist";
const KeyMusicCapsuleCustomPlaylist: SettingKey =
  "music.capsule.custom_playlist";
const KeyMusicAPIBaseURL: SettingKey = "music.api.base_url";
const KeyMusicVinylBackground: SettingKey = "music.vinyl.background";
const KeyMusicVinylOuter: SettingKey = "music.vinyl.outer";
const KeyMusicVinylInner: SettingKey = "music.vinyl.inner";
const KeyMusicVinylNeedle: SettingKey = "music.vinyl.needle";
const KeyMusicVinylGroove: SettingKey = "music.vinyl.groove";

// --- 评论配置 ---
const KeyCommentEnable: SettingKey = "comment.enable";
const KeyCommentLoginRequired: SettingKey = "comment.login_required";
const KeyCommentPageSize: SettingKey = "comment.page_size";
const KeyCommentMasterTag: SettingKey = "comment.master_tag";
const KeyCommentPlaceholder: SettingKey = "comment.placeholder";
const KeyCommentEmojiCDN: SettingKey = "comment.emoji_cdn";
const KeyCommentBloggerEmail: SettingKey = "comment.blogger_email";
const KeyCommentAnonymousEmail: SettingKey = "comment.anonymous_email";
const KeyCommentShowUA: SettingKey = "comment.show_ua";
const KeyCommentShowRegion: SettingKey = "comment.show_region";
const KeyCommentAllowImageUpload: SettingKey = "comment.allow_image_upload";
const KeyCommentLimitPerMinute: SettingKey = "comment.limit_per_minute";
const KeyCommentLimitLength: SettingKey = "comment.limit_length";
const KeyCommentForbiddenWords: SettingKey = "comment.forbidden_words";
const KeyCommentAIDetectEnable: SettingKey = "comment.ai_detect_enable";
const KeyCommentAIDetectAPIURL: SettingKey = "comment.ai_detect_api_url";
const KeyCommentAIDetectAction: SettingKey = "comment.ai_detect_action";
const KeyCommentAIDetectRiskLevel: SettingKey = "comment.ai_detect_risk_level";
const KeyCommentQQAPIURL: SettingKey = "comment.qq_api_url";
const KeyCommentQQAPIKey: SettingKey = "comment.qq_api_key";
const KeyCommentNotifyAdmin: SettingKey = "comment.notify_admin";
const KeyCommentNotifyReply: SettingKey = "comment.notify_reply";
const KeyPushooChannel: SettingKey = "pushoo.channel";
const KeyPushooURL: SettingKey = "pushoo.url";
const KeyWebhookRequestBody: SettingKey = "webhook.request_body";
const KeyWebhookHeaders: SettingKey = "webhook.headers";
const KeyScMailNotify: SettingKey = "sc.mail_notify";
const KeyCommentMailSubject: SettingKey = "comment.mail_subject";
const KeyCommentMailTemplate: SettingKey = "comment.mail_template";
const KeyCommentMailSubjectAdmin: SettingKey = "comment.mail_subject_admin";
const KeyCommentMailTemplateAdmin: SettingKey = "comment.mail_template_admin";

// --- 文件生成及处理配置 ---
const KeyEnableVipsGenerator: SettingKey = "ENABLE_VIPS_GENERATOR";
const KeyVipsPath: SettingKey = "VIPS_PATH";
const KeyVipsSupportedExts: SettingKey = "VIPS_SUPPORTED_EXTS";
const KeyVipsMaxFileSize: SettingKey = "VIPS_MAX_FILE_SIZE";
const KeyEnableMusicCoverGenerator: SettingKey = "ENABLE_MUSIC_COVER_GENERATOR";
const KeyMusicCoverSupportedExts: SettingKey = "MUSIC_COVER_SUPPORTED_EXTS";
const KeyMusicCoverMaxFileSize: SettingKey = "MUSIC_COVER_MAX_FILE_SIZE";
const KeyEnableFfmpegGenerator: SettingKey = "ENABLE_FFMPEG_GENERATOR";
const KeyFfmpegPath: SettingKey = "FFMPEG_PATH";
const KeyFfmpegSupportedExts: SettingKey = "FFMPEG_SUPPORTED_EXTS";
const KeyFfmpegMaxFileSize: SettingKey = "FFMPEG_MAX_FILE_SIZE";
const KeyFfmpegCaptureTime: SettingKey = "FFMPEG_CAPTURE_TIME";
const KeyEnableBuiltinGenerator: SettingKey = "ENABLE_BUILTIN_GENERATOR";
const KeyBuiltinMaxFileSize: SettingKey = "BUILTIN_MAX_FILE_SIZE";
const KeyBuiltinDirectServeExts: SettingKey = "BUILTIN_DIRECT_SERVE_EXTS";

// --- 缩略图生成队列配置 ---
const KeyQueueThumbConcurrency: SettingKey = "QUEUE_THUMB_CONCURRENCY";
const KeyQueueThumbMaxExecTime: SettingKey = "QUEUE_THUMB_MAX_EXEC_TIME";
const KeyQueueThumbBackoffFactor: SettingKey = "QUEUE_THUMB_BACKOFF_FACTOR";
const KeyQueueThumbMaxBackoff: SettingKey = "QUEUE_THUMB_MAX_BACKOFF";
const KeyQueueThumbMaxRetries: SettingKey = "QUEUE_THUMB_MAX_RETRIES";
const KeyQueueThumbRetryDelay: SettingKey = "QUEUE_THUMB_RETRY_DELAY";

// --- 媒体信息提取配置 ---
const KeyEnableExifExtractor: SettingKey = "ENABLE_EXIF_EXTRACTOR";
const KeyExifMaxSizeLocal: SettingKey = "EXIF_MAX_SIZE_LOCAL";
const KeyExifMaxSizeRemote: SettingKey = "EXIF_MAX_SIZE_REMOTE";
const KeyExifUseBruteForce: SettingKey = "EXIF_USE_BRUTE_FORCE";
const KeyEnableMusicExtractor: SettingKey = "ENABLE_MUSIC_EXTRACTOR";
const KeyMusicMaxSizeLocal: SettingKey = "MUSIC_MAX_SIZE_LOCAL";
const KeyMusicMaxSizeRemote: SettingKey = "MUSIC_MAX_SIZE_REMOTE";

// --- 站点敏感或内部配置 (在管理后台使用) ---
const KeyJWTSecret: SettingKey = "JWT_SECRET";
const KeyResetPasswordSubject: SettingKey = "DEFAULT_RESET_PASSWORD_SUBJECT";
const KeyResetPasswordTemplate: SettingKey = "DEFAULT_RESET_PASSWORD_TEMPLATE";
const KeyActivateAccountSubject: SettingKey =
  "DEFAULT_ACTIVATE_ACCOUNT_SUBJECT";
const KeyActivateAccountTemplate: SettingKey =
  "DEFAULT_ACTIVATE_ACCOUNT_TEMPLATE";
const KeyEnableUserActivation: SettingKey = "ENABLE_USER_ACTIVATION";
const KeyEnableRegistration: SettingKey = "ENABLE_REGISTRATION";
const KeySmtpHost: SettingKey = "SMTP_HOST";
const KeySmtpPort: SettingKey = "SMTP_PORT";
const KeySmtpUsername: SettingKey = "SMTP_USERNAME";
const KeySmtpPassword: SettingKey = "SMTP_PASSWORD";
const KeySmtpSenderName: SettingKey = "SMTP_SENDER_NAME";
const KeySmtpSenderEmail: SettingKey = "SMTP_SENDER_EMAIL";
const KeySmtpReplyToEmail: SettingKey = "SMTP_REPLY_TO_EMAIL";
const KeySmtpForceSSL: SettingKey = "SMTP_FORCE_SSL";
const KeyIPAPI: SettingKey = "IP_API";
const KeyIPAPIToKen: SettingKey = "IP_API_TOKEN";

// --- CDN缓存清除配置 ---
const KeyCDNEnable: SettingKey = "cdn.enable";
const KeyCDNProvider: SettingKey = "cdn.provider";
const KeyCDNSecretID: SettingKey = "cdn.secret_id";
const KeyCDNSecretKey: SettingKey = "cdn.secret_key";
const KeyCDNRegion: SettingKey = "cdn.region";
const KeyCDNDomain: SettingKey = "cdn.domain";
const KeyCDNZoneID: SettingKey = "cdn.zone_id";
const KeyCDNBaseUrl: SettingKey = "cdn.baseUrl";

// --- 相册页面配置 ---
const KeyAlbumPageBannerBackground: SettingKey = "album.banner.background";
const KeyAlbumPageBannerTitle: SettingKey = "album.banner.title";
const KeyAlbumPageBannerDescription: SettingKey = "album.banner.description";
const KeyAlbumPageBannerTip: SettingKey = "album.banner.tip";
const KeyAlbumPageLayoutMode: SettingKey = "album.layout_mode";
const KeyAlbumPageWaterfallColumnCount: SettingKey =
  "album.waterfall.column_count";
const KeyAlbumPageWaterfallGap: SettingKey = "album.waterfall.gap";
const KeyAlbumPageSize: SettingKey = "album.page_size";
const KeyAlbumPageEnableComment: SettingKey = "album.enable_comment";
const KeyAlbumApiURL: SettingKey = "album.api_url";
const KeyAlbumDefaultThumbParam: SettingKey = "album.default_thumb_param";
const KeyAlbumDefaultBigParam: SettingKey = "album.default_big_param";

const DEFAULT_CHUNK_SIZE = 50 * 1024 * 1024;

/**
 * 将所有常量组合到一个对象中导出
 */
export const constant = {
  // --- 站点基础配置 ---
  KeyAppName,
  KeySubTitle,
  KeySiteURL,
  KeyAppVersion,
  KeyApiURL,
  KeyAboutLink,
  KeyIcpNumber,
  KeyPoliceRecordNumber,
  KeyPoliceRecordIcon,
  KeySiteKeywords,
  KeySiteDescription,
  KeyUserAvatar,
  KeyLogoURL,
  KeyLogoURL192,
  KeyLogoURL512,
  KeyLogoHorizontalDay,
  KeyLogoHorizontalNight,
  KeyIconURL,
  KeyDefaultThumbParam,
  KeyDefaultBigParam,
  KeyGravatarURL,
  KeyDefaultGravatarType,
  KeyThemeColor,
  KeySiteAnnouncement,
  KeyCustomHeaderHTML,
  KeyCustomFooterHTML,
  KeyCustomCSS,
  KeyCustomJS,
  KeyCustomSidebar,
  KeyCustomPostTopHTML,
  KeyCustomPostBottomHTML,
  KeyDefaultThemeMode,
  KeyUploadAllowedExtensions,
  KeyUploadDeniedExtensions,
  KeyEnableExternalLinkWarning,

  // --- Header/Nav 配置 ---
  KeyHeaderMenu,
  KeyHeaderNavTravel,
  KeyHeaderNavClock,
  KeyHeaderNavMenu,
  KeyHomeTop,
  KeyCreativity,

  // --- 页面一图流配置 ---
  KeyPageOneImageConfig,
  KeyHitokotoAPI,
  KeyTypingSpeed,

  // --- Sidebar 配置 ---
  KeySidebarAuthorEnable,
  KeySidebarAuthorDescription,
  KeySidebarAuthorStatusImg,
  KeySidebarAuthorSkills,
  KeySidebarAuthorSocial,
  KeySidebarWechatEnable,
  KeySidebarWechatFace,
  KeySidebarWechatBackFace,
  KeySidebarWechatBlurredBackground,
  KeySidebarWechatLink,
  KeySidebarTagsEnable,
  KeySidebarTagsHighlight,
  KeySidebarSiteInfoTotalPostCount,
  KeySidebarSiteInfoRuntimeEnable,
  KeySidebarSiteInfoTotalWordCount,
  KeySidebarArchiveDisplayMonths,
  KeySidebarCustomShowInPost,
  KeySidebarTocCollapseMode,
  KeySidebarSeriesPostCount,

  // --- 前台及页脚配置 ---
  KeyFrontDeskSiteOwnerName,
  KeyFrontDeskSiteOwnerEmail,
  KeyFooterOwnerName,
  KeyFooterOwnerSince,
  KeyFooterCustomText,
  KeyFooterRuntimeEnable,
  KeyFooterRuntimeLaunchTime,
  KeyFooterRuntimeWorkImg,
  KeyFooterRuntimeWorkDesc,
  KeyFooterRuntimeOffDutyImg,
  KeyFooterRuntimeOffDutyDesc,
  KeyFooterSocialBarCenterImg,
  KeyFooterListRandomFriends,
  KeyFooterBarAuthorLink,
  KeyFooterBarCCLink,
  KeyFooterBadgeEnable,
  KeyFooterBadge,
  KeyFooterSocialBarLeft,
  KeyFooterSocialBarRight,
  KeyFooterList,
  KeyFooterBarLinkList,

  // --- Uptime Kuma 状态监控配置 ---
  KeyFooterUptimeKumaEnable,
  KeyFooterUptimeKumaPageURL,

  // 友链配置
  KeyFriendLinkDefaultCategory,
  KeyFriendLinkApplyCondition,
  KeyFriendLinkApplyCustomCode,
  KeyFriendLinkApplyCustomCodeHtml,
  KeyFriendLinkPlaceholderName,
  KeyFriendLinkPlaceholderURL,
  KeyFriendLinkPlaceholderLogo,
  KeyFriendLinkPlaceholderDescription,
  KeyFriendLinkPlaceholderSiteshot,
  KeyFriendLinkNotifyAdmin,
  KeyFriendLinkPushooChannel,
  KeyFriendLinkPushooURL,
  KeyFriendLinkWebhookRequestBody,
  KeyFriendLinkWebhookHeaders,
  KeyFriendLinkScMailNotify,
  KeyFriendLinkMailSubjectAdmin,
  KeyFriendLinkMailTemplateAdmin,
  KeyFriendLinkReviewMailEnable,
  KeyFriendLinkReviewMailSubjectApproved,
  KeyFriendLinkReviewMailTemplateApproved,
  KeyFriendLinkReviewMailSubjectRejected,
  KeyFriendLinkReviewMailTemplateRejected,

  // --- 文章配置 ---
  KeyDefaultCover,
  KeyDoubleColumn,
  KeyPostDefaultPageSize,
  Key404PageDefaultImage,
  KeyPostRewardEnable,
  KeyPostRewardWeChatQR,
  KeyPostRewardAlipayQR,
  KeyPostRewardWeChatEnable,
  KeyPostRewardAlipayEnable,
  KeyPostRewardButtonText,
  KeyPostRewardTitle,
  KeyPostRewardWeChatLabel,
  KeyPostRewardAlipayLabel,
  KeyPostRewardListButtonText,
  KeyPostRewardListButtonDesc,
  KeyPostExpirationTime,
  KeyPostCodeBlockCodeMaxLines,
  KeyPostCodeBlockMacStyle,

  // 文章复制版权配置
  KeyPostCopyEnable,
  KeyPostCopyCopyrightEnable,
  KeyPostCopyCopyrightOriginal,
  KeyPostCopyCopyrightReprint,

  // 文章目录 Hash 更新配置
  KeyPostTocHashUpdateMode,

  // 文章页面波浪区域配置
  KeyPostWavesEnable,

  // 文章底部版权声明配置
  KeyPostCopyrightOriginalTemplate,
  KeyPostCopyrightReprintTemplateWithUrl,
  KeyPostCopyrightReprintTemplateWithoutUrl,

  // 文章订阅配置
  KeyPostSubscribeEnable,
  KeyPostSubscribeButtonText,
  KeyPostSubscribeDialogTitle,
  KeyPostSubscribeDialogDesc,
  KeyPostSubscribeMailSubject,
  KeyPostSubscribeMailTemplate,

  // --- 装备页面配置 ---
  KeyPostEquipmentBannerBackground,
  KeyPostEquipmentBannerTitle,
  KeyPostEquipmentBannerDescription,
  KeyPostEquipmentBannerTip,
  KeyPostEquipmentList,

  // --- 最近评论页面配置 ---
  KeyRecentCommentsBannerBackground,
  KeyRecentCommentsBannerTitle,
  KeyRecentCommentsBannerDescription,
  KeyRecentCommentsBannerTip,

  // --- 关于页面配置 ---
  KeyAboutPageName,
  KeyAboutPageDescription,
  KeyAboutPageAvatarImg,
  KeyAboutPageSubtitle,
  KeyAboutPageAvatarSkillsLeft,
  KeyAboutPageAvatarSkillsRight,
  KeyAboutPageAboutSiteTips,
  KeyAboutPageMap,
  KeyAboutPageSelfInfo,
  KeyAboutPagePersonalities,
  KeyAboutPageMaxim,
  KeyAboutPageBuff,
  KeyAboutPageGame,
  KeyAboutPageComic,
  KeyAboutPageLike,
  KeyAboutPageMusic,
  KeyAboutPageCareers,
  KeyAboutPageSkillsTips,
  KeyAboutPageStatisticsBackground,
  KeyAboutPageCustomCode,
  KeyAboutPageCustomCodeHtml,

  // --- 关于页面板块开关配置 ---
  KeyAboutPageEnableAuthorBox,
  KeyAboutPageEnablePageContent,
  KeyAboutPageEnableSkills,
  KeyAboutPageEnableCareers,
  KeyAboutPageEnableStatistic,
  KeyAboutPageEnableMapAndInfo,
  KeyAboutPageEnablePersonality,
  KeyAboutPageEnablePhoto,
  KeyAboutPageEnableMaxim,
  KeyAboutPageEnableBuff,
  KeyAboutPageEnableGame,
  KeyAboutPageEnableComic,
  KeyAboutPageEnableLikeTech,
  KeyAboutPageEnableMusic,
  KeyAboutPageEnableCustomCode,
  KeyAboutPageEnableComment,

  KeyMusicPlayerEnable,
  KeyMusicPlayerPlaylistID,
  KeyMusicPlayerCustomPlaylist,
  KeyMusicCapsuleCustomPlaylist,
  KeyMusicAPIBaseURL,
  KeyMusicVinylBackground,
  KeyMusicVinylOuter,
  KeyMusicVinylInner,
  KeyMusicVinylNeedle,
  KeyMusicVinylGroove,

  // --- 评论配置 ---
  KeyCommentEnable,
  KeyCommentLoginRequired,
  KeyCommentPageSize,
  KeyCommentMasterTag,
  KeyCommentPlaceholder,
  KeyCommentEmojiCDN,
  KeyCommentBloggerEmail,
  KeyCommentAnonymousEmail,
  KeyCommentShowUA,
  KeyCommentShowRegion,
  KeyCommentAllowImageUpload,
  KeyCommentLimitPerMinute,
  KeyCommentLimitLength,
  KeyCommentForbiddenWords,
  KeyCommentAIDetectEnable,
  KeyCommentAIDetectAPIURL,
  KeyCommentAIDetectAction,
  KeyCommentAIDetectRiskLevel,
  KeyCommentQQAPIURL,
  KeyCommentQQAPIKey,
  KeyCommentNotifyAdmin,
  KeyCommentNotifyReply,
  KeyPushooChannel,
  KeyPushooURL,
  KeyWebhookRequestBody,
  KeyWebhookHeaders,
  KeyScMailNotify,
  KeyCommentMailSubject,
  KeyCommentMailTemplate,
  KeyCommentMailSubjectAdmin,
  KeyCommentMailTemplateAdmin,

  // --- 文件生成及处理配置 ---
  KeyEnableVipsGenerator,
  KeyVipsPath,
  KeyVipsSupportedExts,
  KeyVipsMaxFileSize,
  KeyEnableMusicCoverGenerator,
  KeyMusicCoverSupportedExts,
  KeyMusicCoverMaxFileSize,
  KeyEnableFfmpegGenerator,
  KeyFfmpegPath,
  KeyFfmpegSupportedExts,
  KeyFfmpegMaxFileSize,
  KeyFfmpegCaptureTime,
  KeyEnableBuiltinGenerator,
  KeyBuiltinMaxFileSize,
  KeyBuiltinDirectServeExts,

  // --- 缩略图生成队列配置 ---
  KeyQueueThumbConcurrency,
  KeyQueueThumbMaxExecTime,
  KeyQueueThumbBackoffFactor,
  KeyQueueThumbMaxBackoff,
  KeyQueueThumbMaxRetries,
  KeyQueueThumbRetryDelay,

  // --- 媒体信息提取配置 ---
  KeyEnableExifExtractor,
  KeyExifMaxSizeLocal,
  KeyExifMaxSizeRemote,
  KeyExifUseBruteForce,
  KeyEnableMusicExtractor,
  KeyMusicMaxSizeLocal,
  KeyMusicMaxSizeRemote,

  // --- 站点敏感或内部配置 ---
  KeyJWTSecret,
  KeyResetPasswordSubject,
  KeyResetPasswordTemplate,
  KeyActivateAccountSubject,
  KeyActivateAccountTemplate,
  KeyEnableUserActivation,
  KeyEnableRegistration,
  KeySmtpHost,
  KeySmtpPort,
  KeySmtpUsername,
  KeySmtpPassword,
  KeySmtpSenderName,
  KeySmtpSenderEmail,
  KeySmtpReplyToEmail,
  KeySmtpForceSSL,
  KeyIPAPI,
  KeyIPAPIToKen,

  // --- CDN缓存清除配置 ---
  KeyCDNEnable,
  KeyCDNProvider,
  KeyCDNSecretID,
  KeyCDNSecretKey,
  KeyCDNRegion,
  KeyCDNDomain,
  KeyCDNZoneID,
  KeyCDNBaseUrl,

  // --- 相册页面配置 ---
  KeyAlbumPageBannerBackground,
  KeyAlbumPageBannerTitle,
  KeyAlbumPageBannerDescription,
  KeyAlbumPageBannerTip,
  KeyAlbumPageLayoutMode,
  KeyAlbumPageWaterfallColumnCount,
  KeyAlbumPageWaterfallGap,
  KeyAlbumPageSize,
  KeyAlbumPageEnableComment,
  KeyAlbumApiURL,
  KeyAlbumDefaultThumbParam,
  KeyAlbumDefaultBigParam,

  // --- 其他 ---
  DEFAULT_CHUNK_SIZE
};

// Updated: 2025-10-30 - Added KeyAboutPageCustomCode and KeyAboutPageCustomCodeHtml
