    (() => {
      const root = document.documentElement;
      const header = document.getElementById('siteHeader');
      const brand = document.querySelector('.brand');
      const themeToggle = document.getElementById('themeToggle');
      const languageSelect = document.getElementById('languageSelect');
      const menuToggle = document.getElementById('menuToggle');
      const navLinks = document.getElementById('navLinks');
      const backTop = document.getElementById('backTop');
      const toast = document.getElementById('toast');
      const passportToggle = document.getElementById('passportToggle');
      const passportPanel = document.getElementById('passportPanel');
      const passportClose = document.getElementById('passportClose');
      const passportCount = document.getElementById('passportCount');
      const passportCollectedStat = document.getElementById('passportCollectedStat');
      const appearancePanel = document.getElementById('appearancePanel');
      const appearanceClose = document.getElementById('appearanceClose');
      const appearanceReset = document.getElementById('appearanceReset');
      const themeChoices = [...document.querySelectorAll('[data-theme-choice]')];
      const paletteChoices = [...document.querySelectorAll('[data-palette-choice]')];
      const backgroundChoices = [...document.querySelectorAll('[data-background-choice]')];
      const galleryLightbox = document.getElementById('galleryLightbox');
      const lightboxCard = document.getElementById('lightboxCard');
      const lightboxImage = document.getElementById('lightboxImage');
      const lightboxCaption = document.getElementById('lightboxCaption');
      const lightboxCounter = document.getElementById('lightboxCounter');
      const lightboxClose = document.getElementById('lightboxClose');
      const lightboxPrevious = document.getElementById('lightboxPrevious');
      const lightboxNext = document.getElementById('lightboxNext');
      const galleryButtons = [...document.querySelectorAll('[data-gallery-src]')];
      const momentsViewAll = document.getElementById('momentsViewAll');
      const momentsModal = document.getElementById('momentsModal');
      const momentsModalCard = document.getElementById('momentsModalCard');
      const momentsModalClose = document.getElementById('momentsModalClose');
      const visitorCard = document.getElementById('visitorCard');
      const visitorCardClose = document.getElementById('visitorCardClose');
      const visitorSubtitle = document.getElementById('visitorSubtitle');
      const visitorSystem = document.getElementById('visitorSystem');
      const visitorBrowser = document.getElementById('visitorBrowser');
      const visitorLanguage = document.getElementById('visitorLanguage');
      const visitorIp = document.getElementById('visitorIp');
      const visitorEdge = document.getElementById('visitorEdge');
      const visitorDate = document.getElementById('visitorDate');
      const notePaper = document.getElementById('notePaper');
      const noteIndex = document.getElementById('noteIndex');
      const noteButton = document.getElementById('noteButton');
      const voyageNow = document.getElementById('voyageNow');
      const voyageNext = document.getElementById('voyageNext');
      const installApp = document.getElementById('installApp');
      const musicShell = document.getElementById('musicShell');
      const musicPanel = document.getElementById('musicPanel');
      const musicToggle = document.getElementById('musicToggle');
      const musicClose = document.getElementById('musicClose');
      const musicAudio = document.getElementById('musicAudio');
      const musicPlay = document.getElementById('musicPlay');
      const musicPrevious = document.getElementById('musicPrevious');
      const musicNext = document.getElementById('musicNext');
      const musicShuffle = document.getElementById('musicShuffle');
      const musicRepeat = document.getElementById('musicRepeat');
      const musicVolume = document.getElementById('musicVolume');
      const musicVolumeValue = document.getElementById('musicVolumeValue');
      const musicMute = document.getElementById('musicMute');
      const musicTitle = document.getElementById('musicTitle');
      const musicTime = document.getElementById('musicTime');
      const musicProgress = document.getElementById('musicProgress');
      const musicNote = document.getElementById('musicNote');
      const musicTracks = [...document.querySelectorAll('.music-track')];
      const musicList = document.getElementById('musicList');
      const musicViewButtons = [...document.querySelectorAll('.music-view-button')];
      const lyricsPanel = document.getElementById('lyricsPanel');
      const lyricsEmpty = document.getElementById('lyricsEmpty');
      const lyricsLines = document.getElementById('lyricsLines');
      const floatingLyrics = document.getElementById('floatingLyrics');
      const floatingLyricsToggle = document.getElementById('floatingLyricsToggle');
      const floatingLyricsToggleText = document.getElementById('floatingLyricsToggleText');
      const floatingLyricCurrent = document.getElementById('floatingLyricCurrent');
      const floatingLyricNext = document.getElementById('floatingLyricNext');
      const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
      let toastTimer;
      let currentLanguage = root.dataset.language === 'en' ? 'en' : 'zh';
      let currentGalleryIndex = 0;
      let galleryTouchStartX = 0;
      let galleryTouchStartY = 0;
      let galleryReturnFocus = null;
      let momentsReturnFocus = null;
      let visitorTraceState = 'loading';
      let visitorTrace = { ip: '', loc: '', colo: '' };
      let visitorShowTimer;

      const translations = {
        zh: {
          pageTitle: '千屿浅咲 · Chisa Wiki',
          pageDescription: '千屿浅咲的个人主页：公开服务状态、客户端使用说明、VPS 探针与常用网络工具。',
          skip: '跳到主要内容', navMoments: '动态', navStatus: '状态', navTutorial: '教程', navTools: '导航', navAbout: '关于', languageLabel: '页面语言',
          heroHello: '你好，这里是浅咲。这个页面放着我常用的入口、', heroNode: '节点使用说明', heroTail: '，还有平时折腾服务器会用到的小工具。',
          heroServer: '我的服务器', heroTutorial: '怎么导入订阅',
          quickStatusTitle: '服务怎么样', quickStatusDesc: '主页和 VPS 公开状态', quickGuideTitle: '客户端怎么用', quickContactTitle: '在 Telegram 找我',
          momentsTitle: '浅咲的 Moments', momentsDesc: '一些不需要单独写成文章的小事：最近去了哪里、听了什么，也把小站改了什么。',
          moment1Title: '小站又多了一间房', moment1Text: '把动态、相册和外观设置整理进来了。功能多一点，但还是要给页面留些能呼吸的地方。',
          moment2Title: '从演唱会回家', moment2Text: '跨越千里，热闹了三天。回程突然安静下来，才发现那段共鸣还留在耳边。',
          moment3Title: '公开版本只留文件清单', moment3Text: '音乐和歌词不会随公开仓库发布；放入已授权的同名文件后，播放器才会启用。',
          moment4Title: '给旧照片补上名字', moment4Text: '把散落在文件夹里的旅途照片重新排好，也给每一段光线留了一个容易记住的标题。',
          moment5Title: '夜航模式开始试运行', moment5Text: '深色页面终于有了合适的墨色和粉色，夜里打开时不会再显得太亮。',
          moment6Title: '把常用入口收进主页', moment6Text: '状态页、联系方式和网络工具各自找到位置，从这里出发就不用再翻许多书签。',
          viewAllMoments: '查看所有 Moments ↗', momentsArchiveTitle: '浅咲的所有 Moments', momentsArchiveDesc: '从最近一次更新开始，依次收好生活、旅行、音乐和小站留下的片段。', closeMoments: '关闭所有动态',
          previousImage: '上一张图片', nextImage: '下一张图片',
          galleryTitle: 'CHISA GALLERY / 千咲图库', galleryAutumn: '秋日河畔', galleryStarlit: '星河游园', galleryCraft: '午后手作', gallerySky: '晴空高台', galleryBlossoms: '花影之间', galleryHint: '当前使用空白占位图；替换为已授权的同名文件即可恢复图库。',
          contactTitle: '来这里找浅咲', contactDesc: '公开联系方式集中放在这里，节点和订阅仍然只通过私人渠道发送。', contactTelegram: '直接私聊', contactNodeSeek: '社区主页', contactStatus: '服务器状态',
          statusTitle: '公开状态', statusDesc: '这里只放访客可以看的内容。节点、订阅和后台地址不会出现在主页。',
          statusHome: '个人主页', statusHomeDesc: 'www.chisa.wiki · 你现在看到的页面', statusVps: 'VPS 公开探针', statusVpsDesc: '在线状态、资源和基础连通性', open: '打开',
          statusSub: '订阅和节点', statusSubDesc: '仅限已经获得授权的设备', privateTitle: '这些不放在主页', privateDesc: '需要用到时，我会通过私人渠道单独发送。',
          privateIp: '服务器 IP', privatePanel: '管理面板', privateSub: '完整订阅链接', privateKey: '节点参数和密钥',
          tutorialTitle: '客户端教程', tutorialDesc: '点一下完成的步骤可以做标记。它只记在你的浏览器里，不会上传。',
          clashIntro: 'Windows、Android 和 Linux 都适用。日常使用建议选择规则模式。',
          c1Title: '打开配置页面', c1Desc: '进入「配置」「Profiles」或「订阅」。',
          c2Title: '选择从 URL 导入', c2Desc: '点击「新建配置」或「Import from URL」。',
          c3Title: '粘贴私有订阅链接', c3Desc: '保存后等客户端把配置下载完成。',
          c4Title: '启用刚导入的配置', c4Desc: '回到配置列表，选中新的配置。',
          c5Title: '选择规则模式', c5Desc: '排查问题时再临时切换到全局模式。',
          c6Title: '开启代理并检查出口', c6Desc: '打开系统代理或 TUN，再查询当前 IP。',
          clashTipTitle: '遇到节点没更新：', clashTipDesc: '先手动刷新订阅，不用重复添加同一个链接。',
          shadowIntro: '适合 iPhone 和 iPad，可以添加订阅，也可以导入单个节点。',
          s1Title: '点击右上角加号', s1Desc: '在 Shadowrocket 首页点击「+」。',
          s2Title: '类型选择 Subscribe', s2Desc: '中文界面对应「订阅」。',
          s3Title: '填写链接和备注', s3Desc: '粘贴私有链接，备注可以写 Chisa。',
          s4Title: '保存并选择节点', s4Desc: '回到首页，选择需要使用的节点。',
          s5Title: '允许添加 VPN 配置', s5Desc: '第一次打开开关时，按系统提示允许。',
          s6Title: '检查连接结果', s6Desc: '连接后查询 IP，确认出口和分流是否正确。',
          shadowTipTitle: '日常使用：', shadowTipDesc: '保持配置为规则模式，国内应用就不会全部经过代理。',
          toolsTitle: '常用入口', toolsDesc: '社区、联系方式、探针和网络检测。用分类或关键词都可以找。',
          filterAll: '全部', filterCommunity: '社区', filterStatus: '状态', filterNetwork: '网络', searchPlaceholder: '搜索入口',
          nodeSeekTitle: 'NodeSeek 个人主页', nodeSeekDesc: '我的 NodeSeek 社区主页和公开动态。', nodeSeekLink: '打开主页 ↗',
          telegramTitle: 'Telegram 私聊', telegramDesc: '直接联系我：@Laurenlch', telegramLink: '发起私聊 ↗', copyUsername: '复制用户名',
          vpsTitle: 'VPS 公开探针', vpsDesc: '查看服务器在线状态和基础连通性。', vpsLink: '查看探针 ↗',
          ipTitle: 'IP 查询', ipDesc: '查看当前出口 IP、ASN 和地区。', ipLink: '开始查询 ↗',
          dnsTitle: 'DNS 检测', dnsDesc: '检查域名解析是否已经在各地生效。', dnsLink: '检查解析 ↗',
          speedTitle: '网络测速', speedDesc: '快速查看当前网络的下载速度。', speedLink: '开始测速 ↗', emptyTools: '没找到这个入口，换个关键词试试。',
          aboutTitle: '关于这里', aboutQuote: '不做什么宏大叙事，只是想把自己常用的东西放整齐。',
          about1Title: '一个静态页面', about1Desc: '打开快，也没有复杂依赖。', about2Title: '白天和夜晚', about2Desc: '可以跟随系统，也可以自己切换。', about3Title: '只放公开内容', about3Desc: '节点、后台和密钥留在私人渠道。',
          noteBoxTitle: "CHISA'S NOTEBOX / 浅咲的纸条盒", drawNote: '再抽一张纸条', voyageLogTitle: 'VOYAGE LOG / 小站航行日志', installApp: '安装到设备',
          passportTitle: '访客护照', passportIntro: '印章只保存在你的浏览器里。逛一逛，看看能收集到几枚。', passportBio: '喜欢数码和服务器，也在慢慢把这个小站收拾成自己喜欢的样子。', passportNotes: '纸条', passportTracks: '媒体位', passportStamps: '印章', passportMessage: 'Telegram 找我 ↗', passportContact: '全部联系方式 ↓', openPassport: '打开访客护照', closePassport: '收起访客护照',
          appearanceTitle: '页面外观', appearanceButton: '外观', appearanceMode: 'MODE / 明暗模式', appearanceLight: '日间', appearanceDark: '夜间', appearancePalette: 'COLORS / 浅粉配色', paletteAsaki: '浅咲粉', paletteSakura: '樱雾', paletteBerry: '暮莓', palettePeach: '杏粉', appearanceBackground: 'BACKGROUND / 页面底纹', appearanceLocalNote: '这些选择只会保存在当前设备，不会上传。', backgroundDots: '点阵', backgroundGrid: '方格', backgroundPlain: '素纸', backgroundPetals: '花瓣', appearanceReset: '恢复默认外观', openAppearance: '打开外观设置', closeAppearance: '收起外观设置', appearanceSaved: '外观已保存在这台设备', appearanceResetDone: '已恢复默认外观', closeImage: '关闭图片',
          visitorTitle: '访客', visitorGreeting: '欢迎来到千屿浅咲的小站。', visitorSystemLabel: '系统', visitorBrowserLabel: '浏览器', visitorLanguageLabel: '语言', visitorIpLabel: '公网 IP', visitorEdgeLabel: '接入节点', visitorDateLabel: '日期', visitorPrivacy: '这张卡片只在你的浏览器中整理显示，不会通过此卡片另行提交给页面主人；托管服务仍可能保留常规访问日志。', visitorClose: '关闭访客信息', visitorLoading: '正在读取…', visitorUnavailable: '暂不可用', visitorLocalPreview: '本地预览', visitorLocalSubtitle: 'LOCAL PREVIEW', visitorBrowserOnly: 'BROWSER ONLY',
          stampArrival: '初次抵达', stampArrivalHint: '打开浅咲的小站', stampRadio: '电台听众', stampRadioHint: '打开一次播放列表', stampGuide: '教程巡游', stampGuideHint: '抵达客户端教程', stampVoyage: '夜航许可', stampVoyageHint: '发现隐藏的夜航模式', stampFinale: '读到最后', stampFinaleHint: '抵达关于这里', stampUnlocked: '获得新印章：',
          voyageOn: '夜航模式已开启。星星正在缓慢经过。', voyageOff: '夜航结束，已经返回日常页面。', appInstalled: '小站已安装到设备。',
          progress: '已完成', themeDark: '切到夜间模式了', themeLight: '切回日间模式了', themeLabel: '打开外观设置', copied: '已复制', copyFail: '复制失败，请手动复制', openMenu: '打开导航菜单', closeMenu: '关闭导航菜单', backTop: '回到顶部',
          musicPanelTitle: '浅咲的播放列表', nowPlaying: 'NOW PLAYING / 正在播放', musicProgress: '播放进度', musicReady: '媒体资源未包含在公开仓库中，请按目录说明放入已授权文件。',
          musicOmittedTitle: '媒体资源未包含', voyageMediaOmitted: '公开版本未附带音乐', voyageMediaHint: '按目录说明放入已授权文件',
          musicListTab: '播放列表', musicLyricsTab: '歌词', lyricsPending: '歌词未包含在公开仓库中。\n请按 lyrics/README.md 放入已授权文件。', floatingLyricsLabel: '浮动歌词', floatingLyricsOn: 'ON', floatingLyricsOff: 'OFF', floatingLyricsEnabled: '浮动歌词已开启', floatingLyricsDisabled: '浮动歌词已关闭', floatingLyricsLoading: '歌词准备中',
          openPlaylist: '打开播放列表', closePlaylist: '收起播放列表', previousTrack: '上一首', nextTrack: '下一首', playMusic: '播放', pauseMusic: '暂停', musicPlaying: '正在播放', musicPaused: '音乐已暂停', musicBlocked: '浏览器暂未允许播放，请再次点击播放按钮。', musicUnavailable: '音频未包含在公开版本中', musicVolume: '音量', shuffleMusic: '随机播放', repeatMusic: '单曲循环', muteMusic: '静音', unmuteMusic: '恢复音量'
        },
        en: {
          pageTitle: 'Chisa Asaki · Chisa Wiki',
          pageDescription: 'Chisa Asaki’s personal homepage for public service status, client guides, VPS monitoring and network tools.',
          skip: 'Skip to content', navMoments: 'Moments', navStatus: 'Status', navTutorial: 'Guides', navTools: 'Links', navAbout: 'About', languageLabel: 'Page language',
          heroHello: "Hi, I'm Chisa. This page keeps my usual links, ", heroNode: 'client setup notes', heroTail: ', and a few tools I use when working on servers.',
          heroServer: 'View server status', heroTutorial: 'Import a subscription',
          quickStatusTitle: 'Service status', quickStatusDesc: 'Homepage and public VPS status', quickGuideTitle: 'Client setup guides', quickContactTitle: 'Find me on Telegram',
          momentsTitle: "Chisa's Moments", momentsDesc: "Small things that do not need a whole post—where I've been, what I've heard, and what changed around the site.",
          moment1Title: 'Another room for this little site', moment1Text: 'Moments, a gallery and appearance settings are now in place. More features, but still enough room to breathe.',
          moment2Title: 'Home from the concert', moment2Text: 'I crossed a long distance for three lively days. The ride home went quiet, but that resonance was still in my ears.',
          moment3Title: 'The public version keeps file slots only', moment3Text: 'Music and lyrics are not distributed with the public repository. The player is enabled only after licensed files are supplied.',
          moment4Title: 'Giving old photos their names', moment4Text: 'I sorted the travel photos that had been scattered across folders and gave each piece of light an easy-to-remember title.',
          moment5Title: 'Night voyage enters testing', moment5Text: 'The dark page finally found the right balance of ink and pink, so it no longer feels too bright after sunset.',
          moment6Title: 'Bringing useful links home', moment6Text: 'Status, contact and network tools each found a place here, saving a long search through bookmarks.',
          viewAllMoments: 'VIEW ALL MOMENTS ↗', momentsArchiveTitle: "All of Chisa's Moments", momentsArchiveDesc: 'Life, travel, music and site notes, kept in reverse chronological order.', closeMoments: 'Close all moments',
          previousImage: 'Previous image', nextImage: 'Next image',
          galleryTitle: 'TRAVEL GALLERY', galleryAutumn: 'Autumn Riverside', galleryStarlit: 'Starlit City', galleryCraft: 'Afternoon Craft', gallerySky: 'Under a Blue Sky', galleryBlossoms: 'Among the Blossoms', galleryHint: 'Blank placeholders are included. Replace them with licensed files using the same names.',
          contactTitle: 'Find Chisa here', contactDesc: 'Public contact links are collected here. Nodes and subscriptions still travel through private channels only.', contactTelegram: 'Message me', contactNodeSeek: 'Community profile', contactStatus: 'Server status',
          statusTitle: 'Public status', statusDesc: 'Only visitor-safe information lives here. Nodes, subscriptions and admin addresses stay private.',
          statusHome: 'Personal homepage', statusHomeDesc: 'www.chisa.wiki · the page you are viewing', statusVps: 'Public VPS monitor', statusVpsDesc: 'Availability, resources and basic connectivity', open: 'Open',
          statusSub: 'Subscriptions and nodes', statusSubDesc: 'For authorized devices only', privateTitle: 'Not published here', privateDesc: 'When needed, I send these through a private channel.',
          privateIp: 'Server IP addresses', privatePanel: 'Admin panels', privateSub: 'Full subscription URLs', privateKey: 'Node parameters and keys',
          tutorialTitle: 'Client guides', tutorialDesc: 'Click a finished step to mark it. Progress stays in this browser and is never uploaded.',
          clashIntro: 'For Windows, Android and Linux. Rule mode is recommended for everyday use.',
          c1Title: 'Open the profiles page', c1Desc: 'Go to Profiles, Configurations or Subscriptions.',
          c2Title: 'Choose import from URL', c2Desc: 'Select New Profile or Import from URL.',
          c3Title: 'Paste the private URL', c3Desc: 'Save it and wait for the client to download the profile.',
          c4Title: 'Activate the new profile', c4Desc: 'Return to the profile list and select the new one.',
          c5Title: 'Select Rule mode', c5Desc: 'Use Global mode temporarily only when troubleshooting.',
          c6Title: 'Enable the proxy and check', c6Desc: 'Turn on system proxy or TUN, then check your public IP.',
          clashTipTitle: 'Nodes not updated? ', clashTipDesc: 'Refresh the subscription first instead of adding the same URL again.',
          shadowIntro: 'For iPhone and iPad. You can add a subscription or import a single node.',
          s1Title: 'Tap the plus button', s1Desc: 'Open Shadowrocket and tap “+” in the top-right corner.',
          s2Title: 'Choose Subscribe', s2Desc: 'Select Subscribe as the entry type.',
          s3Title: 'Enter the URL and note', s3Desc: 'Paste the private URL and use Chisa as the note if you like.',
          s4Title: 'Save and choose a node', s4Desc: 'Return to the home screen and select the node you want.',
          s5Title: 'Allow the VPN profile', s5Desc: 'Approve the system VPN prompt the first time you connect.',
          s6Title: 'Check the connection', s6Desc: 'Check your public IP and confirm that routing works as expected.',
          shadowTipTitle: 'For daily use: ', shadowTipDesc: 'Keep the configuration in Rule mode so local apps do not all use the proxy.',
          toolsTitle: 'Useful links', toolsDesc: 'Community, contact, monitoring and network checks. Filter or search to find one.',
          filterAll: 'ALL', filterCommunity: 'COMMUNITY', filterStatus: 'STATUS', filterNetwork: 'NETWORK', searchPlaceholder: 'Search links',
          nodeSeekTitle: 'NodeSeek profile', nodeSeekDesc: 'My NodeSeek profile and public activity.', nodeSeekLink: 'Open profile ↗',
          telegramTitle: 'Telegram', telegramDesc: 'Message me directly: @Laurenlch', telegramLink: 'Start a chat ↗', copyUsername: 'Copy username',
          vpsTitle: 'Public VPS monitor', vpsDesc: 'Check server availability and basic connectivity.', vpsLink: 'Open monitor ↗',
          ipTitle: 'IP lookup', ipDesc: 'Check your current public IP, ASN and location.', ipLink: 'Check IP ↗',
          dnsTitle: 'DNS checker', dnsDesc: 'Check whether DNS records have propagated worldwide.', dnsLink: 'Check DNS ↗',
          speedTitle: 'Speed test', speedDesc: 'Quickly check the download speed of your current connection.', speedLink: 'Start test ↗', emptyTools: 'No matching link. Try another keyword.',
          aboutTitle: 'About this place', aboutQuote: 'Nothing grand—just a tidy place for the things I use often.',
          about1Title: 'A static page', about1Desc: 'Fast to open, with no complex dependencies.', about2Title: 'Day and night', about2Desc: 'Follow the system or switch the theme yourself.', about3Title: 'Public content only', about3Desc: 'Nodes, admin pages and keys remain private.',
          noteBoxTitle: "CHISA'S NOTEBOX", drawNote: 'Draw another note', voyageLogTitle: 'VOYAGE LOG / Station Voyage Log', installApp: 'Install this site',
          passportTitle: 'Visitor passport', passportIntro: 'Stamps stay only in your browser. Wander around and see how many you can collect.', passportBio: 'Into digital gear and servers—slowly turning this little site into a place that feels like mine.', passportNotes: 'NOTES', passportTracks: 'SLOTS', passportStamps: 'STAMPS', passportMessage: 'Find me on Telegram ↗', passportContact: 'All contact links ↓', openPassport: 'Open visitor passport', closePassport: 'Close visitor passport',
          appearanceTitle: 'Page appearance', appearanceButton: 'STYLE', appearanceMode: 'MODE', appearanceLight: 'Light', appearanceDark: 'Dark', appearancePalette: 'SOFT PINK PALETTES', paletteAsaki: 'Asaki Pink', paletteSakura: 'Sakura Mist', paletteBerry: 'Dusk Berry', palettePeach: 'Peach Pink', appearanceBackground: 'BACKGROUND', appearanceLocalNote: 'These choices stay only on this device and are never uploaded.', backgroundDots: 'Dots', backgroundGrid: 'Grid', backgroundPlain: 'Plain', backgroundPetals: 'Petals', appearanceReset: 'Reset appearance', openAppearance: 'Open appearance settings', closeAppearance: 'Close appearance settings', appearanceSaved: 'Appearance saved on this device', appearanceResetDone: 'Default appearance restored', closeImage: 'Close image',
          visitorTitle: 'Visitor', visitorGreeting: "Welcome to Chisa's little site.", visitorSystemLabel: 'System', visitorBrowserLabel: 'Browser', visitorLanguageLabel: 'Language', visitorIpLabel: 'Public IP', visitorEdgeLabel: 'Edge', visitorDateLabel: 'Date', visitorPrivacy: 'This card is assembled only in your browser and is not separately submitted to the page owner. The hosting provider may still keep ordinary access logs.', visitorClose: 'Close visitor information', visitorLoading: 'Loading…', visitorUnavailable: 'Unavailable', visitorLocalPreview: 'Local preview', visitorLocalSubtitle: 'LOCAL PREVIEW', visitorBrowserOnly: 'BROWSER ONLY',
          stampArrival: 'First arrival', stampArrivalHint: "Open Chisa's little site", stampRadio: 'Radio listener', stampRadioHint: 'Open the playlist once', stampGuide: 'Guide wanderer', stampGuideHint: 'Reach the client guides', stampVoyage: 'Night permit', stampVoyageHint: 'Discover night voyage mode', stampFinale: 'Read to the end', stampFinaleHint: 'Reach the About section', stampUnlocked: 'New stamp unlocked: ',
          voyageOn: 'Night voyage is on. The stars are passing slowly.', voyageOff: 'Night voyage ended. Back to the everyday page.', appInstalled: 'The site has been installed.',
          progress: 'DONE', themeDark: 'Dark mode enabled', themeLight: 'Light mode enabled', themeLabel: 'Open appearance settings', copied: 'Copied', copyFail: 'Could not copy. Please copy it manually.', openMenu: 'Open navigation', closeMenu: 'Close navigation', backTop: 'Back to top',
          musicPanelTitle: "Chisa's playlist", nowPlaying: 'NOW PLAYING', musicProgress: 'Playback progress', musicReady: 'Media files are not included in the public repository. Add licensed files as described in the asset guides.',
          musicOmittedTitle: 'Media files not included', voyageMediaOmitted: 'No music is bundled with the public version', voyageMediaHint: 'Add licensed files using the documented names',
          musicListTab: 'Playlist', musicLyricsTab: 'Lyrics', lyricsPending: 'Lyrics are not included in the public repository.\nAdd licensed files as described in lyrics/README.md.', floatingLyricsLabel: 'Floating lyrics', floatingLyricsOn: 'ON', floatingLyricsOff: 'OFF', floatingLyricsEnabled: 'Floating lyrics enabled', floatingLyricsDisabled: 'Floating lyrics disabled', floatingLyricsLoading: 'Lyrics are loading',
          openPlaylist: 'Open playlist', closePlaylist: 'Close playlist', previousTrack: 'Previous track', nextTrack: 'Next track', playMusic: 'Play', pauseMusic: 'Pause', musicPlaying: 'Now playing', musicPaused: 'Music paused', musicBlocked: 'Playback was blocked. Please press the play button again.', musicUnavailable: 'Audio is not included in the public version', musicVolume: 'Volume', shuffleMusic: 'Shuffle', repeatMusic: 'Repeat one', muteMusic: 'Mute', unmuteMusic: 'Unmute'
        }
      };

      function t(key) { return translations[currentLanguage][key] || key; }

      function applyLanguage(language, persist = true) {
        currentLanguage = language === 'en' ? 'en' : 'zh';
        root.dataset.language = currentLanguage;
        root.lang = currentLanguage === 'en' ? 'en' : 'zh-CN';
        languageSelect.value = currentLanguage;
        document.querySelectorAll('[data-i18n]').forEach(element => {
          const value = translations[currentLanguage][element.dataset.i18n];
          if (value) element.textContent = value;
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
          const value = translations[currentLanguage][element.dataset.i18nPlaceholder];
          if (value) element.placeholder = value;
        });
        document.title = t('pageTitle');
        document.querySelector('meta[name="description"]').content = t('pageDescription');
        languageSelect.setAttribute('aria-label', t('languageLabel'));
        const appearanceOpen = appearancePanel.classList.contains('open');
        themeToggle.setAttribute('aria-label', t(appearanceOpen ? 'closeAppearance' : 'openAppearance'));
        themeToggle.title = t(appearanceOpen ? 'closeAppearance' : 'openAppearance');
        appearanceClose.setAttribute('aria-label', t('closeAppearance'));
        lightboxClose.setAttribute('aria-label', t('closeImage'));
        lightboxPrevious.setAttribute('aria-label', t('previousImage'));
        lightboxNext.setAttribute('aria-label', t('nextImage'));
        momentsModalClose.setAttribute('aria-label', t('closeMoments'));
        visitorCardClose.setAttribute('aria-label', t('visitorClose'));
        renderVisitorDetails();
        if (galleryLightbox.classList.contains('open')) renderGalleryItem(currentGalleryIndex);
        menuToggle.setAttribute('aria-label', t('openMenu'));
        backTop.setAttribute('aria-label', t('backTop'));
        backTop.title = t('backTop');
        const passportOpen = passportPanel.classList.contains('open');
        passportToggle.setAttribute('aria-label', t(passportOpen ? 'closePassport' : 'openPassport'));
        passportToggle.title = t('passportTitle');
        passportClose.setAttribute('aria-label', t('closePassport'));
        const playlistOpen = musicPanel.classList.contains('open');
        musicToggle.setAttribute('aria-label', t(playlistOpen ? 'closePlaylist' : 'openPlaylist'));
        musicToggle.title = t(playlistOpen ? 'closePlaylist' : 'openPlaylist');
        musicClose.setAttribute('aria-label', t('closePlaylist'));
        musicPrevious.setAttribute('aria-label', t('previousTrack'));
        musicNext.setAttribute('aria-label', t('nextTrack'));
        musicShuffle.setAttribute('aria-label', t('shuffleMusic'));
        musicShuffle.title = t('shuffleMusic');
        musicRepeat.setAttribute('aria-label', t('repeatMusic'));
        musicRepeat.title = t('repeatMusic');
        musicVolume.setAttribute('aria-label', t('musicVolume'));
        musicMute.setAttribute('aria-label', t(musicAudio.muted ? 'unmuteMusic' : 'muteMusic'));
        musicPlay.setAttribute('aria-label', t(musicAudio.paused ? 'playMusic' : 'pauseMusic'));
        musicProgress.setAttribute('aria-label', t('musicProgress'));
        musicNote.textContent = t(musicNote.dataset.state || 'musicReady');
        floatingLyricsToggleText.textContent = t(floatingLyricsToggle.getAttribute('aria-pressed') === 'true' ? 'floatingLyricsOn' : 'floatingLyricsOff');
        if (persist) {
          try { localStorage.setItem('chisa-language', currentLanguage); } catch (_) {}
        }
      }

      applyLanguage(currentLanguage, false);

      function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
      }

      function setTheme(theme) {
        root.dataset.theme = theme;
        document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#151516' : '#f3f0e8';
        try { localStorage.setItem('chisa-theme', theme); } catch (_) {}
        renderAppearanceSelection();
      }

      function renderAppearanceSelection() {
        const currentTheme = root.dataset.theme === 'dark' ? 'dark' : 'light';
        const currentPalette = root.dataset.palette || 'asakipink';
        const currentBackground = root.dataset.background || 'dots';
        themeChoices.forEach(button => button.classList.toggle('active', button.dataset.themeChoice === currentTheme));
        paletteChoices.forEach(button => button.classList.toggle('active', button.dataset.paletteChoice === currentPalette));
        backgroundChoices.forEach(button => button.classList.toggle('active', button.dataset.backgroundChoice === currentBackground));
      }

      function setAppearancePanel(open) {
        if (open) {
          setPassport(false);
          setMusicPanel(false);
        }
        appearancePanel.classList.toggle('open', open);
        appearancePanel.setAttribute('aria-hidden', String(!open));
        appearancePanel.inert = !open;
        themeToggle.setAttribute('aria-expanded', String(open));
        themeToggle.setAttribute('aria-label', t(open ? 'closeAppearance' : 'openAppearance'));
        themeToggle.title = t(open ? 'closeAppearance' : 'openAppearance');
      }

      function setPalette(palette, notify = true) {
        const valid = ['asakipink', 'sakura', 'berry', 'peach'];
        root.dataset.palette = valid.includes(palette) ? palette : 'asakipink';
        try { localStorage.setItem('chisa-palette', root.dataset.palette); } catch (_) {}
        renderAppearanceSelection();
        if (notify) showToast(t('appearanceSaved'));
      }

      function setBackground(background, notify = true) {
        const valid = ['dots', 'grid', 'plain', 'petals'];
        root.dataset.background = valid.includes(background) ? background : 'dots';
        try { localStorage.setItem('chisa-background', root.dataset.background); } catch (_) {}
        renderAppearanceSelection();
        if (notify) showToast(t('appearanceSaved'));
      }

      if (!root.dataset.palette) root.dataset.palette = 'asakipink';
      if (!root.dataset.background) root.dataset.background = 'dots';
      renderAppearanceSelection();

      themeToggle.addEventListener('click', () => setAppearancePanel(!appearancePanel.classList.contains('open')));
      appearanceClose.addEventListener('click', () => {
        setAppearancePanel(false);
        themeToggle.focus();
      });
      themeChoices.forEach(button => button.addEventListener('click', () => {
        if (root.dataset.voyage === 'true') setNightVoyage(false);
        setTheme(button.dataset.themeChoice);
        showToast(button.dataset.themeChoice === 'dark' ? t('themeDark') : t('themeLight'));
      }));
      paletteChoices.forEach(button => button.addEventListener('click', () => setPalette(button.dataset.paletteChoice)));
      backgroundChoices.forEach(button => button.addEventListener('click', () => setBackground(button.dataset.backgroundChoice)));
      appearanceReset.addEventListener('click', () => {
        if (root.dataset.voyage === 'true') setNightVoyage(false, false);
        setTheme('light');
        setPalette('asakipink', false);
        setBackground('dots', false);
        showToast(t('appearanceResetDone'));
      });

      languageSelect.addEventListener('change', () => {
        applyLanguage(languageSelect.value);
        renderCurrentNote();
        renderPassport();
        renderProgress();
        filterTools();
        updateMusicTrack();
        updateFloatingLyricsToggle();
        updateFloatingLyrics();
        updateClock();
      });

      menuToggle.addEventListener('click', () => {
        const open = navLinks.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', String(open));
        menuToggle.setAttribute('aria-label', open ? t('closeMenu') : t('openMenu'));
      });

      navLinks.addEventListener('click', event => {
        if (event.target.closest('a')) {
          navLinks.classList.remove('open');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });

      function updateHeader() {
        header.classList.toggle('scrolled', scrollY > 16);
        backTop.classList.toggle('show', scrollY > 650);
      }
      updateHeader();
      addEventListener('scroll', updateHeader, { passive: true });
      backTop.addEventListener('click', () => scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' }));

      function updateClock() {
        const isEnglish = currentLanguage === 'en';
        const time = new Intl.DateTimeFormat(isEnglish ? 'en-GB' : 'zh-CN', {
          timeZone: 'Asia/Shanghai', hour: '2-digit', minute: '2-digit', hour12: false
        }).format(new Date());
        document.getElementById('navTime').textContent = `${isEnglish ? 'EN' : 'CN'} / ${time}`;
      }
      updateClock();
      setInterval(updateClock, 30000);
      document.getElementById('year').textContent = new Date().getFullYear();

      const notes = {
        zh: [
          '欢迎来到浅咲的小站。这里不赶时间，可以慢慢看。',
          '漂泊没有标准答案，能继续向前就是今天的共鸣。',
          '潮声会记住来路，也会把未说完的话送往下一片海。',
          '今州的风很远，但总有人替归来的人留一盏灯。',
          '黑海岸记录异常频率，也悄悄收藏每一次重逢。',
          '黎那汐塔的钟声响起时，水面也在替旅人回信。',
          '乘霄山的雪不回答问题，却会认真留下每一个脚印。',
          '声骸收进终端，沿途的故事要留在心里。',
          '无音区不是没有声音，只是在等一个愿意倾听的人。',
          '共鸣不是唱出同一个音，而是不同频率仍能彼此听见。',
          '今天先清完体力，明天再去拯救索拉里斯。',
          '传送信标已经点亮，下一站交给风来决定。',
          '漂泊者偶尔也可以不赶路，坐下来听完一首歌。',
          '如果终点还很远，就把今天当作一枚新的信标。',
          '守岸人把漫长写进潮汐，你把回应写进抵达。',
          '椿花开得热烈，像一场从不按计划发生的相遇。',
          '今汐守望今州，而每个路过的人也在守望自己的愿望。',
          '长离落下一枚棋子，风却把答案带去了更远的地方。',
          '折枝留住画里的瞬间，旅人留住路上的光。',
          '相里要计算万千可能，也别忘了给偶然留一个位置。',
          '飞行雪绒落进掌心以前，也曾穿过很长很长的风。',
          '愿星炬不熄，愿夏之灯不散，愿纸飞机找到归航方向。',
          '远航星的告别不是结束，只是在另一片潮声里重新亮起。',
          '自无垠处归航的人，会认得每一盏为她亮着的灯。',
          '小小奇迹并不喧闹，它常常只是“你今天也来了”。',
          '拉古那的水路会拐弯，喜欢的歌总会绕回耳边。',
          '今天没有新的主线，只想在小站里循环一首歌。',
          '如果小爱正在另一端唱歌，那就把音量再调高一点。',
          '服务器会重启，纸飞机会落下，所以记得先做备份。',
          '页面加载完成。漂泊者，欢迎再次抵达。'
        ],
        en: [
          "Welcome to Chisa's little site. There is no rush—take your time.",
          'There is no standard answer to wandering; moving forward is enough resonance for today.',
          'The tide remembers the way here and carries unfinished words toward the next sea.',
          'The wind from Jinzhou travels far, but someone always leaves a light for the returning.',
          'The Black Shores records unusual frequencies—and quietly keeps every reunion.',
          'When Rinascita’s bells ring, even the water seems to answer the traveler.',
          'Mt. Firmament’s snow gives no answers, yet carefully keeps every footprint.',
          'Echoes fit inside a terminal; stories from the road belong in the heart.',
          'A Tacet Field is not silent. It is waiting for someone willing to listen.',
          'Resonance is not one shared note, but different frequencies still hearing one another.',
          'Spend the Waveplates today. Saving Solaris can wait until tomorrow.',
          'The Resonance Beacon is lit. Let the wind choose the next stop.',
          'Even a Rover may stop wandering long enough to hear a whole song.',
          'If the destination is still far away, let today become a new beacon.',
          'Shorekeeper writes distance into the tide; you write the answer into your arrival.',
          'Camellya blooms like a meeting that never cared for the plan.',
          'Jinhsi watches over Jinzhou; every passerby watches over a wish of their own.',
          'Changli places one piece, while the wind carries the answer somewhere farther.',
          'Zhezhi keeps a moment in a painting; the traveler keeps light from the road.',
          'Xiangli Yao can calculate countless possibilities—leave one place for chance.',
          'Before a flight plume lands in your hand, it crosses a very long wind.',
          'May the starfire stay lit, the summer lamp remain, and every paper plane find home.',
          'A farewell from a distant star is not an ending; it simply shines in another tide.',
          'Those returning from infinity will recognize every light left on for them.',
          'A little miracle is rarely loud. Sometimes it is simply: “You came back today.”',
          'Ragunna’s waterways may turn, but a favorite song always circles back.',
          'No new main quest today. I only want one song on repeat at this little station.',
          'If Little A is singing somewhere beyond the signal, turn the volume up once more.',
          'Servers restart and paper planes land, so make a backup first.',
          'Page loaded. Rover, welcome back.'
        ]
      };
      let currentNote = 0;

      function renderCurrentNote() {
        notePaper.textContent = notes[currentLanguage][currentNote];
        noteIndex.textContent = `NOTE ${String(currentNote + 1).padStart(2, '0')} / ${String(notes[currentLanguage].length).padStart(2, '0')}`;
      }

      noteButton.addEventListener('click', () => {
        let next = currentNote;
        while (next === currentNote) next = Math.floor(Math.random() * notes[currentLanguage].length);
        notePaper.classList.remove('change');
        void notePaper.offsetWidth;
        notePaper.classList.add('change');
        setTimeout(() => {
          currentNote = next;
          renderCurrentNote();
        }, reducedMotion ? 0 : 130);
      });
      renderCurrentNote();

      const stampKeys = {
        arrival: 'stampArrival', radio: 'stampRadio', guide: 'stampGuide', voyage: 'stampVoyage', finale: 'stampFinale'
      };
      let collectedStamps = [];
      try {
        const savedStamps = JSON.parse(localStorage.getItem('chisa-passport-stamps'));
        if (Array.isArray(savedStamps)) collectedStamps = savedStamps.filter(id => stampKeys[id]);
      } catch (_) {}

      function renderPassport() {
        document.querySelectorAll('[data-stamp-card]').forEach(card => card.classList.toggle('locked', !collectedStamps.includes(card.dataset.stampCard)));
        passportCount.textContent = `${collectedStamps.length}/${Object.keys(stampKeys).length}`;
        passportCollectedStat.textContent = `${collectedStamps.length}/${Object.keys(stampKeys).length}`;
      }

      function unlockStamp(id, quiet = false) {
        if (!stampKeys[id] || collectedStamps.includes(id)) return;
        collectedStamps.push(id);
        try { localStorage.setItem('chisa-passport-stamps', JSON.stringify(collectedStamps)); } catch (_) {}
        renderPassport();
        if (!quiet) showToast(`${t('stampUnlocked')}${t(stampKeys[id])}`);
      }

      function setPassport(open) {
        if (open) setAppearancePanel(false);
        passportPanel.classList.toggle('open', open);
        passportPanel.setAttribute('aria-hidden', String(!open));
        passportPanel.inert = !open;
        passportToggle.setAttribute('aria-expanded', String(open));
        passportToggle.setAttribute('aria-label', t(open ? 'closePassport' : 'openPassport'));
      }

      passportToggle.addEventListener('click', () => {
        const open = !passportPanel.classList.contains('open');
        if (open) setMusicPanel(false);
        setPassport(open);
      });
      passportClose.addEventListener('click', () => {
        setPassport(false);
        passportToggle.focus();
      });
      document.querySelectorAll('[data-close-passport]').forEach(link => link.addEventListener('click', () => setPassport(false)));
      unlockStamp('arrival', true);
      renderPassport();

      function syncOverlayScrollLock() {
        const overlayOpen = momentsModal.classList.contains('open') || galleryLightbox.classList.contains('open');
        document.body.style.overflow = overlayOpen ? 'hidden' : '';
      }

      function setMomentsModal(open, restoreFocus = true) {
        if (open) {
          momentsReturnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : momentsViewAll;
          setGalleryLightbox(false, currentGalleryIndex, false);
          setAppearancePanel(false);
          setPassport(false);
          setMusicPanel(false);
        }
        momentsModal.classList.toggle('open', open);
        momentsModal.setAttribute('aria-hidden', String(!open));
        momentsModal.inert = !open;
        syncOverlayScrollLock();
        if (open) {
          requestAnimationFrame(() => momentsModalClose.focus());
        } else if (restoreFocus && momentsReturnFocus) {
          momentsReturnFocus.focus();
        }
      }

      momentsViewAll.addEventListener('click', () => setMomentsModal(true));
      momentsModalClose.addEventListener('click', () => setMomentsModal(false));
      momentsModal.addEventListener('click', event => {
        if (event.target === momentsModal) setMomentsModal(false);
      });

      function galleryCaptionAt(index) {
        const button = galleryButtons[index];
        return button?.querySelector('.gallery-caption strong')?.textContent || button?.dataset.galleryCaption || '';
      }

      function renderGalleryItem(index) {
        if (!galleryButtons.length) return;
        currentGalleryIndex = (index + galleryButtons.length) % galleryButtons.length;
        const button = galleryButtons[currentGalleryIndex];
        const caption = galleryCaptionAt(currentGalleryIndex);
        lightboxImage.src = button.dataset.gallerySrc;
        lightboxImage.alt = caption;
        lightboxCaption.textContent = caption;
        lightboxCounter.textContent = `${String(currentGalleryIndex + 1).padStart(2, '0')} / ${String(galleryButtons.length).padStart(2, '0')}`;
      }

      function showAdjacentGalleryItem(direction) {
        renderGalleryItem(currentGalleryIndex + direction);
      }

      function setGalleryLightbox(open, index = currentGalleryIndex, restoreFocus = true) {
        if (open) {
          galleryReturnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : galleryButtons[index];
          setMomentsModal(false, false);
          renderGalleryItem(index);
          setAppearancePanel(false);
          setPassport(false);
          setMusicPanel(false);
        }
        galleryLightbox.classList.toggle('open', open);
        galleryLightbox.setAttribute('aria-hidden', String(!open));
        galleryLightbox.inert = !open;
        syncOverlayScrollLock();
        if (open) {
          requestAnimationFrame(() => lightboxClose.focus());
        } else if (restoreFocus && galleryReturnFocus) {
          galleryReturnFocus.focus();
        }
      }

      galleryButtons.forEach((button, index) => button.addEventListener('click', () => setGalleryLightbox(true, index)));
      lightboxPrevious.addEventListener('click', () => showAdjacentGalleryItem(-1));
      lightboxNext.addEventListener('click', () => showAdjacentGalleryItem(1));
      lightboxClose.addEventListener('click', () => setGalleryLightbox(false));
      galleryLightbox.addEventListener('click', event => {
        if (event.target === galleryLightbox) setGalleryLightbox(false);
      });
      lightboxImage.addEventListener('touchstart', event => {
        const touch = event.changedTouches[0];
        galleryTouchStartX = touch.clientX;
        galleryTouchStartY = touch.clientY;
      }, { passive: true });
      lightboxImage.addEventListener('touchend', event => {
        const touch = event.changedTouches[0];
        const deltaX = touch.clientX - galleryTouchStartX;
        const deltaY = touch.clientY - galleryTouchStartY;
        if (Math.abs(deltaX) < 45 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
        showAdjacentGalleryItem(deltaX < 0 ? 1 : -1);
      }, { passive: true });

      function detectVisitorSystem() {
        const userAgent = navigator.userAgent || '';
        const platform = navigator.userAgentData?.platform || navigator.platform || '';
        if (/iPad|iPhone|iPod/i.test(userAgent) || (/Mac/i.test(platform) && navigator.maxTouchPoints > 1)) return 'iOS / iPadOS';
        if (/Android/i.test(userAgent)) return 'Android';
        if (/Windows/i.test(platform) || /Windows NT/i.test(userAgent)) return 'Windows';
        if (/Mac/i.test(platform) || /Mac OS X/i.test(userAgent)) return 'macOS';
        if (/Linux/i.test(platform) || /Linux/i.test(userAgent)) return 'Linux';
        return platform || t('visitorUnavailable');
      }

      function detectVisitorBrowser() {
        const userAgent = navigator.userAgent || '';
        if (/Edg\//i.test(userAgent)) return currentLanguage === 'en' ? 'Microsoft Edge' : 'Microsoft Edge 浏览器';
        if (/OPR\//i.test(userAgent)) return currentLanguage === 'en' ? 'Opera Browser' : 'Opera 浏览器';
        if (/SamsungBrowser\//i.test(userAgent)) return currentLanguage === 'en' ? 'Samsung Internet' : 'Samsung 浏览器';
        if (/FxiOS|Firefox\//i.test(userAgent)) return currentLanguage === 'en' ? 'Firefox Browser' : 'Firefox 浏览器';
        if (/CriOS|Chrome\//i.test(userAgent)) return currentLanguage === 'en' ? 'Chrome Browser' : 'Chrome 浏览器';
        if (/Safari\//i.test(userAgent) && /Version\//i.test(userAgent)) return currentLanguage === 'en' ? 'Safari Browser' : 'Safari 浏览器';
        return currentLanguage === 'en' ? 'Web Browser' : '网页浏览器';
      }

      function renderVisitorDetails() {
        const locale = currentLanguage === 'en' ? 'en-US' : 'zh-CN';
        visitorSystem.textContent = detectVisitorSystem();
        visitorBrowser.textContent = detectVisitorBrowser();
        visitorLanguage.textContent = (navigator.languages?.length ? navigator.languages.slice(0, 2) : [navigator.language || locale]).join(' / ');
        visitorDate.textContent = new Intl.DateTimeFormat(locale, { year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' }).format(new Date());
        if (visitorTraceState === 'ready') {
          visitorIp.textContent = visitorTrace.ip || t('visitorUnavailable');
          visitorEdge.textContent = [visitorTrace.loc, visitorTrace.colo && `${visitorTrace.colo} EDGE`].filter(Boolean).join(' · ') || 'Cloudflare';
          visitorSubtitle.textContent = [visitorTrace.loc, visitorTrace.colo && `${visitorTrace.colo} EDGE`].filter(Boolean).join(' · ') || 'CLOUDFLARE EDGE';
        } else if (visitorTraceState === 'local') {
          visitorIp.textContent = t('visitorLocalPreview');
          visitorEdge.textContent = t('visitorLocalPreview');
          visitorSubtitle.textContent = t('visitorLocalSubtitle');
        } else if (visitorTraceState === 'unavailable') {
          visitorIp.textContent = t('visitorUnavailable');
          visitorEdge.textContent = t('visitorUnavailable');
          visitorSubtitle.textContent = t('visitorBrowserOnly');
        } else {
          visitorIp.textContent = t('visitorLoading');
          visitorEdge.textContent = t('visitorLoading');
          visitorSubtitle.textContent = 'LOCAL BROWSER CARD';
        }
      }

      async function loadVisitorTrace() {
        const localPreview = location.protocol === 'file:' || ['localhost', '127.0.0.1', '::1'].includes(location.hostname);
        if (localPreview) {
          visitorTraceState = 'local';
          renderVisitorDetails();
          return;
        }
        try {
          const response = await fetch('/cdn-cgi/trace', { cache: 'no-store', credentials: 'same-origin' });
          if (!response.ok) throw new Error('Trace unavailable');
          const trace = Object.fromEntries((await response.text()).trim().split('\n').map(line => {
            const separator = line.indexOf('=');
            return separator > -1 ? [line.slice(0, separator), line.slice(separator + 1)] : [line, ''];
          }));
          if (!trace.ip) throw new Error('IP missing');
          visitorTrace = { ip: trace.ip || '', loc: trace.loc || '', colo: trace.colo || '' };
          visitorTraceState = 'ready';
        } catch (_) {
          visitorTraceState = 'unavailable';
        }
        renderVisitorDetails();
      }

      function setVisitorCard(open) {
        clearTimeout(visitorShowTimer);
        visitorCard.classList.toggle('open', open);
        visitorCard.setAttribute('aria-hidden', String(!open));
        visitorCard.inert = !open;
      }

      visitorCardClose.addEventListener('click', () => setVisitorCard(false));
      renderVisitorDetails();
      loadVisitorTrace();
      const scheduleVisitorCard = () => {
        visitorShowTimer = setTimeout(() => setVisitorCard(true), reducedMotion ? 100 : 650);
      };
      if (document.readyState === 'complete') scheduleVisitorCard();
      else window.addEventListener('load', scheduleVisitorCard, { once: true });

      let voyagePreviousTheme = root.dataset.theme === 'dark' ? 'dark' : 'light';
      function setNightVoyage(enabled, notify = true) {
        if (enabled) {
          voyagePreviousTheme = root.dataset.theme === 'dark' ? 'dark' : 'light';
          root.dataset.theme = 'dark';
          root.dataset.voyage = 'true';
          document.querySelector('meta[name="theme-color"]').content = '#100d16';
          unlockStamp('voyage');
          if (notify) showToast(t('voyageOn'));
        } else {
          root.dataset.voyage = 'false';
          setTheme(voyagePreviousTheme);
          if (notify) showToast(t('voyageOff'));
        }
      }

      let brandClickCount = 0;
      let brandClickTimer;
      brand.addEventListener('click', event => {
        event.preventDefault();
        scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
        brandClickCount++;
        clearTimeout(brandClickTimer);
        brandClickTimer = setTimeout(() => { brandClickCount = 0; }, 1800);
        if (brandClickCount >= 5) {
          brandClickCount = 0;
          clearTimeout(brandClickTimer);
          setNightVoyage(root.dataset.voyage !== 'true');
        }
      });

      if ('IntersectionObserver' in window) {
        const stampObserver = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            if (entry.target.id === 'tutorial') unlockStamp('guide');
            if (entry.target.id === 'about') unlockStamp('finale');
          });
        }, { threshold: .16 });
        stampObserver.observe(document.getElementById('tutorial'));
        stampObserver.observe(document.getElementById('about'));
      }

      let deferredInstallPrompt = null;
      addEventListener('beforeinstallprompt', event => {
        event.preventDefault();
        deferredInstallPrompt = event;
        installApp.hidden = false;
      });
      installApp.addEventListener('click', async () => {
        if (!deferredInstallPrompt) return;
        deferredInstallPrompt.prompt();
        await deferredInstallPrompt.userChoice;
        deferredInstallPrompt = null;
        installApp.hidden = true;
      });
      addEventListener('appinstalled', () => {
        installApp.hidden = true;
        deferredInstallPrompt = null;
        showToast(t('appInstalled'));
      });
      if ('serviceWorker' in navigator) {
        const localPreview = location.protocol === 'file:' || ['localhost', '127.0.0.1', '::1'].includes(location.hostname);
        addEventListener('load', () => {
          if (localPreview) {
            navigator.serviceWorker.getRegistrations().then(registrations => {
              registrations.forEach(registration => registration.unregister());
            }).catch(() => {});
            if ('caches' in window) {
              caches.keys().then(keys => Promise.all(
                keys.filter(key => key.startsWith('chisa-home-')).map(key => caches.delete(key))
              )).catch(() => {});
            }
            return;
          }
          navigator.serviceWorker.register('./sw.js').catch(() => {});
        });
      }

      const MEDIA_ASSETS_ENABLED = false;
      const playlist = [
        { title: '远航星的告别', src: 'music/远航星的告别.mp3', lrc: 'lyrics/远航星的告别.lrc', duration: 225.024 },
        { title: '不散的夏之灯', src: 'music/不散的夏之灯.mp3', lrc: 'lyrics/不散的夏之灯.lrc', duration: 313.032 },
        { title: '纸飞机', src: 'music/纸飞机.mp3', lrc: 'lyrics/纸飞机.lrc', duration: 233.544 },
        { title: '小小奇迹', src: 'music/小小奇迹.mp3', lrc: 'lyrics/小小奇迹.lrc', duration: 262.704 },
        { title: '星炬不熄', src: 'music/星炬不熄.mp3', lrc: 'lyrics/星炬不熄.lrc', duration: 232.992 },
        { title: '自无垠处归航之星', src: 'music/自无垠处归航之星.mp3', lrc: 'lyrics/自无垠处归航之星.lrc', duration: 333 }
      ];
      let currentTrack = 0;
      let userPausedMusic = false;
      let playAttempting = false;
      let shuffleEnabled = false;
      let repeatOneEnabled = false;
      let savedMusicVolume = .55;
      try {
        shuffleEnabled = localStorage.getItem('chisa-music-shuffle') === 'true';
        repeatOneEnabled = localStorage.getItem('chisa-music-repeat-one') === 'true';
        const storedVolume = Number(localStorage.getItem('chisa-music-volume'));
        if (Number.isFinite(storedVolume) && storedVolume >= 0 && storedVolume <= 1) savedMusicVolume = storedVolume;
      } catch (_) {}
      let currentLyrics = [];
      let activeLyricIndex = -1;
      let lyricLoadToken = 0;
      let floatingLyricsEnabled = false;

      function formatMusicTime(seconds) {
        if (!Number.isFinite(seconds) || seconds < 0) return '--:--';
        const whole = Math.floor(seconds);
        return `${String(Math.floor(whole / 60)).padStart(2, '0')}:${String(whole % 60).padStart(2, '0')}`;
      }

      function setMusicNote(key) {
        musicNote.dataset.state = key;
        musicNote.textContent = t(key);
      }

      function setMusicPanel(open) {
        if (open) {
          setPassport(false);
          setAppearancePanel(false);
        }
        musicPanel.classList.toggle('open', open);
        document.body.classList.toggle('music-panel-open', open);
        musicPanel.setAttribute('aria-hidden', String(!open));
        musicPanel.inert = !open;
        musicToggle.setAttribute('aria-expanded', String(open));
        musicToggle.setAttribute('aria-label', t(open ? 'closePlaylist' : 'openPlaylist'));
        musicToggle.title = t(open ? 'closePlaylist' : 'openPlaylist');
        if (open) unlockStamp('radio');
      }

      function updateFloatingLyricsToggle() {
        floatingLyricsToggle.setAttribute('aria-pressed', String(floatingLyricsEnabled));
        floatingLyricsToggleText.textContent = t(floatingLyricsEnabled ? 'floatingLyricsOn' : 'floatingLyricsOff');
        floatingLyricsToggle.setAttribute('aria-label', `${t('floatingLyricsLabel')} · ${t(floatingLyricsEnabled ? 'floatingLyricsOn' : 'floatingLyricsOff')}`);
      }

      function updateFloatingLyrics() {
        const track = playlist[currentTrack];
        const followingTrack = playlist[(currentTrack + 1) % playlist.length];
        let currentText = `♪ ${track.title}`;
        let nextText = t('floatingLyricsLoading');

        if (currentLyrics.length) {
          if (activeLyricIndex >= 0) {
            currentText = currentLyrics[activeLyricIndex].text;
            nextText = currentLyrics[activeLyricIndex + 1]?.text || `NEXT · ${followingTrack.title}`;
          } else {
            nextText = currentLyrics[0].text;
          }
        }

        floatingLyricCurrent.textContent = currentText;
        floatingLyricNext.textContent = nextText;
      }

      function setFloatingLyrics(enabled, announce = true) {
        floatingLyricsEnabled = Boolean(enabled);
        floatingLyrics.classList.toggle('show', floatingLyricsEnabled);
        floatingLyrics.setAttribute('aria-hidden', String(!floatingLyricsEnabled));
        updateFloatingLyricsToggle();
        updateFloatingLyrics();
        if (floatingLyricsEnabled) setMusicPanel(false);
        if (announce) showToast(t(floatingLyricsEnabled ? 'floatingLyricsEnabled' : 'floatingLyricsDisabled'));
      }

      function setMusicView(view) {
        const showLyrics = view === 'lyrics';
        musicList.hidden = showLyrics;
        lyricsPanel.hidden = !showLyrics;
        musicViewButtons.forEach(button => {
          const active = button.dataset.musicView === view;
          button.classList.toggle('active', active);
          button.setAttribute('aria-selected', String(active));
        });
        if (showLyrics) syncLyrics(true);
      }

      function parseLrc(source) {
        const lines = [];
        source.split(/\r?\n/).forEach(rawLine => {
          const timestamps = [...rawLine.matchAll(/\[(\d{1,3}):(\d{2}(?:\.\d{1,3})?)\]/g)];
          if (!timestamps.length) return;
          const text = rawLine.replace(/\[[^\]]+\]/g, '').trim();
          if (!text) return;
          timestamps.forEach(match => lines.push({ time: Number(match[1]) * 60 + Number(match[2]), text }));
        });
        return lines.sort((a, b) => a.time - b.time);
      }

      function renderLyrics() {
        lyricsLines.replaceChildren();
        lyricsEmpty.hidden = currentLyrics.length > 0;
        if (!currentLyrics.length) {
          lyricsEmpty.textContent = t('lyricsPending');
          updateFloatingLyrics();
          return;
        }
        const fragment = document.createDocumentFragment();
        currentLyrics.forEach((line, index) => {
          const element = document.createElement('p');
          element.className = 'lyric-line';
          element.dataset.lyricIndex = String(index);
          element.textContent = line.text;
          fragment.appendChild(element);
        });
        lyricsLines.appendChild(fragment);
        updateFloatingLyrics();
      }

      async function loadLyrics() {
        const token = ++lyricLoadToken;
        currentLyrics = [];
        activeLyricIndex = -1;
        renderLyrics();
        if (!MEDIA_ASSETS_ENABLED) return;
        try {
          const response = await fetch(playlist[currentTrack].lrc, { cache: 'no-cache' });
          if (!response.ok) return;
          const parsed = parseLrc(await response.text());
          if (token !== lyricLoadToken) return;
          currentLyrics = parsed;
          renderLyrics();
          syncLyrics(true);
        } catch (_) {}
      }

      function syncLyrics(force = false) {
        if (!currentLyrics.length) return;
        let nextIndex = -1;
        for (let index = 0; index < currentLyrics.length; index++) {
          if (currentLyrics[index].time <= musicAudio.currentTime + .12) nextIndex = index;
          else break;
        }
        if (!force && nextIndex === activeLyricIndex) return;
        activeLyricIndex = nextIndex;
        document.querySelectorAll('.lyric-line').forEach((line, index) => line.classList.toggle('active', index === activeLyricIndex));
        const activeLine = lyricsLines.querySelector('.lyric-line.active');
        if (activeLine && !lyricsPanel.hidden) activeLine.scrollIntoView({ block: 'center', behavior: reducedMotion ? 'auto' : 'smooth' });
        updateFloatingLyrics();
      }

      function updateMusicTrack() {
        const track = playlist[currentTrack];
        const followingTrack = playlist[(currentTrack + 1) % playlist.length];
        musicTitle.textContent = MEDIA_ASSETS_ENABLED ? track.title : t('musicOmittedTitle');
        voyageNow.textContent = MEDIA_ASSETS_ENABLED
          ? (currentLanguage === 'zh' ? `正在播放《${track.title}》` : `Now playing “${track.title}”`)
          : t('voyageMediaOmitted');
        voyageNext.textContent = MEDIA_ASSETS_ENABLED
          ? (currentLanguage === 'zh' ? `下一首《${followingTrack.title}》` : `Up next “${followingTrack.title}”`)
          : t('voyageMediaHint');
        musicTracks.forEach((button, index) => {
          const active = index === currentTrack;
          button.classList.toggle('active', active);
          if (active) button.setAttribute('aria-current', 'true');
          else button.removeAttribute('aria-current');
        });
        updateFloatingLyrics();
      }

      function updateMusicProgress() {
        if (!MEDIA_ASSETS_ENABLED) {
          musicProgress.value = '0';
          musicProgress.style.setProperty('--music-progress', '0%');
          musicTime.textContent = '--:-- / --:--';
          return;
        }
        const duration = Number.isFinite(musicAudio.duration) ? musicAudio.duration : playlist[currentTrack].duration;
        const current = Number.isFinite(musicAudio.currentTime) ? musicAudio.currentTime : 0;
        const ratio = duration > 0 ? Math.min(current / duration, 1) : 0;
        musicProgress.value = String(Math.round(ratio * 1000));
        musicProgress.style.setProperty('--music-progress', `${ratio * 100}%`);
        musicTime.textContent = `${formatMusicTime(current)} / ${formatMusicTime(duration)}`;
      }

      function syncMusicState() {
        const playing = !musicAudio.paused && !musicAudio.ended;
        musicShell.classList.toggle('is-playing', playing);
        musicPlay.setAttribute('aria-label', t(playing ? 'pauseMusic' : 'playMusic'));
      }

      async function attemptMusicPlay(fromGesture = false) {
        if (!MEDIA_ASSETS_ENABLED) {
          setMusicNote('musicUnavailable');
          if (fromGesture) showToast(t('musicUnavailable'));
          return;
        }
        if (playAttempting || !musicAudio.paused) return;
        playAttempting = true;
        try {
          await musicAudio.play();
        } catch (error) {
          setMusicNote(error && error.name === 'NotAllowedError' ? 'musicBlocked' : 'musicUnavailable');
          if (fromGesture && error && error.name !== 'NotAllowedError') showToast(t('musicUnavailable'));
        } finally {
          playAttempting = false;
          syncMusicState();
        }
      }

      function randomTrackIndex() {
        if (playlist.length < 2) return currentTrack;
        let next = currentTrack;
        while (next === currentTrack) next = Math.floor(Math.random() * playlist.length);
        return next;
      }

      function updateMusicOptions() {
        musicShuffle.setAttribute('aria-pressed', String(shuffleEnabled));
        musicRepeat.setAttribute('aria-pressed', String(repeatOneEnabled));
        musicVolume.value = String(musicAudio.volume);
        musicVolumeValue.textContent = `${Math.round(musicAudio.volume * 100)}%`;
        musicMute.textContent = musicAudio.muted || musicAudio.volume === 0 ? 'MUTE' : 'VOL';
        musicMute.setAttribute('aria-label', t(musicAudio.muted ? 'unmuteMusic' : 'muteMusic'));
      }

      function saveMusicOptions() {
        try {
          localStorage.setItem('chisa-music-shuffle', String(shuffleEnabled));
          localStorage.setItem('chisa-music-repeat-one', String(repeatOneEnabled));
          localStorage.setItem('chisa-music-volume', String(musicAudio.volume));
        } catch (_) {}
      }
      function selectMusicTrack(index, shouldPlay = true) {
        if (!MEDIA_ASSETS_ENABLED) return;
        currentTrack = (index + playlist.length) % playlist.length;
        const track = playlist[currentTrack];
        musicAudio.src = track.src;
        musicAudio.load();
        updateMusicTrack();
        updateMusicProgress();
        loadLyrics();
        if (shouldPlay) {
          userPausedMusic = false;
          attemptMusicPlay(true);
        }
      }

      musicToggle.addEventListener('click', () => setMusicPanel(!musicPanel.classList.contains('open')));
      musicClose.addEventListener('click', () => {
        setMusicPanel(false);
        musicToggle.focus();
      });
      musicPlay.addEventListener('click', () => {
        if (musicAudio.paused) {
          userPausedMusic = false;
          attemptMusicPlay(true);
        } else {
          userPausedMusic = true;
          musicAudio.pause();
          setMusicNote('musicPaused');
        }
      });
      musicPrevious.addEventListener('click', () => selectMusicTrack(shuffleEnabled ? randomTrackIndex() : currentTrack - 1));
      musicNext.addEventListener('click', () => selectMusicTrack(shuffleEnabled ? randomTrackIndex() : currentTrack + 1));
      musicTracks.forEach(button => button.addEventListener('click', () => selectMusicTrack(Number(button.dataset.track))));
      musicShuffle.addEventListener('click', () => {
        shuffleEnabled = !shuffleEnabled;
        updateMusicOptions();
        saveMusicOptions();
      });
      musicRepeat.addEventListener('click', () => {
        repeatOneEnabled = !repeatOneEnabled;
        updateMusicOptions();
        saveMusicOptions();
      });
      musicVolume.addEventListener('input', () => {
        musicAudio.volume = Math.min(1, Math.max(0, Number(musicVolume.value)));
        if (musicAudio.volume > 0) musicAudio.muted = false;
        updateMusicOptions();
        saveMusicOptions();
      });
      musicMute.addEventListener('click', () => {
        musicAudio.muted = !musicAudio.muted;
        updateMusicOptions();
      });
      musicViewButtons.forEach(button => button.addEventListener('click', () => setMusicView(button.dataset.musicView)));
      floatingLyricsToggle.addEventListener('click', () => setFloatingLyrics(!floatingLyricsEnabled));
      musicProgress.addEventListener('input', () => {
        if (!Number.isFinite(musicAudio.duration)) return;
        musicAudio.currentTime = (Number(musicProgress.value) / 1000) * musicAudio.duration;
        updateMusicProgress();
      });

      musicAudio.volume = savedMusicVolume;
      musicAudio.addEventListener('loadedmetadata', updateMusicProgress);
      musicAudio.addEventListener('durationchange', updateMusicProgress);
      musicAudio.addEventListener('timeupdate', updateMusicProgress);
      musicAudio.addEventListener('timeupdate', () => syncLyrics());
      musicAudio.addEventListener('play', () => {
        userPausedMusic = false;
        syncMusicState();
        setMusicNote('musicPlaying');
      });
      musicAudio.addEventListener('pause', syncMusicState);
      musicAudio.addEventListener('ended', () => {
        if (repeatOneEnabled) {
          musicAudio.currentTime = 0;
          attemptMusicPlay();
        } else {
          selectMusicTrack(shuffleEnabled ? randomTrackIndex() : currentTrack + 1, true);
        }
      });

      [musicPlay, musicPrevious, musicNext, musicShuffle, musicRepeat, musicVolume, musicMute, musicProgress, floatingLyricsToggle, ...musicTracks]
        .forEach(control => { control.disabled = !MEDIA_ASSETS_ENABLED; });
      if (MEDIA_ASSETS_ENABLED) {
        musicAudio.src = playlist[currentTrack].src;
        musicAudio.load();
      } else {
        setMusicNote('musicReady');
      }
      updateMusicOptions();
      updateMusicTrack();
      updateMusicProgress();
      setFloatingLyrics(false, false);
      loadLyrics();

      const tabButtons = [...document.querySelectorAll('.tab-button')];
      const tabPanels = [...document.querySelectorAll('.tab-panel')];
      let currentGuide = 'clash';

      function progressKey(guide) { return `chisa-guide-${guide}`; }
      function getProgress(guide) {
        try { return JSON.parse(localStorage.getItem(progressKey(guide))) || []; }
        catch (_) { return []; }
      }
      function saveProgress(guide, steps) {
        try { localStorage.setItem(progressKey(guide), JSON.stringify(steps)); } catch (_) {}
      }
      function renderProgress() {
        const done = getProgress(currentGuide);
        const guide = document.querySelector(`[data-guide="${currentGuide}"]`);
        guide.querySelectorAll('.step').forEach(step => {
          const isDone = done.includes(step.dataset.step);
          step.classList.toggle('done', isDone);
          step.setAttribute('aria-pressed', String(isDone));
          step.querySelector('.step-box').textContent = isDone ? '✓' : step.dataset.step;
        });
        document.getElementById('progressText').textContent = `${t('progress')} ${done.length} / 6`;
      }

      tabButtons.forEach(button => button.addEventListener('click', () => {
        currentGuide = button.dataset.tab;
        tabButtons.forEach(item => {
          const active = item === button;
          item.classList.toggle('active', active);
          item.setAttribute('aria-selected', String(active));
        });
        tabPanels.forEach(panel => {
          const active = panel.dataset.panel === currentGuide;
          panel.classList.toggle('active', active);
          panel.hidden = !active;
        });
        renderProgress();
      }));

      document.querySelectorAll('.step').forEach(step => step.addEventListener('click', () => {
        const guide = step.closest('[data-guide]').dataset.guide;
        const done = getProgress(guide);
        const index = done.indexOf(step.dataset.step);
        if (index >= 0) done.splice(index, 1); else done.push(step.dataset.step);
        saveProgress(guide, done);
        renderProgress();
      }));
      renderProgress();

      const filterButtons = [...document.querySelectorAll('.filter-button')];
      const toolCards = [...document.querySelectorAll('.tool-card')];
      const toolSearch = document.getElementById('toolSearch');
      const emptyTools = document.getElementById('emptyTools');
      let activeFilter = 'all';

      function filterTools() {
        const query = toolSearch.value.trim().toLowerCase();
        let visibleCount = 0;
        toolCards.forEach(card => {
          const categoryMatch = activeFilter === 'all' || card.dataset.category === activeFilter;
          const searchMatch = !query || card.dataset.search.toLowerCase().includes(query) || card.textContent.toLowerCase().includes(query);
          const visible = categoryMatch && searchMatch;
          card.hidden = !visible;
          if (visible) visibleCount++;
        });
        emptyTools.classList.toggle('show', visibleCount === 0);
      }

      filterButtons.forEach(button => button.addEventListener('click', () => {
        activeFilter = button.dataset.filter;
        filterButtons.forEach(item => item.classList.toggle('active', item === button));
        filterTools();
      }));
      toolSearch.addEventListener('input', filterTools);

      document.querySelectorAll('[data-copy]').forEach(button => button.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(button.dataset.copy);
          showToast(`${t('copied')} ${button.dataset.copy}`);
        } catch (_) {
          showToast(t('copyFail'));
        }
      }));

      if ('IntersectionObserver' in window) {
        const navAnchors = [...navLinks.querySelectorAll('a')];
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              navAnchors.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
            }
          });
        }, { rootMargin: '-30% 0px -60%', threshold: 0 });
        document.querySelectorAll('section[id]:not(#top)').forEach(section => observer.observe(section));
      }

      document.addEventListener('click', event => {
        if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
          navLinks.classList.remove('open');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
        if (!musicShell.contains(event.target)) setMusicPanel(false);
        if (!passportPanel.contains(event.target) && !passportToggle.contains(event.target)) setPassport(false);
        if (!appearancePanel.contains(event.target) && !themeToggle.contains(event.target)) setAppearancePanel(false);
      });
      function trapOverlayFocus(event, container) {
        const focusable = [...container.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')]
          .filter(element => !element.hidden && element.getClientRects().length);
        if (!focusable.length) {
          event.preventDefault();
          container.focus();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }

      document.addEventListener('keydown', event => {
        if (galleryLightbox.classList.contains('open')) {
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            showAdjacentGalleryItem(-1);
            return;
          }
          if (event.key === 'ArrowRight') {
            event.preventDefault();
            showAdjacentGalleryItem(1);
            return;
          }
          if (event.key === 'Tab') trapOverlayFocus(event, lightboxCard);
          if (event.key === 'Escape') {
            event.preventDefault();
            setGalleryLightbox(false);
          }
          return;
        }
        if (momentsModal.classList.contains('open')) {
          if (event.key === 'Tab') trapOverlayFocus(event, momentsModalCard);
          if (event.key === 'Escape') {
            event.preventDefault();
            setMomentsModal(false);
          }
          return;
        }
        if (event.key === 'Escape') {
          if (musicPanel.classList.contains('open')) {
            setMusicPanel(false);
            musicToggle.focus();
          }
          if (passportPanel.classList.contains('open')) {
            setPassport(false);
            passportToggle.focus();
          }
          if (appearancePanel.classList.contains('open')) {
            setAppearancePanel(false);
            themeToggle.focus();
          }
          if (visitorCard.classList.contains('open')) setVisitorCard(false);
        }
      });
    })();
