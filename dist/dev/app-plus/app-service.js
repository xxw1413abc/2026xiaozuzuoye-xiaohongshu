if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const ON_SHOW = "onShow";
  const ON_LOAD = "onLoad";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const createLifeCycleHook = (lifecycle, flag = 0) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onShow = /* @__PURE__ */ createLifeCycleHook(
    ON_SHOW,
    1 | 2
    /* HookFlags.PAGE */
  );
  const onLoad = /* @__PURE__ */ createLifeCycleHook(
    ON_LOAD,
    2
    /* HookFlags.PAGE */
  );
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$f = {
    __name: "BottomNav",
    props: {
      active: {
        type: String,
        default: "home"
      }
    },
    setup(__props, { expose: __expose }) {
      __expose();
      function go(url) {
        uni.redirectTo({ url });
      }
      const __returned__ = { go };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "bottom-nav" }, [
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["nav-item", { active: $props.active === "home" }]),
          onClick: _cache[0] || (_cache[0] = ($event) => $setup.go("/pages/index/index"))
        },
        "首页",
        2
        /* CLASS */
      ),
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["nav-item", { active: $props.active === "market" }]),
          onClick: _cache[1] || (_cache[1] = ($event) => $setup.go("/pages/market/market"))
        },
        "市集",
        2
        /* CLASS */
      ),
      vue.createElementVNode("view", {
        class: "publish",
        onClick: _cache[2] || (_cache[2] = ($event) => $setup.go("/pages/note/note"))
      }, [
        vue.createElementVNode("view", { class: "plus-icon" })
      ]),
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["nav-item", { active: $props.active === "message" }]),
          onClick: _cache[3] || (_cache[3] = ($event) => $setup.go("/pages/message/message"))
        },
        "消息",
        2
        /* CLASS */
      ),
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["nav-item", { active: $props.active === "me" }]),
          onClick: _cache[4] || (_cache[4] = ($event) => $setup.go("/pages/me/me"))
        },
        "我",
        2
        /* CLASS */
      )
    ]);
  }
  const BottomNav = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$f], ["__scopeId", "data-v-a73deb8d"], ["__file", "C:/Users/10038/Documents/Codex/2026-06-12/app-c-users-10038-downloads-nuxt3/outputs/xhs-uniapp-apk/components/BottomNav/BottomNav.vue"]]);
  const mockNotes = [
    {
      id: 1,
      title: "急聘 急聘 急聘",
      authorName: "元朵",
      avatar: "元",
      likes: 34,
      poster: "三亚\n招聘",
      bg: "linear-gradient(145deg, #fff 0%, #fff 55%, #ffe9e6 100%)",
      avatarBg: "#f2a598",
      cover: "",
      content: "三亚本地岗位招聘，适合想边工作边看海的人。"
    },
    {
      id: 2,
      title: "我反正是被电瓶车逼得砸了好多钱了",
      authorName: "SA",
      avatar: "S",
      likes: 21,
      poster: "你被三亚学院\n逼出了什么\n生存技巧",
      bg: "linear-gradient(145deg, #fbfbfb 0%, #f3f3f3 100%)",
      avatarBg: "#9b8f85",
      cover: "",
      content: "校园生活小技巧集合，主打一个真实。"
    },
    {
      id: 3,
      title: "下一个风口就是：深圳 + 跨境",
      authorName: "刘霞",
      avatar: "刘",
      likes: 340,
      poster: "下一个风口\n就是\n深圳+跨境",
      bg: "linear-gradient(160deg, #fff 0%, #fff 70%, #ffd6d6 100%)",
      avatarBg: "#111",
      cover: "",
      content: "聊聊跨境方向的机会和普通人怎么入门。"
    },
    {
      id: 4,
      title: "进来看看手型 我是文学手",
      authorName: "奶味仙女棒",
      avatar: "奶",
      likes: 22,
      poster: "精致手  花钱手\n顾家手  清闲手\n操劳手  富贵手\n幸福手  文学手",
      bg: "linear-gradient(180deg, #fff 0%, #f9f9f9 100%)",
      avatarBg: "#6aa8ff",
      cover: "",
      content: "娱乐向手型分析，看看你是哪一种。"
    },
    {
      id: 5,
      title: "三亚一日游怎么安排不踩雷",
      authorName: "晴天旅行",
      avatar: "晴",
      likes: 88,
      poster: "三亚\n一日游\n路线",
      bg: "linear-gradient(150deg, #e8fbff 0%, #fff7e9 100%)",
      avatarBg: "#3cc0d8",
      cover: "",
      content: "从海边到夜市，路线紧凑但不累。"
    },
    {
      id: 6,
      title: "宿舍收纳真的能救命",
      authorName: "小薯条",
      avatar: "薯",
      likes: 57,
      poster: "宿舍\n收纳\n清单",
      bg: "linear-gradient(145deg, #fff5f8 0%, #f3f6ff 100%)",
      avatarBg: "#ff6b8a",
      cover: "",
      content: "几个便宜好用的小物，桌面一下清爽很多。"
    }
  ];
  const mockUsers = [
    { name: "安行趣玩分享", desc: "票务代理", avatar: "安", bg: "#89b7e6", verified: true },
    { name: "媛媛到处玩", desc: "咨询公司", avatar: "媛", bg: "#83c77e", verified: true },
    { name: "三亚学院小贝学姐", desc: "教育内容热门作者", avatar: "贝", bg: "#25b8c8", verified: false },
    { name: "sage_zhou", desc: "美食内容热门作者", avatar: "s", bg: "#bdbdbd", verified: false },
    { name: "可达楠楠", desc: "摄影内容热门作者", avatar: "楠", bg: "#f3bdd1", verified: false },
    { name: "梁老财 cc", desc: "宠物内容热门作者", avatar: "梁", bg: "#8a6d4b", verified: false },
    { name: "黄子韬", desc: "音乐内容热门作者", avatar: "黄", bg: "#4a98dd", verified: true }
  ];
  function getLocalNotes() {
    const drafts = uni.getStorageSync("offline_notes") || [];
    return [...drafts, ...mockNotes];
  }
  function saveLocalNote(note) {
    const drafts = uni.getStorageSync("offline_notes") || [];
    const nextNote = {
      id: Date.now(),
      authorName: uni.getStorageSync("user_phone") || "我",
      avatar: "我",
      likes: 0,
      poster: note.title,
      bg: "linear-gradient(145deg, #fff 0%, #ffecee 100%)",
      avatarBg: "#ff2442",
      ...note
    };
    uni.setStorageSync("offline_notes", [nextNote, ...drafts]);
    return nextNote;
  }
  const _sfc_main$e = {
    __name: "index",
    setup(__props, { expose: __expose }) {
      __expose();
      const channels = [
        { key: "follow", name: "关注" },
        { key: "discover", name: "发现" },
        { key: "worldcup", name: "世界杯" },
        { key: "sanya", name: "三亚" }
      ];
      const activeChannel = vue.ref("discover");
      const areaOpen = vue.ref(false);
      const homeDrawerOpen = vue.ref(false);
      const notes = vue.ref([]);
      const worldcupImage = vue.ref("../../static/worldcup.jpg");
      const followNotes = [
        { id: "f1", title: "DAY 533｜这谁不会嘛", authorName: "Jack 和 Linda", avatar: "J", date: "05-19", likes: 101, cls: "dance", avatarBg: "#9aa9b6", poster: "DAY 533", content: "跳舞练习室日常，记录两个人一起坚持的第 533 天。" },
        { id: "f2", title: "苏河湾 顶楼复式带阳台（转租）", authorName: "娟娟甄选好房", avatar: "娟", date: "11小时前", likes: "赞", cls: "loft", avatarBg: "#b8c3d2", badge: true, poster: "上海顶楼复式的家", content: "顶楼复式带阳台，采光很好，适合喜欢开阔空间的人。" },
        { id: "f3", title: "别人搞投资我搞透支", authorName: "潘大喜", avatar: "潘", date: "04-19", likes: 1, cls: "farm", avatarBg: "#deb887", overlay: "负债500w牛马日常", poster: "负债500w牛马日常", content: "轻松吐槽生活压力，顺便记录每天认真打工的状态。" },
        { id: "f4", title: "南京每天都像在澡堂里", authorName: "昆仑", avatar: "昆", date: "05-27", likes: 26, cls: "gym", avatarBg: "#795548", poster: "南京每天都像在澡堂里", content: "天气热到像蒸桑拿，通勤路上已经开始怀疑人生。" },
        { id: "f5", title: "椅子！比床舒服？", authorName: "清闲动态", avatar: "清", date: "今天", likes: 9, cls: "chair", avatarBg: "#444", badge: true, poster: "椅子！比床舒服？", content: "一把舒服的人体工学椅，适合久坐党。" }
      ];
      const sanyaNotes = [
        { id: "s1", title: "三亚有一起喝酒的吗", authorName: "yyy（", avatar: "y", likes: 14, cls: "selfie", avatarBg: "#d0b08a", location: "海南热带海洋学院（三…｜4.1km", poster: "三亚有一起喝酒的吗", content: "想找附近朋友一起小聚，三亚夜晚还是要热闹一点。" },
        { id: "s2", title: "有人能干吗", authorName: "YAN", avatar: "Y", likes: 8, cls: "chatshot", avatarBg: "#eee", location: "三亚学院｜658m", poster: "有人能干吗", content: "三亚学院附近聊天截图，主打一个真实好笑。" },
        { id: "s3", title: "人大大二", authorName: "Zz", avatar: "Z", likes: 464, cls: "girl", avatarBg: "#e8c7c7", poster: "人大大二", content: "三亚本地日常随拍。" },
        { id: "s4", title: "三亚万科公园里急租 900/月", authorName: "天坛摄影春风", avatar: "天", likes: 7, cls: "room", avatarBg: "#b197fc", location: "万科公园里｜2.4km", poster: "急租 900/月", content: "万科公园里附近急租房源，适合短期过渡。" },
        { id: "s5", title: "办公室短租，离学校很近", authorName: "小红薯", avatar: "薯", likes: 3, cls: "office", avatarBg: "#ff2442", poster: "办公室短租", content: "离学校很近的办公室短租，适合临时办公。" }
      ];
      function loadNotes() {
        notes.value = getLocalNotes();
      }
      function switchChannel(key) {
        activeChannel.value = key;
        areaOpen.value = false;
      }
      function toggleArea() {
        areaOpen.value = !areaOpen.value;
      }
      function openNote(item) {
        uni.setStorageSync("current_note", {
          bg: "linear-gradient(145deg, #fff 0%, #ffecee 100%)",
          avatarBg: item.avatarBg || "#ff2442",
          poster: item.poster || item.title,
          content: item.content || item.title,
          ...item
        });
        uni.navigateTo({ url: "/pages/detail/detail" });
      }
      function useFallbackWorldcup() {
        worldcupImage.value = "/static/worldcup.jpg";
      }
      function openHomeMenu() {
        homeDrawerOpen.value = true;
      }
      function openDrawerPage(type) {
        homeDrawerOpen.value = false;
        uni.navigateTo({ url: `/pages/side/side?type=${type}` });
      }
      function openWallet() {
        homeDrawerOpen.value = false;
        uni.navigateTo({ url: "/pages/wallet/wallet" });
      }
      function startScan() {
        homeDrawerOpen.value = false;
        uni.scanCode({
          onlyFromCamera: false,
          scanType: ["qrCode", "barCode"],
          success: (res) => {
            uni.showModal({
              title: "扫码结果",
              content: res.result || "已识别",
              showCancel: false
            });
          },
          fail: () => {
            uni.showToast({ title: "扫码已取消", icon: "none" });
          }
        });
      }
      function openSearch() {
        uni.navigateTo({ url: "/pages/search/search" });
      }
      onLoad(loadNotes);
      onShow(loadNotes);
      const __returned__ = { channels, activeChannel, areaOpen, homeDrawerOpen, notes, worldcupImage, followNotes, sanyaNotes, loadNotes, switchChannel, toggleArea, openNote, useFallbackWorldcup, openHomeMenu, openDrawerPage, openWallet, startScan, openSearch, ref: vue.ref, get onLoad() {
        return onLoad;
      }, get onShow() {
        return onShow;
      }, BottomNav, get getLocalNotes() {
        return getLocalNotes;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createElementVNode("view", { class: "top-safe" }, [
        vue.createElementVNode("view", { class: "channel-row" }, [
          vue.createElementVNode("view", {
            class: "menu-icon",
            onClick: $setup.openHomeMenu
          }, [
            vue.createElementVNode("view"),
            vue.createElementVNode("view"),
            vue.createElementVNode("view")
          ]),
          (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.channels, (item) => {
              return vue.createElementVNode("text", {
                key: item.key,
                class: vue.normalizeClass(["channel", { active: $setup.activeChannel === item.key }]),
                onClick: ($event) => $setup.switchChannel(item.key)
              }, vue.toDisplayString(item.name), 11, ["onClick"]);
            }),
            64
            /* STABLE_FRAGMENT */
          )),
          vue.createElementVNode("view", {
            class: "search-icon",
            onClick: $setup.openSearch
          })
        ]),
        $setup.activeChannel === "sanya" ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "sanya-tabs"
        }, [
          vue.createElementVNode("view", {
            class: "area-trigger",
            onClick: $setup.toggleArea
          }, [
            vue.createTextVNode("全城 "),
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["area-arrow", { up: $setup.areaOpen }])
              },
              null,
              2
              /* CLASS */
            )
          ]),
          vue.createElementVNode("text", { class: "sub active" }, "推荐"),
          vue.createElementVNode("text", { class: "sub" }, "美食"),
          vue.createElementVNode("text", { class: "sub" }, "热门打卡地"),
          vue.createElementVNode("text", { class: "sub" }, "周末出行"),
          vue.createElementVNode("text", { class: "sub" }, "购物")
        ])) : vue.createCommentVNode("v-if", true)
      ]),
      vue.createElementVNode(
        "view",
        {
          class: vue.normalizeClass(["feed-scroll", { sanya: $setup.activeChannel === "sanya" }])
        },
        [
          $setup.activeChannel === "worldcup" ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "worldcup-page"
          }, [
            vue.createElementVNode("image", {
              class: "worldcup-img",
              src: $setup.worldcupImage,
              mode: "widthFix",
              onError: $setup.useFallbackWorldcup
            }, null, 40, ["src"])
          ])) : $setup.activeChannel === "follow" ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "masonry"
          }, [
            (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.followNotes, (item) => {
                return vue.createElementVNode("view", {
                  key: item.id,
                  class: "note-card",
                  onClick: ($event) => $setup.openNote(item)
                }, [
                  vue.createElementVNode(
                    "view",
                    {
                      class: vue.normalizeClass(["photo-cover", item.cls])
                    },
                    [
                      item.badge ? (vue.openBlock(), vue.createElementBlock("text", {
                        key: 0,
                        class: "video-badge"
                      })) : vue.createCommentVNode("v-if", true),
                      item.overlay ? (vue.openBlock(), vue.createElementBlock(
                        "text",
                        {
                          key: 1,
                          class: "cover-overlay"
                        },
                        vue.toDisplayString(item.overlay),
                        1
                        /* TEXT */
                      )) : vue.createCommentVNode("v-if", true)
                    ],
                    2
                    /* CLASS */
                  ),
                  vue.createElementVNode("view", { class: "note-body" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "note-title" },
                      vue.toDisplayString(item.title),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("view", { class: "author-row" }, [
                      vue.createElementVNode(
                        "view",
                        {
                          class: "avatar",
                          style: vue.normalizeStyle({ background: item.avatarBg })
                        },
                        vue.toDisplayString(item.avatar),
                        5
                        /* TEXT, STYLE */
                      ),
                      vue.createElementVNode("view", { class: "author-block" }, [
                        vue.createElementVNode(
                          "text",
                          { class: "author" },
                          vue.toDisplayString(item.authorName),
                          1
                          /* TEXT */
                        ),
                        vue.createElementVNode(
                          "text",
                          { class: "date" },
                          vue.toDisplayString(item.date),
                          1
                          /* TEXT */
                        )
                      ]),
                      vue.createElementVNode("view", { class: "like" }, [
                        vue.createElementVNode("view", { class: "heart-icon" }),
                        vue.createTextVNode(
                          vue.toDisplayString(item.likes),
                          1
                          /* TEXT */
                        )
                      ])
                    ])
                  ])
                ], 8, ["onClick"]);
              }),
              64
              /* STABLE_FRAGMENT */
            ))
          ])) : $setup.activeChannel === "sanya" ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 2,
            class: "masonry sanya-list"
          }, [
            (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.sanyaNotes, (item) => {
                return vue.createElementVNode("view", {
                  key: item.id,
                  class: "note-card",
                  onClick: ($event) => $setup.openNote(item)
                }, [
                  vue.createElementVNode(
                    "view",
                    {
                      class: vue.normalizeClass(["photo-cover", item.cls])
                    },
                    [
                      item.location ? (vue.openBlock(), vue.createElementBlock(
                        "text",
                        {
                          key: 0,
                          class: "location-pill"
                        },
                        vue.toDisplayString(item.location),
                        1
                        /* TEXT */
                      )) : vue.createCommentVNode("v-if", true),
                      item.overlay ? (vue.openBlock(), vue.createElementBlock(
                        "text",
                        {
                          key: 1,
                          class: "cover-overlay"
                        },
                        vue.toDisplayString(item.overlay),
                        1
                        /* TEXT */
                      )) : vue.createCommentVNode("v-if", true)
                    ],
                    2
                    /* CLASS */
                  ),
                  vue.createElementVNode("view", { class: "note-body" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "note-title" },
                      vue.toDisplayString(item.title),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("view", { class: "author-row" }, [
                      vue.createElementVNode(
                        "view",
                        {
                          class: "avatar",
                          style: vue.normalizeStyle({ background: item.avatarBg })
                        },
                        vue.toDisplayString(item.avatar),
                        5
                        /* TEXT, STYLE */
                      ),
                      vue.createElementVNode(
                        "text",
                        { class: "author" },
                        vue.toDisplayString(item.authorName),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode("view", { class: "like" }, [
                        vue.createElementVNode("view", { class: "heart-icon" }),
                        vue.createTextVNode(
                          vue.toDisplayString(item.likes),
                          1
                          /* TEXT */
                        )
                      ])
                    ])
                  ])
                ], 8, ["onClick"]);
              }),
              64
              /* STABLE_FRAGMENT */
            ))
          ])) : (vue.openBlock(), vue.createElementBlock("view", {
            key: 3,
            class: "masonry"
          }, [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.notes, (item) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  key: item.id,
                  class: "note-card",
                  onClick: ($event) => $setup.openNote(item)
                }, [
                  item.cover ? (vue.openBlock(), vue.createElementBlock("image", {
                    key: 0,
                    class: "image-cover",
                    src: item.cover,
                    mode: "aspectFill"
                  }, null, 8, ["src"])) : (vue.openBlock(), vue.createElementBlock(
                    "view",
                    {
                      key: 1,
                      class: "cover",
                      style: vue.normalizeStyle({ background: item.bg })
                    },
                    [
                      vue.createElementVNode(
                        "text",
                        { class: "cover-text" },
                        vue.toDisplayString(item.poster),
                        1
                        /* TEXT */
                      )
                    ],
                    4
                    /* STYLE */
                  )),
                  vue.createElementVNode("view", { class: "note-body" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "note-title" },
                      vue.toDisplayString(item.title),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("view", { class: "author-row" }, [
                      vue.createElementVNode(
                        "view",
                        {
                          class: "avatar",
                          style: vue.normalizeStyle({ background: item.avatarBg })
                        },
                        vue.toDisplayString(item.avatar),
                        5
                        /* TEXT, STYLE */
                      ),
                      vue.createElementVNode(
                        "text",
                        { class: "author" },
                        vue.toDisplayString(item.authorName),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode("view", { class: "like" }, [
                        vue.createElementVNode("view", { class: "heart-icon" }),
                        vue.createTextVNode(
                          vue.toDisplayString(item.likes),
                          1
                          /* TEXT */
                        )
                      ])
                    ])
                  ])
                ], 8, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            ))
          ])),
          vue.createElementVNode("view", { class: "bottom-space" })
        ],
        2
        /* CLASS */
      ),
      $setup.areaOpen ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "area-panel"
      }, [
        vue.createElementVNode("view", { class: "map-strip" }, [
          vue.createElementVNode("text", null, "地图探索"),
          vue.createElementVNode("text", null, "三亚⌁")
        ]),
        vue.createElementVNode("text", { class: "panel-title" }, "位置距离"),
        vue.createElementVNode("view", { class: "distance-row" }, [
          vue.createElementVNode("text", { class: "selected" }, "全城"),
          vue.createElementVNode("text", null, "1km"),
          vue.createElementVNode("text", null, "3km"),
          vue.createElementVNode("text", null, "5km")
        ]),
        vue.createElementVNode("view", { class: "districts" }, [
          vue.createElementVNode("view", { class: "left-list" }, [
            vue.createElementVNode("text", { class: "hot" }, "热门商圈"),
            vue.createElementVNode("text", null, "海棠区"),
            vue.createElementVNode("text", null, "吉阳区"),
            vue.createElementVNode("text", null, "天涯区"),
            vue.createElementVNode("text", null, "崖州区")
          ]),
          vue.createElementVNode("view", { class: "right-list" }, [
            vue.createElementVNode("text", null, "三亚湾"),
            vue.createElementVNode("text", null, "迎宾路"),
            vue.createElementVNode("text", null, "河西路"),
            vue.createElementVNode("text", null, "海韵路"),
            vue.createElementVNode("text", null, "海棠湾"),
            vue.createElementVNode("text", null, "河东路"),
            vue.createElementVNode("text", null, "金鸡岭"),
            vue.createElementVNode("text", null, "河西")
          ])
        ])
      ])) : vue.createCommentVNode("v-if", true),
      $setup.areaOpen ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "area-mask",
        onClick: _cache[0] || (_cache[0] = ($event) => $setup.areaOpen = false)
      })) : vue.createCommentVNode("v-if", true),
      $setup.homeDrawerOpen ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 2,
        class: "home-drawer-layer"
      }, [
        vue.createElementVNode("view", { class: "home-drawer" }, [
          vue.createElementVNode("view", { class: "home-drawer-head" }, [
            vue.createElementVNode("view", { class: "home-avatar" }, "小"),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("text", { class: "home-name" }, "小红薯 13"),
              vue.createElementVNode("text", { class: "home-id" }, "小红书号：94787774830")
            ])
          ]),
          vue.createElementVNode("view", { class: "home-menu-card" }, [
            vue.createElementVNode("view", {
              class: "home-menu-item",
              onClick: _cache[1] || (_cache[1] = ($event) => $setup.openDrawerPage("addFriend"))
            }, [
              vue.createElementVNode("view", { class: "home-side-icon add" }),
              vue.createElementVNode("text", null, "添加好友"),
              vue.createElementVNode("view", { class: "drawer-arrow" })
            ]),
            vue.createElementVNode("view", {
              class: "home-menu-item",
              onClick: _cache[2] || (_cache[2] = ($event) => $setup.openDrawerPage("creator"))
            }, [
              vue.createElementVNode("view", { class: "home-side-icon creator" }),
              vue.createElementVNode("text", null, "创作者中心"),
              vue.createElementVNode("view", { class: "drawer-arrow" })
            ]),
            vue.createElementVNode("view", {
              class: "home-menu-item",
              onClick: _cache[3] || (_cache[3] = ($event) => $setup.openDrawerPage("pro"))
            }, [
              vue.createElementVNode("view", { class: "home-side-icon pro" }),
              vue.createElementVNode("text", null, "升级为专业号"),
              vue.createElementVNode("view", { class: "drawer-arrow" })
            ])
          ]),
          vue.createElementVNode("view", { class: "home-menu-card" }, [
            vue.createElementVNode("view", {
              class: "home-menu-item",
              onClick: _cache[4] || (_cache[4] = ($event) => $setup.openDrawerPage("history"))
            }, [
              vue.createElementVNode("view", { class: "home-side-icon history" }),
              vue.createElementVNode("text", null, "浏览记录"),
              vue.createElementVNode("view", { class: "drawer-arrow" })
            ]),
            vue.createElementVNode("view", {
              class: "home-menu-item",
              onClick: _cache[5] || (_cache[5] = ($event) => $setup.openDrawerPage("orders"))
            }, [
              vue.createElementVNode("view", { class: "home-side-icon order" }),
              vue.createElementVNode("text", null, "订单"),
              vue.createElementVNode("view", { class: "drawer-arrow" })
            ]),
            vue.createElementVNode("view", {
              class: "home-menu-item",
              onClick: $setup.openWallet
            }, [
              vue.createElementVNode("view", { class: "home-side-icon wallet" }),
              vue.createElementVNode("text", null, "钱包"),
              vue.createElementVNode("view", { class: "drawer-arrow" })
            ])
          ]),
          vue.createElementVNode("view", { class: "home-menu-card" }, [
            vue.createElementVNode("view", {
              class: "home-menu-item",
              onClick: _cache[6] || (_cache[6] = ($event) => $setup.openDrawerPage("mini"))
            }, [
              vue.createElementVNode("view", { class: "home-side-icon mini" }),
              vue.createElementVNode("text", null, "小程序"),
              vue.createElementVNode("view", { class: "drawer-arrow" })
            ]),
            vue.createElementVNode("view", {
              class: "home-menu-item",
              onClick: _cache[7] || (_cache[7] = ($event) => $setup.openDrawerPage("moment"))
            }, [
              vue.createElementVNode("view", { class: "home-side-icon moment" }),
              vue.createElementVNode("text", null, "瞬间"),
              vue.createElementVNode("view", { class: "drawer-arrow" })
            ])
          ]),
          vue.createElementVNode("view", { class: "home-drawer-bottom" }, [
            vue.createElementVNode("view", { onClick: $setup.startScan }, [
              vue.createElementVNode("view", { class: "round" }, [
                vue.createElementVNode("view", { class: "scan-mini" })
              ]),
              vue.createElementVNode("text", null, "扫一扫")
            ]),
            vue.createElementVNode("view", {
              onClick: _cache[8] || (_cache[8] = ($event) => $setup.openDrawerPage("help"))
            }, [
              vue.createElementVNode("view", { class: "round" }, [
                vue.createElementVNode("view", { class: "help-mini" })
              ]),
              vue.createElementVNode("text", null, "帮助与客服")
            ]),
            vue.createElementVNode("view", {
              onClick: _cache[9] || (_cache[9] = ($event) => $setup.openDrawerPage("settings"))
            }, [
              vue.createElementVNode("view", { class: "round" }, [
                vue.createElementVNode("view", { class: "setting-mini" })
              ]),
              vue.createElementVNode("text", null, "设置")
            ])
          ])
        ]),
        vue.createElementVNode("view", {
          class: "home-drawer-mask",
          onClick: _cache[10] || (_cache[10] = ($event) => $setup.homeDrawerOpen = false)
        })
      ])) : vue.createCommentVNode("v-if", true),
      vue.createVNode($setup["BottomNav"], { active: "home" })
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$e], ["__scopeId", "data-v-1cf27b2a"], ["__file", "C:/Users/10038/Documents/Codex/2026-06-12/app-c-users-10038-downloads-nuxt3/outputs/xhs-uniapp-apk/pages/index/index.vue"]]);
  const _sfc_main$d = {
    __name: "market",
    setup(__props, { expose: __expose }) {
      __expose();
      const tabs = ["推荐", "66周年庆", "穿搭", "运动", "食饮", "生鲜", "潮玩"];
      const tools = [
        { name: "直播广场", type: "live" },
        { name: "星光夜市", type: "night" },
        { name: "美妙商店", type: "shop" },
        { name: "好货市场", type: "box" },
        { name: "宠粉清单", type: "coupon" },
        { name: "我的订单", type: "order" },
        { name: "购物车", type: "cart" },
        { name: "优惠券", type: "ticket", badge: "45元券" },
        { name: "客服消息", type: "chat" },
        { name: "商品足迹", type: "foot" }
      ];
      const goods = [
        {
          id: 1,
          title: "我选择绿柚叶 作为我的解药",
          price: "25.8",
          sold: "8.9万+",
          shop: "小葵的草木手作",
          likes: 1670,
          poster: "低能量姐妹\n多用绿柚叶",
          bg: "linear-gradient(145deg, #eff8df 0%, #6f8d54 100%)"
        },
        {
          id: 2,
          title: "这件T恤，是我的衣柜定海神针",
          price: "146",
          sold: "80",
          shop: "GIRDEAR AMASS",
          likes: 2,
          poster: "草莓T恤\n夏日穿搭",
          bg: "linear-gradient(145deg, #ffd9d0 0%, #c98d81 100%)"
        },
        {
          id: 3,
          title: "毛绒挂件可爱到不想摘",
          price: "39.9",
          sold: "1.2万+",
          shop: "奶油小铺",
          likes: 421,
          poster: "毛绒\n挂件",
          bg: "linear-gradient(145deg, #f6f6f6 0%, #cfcfcf 100%)"
        },
        {
          id: 4,
          title: "直播中同款车载香氛",
          price: "59",
          sold: "2600+",
          shop: "清晨车品",
          likes: 89,
          poster: "直播中\n香氛",
          bg: "linear-gradient(145deg, #e0f7fa 0%, #7ccbd7 100%)"
        }
      ];
      const __returned__ = { tabs, tools, goods, BottomNav };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createElementVNode("view", { class: "market-head" }, [
        vue.createElementVNode("view", { class: "search-box" }, [
          vue.createElementVNode("text", { class: "placeholder" }, "休闲裤"),
          vue.createElementVNode("view", { class: "search-right" }, [
            vue.createElementVNode("view", { class: "camera-icon" }),
            vue.createElementVNode("view", { class: "divider" }),
            vue.createElementVNode("text", { class: "search-text" }, "搜索")
          ])
        ]),
        vue.createElementVNode("scroll-view", {
          "scroll-x": "",
          class: "tabs",
          "show-scrollbar": "false"
        }, [
          (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.tabs, (tab) => {
              return vue.createElementVNode(
                "text",
                {
                  key: tab,
                  class: vue.normalizeClass(["tab", { active: tab === "推荐" }])
                },
                vue.toDisplayString(tab),
                3
                /* TEXT, CLASS */
              );
            }),
            64
            /* STABLE_FRAGMENT */
          ))
        ])
      ]),
      vue.createElementVNode("view", { class: "content-scroll" }, [
        vue.createElementVNode("view", { class: "icon-grid" }, [
          (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.tools, (item) => {
              return vue.createElementVNode("view", {
                key: item.name,
                class: "tool"
              }, [
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["tool-icon", item.type])
                  },
                  [
                    item.badge ? (vue.openBlock(), vue.createElementBlock(
                      "view",
                      {
                        key: 0,
                        class: "tool-badge"
                      },
                      vue.toDisplayString(item.badge),
                      1
                      /* TEXT */
                    )) : vue.createCommentVNode("v-if", true),
                    vue.createElementVNode("view", { class: "icon-shape" })
                  ],
                  2
                  /* CLASS */
                ),
                vue.createElementVNode(
                  "text",
                  null,
                  vue.toDisplayString(item.name),
                  1
                  /* TEXT */
                )
              ]);
            }),
            64
            /* STABLE_FRAGMENT */
          ))
        ]),
        vue.createElementVNode("view", { class: "goods-grid" }, [
          (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.goods, (item) => {
              return vue.createElementVNode("view", {
                key: item.id,
                class: "goods-card"
              }, [
                vue.createElementVNode(
                  "view",
                  {
                    class: "goods-cover",
                    style: vue.normalizeStyle({ background: item.bg })
                  },
                  [
                    vue.createElementVNode(
                      "text",
                      { class: "goods-poster" },
                      vue.toDisplayString(item.poster),
                      1
                      /* TEXT */
                    )
                  ],
                  4
                  /* STYLE */
                ),
                vue.createElementVNode("view", { class: "price-row" }, [
                  vue.createElementVNode(
                    "view",
                    {
                      class: "mini-img",
                      style: vue.normalizeStyle({ background: item.bg })
                    },
                    null,
                    4
                    /* STYLE */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "price" },
                    "¥" + vue.toDisplayString(item.price),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "sold" },
                    "已售 " + vue.toDisplayString(item.sold),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode(
                  "text",
                  { class: "goods-title" },
                  vue.toDisplayString(item.title),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("view", { class: "shop-row" }, [
                  vue.createElementVNode(
                    "view",
                    { class: "shop-avatar" },
                    vue.toDisplayString(item.shop.slice(0, 1)),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "shop-name" },
                    vue.toDisplayString(item.shop),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("view", { class: "like" }, [
                    vue.createElementVNode("view", { class: "heart-icon" }),
                    vue.createTextVNode(
                      vue.toDisplayString(item.likes),
                      1
                      /* TEXT */
                    )
                  ])
                ])
              ]);
            }),
            64
            /* STABLE_FRAGMENT */
          ))
        ]),
        vue.createElementVNode("view", { class: "bottom-space" })
      ]),
      vue.createVNode($setup["BottomNav"], { active: "market" })
    ]);
  }
  const PagesMarketMarket = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$d], ["__scopeId", "data-v-8b43de22"], ["__file", "C:/Users/10038/Documents/Codex/2026-06-12/app-c-users-10038-downloads-nuxt3/outputs/xhs-uniapp-apk/pages/market/market.vue"]]);
  const _sfc_main$c = {
    __name: "note",
    setup(__props, { expose: __expose }) {
      __expose();
      const image = vue.ref("");
      const title = vue.ref("");
      const content = vue.ref("");
      function chooseImage() {
        uni.chooseImage({
          count: 1,
          success: (res) => {
            image.value = res.tempFilePaths[0];
          }
        });
      }
      function submit() {
        if (!title.value.trim()) {
          uni.showToast({ title: "请填写标题", icon: "none" });
          return;
        }
        saveLocalNote({
          title: title.value,
          content: content.value,
          cover: image.value || "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&w=800&q=80"
        });
        title.value = "";
        content.value = "";
        image.value = "";
        uni.showToast({
          title: "已保存到本地",
          icon: "success"
        });
        setTimeout(() => uni.redirectTo({ url: "/pages/index/index" }), 600);
      }
      const __returned__ = { image, title, content, chooseImage, submit, ref: vue.ref, get saveLocalNote() {
        return saveLocalNote;
      }, BottomNav };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "safe-page" }, [
      vue.createElementVNode("view", { class: "panel" }, [
        vue.createElementVNode("text", { class: "title" }, "发布笔记"),
        vue.createElementVNode("view", {
          class: "uploader",
          onClick: $setup.chooseImage
        }, [
          $setup.image ? (vue.openBlock(), vue.createElementBlock("image", {
            key: 0,
            class: "preview",
            src: $setup.image,
            mode: "aspectFill"
          }, null, 8, ["src"])) : (vue.openBlock(), vue.createElementBlock("text", {
            key: 1,
            class: "upload-text"
          }, "选择图片"))
        ]),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.title = $event),
            class: "input",
            placeholder: "填写标题"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $setup.title]
        ]),
        vue.withDirectives(vue.createElementVNode(
          "textarea",
          {
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.content = $event),
            class: "textarea",
            placeholder: "分享你的生活经验"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $setup.content]
        ]),
        vue.createElementVNode("button", {
          class: "primary-button",
          onClick: $setup.submit
        }, "发布笔记")
      ]),
      vue.createVNode($setup["BottomNav"], { active: "note" })
    ]);
  }
  const PagesNoteNote = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$c], ["__scopeId", "data-v-f9d84dbe"], ["__file", "C:/Users/10038/Documents/Codex/2026-06-12/app-c-users-10038-downloads-nuxt3/outputs/xhs-uniapp-apk/pages/note/note.vue"]]);
  const _sfc_main$b = {
    __name: "message",
    setup(__props, { expose: __expose }) {
      __expose();
      const users = vue.ref(mockUsers.map((user) => ({ ...user, followed: false })));
      function toggleFollow(user) {
        user.followed = !user.followed;
      }
      function openMessageBox(type) {
        uni.navigateTo({ url: `/pages/message-detail/message-detail?type=${type}` });
      }
      const __returned__ = { users, toggleFollow, openMessageBox, ref: vue.ref, BottomNav, get mockUsers() {
        return mockUsers;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createElementVNode("view", { class: "title-row" }, [
        vue.createElementVNode("view"),
        vue.createElementVNode("text", { class: "page-title" }, "消息"),
        vue.createElementVNode("view", { class: "actions" }, [
          vue.createElementVNode("view", { class: "search-icon" }),
          vue.createElementVNode("view", { class: "circle-plus" })
        ])
      ]),
      vue.createElementVNode("view", { class: "quick-row" }, [
        vue.createElementVNode("view", {
          class: "quick-item",
          onClick: _cache[0] || (_cache[0] = ($event) => $setup.openMessageBox("likes"))
        }, [
          vue.createElementVNode("view", { class: "quick-icon heart" }, [
            vue.createElementVNode("view", { class: "heart-shape" })
          ]),
          vue.createElementVNode("text", null, "赞和收藏")
        ]),
        vue.createElementVNode("view", {
          class: "quick-item",
          onClick: _cache[1] || (_cache[1] = ($event) => $setup.openMessageBox("follows"))
        }, [
          vue.createElementVNode("view", { class: "quick-icon follow" }, [
            vue.createElementVNode("view", { class: "person-shape" })
          ]),
          vue.createElementVNode("text", null, "新增关注")
        ]),
        vue.createElementVNode("view", {
          class: "quick-item",
          onClick: _cache[2] || (_cache[2] = ($event) => $setup.openMessageBox("comments"))
        }, [
          vue.createElementVNode("view", { class: "quick-icon comment" }, [
            vue.createElementVNode("view", { class: "chat-shape" })
          ]),
          vue.createElementVNode("text", null, "评论和 @")
        ])
      ]),
      vue.createElementVNode("view", { class: "activity" }, [
        vue.createElementVNode("view", { class: "activity-icon" }, [
          vue.createElementVNode("view", { class: "message-shape" })
        ]),
        vue.createElementVNode("view", { class: "activity-main" }, [
          vue.createElementVNode("text", { class: "activity-title" }, "活动消息"),
          vue.createElementVNode("text", { class: "activity-desc" }, "欢迎登录！一起来探索最近的火爆内容")
        ]),
        vue.createElementVNode("view", { class: "activity-side" }, [
          vue.createElementVNode("text", null, "星期日"),
          vue.createElementVNode("view", { class: "red-dot" })
        ])
      ]),
      vue.createElementVNode("view", { class: "recommend-head" }, [
        vue.createElementVNode("text", null, "你可能感兴趣的人"),
        vue.createElementVNode("text", null, "关闭")
      ]),
      vue.createElementVNode("view", { class: "user-list" }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.users, (user) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: user.name,
              class: "user-row"
            }, [
              vue.createElementVNode(
                "view",
                {
                  class: "avatar",
                  style: vue.normalizeStyle({ background: user.bg })
                },
                vue.toDisplayString(user.avatar),
                5
                /* TEXT, STYLE */
              ),
              vue.createElementVNode("view", { class: "user-main" }, [
                vue.createElementVNode("view", { class: "name-line" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "user-name" },
                    vue.toDisplayString(user.name),
                    1
                    /* TEXT */
                  ),
                  user.verified ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "verify-icon"
                  })) : vue.createCommentVNode("v-if", true)
                ]),
                vue.createElementVNode(
                  "text",
                  { class: "user-desc" },
                  vue.toDisplayString(user.desc),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("button", {
                class: vue.normalizeClass(["follow-btn", { followed: user.followed }]),
                onClick: vue.withModifiers(($event) => $setup.toggleFollow(user), ["stop"])
              }, vue.toDisplayString(user.followed ? "已关注" : "关注"), 11, ["onClick"]),
              vue.createElementVNode("view", { class: "close-icon" })
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      vue.createVNode($setup["BottomNav"], { active: "message" })
    ]);
  }
  const PagesMessageMessage = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b], ["__scopeId", "data-v-4c1b26cf"], ["__file", "C:/Users/10038/Documents/Codex/2026-06-12/app-c-users-10038-downloads-nuxt3/outputs/xhs-uniapp-apk/pages/message/message.vue"]]);
  const _sfc_main$a = {
    __name: "message-detail",
    setup(__props, { expose: __expose }) {
      __expose();
      const type = vue.ref("likes");
      const pageTitle = vue.computed(() => {
        if (type.value === "follows")
          return "新增关注";
        if (type.value === "comments")
          return "评论和 @";
        return "赞和收藏";
      });
      const likes = [
        { name: "小满", action: "赞了你的笔记", note: "周末城市散步路线", time: "刚刚", avatar: "满", bg: "#ff6f7d", kind: "photo", mark: "图" },
        { name: "阿青", action: "收藏了你的笔记", note: "低成本卧室改造", time: "12 分钟前", avatar: "青", bg: "#61a5ff", kind: "room", mark: "藏" },
        { name: "七七", action: "赞了你的笔记", note: "新手也能做的番茄意面", time: "今天 09:20", avatar: "七", bg: "#ffc05c", kind: "food", mark: "赞" }
      ];
      const follows = vue.ref([
        { name: "安行 趣玩分享", desc: "票务代理", avatar: "安", bg: "#7bb6ff", verified: true, followed: false },
        { name: "媛媛到处玩", desc: "咨询公司", avatar: "媛", bg: "#8bd67a", verified: true, followed: false },
        { name: "三亚学院小贝学姐", desc: "教育内容热门作者", avatar: "贝", bg: "#ff8f70", verified: false, followed: false },
        { name: "sage_zhou", desc: "美食内容热门作者", avatar: "s", bg: "#a9a9a9", verified: false, followed: false }
      ]);
      const comments = [
        { name: "南栀", action: "评论了你的笔记", content: "这个路线好实用，周末就去试试", note: "周末城市散步路线", time: "2 分钟前", avatar: "南", bg: "#ff7a9a", kind: "photo", mark: "评" },
        { name: "刘霞", action: "@ 了你", content: "@小红薯 13 这个是不是你上次说的？", note: "下一个风口就是：深圳 + 跨境", time: "18 分钟前", avatar: "刘", bg: "#111", kind: "text", mark: "@" },
        { name: "奶味仙女棒", action: "回复了你", content: "谢谢分享，已经收藏啦", note: "精致手 花钱手 顾家手", time: "昨天", avatar: "奶", bg: "#d7a4ff", kind: "hand", mark: "回" }
      ];
      function toggleFollow(user) {
        user.followed = !user.followed;
      }
      function goBack() {
        uni.navigateBack({ fail: () => uni.redirectTo({ url: "/pages/message/message" }) });
      }
      onLoad((query) => {
        type.value = query.type || "likes";
      });
      const __returned__ = { type, pageTitle, likes, follows, comments, toggleFollow, goBack, computed: vue.computed, ref: vue.ref, get onLoad() {
        return onLoad;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createElementVNode("view", { class: "nav" }, [
        vue.createElementVNode("view", {
          class: "back-icon",
          onClick: $setup.goBack
        }),
        vue.createElementVNode(
          "text",
          { class: "title" },
          vue.toDisplayString($setup.pageTitle),
          1
          /* TEXT */
        ),
        vue.createElementVNode("view")
      ]),
      $setup.type === "likes" ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "message-list"
      }, [
        (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.likes, (item) => {
            return vue.createElementVNode("view", {
              key: item.name + item.action,
              class: "notice-row"
            }, [
              vue.createElementVNode(
                "view",
                {
                  class: "avatar",
                  style: vue.normalizeStyle({ background: item.bg })
                },
                vue.toDisplayString(item.avatar),
                5
                /* TEXT, STYLE */
              ),
              vue.createElementVNode("view", { class: "notice-main" }, [
                vue.createElementVNode("view", { class: "name-line" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "name" },
                    vue.toDisplayString(item.name),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "action" },
                    vue.toDisplayString(item.action),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode(
                  "text",
                  { class: "desc" },
                  vue.toDisplayString(item.note),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "text",
                  { class: "time" },
                  vue.toDisplayString(item.time),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["thumb", item.kind])
                },
                vue.toDisplayString(item.mark),
                3
                /* TEXT, CLASS */
              )
            ]);
          }),
          64
          /* STABLE_FRAGMENT */
        ))
      ])) : $setup.type === "follows" ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 1,
        class: "message-list"
      }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.follows, (user) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: user.name,
              class: "follow-row"
            }, [
              vue.createElementVNode(
                "view",
                {
                  class: "avatar",
                  style: vue.normalizeStyle({ background: user.bg })
                },
                vue.toDisplayString(user.avatar),
                5
                /* TEXT, STYLE */
              ),
              vue.createElementVNode("view", { class: "notice-main" }, [
                vue.createElementVNode("view", { class: "name-line" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "name" },
                    vue.toDisplayString(user.name),
                    1
                    /* TEXT */
                  ),
                  user.verified ? (vue.openBlock(), vue.createElementBlock("view", {
                    key: 0,
                    class: "verify-icon"
                  })) : vue.createCommentVNode("v-if", true)
                ]),
                vue.createElementVNode(
                  "text",
                  { class: "desc" },
                  vue.toDisplayString(user.desc),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("button", {
                class: vue.normalizeClass(["follow-btn", { followed: user.followed }]),
                onClick: vue.withModifiers(($event) => $setup.toggleFollow(user), ["stop"])
              }, vue.toDisplayString(user.followed ? "已关注" : "关注"), 11, ["onClick"])
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])) : (vue.openBlock(), vue.createElementBlock("view", {
        key: 2,
        class: "message-list"
      }, [
        (vue.openBlock(), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.comments, (item) => {
            return vue.createElementVNode("view", {
              key: item.name + item.content,
              class: "notice-row"
            }, [
              vue.createElementVNode(
                "view",
                {
                  class: "avatar",
                  style: vue.normalizeStyle({ background: item.bg })
                },
                vue.toDisplayString(item.avatar),
                5
                /* TEXT, STYLE */
              ),
              vue.createElementVNode("view", { class: "notice-main" }, [
                vue.createElementVNode("view", { class: "name-line" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "name" },
                    vue.toDisplayString(item.name),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "action" },
                    vue.toDisplayString(item.action),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode(
                  "text",
                  { class: "comment-text" },
                  vue.toDisplayString(item.content),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "text",
                  { class: "desc" },
                  vue.toDisplayString(item.note),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "text",
                  { class: "time" },
                  vue.toDisplayString(item.time),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["thumb", item.kind])
                },
                vue.toDisplayString(item.mark),
                3
                /* TEXT, CLASS */
              )
            ]);
          }),
          64
          /* STABLE_FRAGMENT */
        ))
      ]))
    ]);
  }
  const PagesMessageDetailMessageDetail = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a], ["__scopeId", "data-v-70fdb6c2"], ["__file", "C:/Users/10038/Documents/Codex/2026-06-12/app-c-users-10038-downloads-nuxt3/outputs/xhs-uniapp-apk/pages/message-detail/message-detail.vue"]]);
  const _sfc_main$9 = {
    __name: "search",
    setup(__props, { expose: __expose }) {
      __expose();
      const keyword = vue.ref("");
      const notes = vue.ref([]);
      const results = vue.ref([]);
      function normalize(value) {
        return String(value || "").trim().toLowerCase();
      }
      function loadNotes() {
        notes.value = getLocalNotes();
        runSearch();
      }
      function runSearch() {
        const key = normalize(keyword.value);
        if (!key) {
          results.value = [];
          return;
        }
        results.value = notes.value.filter((item) => {
          const target = [
            item.title,
            item.authorName,
            item.content,
            item.poster
          ].map(normalize).join(" ");
          return target.includes(key);
        });
      }
      function clearKeyword() {
        keyword.value = "";
        results.value = [];
      }
      function openNote(item) {
        uni.setStorageSync("current_note", item);
        uni.navigateTo({ url: "/pages/detail/detail" });
      }
      function goBack() {
        uni.navigateBack({
          fail: () => uni.redirectTo({ url: "/pages/index/index" })
        });
      }
      onLoad(loadNotes);
      onShow(loadNotes);
      const __returned__ = { keyword, notes, results, normalize, loadNotes, runSearch, clearKeyword, openNote, goBack, ref: vue.ref, get onLoad() {
        return onLoad;
      }, get onShow() {
        return onShow;
      }, get getLocalNotes() {
        return getLocalNotes;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createElementVNode("view", { class: "top-bar" }, [
        vue.createElementVNode("view", {
          class: "back-icon",
          onClick: $setup.goBack
        }),
        vue.createElementVNode("view", { class: "search-box" }, [
          vue.createElementVNode("view", { class: "search-icon" }),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.keyword = $event),
              class: "search-input",
              "confirm-type": "search",
              focus: "",
              placeholder: "搜索本地笔记",
              "placeholder-class": "placeholder",
              onConfirm: $setup.runSearch,
              onInput: $setup.runSearch
            },
            null,
            544
            /* NEED_HYDRATION, NEED_PATCH */
          ), [
            [vue.vModelText, $setup.keyword]
          ]),
          $setup.keyword ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "clear-icon",
            onClick: $setup.clearKeyword
          })) : vue.createCommentVNode("v-if", true)
        ]),
        vue.createElementVNode("text", {
          class: "cancel",
          onClick: $setup.goBack
        }, "取消")
      ]),
      vue.createElementVNode("view", { class: "content" }, [
        !$setup.keyword ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "tips"
        }, [
          vue.createElementVNode("text", { class: "tips-title" }, "搜索本地文章"),
          vue.createElementVNode("text", { class: "tips-desc" }, "可以搜索标题、作者和正文内容")
        ])) : $setup.results.length ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "result-list"
        }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.results, (item) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: item.id,
                class: "result-card",
                onClick: ($event) => $setup.openNote(item)
              }, [
                item.cover ? (vue.openBlock(), vue.createElementBlock("image", {
                  key: 0,
                  class: "thumb",
                  src: item.cover,
                  mode: "aspectFill"
                }, null, 8, ["src"])) : (vue.openBlock(), vue.createElementBlock(
                  "view",
                  {
                    key: 1,
                    class: "poster",
                    style: vue.normalizeStyle({ background: item.bg })
                  },
                  [
                    vue.createElementVNode(
                      "text",
                      null,
                      vue.toDisplayString(item.poster),
                      1
                      /* TEXT */
                    )
                  ],
                  4
                  /* STYLE */
                )),
                vue.createElementVNode("view", { class: "result-body" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "result-title" },
                    vue.toDisplayString(item.title),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "result-content" },
                    vue.toDisplayString(item.content || "暂无正文"),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("view", { class: "meta-row" }, [
                    vue.createElementVNode(
                      "view",
                      {
                        class: "avatar",
                        style: vue.normalizeStyle({ background: item.avatarBg })
                      },
                      vue.toDisplayString(item.avatar),
                      5
                      /* TEXT, STYLE */
                    ),
                    vue.createElementVNode(
                      "text",
                      { class: "author" },
                      vue.toDisplayString(item.authorName),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("view", { class: "heart-icon" }),
                    vue.createElementVNode(
                      "text",
                      { class: "likes" },
                      vue.toDisplayString(item.likes),
                      1
                      /* TEXT */
                    )
                  ])
                ])
              ], 8, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])) : (vue.openBlock(), vue.createElementBlock("view", {
          key: 2,
          class: "empty"
        }, [
          vue.createElementVNode("view", { class: "empty-icon" }, [
            vue.createElementVNode("view", { class: "search-icon large" })
          ]),
          vue.createElementVNode("text", { class: "empty-title" }, "没有搜到相关笔记"),
          vue.createElementVNode("text", { class: "empty-desc" }, "换个关键词试试")
        ]))
      ])
    ]);
  }
  const PagesSearchSearch = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9], ["__scopeId", "data-v-c10c040c"], ["__file", "C:/Users/10038/Documents/Codex/2026-06-12/app-c-users-10038-downloads-nuxt3/outputs/xhs-uniapp-apk/pages/search/search.vue"]]);
  const _sfc_main$8 = {
    __name: "wallet",
    setup(__props, { expose: __expose }) {
      __expose();
      function goBack() {
        uni.navigateBack({
          fail: () => uni.redirectTo({ url: "/pages/me/me" })
        });
      }
      const __returned__ = { goBack };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createElementVNode("view", { class: "nav" }, [
        vue.createElementVNode("view", {
          class: "back-icon",
          onClick: $setup.goBack
        }),
        vue.createElementVNode("text", { class: "title" }, "我的钱包"),
        vue.createElementVNode("text", { class: "setting" }, "设置")
      ]),
      vue.createElementVNode("view", { class: "asset-card" }, [
        vue.createElementVNode("view", { class: "asset-label" }, [
          vue.createElementVNode("text", null, "我的资产"),
          vue.createElementVNode("view", { class: "eye-icon" })
        ]),
        vue.createElementVNode("view", { class: "money-row" }, [
          vue.createElementVNode("text", { class: "currency" }, "¥"),
          vue.createElementVNode("text", { class: "amount" }, "0"),
          vue.createElementVNode("text", { class: "decimal" }, ".00")
        ]),
        vue.createElementVNode("view", { class: "card-arrow" })
      ]),
      vue.createElementVNode("view", { class: "wallet-list" }, [
        vue.createElementVNode("view", { class: "wallet-row" }, [
          vue.createElementVNode("view", { class: "row-icon coin-icon" }, [
            vue.createElementVNode("view")
          ]),
          vue.createElementVNode("view", { class: "row-main" }, [
            vue.createElementVNode("text", { class: "row-num" }, "0"),
            vue.createElementVNode("text", { class: "row-label" }, "薯币")
          ]),
          vue.createElementVNode("text", { class: "row-action" }, "充值"),
          vue.createElementVNode("view", { class: "right-arrow" })
        ]),
        vue.createElementVNode("view", { class: "wallet-row" }, [
          vue.createElementVNode("view", { class: "row-icon coupon-icon" }, [
            vue.createElementVNode("view")
          ]),
          vue.createElementVNode("view", { class: "row-main" }, [
            vue.createElementVNode("text", { class: "row-num" }, "0"),
            vue.createElementVNode("text", { class: "row-label" }, "优惠券（张）")
          ]),
          vue.createElementVNode("text", { class: "row-action" }, "详情"),
          vue.createElementVNode("view", { class: "right-arrow" })
        ]),
        vue.createElementVNode("view", { class: "wallet-row" }, [
          vue.createElementVNode("view", { class: "row-icon packet-icon" }, [
            vue.createElementVNode("view")
          ]),
          vue.createElementVNode("view", { class: "row-main" }, [
            vue.createElementVNode("text", { class: "row-num" }, [
              vue.createElementVNode("text", { class: "small-yuan" }, "¥"),
              vue.createTextVNode("0")
            ]),
            vue.createElementVNode("text", { class: "row-label" }, "购物红包")
          ]),
          vue.createElementVNode("text", { class: "row-action" }, "详情"),
          vue.createElementVNode("view", { class: "right-arrow" })
        ])
      ])
    ]);
  }
  const PagesWalletWallet = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8], ["__scopeId", "data-v-4c380209"], ["__file", "C:/Users/10038/Documents/Codex/2026-06-12/app-c-users-10038-downloads-nuxt3/outputs/xhs-uniapp-apk/pages/wallet/wallet.vue"]]);
  const _sfc_main$7 = {
    __name: "side",
    setup(__props, { expose: __expose }) {
      __expose();
      const type = vue.ref("addFriend");
      const titles = {
        addFriend: "添加好友",
        creator: "",
        pro: "升级专业号",
        draft: "本地草稿",
        activity: "我的活动",
        history: "浏览记录",
        download: "我的下载",
        orders: "",
        cart: "购物车",
        mini: "小程序",
        moment: "",
        scan: "",
        help: "帮助与客服",
        settings: "设置"
      };
      const title = vue.computed(() => titles[type.value] || "");
      const friendUsers = vue.ref([
        { name: "两个半 (^L^)", desc: "通讯录好友", avatar: "两", bg: "#d9a16f", followed: false },
        { name: "ijinu.（和勋灿嘟对视 10086…", desc: "1 个共同好友", avatar: "i", bg: "#c8c8c8", followed: false },
        { name: "Sgr08-FF", desc: "1 个共同好友", avatar: "S", bg: "#e9b4a7", followed: false }
      ]);
      const creatorServices = [
        { name: "活动中心", cls: "flag-service" },
        { name: "成长中心", cls: "grow-service" },
        { name: "作者邀约", cls: "invite-service" },
        { name: "主播中心", cls: "host-service" },
        { name: "创作学院", cls: "school-service" }
      ];
      const orders = [
        { shop: "小虫快跑的店", status: "已完成", img: "药", title: "【长效杀蟑 180天】蟑螂药家用强效...", desc: "2 盒装｜局部适用", tag: "极速退款  7天无理由退货", price: "¥12.8" },
        { shop: "Sherryy 的店", status: "已取消", img: "书", title: "概率论完整版，从第一章到第七章，可...", desc: "电子资料｜学习笔记", tag: "极速退款成功 已退回原支付账号", price: "¥1" }
      ];
      const miniApps = [
        { name: "当家家装小程序", desc: "装修找工长找工匠就用当家家装", used: "164 人最近使用过", cls: "home-app" },
        { name: "当家 APP", desc: "没有装修公司赚差价", used: "116 人最近使用过", cls: "rocket-app" },
        { name: "公考小百科", desc: "为公职类考试的考生提供咨询", used: "5400 人最近使用过", cls: "book-app" },
        { name: "碰碰火 优选团购", desc: "幼小衔接｜书法｜拼音｜美术教材课件", used: "264 人最近使用过", cls: "group-app" },
        { name: "秀动", desc: "太合音乐集团旗下音乐现场", used: "2.9 万人最近使用过", cls: "show-app" }
      ];
      const helpTools = [
        { name: "账号检测", cls: "account-help" },
        { name: "笔记申诉", cls: "appeal-help" },
        { name: "开通店铺", cls: "shop-help" },
        { name: "售后退款", cls: "refund-help" },
        { name: "券和福利", cls: "coupon-help" },
        { name: "找回账号", cls: "find-help" },
        { name: "账号与安全", cls: "safe-help" },
        { name: "查看物流", cls: "truck-help" },
        { name: "价保中心", cls: "price-help" },
        { name: "买贵必赔", cls: "shield-help" }
      ];
      const questions = ["笔记审核时效是多久", "视频互动栏怎么切换到底部?", "如何开通直播权限?", "笔记被判定违反社区规范第四条是什么意思?", "如何变更或解绑小红书的实名认证?", "如何找回小红书账号?", "如何开通买手权限为他人带货", "小红书开店的费用是多少?", "商家一直不发货怎么办?"];
      const settings = [
        [{ name: "账号与安全", cls: "user-set" }, { name: "通用设置", cls: "gear-set" }, { name: "通知设置", cls: "bell-set" }, { name: "多语言和翻译", cls: "translate-set" }, { name: "隐私设置", cls: "lock-set" }],
        [{ name: "存储空间", value: "809.2 MB", cls: "trash-set" }, { name: "内容偏好调节", cls: "note-set" }, { name: "收货地址", cls: "pin-set" }, { name: "添加小组件", cls: "grid-set" }, { name: "未成年人模式", value: "未开启", cls: "umbrella-set" }],
        [{ name: "新功能体验", cls: "flask-set" }],
        [{ name: "帮助与客服", cls: "headset-set" }, { name: "关于小红书", cls: "info-set" }]
      ];
      function goBack() {
        uni.navigateBack({ fail: () => uni.redirectTo({ url: "/pages/me/me" }) });
      }
      function toggleFollow(user) {
        user.followed = !user.followed;
      }
      function isFinder(row, col, startRow, startCol) {
        const r = row - startRow;
        const c = col - startCol;
        if (r < 0 || c < 0 || r > 6 || c > 6)
          return false;
        return r === 0 || r === 6 || c === 0 || c === 6 || r >= 2 && r <= 4 && c >= 2 && c <= 4;
      }
      function isQrOn(index) {
        const i = index - 1;
        const row = Math.floor(i / 25);
        const col = i % 25;
        if (isFinder(row, col, 0, 0) || isFinder(row, col, 0, 18) || isFinder(row, col, 18, 0))
          return true;
        if (row === 7 && col < 8 || col === 7 && row < 8 || row === 7 && col > 16 || col === 17 && row < 8)
          return false;
        if (row >= 10 && row <= 14 && col >= 10 && col <= 14)
          return false;
        return (row * 7 + col * 11 + row * col) % 5 === 0 || (row + col) % 7 === 0 || row % 4 === 0 && col % 3 === 0;
      }
      function startNativeScan() {
        uni.scanCode({
          onlyFromCamera: false,
          scanType: ["qrCode", "barCode"],
          success: (res) => {
            uni.showModal({
              title: "扫码结果",
              content: res.result || "已识别",
              showCancel: false
            });
          },
          fail: () => {
            uni.showToast({ title: "扫码已取消", icon: "none" });
          }
        });
      }
      function logout() {
        uni.showModal({
          title: "退出账号",
          content: "确定要退出当前账号吗？",
          confirmText: "退出",
          confirmColor: "#ff2442",
          success: (res) => {
            if (!res.confirm)
              return;
            uni.removeStorageSync("token");
            uni.removeStorageSync("user_student_id");
            uni.removeStorageSync("user_name");
            uni.removeStorageSync("user_phone");
            uni.showToast({ title: "已退出", icon: "success" });
            setTimeout(() => {
              uni.redirectTo({ url: "/pages/login/login?redirect=/pages/me/me" });
            }, 500);
          }
        });
      }
      onLoad((query) => {
        type.value = query.type || "addFriend";
        if (type.value === "scan") {
          setTimeout(startNativeScan, 300);
        }
      });
      const __returned__ = { type, titles, title, friendUsers, creatorServices, orders, miniApps, helpTools, questions, settings, goBack, toggleFollow, isFinder, isQrOn, startNativeScan, logout, computed: vue.computed, ref: vue.ref, get onLoad() {
        return onLoad;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["page", { dark: $setup.type === "scan" || $setup.type === "moment" }])
      },
      [
        vue.createElementVNode("view", { class: "nav" }, [
          vue.createElementVNode("view", {
            class: "back-icon",
            onClick: $setup.goBack
          }),
          vue.createElementVNode(
            "text",
            { class: "title" },
            vue.toDisplayString($setup.title),
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", { class: "right-action" }, [
            $setup.type === "orders" ? (vue.openBlock(), vue.createElementBlock("text", { key: 0 }, "筛选")) : $setup.type === "cart" ? (vue.openBlock(), vue.createElementBlock("text", { key: 1 }, "管理")) : $setup.type === "help" ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 2,
              class: "search-mini"
            })) : $setup.type === "settings" ? (vue.openBlock(), vue.createElementBlock("view", { key: 3 })) : $setup.type === "addFriend" ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 4,
              class: "gear-mini"
            })) : (vue.openBlock(), vue.createElementBlock("text", { key: 5 }))
          ])
        ]),
        $setup.type === "addFriend" ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "add-page"
        }, [
          vue.createElementVNode("view", { class: "qr-card" }, [
            vue.createElementVNode("view", { class: "qr-grid" }, [
              (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(625, (n) => {
                  return vue.createElementVNode(
                    "view",
                    {
                      key: n,
                      class: vue.normalizeClass({ on: $setup.isQrOn(n) })
                    },
                    null,
                    2
                    /* CLASS */
                  );
                }),
                64
                /* STABLE_FRAGMENT */
              )),
              vue.createElementVNode("view", { class: "qr-avatar" }, "X")
            ])
          ]),
          vue.createElementVNode("text", { class: "user-name" }, "X."),
          vue.createElementVNode("text", { class: "user-id" }, "小红书号：753653624"),
          vue.createElementVNode("view", { class: "line-list" }, [
            vue.createElementVNode("view", { class: "line-row" }, [
              vue.createElementVNode("view", { class: "line-icon scan-line" }),
              vue.createElementVNode("text", null, "扫一扫"),
              vue.createElementVNode("view", { class: "right-arrow" })
            ]),
            vue.createElementVNode("view", { class: "line-row" }, [
              vue.createElementVNode("view", { class: "line-icon book-line" }),
              vue.createElementVNode("text", null, "通讯录"),
              vue.createElementVNode("view", { class: "right-arrow" })
            ]),
            vue.createElementVNode("view", { class: "line-row" }, [
              vue.createElementVNode("view", { class: "line-icon chat-line" }),
              vue.createElementVNode("text", null, "微信好友"),
              vue.createElementVNode("text", { class: "hint" }, "分享个人名片至微信"),
              vue.createElementVNode("view", { class: "right-arrow" })
            ]),
            vue.createElementVNode("view", { class: "line-row" }, [
              vue.createElementVNode("view", { class: "line-icon qq-line" }),
              vue.createElementVNode("text", null, "QQ 好友"),
              vue.createElementVNode("text", { class: "hint" }, "分享个人名片至 QQ"),
              vue.createElementVNode("view", { class: "right-arrow" })
            ])
          ]),
          vue.createElementVNode("text", { class: "section-title" }, "你可能感兴趣的人"),
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.friendUsers, (user) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: user.name,
                class: "friend-row"
              }, [
                vue.createElementVNode(
                  "view",
                  {
                    class: "face",
                    style: vue.normalizeStyle({ background: user.bg })
                  },
                  vue.toDisplayString(user.avatar),
                  5
                  /* TEXT, STYLE */
                ),
                vue.createElementVNode("view", { class: "friend-main" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "friend-name" },
                    vue.toDisplayString(user.name),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    { class: "friend-desc" },
                    vue.toDisplayString(user.desc),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("button", {
                  class: vue.normalizeClass(["follow-btn", { followed: user.followed }]),
                  onClick: vue.withModifiers(($event) => $setup.toggleFollow(user), ["stop"])
                }, vue.toDisplayString(user.followed ? "已关注" : "关注"), 11, ["onClick"]),
                vue.createElementVNode("view", { class: "close-mini" })
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])) : $setup.type === "creator" ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "creator-page"
        }, [
          vue.createElementVNode("view", { class: "creator-head" }, [
            vue.createElementVNode("text", { class: "big-name" }, "X."),
            vue.createElementVNode("text", { class: "status-pill" }, "账号正常"),
            vue.createElementVNode("view", { class: "rights-card" }, [
              vue.createElementVNode("text", null, "9 项作者权益"),
              vue.createElementVNode("text", null, "粉丝 22 /500"),
              vue.createElementVNode("view", { class: "progress" }, [
                vue.createElementVNode("view")
              ])
            ])
          ]),
          vue.createElementVNode("view", { class: "task-card" }, [
            vue.createElementVNode("text", { class: "task-title" }, "成长计划奖励任务"),
            vue.createElementVNode("text", { class: "tag" }, "直播任务"),
            vue.createElementVNode("text", { class: "tag red" }, "新任务"),
            vue.createElementVNode("text", { class: "task-desc" }, "立即开播，上万流量奖励等你拿")
          ]),
          vue.createElementVNode("view", { class: "data-card" }, [
            vue.createElementVNode("view", { class: "card-head" }, [
              vue.createElementVNode("text", null, "近 7 日数据"),
              vue.createElementVNode("text", null, "开通数据权限")
            ]),
            vue.createElementVNode("view", { class: "data-grid" }, [
              (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(["观看", "互动数", "新增粉丝", "主页访客"], (item) => {
                  return vue.createElementVNode("view", { key: item }, [
                    vue.createElementVNode(
                      "text",
                      null,
                      vue.toDisplayString(item),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("text", { class: "zero" }, "0"),
                    vue.createElementVNode("text", null, "-")
                  ]);
                }),
                64
                /* STABLE_FRAGMENT */
              ))
            ])
          ]),
          vue.createElementVNode("view", { class: "service-strip" }, [
            (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.creatorServices, (item) => {
                return vue.createElementVNode("view", {
                  key: item.name
                }, [
                  vue.createElementVNode(
                    "view",
                    {
                      class: vue.normalizeClass(["mini-service-icon", item.cls])
                    },
                    [
                      vue.createElementVNode("view")
                    ],
                    2
                    /* CLASS */
                  ),
                  vue.createElementVNode(
                    "text",
                    null,
                    vue.toDisplayString(item.name),
                    1
                    /* TEXT */
                  )
                ]);
              }),
              64
              /* STABLE_FRAGMENT */
            ))
          ]),
          vue.createElementVNode("view", { class: "inspiration" }, [
            vue.createElementVNode("view", { class: "tabs" }, [
              vue.createElementVNode("text", { class: "active" }, "创作灵感"),
              vue.createElementVNode("text", null, "课程学习")
            ]),
            vue.createElementVNode("view", { class: "chip-row" }, [
              vue.createElementVNode("text", null, "推荐"),
              vue.createElementVNode("text", null, "热点"),
              vue.createElementVNode("text", null, "活动"),
              vue.createElementVNode("text", null, "AI玩法"),
              vue.createElementVNode("text", null, "拼图")
            ]),
            vue.createElementVNode("view", { class: "image-grid" }, [
              vue.createElementVNode("view", { class: "photo-card peach" }, "春日拍照灵感"),
              vue.createElementVNode("view", { class: "photo-card sea" }, "海边穿搭模板")
            ])
          ])
        ])) : $setup.type === "pro" ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 2,
          class: "pro-page"
        }, [
          vue.createElementVNode("view", { class: "pro-bg" }),
          vue.createElementVNode("text", { class: "pro-title" }, "升级专业号"),
          vue.createElementVNode("view", { class: "pro-card" }, [
            vue.createElementVNode("view", { class: "blue-avatar person" }),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("text", { class: "pro-name" }, [
                vue.createTextVNode("个人专业号 "),
                vue.createElementVNode("text", { class: "blue-tag" }, "免费升级")
              ]),
              vue.createElementVNode("text", { class: "pro-desc" }, "适合个人商业行为，如蒲公英博主、买手、开店，以及二手交易、兴趣副业等个人服务收款")
            ]),
            vue.createElementVNode("view", { class: "right-arrow" })
          ]),
          vue.createElementVNode("view", { class: "pro-card" }, [
            vue.createElementVNode("view", { class: "blue-avatar card" }),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("text", { class: "pro-name" }, [
                vue.createTextVNode("企业专业号 "),
                vue.createElementVNode("text", { class: "blue-tag" }, "认证审核费 600 元/年")
              ]),
              vue.createElementVNode("text", { class: "pro-desc" }, "适合企业经营行为，如蓝 V 认证、推广投放、企业店铺、品牌认领等")
            ]),
            vue.createElementVNode("view", { class: "right-arrow" })
          ])
        ])) : $setup.type === "draft" || $setup.type === "download" ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 3,
          class: "empty-page"
        }, [
          vue.createElementVNode("view", { class: "empty-doc" }, [
            vue.createElementVNode("view"),
            vue.createElementVNode("view")
          ]),
          vue.createElementVNode(
            "text",
            { class: "empty-text" },
            vue.toDisplayString($setup.type === "draft" ? "取消发送或发送失败的笔记\n可被存为草稿" : "暂无内容"),
            1
            /* TEXT */
          )
        ])) : $setup.type === "activity" ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 4,
          class: "activity-page"
        }, [
          vue.createElementVNode("view", { class: "activity-tabs" }, [
            vue.createElementVNode("text", { class: "active" }, "全部 0"),
            vue.createElementVNode("text", null, "进行中 0"),
            vue.createElementVNode("text", null, "待开始 0"),
            vue.createElementVNode("text", null, "售后 0"),
            vue.createElementVNode("text", null, "待评价 0")
          ]),
          vue.createElementVNode("view", { class: "empty-doc mascot" }, [
            vue.createElementVNode("view"),
            vue.createElementVNode("view")
          ]),
          vue.createElementVNode("text", { class: "empty-text" }, "暂无报名的活动"),
          vue.createElementVNode("text", { class: "more-title" }, "- 发现更多活动 -"),
          vue.createElementVNode("view", { class: "activity-grid" }, [
            vue.createElementVNode("view", { class: "event-card ai" }, [
              vue.createElementVNode("text", null, "上海一人公司必看｜免费 Ai 公开课并送工位"),
              vue.createElementVNode("text", null, "明天 周三 12:30")
            ]),
            vue.createElementVNode("view", { class: "event-card salon" }, [
              vue.createElementVNode("text", null, "她宇宙上海女性搞钱沙龙"),
              vue.createElementVNode("text", null, "06-27 周六 13:00")
            ])
          ])
        ])) : $setup.type === "history" ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 5,
          class: "history-page"
        }, [
          vue.createElementVNode("view", { class: "history-tabs" }, [
            vue.createElementVNode("text", { class: "active" }, "笔记"),
            vue.createElementVNode("text", null, "直播")
          ]),
          vue.createElementVNode("text", { class: "today" }, "今天"),
          vue.createElementVNode("view", { class: "empty-toast" }, "支持在通用设置中关闭浏览记录")
        ])) : $setup.type === "orders" ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 6,
          class: "orders-page"
        }, [
          vue.createElementVNode("view", { class: "search-order" }, "搜索我的订单"),
          vue.createElementVNode("view", { class: "order-tabs" }, [
            vue.createElementVNode("text", { class: "active" }, "全部"),
            vue.createElementVNode("text", null, "待付款"),
            vue.createElementVNode("text", null, "待发货"),
            vue.createElementVNode("text", null, "待收货 / 使用"),
            vue.createElementVNode("text", null, "评价"),
            vue.createElementVNode("text", null, "售后")
          ]),
          vue.createElementVNode("view", { class: "shop-row" }, [
            vue.createElementVNode("text", null, "常逛店铺"),
            vue.createElementVNode("text", null, "看更多")
          ]),
          (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.orders, (order) => {
              return vue.createElementVNode("view", {
                key: order.title,
                class: "order-card"
              }, [
                vue.createElementVNode("view", { class: "order-head" }, [
                  vue.createElementVNode(
                    "text",
                    null,
                    vue.toDisplayString(order.shop),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode(
                    "text",
                    null,
                    vue.toDisplayString(order.status),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "order-body" }, [
                  vue.createElementVNode(
                    "view",
                    { class: "goods-img" },
                    vue.toDisplayString(order.img),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("view", { class: "goods-main" }, [
                    vue.createElementVNode(
                      "text",
                      null,
                      vue.toDisplayString(order.title),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "text",
                      null,
                      vue.toDisplayString(order.desc),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "text",
                      { class: "red-text" },
                      vue.toDisplayString(order.tag),
                      1
                      /* TEXT */
                    )
                  ]),
                  vue.createElementVNode(
                    "text",
                    { class: "price" },
                    vue.toDisplayString(order.price),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "order-actions" }, [
                  vue.createElementVNode("button", null, "晒单"),
                  vue.createElementVNode("button", null, "评价"),
                  vue.createElementVNode("button", { class: "red-btn" }, "再买一单")
                ])
              ]);
            }),
            64
            /* STABLE_FRAGMENT */
          ))
        ])) : $setup.type === "cart" ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 7,
          class: "cart-page"
        }, [
          vue.createElementVNode("view", { class: "cart-empty" }, [
            vue.createElementVNode("view", { class: "cart-draw" }),
            vue.createElementVNode("text", null, "购物车是空的哦，快去加购心仪商品吧")
          ]),
          vue.createElementVNode("view", { class: "invalid-head" }, [
            vue.createElementVNode("text", null, "以下商品已无法购买"),
            vue.createElementVNode("text", null, "清空失效商品")
          ]),
          vue.createElementVNode("view", { class: "invalid-item" }, [
            vue.createElementVNode("view", { class: "check" }),
            vue.createElementVNode("view", { class: "invalid-img" }, "失效"),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("text", null, "简约 ins 抓夹带独立包装 5 款各 15"),
              vue.createElementVNode("text", null, "该商品已下架"),
              vue.createElementVNode("button", null, "找相似")
            ])
          ]),
          vue.createElementVNode("view", { class: "checkout" }, [
            vue.createElementVNode("view", { class: "check" }),
            vue.createElementVNode("text", null, "全选"),
            vue.createElementVNode("text", { class: "sum" }, "总计 ¥0"),
            vue.createElementVNode("button", null, "结算")
          ])
        ])) : $setup.type === "mini" ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 8,
          class: "mini-page"
        }, [
          vue.createElementVNode("view", { class: "search-mini-box" }, "搜索小程序名称"),
          vue.createElementVNode("view", { class: "mini-card" }, [
            vue.createElementVNode("text", { class: "block-title" }, "最近使用"),
            vue.createElementVNode("text", { class: "muted" }, "暂无使用过的小程序，看看下方推荐吧")
          ]),
          vue.createElementVNode("view", { class: "mini-card" }, [
            vue.createElementVNode("text", { class: "block-title" }, "发现小程序"),
            (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.miniApps, (app) => {
                return vue.createElementVNode("view", {
                  key: app.name,
                  class: "mini-row"
                }, [
                  vue.createElementVNode(
                    "view",
                    {
                      class: vue.normalizeClass(["app-icon", app.cls])
                    },
                    [
                      vue.createElementVNode("view")
                    ],
                    2
                    /* CLASS */
                  ),
                  vue.createElementVNode("view", null, [
                    vue.createElementVNode(
                      "text",
                      null,
                      vue.toDisplayString(app.name),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "text",
                      null,
                      vue.toDisplayString(app.desc),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode(
                      "text",
                      { class: "pill" },
                      vue.toDisplayString(app.used),
                      1
                      /* TEXT */
                    )
                  ])
                ]);
              }),
              64
              /* STABLE_FRAGMENT */
            ))
          ])
        ])) : $setup.type === "moment" ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 9,
          class: "moment-page"
        }, [
          vue.createElementVNode("view", { class: "moment-head" }, [
            vue.createElementVNode("view", { class: "face sunset" }, "X"),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("text", null, "记录我的日常"),
              vue.createElementVNode("text", null, "暂未开始记录哦~")
            ]),
            vue.createElementVNode("view", {
              class: "close-white",
              onClick: $setup.goBack
            })
          ]),
          vue.createElementVNode("view", { class: "moment-grid" }, [
            vue.createElementVNode("view", { class: "pink" }, "咻咻"),
            vue.createElementVNode("view", { class: "orange" }, "语音"),
            vue.createElementVNode("view", { class: "green" }, "日签"),
            vue.createElementVNode("view", { class: "cyan" }, "打卡"),
            vue.createElementVNode("view", { class: "rose" }, "文字"),
            vue.createElementVNode("view", { class: "purple" }, "拍摄")
          ]),
          vue.createElementVNode("text", { class: "dark-title" }, "听 ~ 有趣的声音"),
          vue.createElementVNode("view", { class: "voice-flow" }, [
            (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList(["你权衡利弊，我退而远之。", "碎碎念", "喜欢", "记得", "khalil"], (v) => {
                return vue.createElementVNode(
                  "view",
                  {
                    key: v,
                    class: "voice-pill"
                  },
                  vue.toDisplayString(v),
                  1
                  /* TEXT */
                );
              }),
              64
              /* STABLE_FRAGMENT */
            ))
          ]),
          vue.createElementVNode("text", { class: "dark-title" }, "刷 ~ 所有好玩瞬间")
        ])) : $setup.type === "scan" ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 10,
          class: "scan-page"
        }, [
          vue.createElementVNode("text", { class: "scan-title" }, "扫描二维码"),
          vue.createElementVNode("view", {
            class: "scan-box",
            onClick: $setup.startNativeScan
          }, [
            vue.createElementVNode("view", { class: "corner lt" }),
            vue.createElementVNode("view", { class: "corner rt" }),
            vue.createElementVNode("view", { class: "corner lb" }),
            vue.createElementVNode("view", { class: "corner rb" }),
            vue.createElementVNode("text", null, "点击开始扫码")
          ]),
          vue.createElementVNode("text", { class: "scan-tip" }, "请将二维码对准扫码框中心"),
          vue.createElementVNode("view", { class: "scan-bottom" }, [
            vue.createElementVNode("view", null, [
              vue.createElementVNode("view", { class: "round-tool qr-tool" }, [
                vue.createElementVNode("view")
              ]),
              vue.createElementVNode("text", null, "我的二维码")
            ]),
            vue.createElementVNode("view", null, [
              vue.createElementVNode("view", { class: "round-tool img-tool" }, [
                vue.createElementVNode("view")
              ]),
              vue.createElementVNode("text", null, "相册")
            ])
          ])
        ])) : $setup.type === "help" ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 11,
          class: "help-page"
        }, [
          vue.createElementVNode("view", { class: "tool-card" }, [
            vue.createElementVNode("text", { class: "block-title" }, "自助工具"),
            vue.createElementVNode("view", { class: "tool-grid" }, [
              (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($setup.helpTools, (item) => {
                  return vue.createElementVNode("view", {
                    key: item.name
                  }, [
                    vue.createElementVNode(
                      "view",
                      {
                        class: vue.normalizeClass(["help-icon", item.cls])
                      },
                      [
                        vue.createElementVNode("view")
                      ],
                      2
                      /* CLASS */
                    ),
                    vue.createElementVNode(
                      "text",
                      null,
                      vue.toDisplayString(item.name),
                      1
                      /* TEXT */
                    )
                  ]);
                }),
                64
                /* STABLE_FRAGMENT */
              ))
            ])
          ]),
          vue.createElementVNode("view", { class: "qa-card" }, [
            vue.createElementVNode("text", { class: "block-title" }, "猜你想问"),
            vue.createElementVNode("view", { class: "qa-tabs" }, [
              vue.createElementVNode("text", { class: "active" }, "热门问题"),
              vue.createElementVNode("text", null, "账号问题"),
              vue.createElementVNode("text", null, "个人主页问题"),
              vue.createElementVNode("text", null, "流量问题")
            ]),
            (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($setup.questions, (q) => {
                return vue.createElementVNode("view", {
                  key: q,
                  class: "qa-row"
                }, [
                  vue.createElementVNode(
                    "text",
                    null,
                    vue.toDisplayString(q),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("view", { class: "right-arrow" })
                ]);
              }),
              64
              /* STABLE_FRAGMENT */
            ))
          ]),
          vue.createElementVNode("view", { class: "help-bottom" }, [
            vue.createElementVNode("button", null, "意见反馈"),
            vue.createElementVNode("button", null, "联系官方客服")
          ])
        ])) : (vue.openBlock(), vue.createElementBlock("view", {
          key: 12,
          class: "settings-page"
        }, [
          (vue.openBlock(), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.settings, (group) => {
              return vue.createElementVNode("view", {
                key: group[0].name,
                class: "settings-card"
              }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(group, (row) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      key: row.name,
                      class: "settings-row"
                    }, [
                      vue.createElementVNode(
                        "view",
                        {
                          class: vue.normalizeClass(["set-icon", row.cls])
                        },
                        [
                          vue.createElementVNode("view")
                        ],
                        2
                        /* CLASS */
                      ),
                      vue.createElementVNode(
                        "text",
                        null,
                        vue.toDisplayString(row.name),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode(
                        "text",
                        { class: "set-value" },
                        vue.toDisplayString(row.value),
                        1
                        /* TEXT */
                      ),
                      vue.createElementVNode("view", { class: "right-arrow" })
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]);
            }),
            64
            /* STABLE_FRAGMENT */
          )),
          vue.createElementVNode("view", { class: "settings-card logout-card" }, [
            vue.createElementVNode("view", {
              class: "settings-row logout-row",
              onClick: $setup.logout
            }, [
              vue.createElementVNode("view", { class: "set-icon logout-set" }, [
                vue.createElementVNode("view")
              ]),
              vue.createElementVNode("text", null, "退出账号")
            ])
          ])
        ]))
      ],
      2
      /* CLASS */
    );
  }
  const PagesSideSide = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7], ["__scopeId", "data-v-abc08103"], ["__file", "C:/Users/10038/Documents/Codex/2026-06-12/app-c-users-10038-downloads-nuxt3/outputs/xhs-uniapp-apk/pages/side/side.vue"]]);
  const _sfc_main$6 = {
    __name: "history",
    setup(__props, { expose: __expose }) {
      __expose();
      function goBack() {
        uni.navigateBack({ fail: () => uni.redirectTo({ url: "/pages/me/me" }) });
      }
      const __returned__ = { goBack };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createElementVNode("view", { class: "nav" }, [
        vue.createElementVNode("view", {
          class: "back-icon",
          onClick: $setup.goBack
        }),
        vue.createElementVNode("text", { class: "title" }, "浏览记录"),
        vue.createElementVNode("view", { class: "manage" }, [
          vue.createElementVNode("view", { class: "list-icon" }),
          vue.createTextVNode("管理")
        ])
      ]),
      vue.createElementVNode("view", { class: "tabs" }, [
        vue.createElementVNode("text", { class: "active" }, "笔记"),
        vue.createElementVNode("text", null, "直播")
      ]),
      vue.createElementVNode("text", { class: "today" }, "今天"),
      vue.createElementVNode("view", { class: "empty" }, [
        vue.createElementVNode("view", { class: "doc-icon" }, [
          vue.createElementVNode("view", { class: "paper" }),
          vue.createElementVNode("view", { class: "image-dot" }),
          vue.createElementVNode("view", { class: "image-mountain" })
        ]),
        vue.createElementVNode("text", null, "没有任何浏览记录")
      ])
    ]);
  }
  const PagesHistoryHistory = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6], ["__scopeId", "data-v-b2d018fa"], ["__file", "C:/Users/10038/Documents/Codex/2026-06-12/app-c-users-10038-downloads-nuxt3/outputs/xhs-uniapp-apk/pages/history/history.vue"]]);
  const _sfc_main$5 = {
    __name: "group",
    setup(__props, { expose: __expose }) {
      __expose();
      function goBack() {
        uni.navigateBack({ fail: () => uni.redirectTo({ url: "/pages/me/me" }) });
      }
      function openCreate() {
        uni.navigateTo({ url: "/pages/group-create/group-create" });
      }
      const __returned__ = { goBack, openCreate };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createElementVNode("view", { class: "nav" }, [
        vue.createElementVNode("view", {
          class: "back-icon",
          onClick: $setup.goBack
        }),
        vue.createElementVNode("view", { class: "tab-title" }, [
          vue.createElementVNode("text", { class: "active" }, "我创建的"),
          vue.createElementVNode("text", null, "我加入的")
        ]),
        vue.createElementVNode("view", {
          class: "create-link",
          onClick: $setup.openCreate
        }, [
          vue.createElementVNode("view", { class: "plus-chat" }),
          vue.createTextVNode("创建")
        ])
      ]),
      vue.createElementVNode("view", { class: "empty" }, [
        vue.createElementVNode("view", { class: "chat-empty" }, [
          vue.createElementVNode("view", { class: "bubble" }),
          vue.createElementVNode("view", { class: "shadow" })
        ]),
        vue.createElementVNode("text", null, "创建你的第一个群聊吧"),
        vue.createElementVNode("button", { onClick: $setup.openCreate }, "创建群聊")
      ])
    ]);
  }
  const PagesGroupGroup = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5], ["__scopeId", "data-v-3945b5f1"], ["__file", "C:/Users/10038/Documents/Codex/2026-06-12/app-c-users-10038-downloads-nuxt3/outputs/xhs-uniapp-apk/pages/group/group.vue"]]);
  const _sfc_main$4 = {
    __name: "group-create",
    setup(__props, { expose: __expose }) {
      __expose();
      const name = vue.ref("");
      const intro = vue.ref("");
      const users = vue.ref([
        { name: "小满", desc: "最近互动", avatar: "满", bg: "#d7a879", checked: true },
        { name: "阿青", desc: "关注的人", avatar: "青", bg: "#7fb0c8", checked: false },
        { name: "南栀", desc: "本地好友", avatar: "南", bg: "#c88a98", checked: false }
      ]);
      function goBack() {
        uni.navigateBack({ fail: () => uni.redirectTo({ url: "/pages/group/group" }) });
      }
      function toggle(user) {
        user.checked = !user.checked;
      }
      function finish() {
        uni.showToast({ title: "已创建群聊", icon: "success" });
        setTimeout(goBack, 650);
      }
      const __returned__ = { name, intro, users, goBack, toggle, finish, ref: vue.ref };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createElementVNode("view", { class: "nav" }, [
        vue.createElementVNode("view", {
          class: "back-icon",
          onClick: $setup.goBack
        }),
        vue.createElementVNode("text", { class: "title" }, "创建群聊"),
        vue.createElementVNode("text", {
          class: "done",
          onClick: $setup.finish
        }, "完成")
      ]),
      vue.createElementVNode("view", { class: "form-card" }, [
        vue.createElementVNode("view", { class: "avatar-box" }, [
          vue.createElementVNode("view", { class: "group-avatar" }, [
            vue.createElementVNode("view"),
            vue.createElementVNode("view")
          ]),
          vue.createElementVNode("text", null, "群头像")
        ]),
        vue.createElementVNode("view", { class: "form-row" }, [
          vue.createElementVNode("text", null, "群聊名称"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.name = $event),
              placeholder: "给群聊起个名字",
              "placeholder-class": "placeholder"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.name]
          ])
        ]),
        vue.createElementVNode("view", { class: "form-row" }, [
          vue.createElementVNode("text", null, "群介绍"),
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.intro = $event),
              placeholder: "介绍这个群聊",
              "placeholder-class": "placeholder"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $setup.intro]
          ])
        ])
      ]),
      vue.createElementVNode("view", { class: "invite-card" }, [
        vue.createElementVNode("text", { class: "block-title" }, "邀请好友"),
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($setup.users, (user) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: user.name,
              class: "user-row",
              onClick: ($event) => $setup.toggle(user)
            }, [
              vue.createElementVNode(
                "view",
                {
                  class: "face",
                  style: vue.normalizeStyle({ background: user.bg })
                },
                vue.toDisplayString(user.avatar),
                5
                /* TEXT, STYLE */
              ),
              vue.createElementVNode("view", { class: "user-main" }, [
                vue.createElementVNode(
                  "text",
                  null,
                  vue.toDisplayString(user.name),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "text",
                  null,
                  vue.toDisplayString(user.desc),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode(
                "view",
                {
                  class: vue.normalizeClass(["check", { active: user.checked }])
                },
                null,
                2
                /* CLASS */
              )
            ], 8, ["onClick"]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])
    ]);
  }
  const PagesGroupCreateGroupCreate = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__scopeId", "data-v-6aed802d"], ["__file", "C:/Users/10038/Documents/Codex/2026-06-12/app-c-users-10038-downloads-nuxt3/outputs/xhs-uniapp-apk/pages/group-create/group-create.vue"]]);
  const _sfc_main$3 = {
    __name: "me",
    setup(__props, { expose: __expose }) {
      __expose();
      const localNotes = vue.ref([]);
      const drawerOpen = vue.ref(false);
      const displayName = vue.computed(() => {
        return uni.getStorageSync("user_name") || "小红薯 669E54D0";
      });
      const studentId = vue.computed(() => {
        return uni.getStorageSync("user_student_id") || "94787774830";
      });
      function loadLocalNotes() {
        localNotes.value = uni.getStorageSync("offline_notes") || [];
      }
      function checkLogin() {
        const token = uni.getStorageSync("token");
        if (!token) {
          uni.navigateTo({ url: "/pages/login/login?redirect=/pages/me/me" });
          return;
        }
        loadLocalNotes();
      }
      function goPublish() {
        uni.redirectTo({ url: "/pages/note/note" });
      }
      function openWallet() {
        navigateToPage("/pages/wallet/wallet");
      }
      function openWalletFromDrawer() {
        drawerOpen.value = false;
        openWallet();
      }
      function openHistoryFromDrawer() {
        drawerOpen.value = false;
        openHistory();
      }
      function openHistory() {
        navigateToPage("/pages/history/history");
      }
      function openGroup() {
        navigateToPage("/pages/group/group");
      }
      function navigateToPage(url) {
        uni.navigateTo({
          url,
          fail: () => {
            uni.redirectTo({
              url,
              fail: () => uni.showToast({ title: "请重新运行项目", icon: "none" })
            });
          }
        });
      }
      function openDrawer() {
        drawerOpen.value = true;
      }
      function closeDrawer() {
        drawerOpen.value = false;
      }
      function openDrawerPage(type) {
        drawerOpen.value = false;
        uni.navigateTo({ url: `/pages/side/side?type=${type}` });
      }
      function startScan() {
        drawerOpen.value = false;
        uni.scanCode({
          onlyFromCamera: false,
          scanType: ["qrCode", "barCode"],
          success: (res) => {
            uni.showModal({
              title: "扫码结果",
              content: res.result || "已识别",
              showCancel: false
            });
          },
          fail: () => {
            uni.showToast({ title: "扫码已取消", icon: "none" });
          }
        });
      }
      function openNote(item) {
        uni.setStorageSync("current_note", item);
        uni.navigateTo({ url: "/pages/detail/detail" });
      }
      onShow(checkLogin);
      onLoad((query) => {
        if (query.drawer === "1") {
          drawerOpen.value = true;
        }
      });
      const __returned__ = { localNotes, drawerOpen, displayName, studentId, loadLocalNotes, checkLogin, goPublish, openWallet, openWalletFromDrawer, openHistoryFromDrawer, openHistory, openGroup, navigateToPage, openDrawer, closeDrawer, openDrawerPage, startScan, openNote, computed: vue.computed, ref: vue.ref, get onLoad() {
        return onLoad;
      }, get onShow() {
        return onShow;
      }, BottomNav };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createElementVNode("view", { class: "profile-head" }, [
        vue.createElementVNode("view", { class: "tool-row" }, [
          vue.createElementVNode("view", {
            class: "menu-icon",
            onClick: $setup.openDrawer
          }, [
            vue.createElementVNode("view"),
            vue.createElementVNode("view"),
            vue.createElementVNode("view")
          ])
        ]),
        vue.createElementVNode("view", { class: "user-block" }, [
          vue.createElementVNode("view", { class: "big-avatar" }, [
            vue.createElementVNode("view", { class: "camera-icon" }),
            vue.createElementVNode("text", { class: "avatar-text" }, "上传头像")
          ]),
          vue.createElementVNode("view", { class: "user-info" }, [
            vue.createElementVNode("view", { class: "name-row" }, [
              vue.createElementVNode(
                "text",
                { class: "name" },
                vue.toDisplayString($setup.displayName),
                1
                /* TEXT */
              ),
              vue.createElementVNode("view", { class: "pen-icon" })
            ]),
            vue.createElementVNode(
              "text",
              { class: "xhs-id" },
              "小红书号：" + vue.toDisplayString($setup.studentId),
              1
              /* TEXT */
            )
          ])
        ]),
        vue.createElementVNode("view", { class: "stats" }, [
          vue.createElementVNode("text", null, [
            vue.createElementVNode("text", { class: "num" }, "0"),
            vue.createTextVNode(" 关注")
          ]),
          vue.createElementVNode("text", null, [
            vue.createElementVNode("text", { class: "num" }, "0"),
            vue.createTextVNode(" 粉丝")
          ]),
          vue.createElementVNode("text", null, [
            vue.createElementVNode(
              "text",
              { class: "num" },
              vue.toDisplayString($setup.localNotes.length),
              1
              /* TEXT */
            ),
            vue.createTextVNode(" 笔记")
          ])
        ]),
        vue.createElementVNode("text", { class: "bio" }, "点击这里，填写简介"),
        vue.createElementVNode("view", { class: "entry-row" }, [
          vue.createElementVNode("view", {
            class: "entry",
            onClick: vue.withModifiers($setup.openHistory, ["stop"])
          }, [
            vue.createElementVNode("view", { class: "entry-title" }, [
              vue.createElementVNode("view", { class: "history-icon" }),
              vue.createTextVNode("浏览记录")
            ]),
            vue.createElementVNode("text", { class: "entry-desc" }, "看过的笔记")
          ]),
          vue.createElementVNode("view", {
            class: "entry",
            onClick: vue.withModifiers($setup.openGroup, ["stop"])
          }, [
            vue.createElementVNode("view", { class: "entry-title" }, [
              vue.createElementVNode("view", { class: "group-icon" }),
              vue.createTextVNode("群聊")
            ]),
            vue.createElementVNode("text", { class: "entry-desc" }, "加入的群聊")
          ]),
          vue.createElementVNode("view", {
            class: "entry",
            onClick: vue.withModifiers($setup.openWallet, ["stop"])
          }, [
            vue.createElementVNode("view", { class: "entry-title" }, [
              vue.createElementVNode("view", { class: "wallet-icon" }),
              vue.createTextVNode("钱包")
            ]),
            vue.createElementVNode("text", { class: "entry-desc" }, "查看详情")
          ])
        ])
      ]),
      vue.createElementVNode("view", { class: "content-panel" }, [
        vue.createElementVNode("view", { class: "tabs" }, [
          vue.createElementVNode("text", { class: "tab active" }, "笔记"),
          vue.createElementVNode("text", { class: "tab" }, "收藏"),
          vue.createElementVNode("view", { class: "tab lock" }, "赞过"),
          vue.createElementVNode("view", { class: "tab-search" })
        ]),
        $setup.localNotes.length ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "my-grid"
        }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($setup.localNotes, (item) => {
              return vue.openBlock(), vue.createElementBlock("view", {
                key: item.id,
                class: "my-card",
                onClick: ($event) => $setup.openNote(item)
              }, [
                item.cover ? (vue.openBlock(), vue.createElementBlock("image", {
                  key: 0,
                  class: "my-cover",
                  src: item.cover,
                  mode: "aspectFill"
                }, null, 8, ["src"])) : (vue.openBlock(), vue.createElementBlock(
                  "view",
                  {
                    key: 1,
                    class: "my-cover poster",
                    style: vue.normalizeStyle({ background: item.bg })
                  },
                  [
                    vue.createElementVNode(
                      "text",
                      null,
                      vue.toDisplayString(item.poster || item.title),
                      1
                      /* TEXT */
                    )
                  ],
                  4
                  /* STYLE */
                )),
                vue.createElementVNode("view", { class: "my-body" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "my-title" },
                    vue.toDisplayString(item.title),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("text", { class: "my-meta" }, "本地发布")
                ])
              ], 8, ["onClick"]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ])) : (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: "empty"
        }, [
          vue.createElementVNode("view", { class: "empty-icon" }, [
            vue.createElementVNode("view"),
            vue.createElementVNode("view")
          ]),
          vue.createElementVNode("text", { class: "empty-text" }, "用音乐图集清日常碎片库存"),
          vue.createElementVNode("button", {
            class: "publish-btn",
            onClick: $setup.goPublish
          }, "去发布")
        ]))
      ]),
      $setup.drawerOpen ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "drawer-layer"
      }, [
        vue.createElementVNode("view", {
          class: "drawer-panel",
          onClick: _cache[12] || (_cache[12] = vue.withModifiers(() => {
          }, ["stop"]))
        }, [
          vue.createElementVNode("view", { class: "drawer-spacer" }),
          vue.createElementVNode("view", { class: "drawer-card single" }, [
            vue.createElementVNode("view", {
              class: "drawer-item",
              onClick: _cache[0] || (_cache[0] = ($event) => $setup.openDrawerPage("addFriend"))
            }, [
              vue.createElementVNode("view", { class: "side-icon add-friend-icon" }),
              vue.createElementVNode("text", null, "添加好友"),
              vue.createElementVNode("view", { class: "drawer-arrow" })
            ])
          ]),
          vue.createElementVNode("view", { class: "drawer-card" }, [
            vue.createElementVNode("view", {
              class: "drawer-item",
              onClick: _cache[1] || (_cache[1] = ($event) => $setup.openDrawerPage("creator"))
            }, [
              vue.createElementVNode("view", { class: "side-icon creator-icon" }),
              vue.createElementVNode("text", null, "创作者中心"),
              vue.createElementVNode("view", { class: "drawer-arrow" })
            ]),
            vue.createElementVNode("view", {
              class: "drawer-item",
              onClick: _cache[2] || (_cache[2] = ($event) => $setup.openDrawerPage("pro"))
            }, [
              vue.createElementVNode("view", { class: "side-icon pro-icon" }, [
                vue.createElementVNode("text", null, "PRO")
              ]),
              vue.createElementVNode("text", null, "升级为专业号"),
              vue.createElementVNode("view", { class: "drawer-arrow" })
            ])
          ]),
          vue.createElementVNode("view", { class: "drawer-card" }, [
            vue.createElementVNode("view", {
              class: "drawer-item",
              onClick: _cache[3] || (_cache[3] = ($event) => $setup.openDrawerPage("draft"))
            }, [
              vue.createElementVNode("view", { class: "side-icon draft-icon" }),
              vue.createElementVNode("text", null, "我的草稿"),
              vue.createElementVNode("view", { class: "drawer-arrow" })
            ]),
            vue.createElementVNode("view", {
              class: "drawer-item",
              onClick: _cache[4] || (_cache[4] = ($event) => $setup.openDrawerPage("activity"))
            }, [
              vue.createElementVNode("view", { class: "side-icon activity-side-icon" }),
              vue.createElementVNode("text", null, "我的活动"),
              vue.createElementVNode("text", { class: "new-badge" }, "新"),
              vue.createElementVNode("view", { class: "drawer-arrow" })
            ]),
            vue.createElementVNode("view", {
              class: "drawer-item",
              onClick: $setup.openHistoryFromDrawer
            }, [
              vue.createElementVNode("view", { class: "side-icon history-side-icon" }),
              vue.createElementVNode("text", null, "浏览记录"),
              vue.createElementVNode("view", { class: "drawer-arrow" })
            ]),
            vue.createElementVNode("view", {
              class: "drawer-item",
              onClick: _cache[5] || (_cache[5] = ($event) => $setup.openDrawerPage("download"))
            }, [
              vue.createElementVNode("view", { class: "side-icon download-icon" }),
              vue.createElementVNode("text", null, "我的下载"),
              vue.createElementVNode("view", { class: "drawer-arrow" })
            ])
          ]),
          vue.createElementVNode("view", { class: "drawer-card" }, [
            vue.createElementVNode("view", {
              class: "drawer-item",
              onClick: _cache[6] || (_cache[6] = ($event) => $setup.openDrawerPage("orders"))
            }, [
              vue.createElementVNode("view", { class: "side-icon order-icon" }),
              vue.createElementVNode("text", null, "订单"),
              vue.createElementVNode("view", { class: "drawer-arrow" })
            ]),
            vue.createElementVNode("view", {
              class: "drawer-item",
              onClick: _cache[7] || (_cache[7] = ($event) => $setup.openDrawerPage("cart"))
            }, [
              vue.createElementVNode("view", { class: "side-icon cart-side-icon" }),
              vue.createElementVNode("text", null, "购物车"),
              vue.createElementVNode("text", { class: "dot-badge" }),
              vue.createElementVNode("view", { class: "drawer-arrow" })
            ]),
            vue.createElementVNode("view", {
              class: "drawer-item",
              onClick: $setup.openWalletFromDrawer
            }, [
              vue.createElementVNode("view", { class: "side-icon wallet-side-icon" }),
              vue.createElementVNode("text", null, "钱包"),
              vue.createElementVNode("view", { class: "drawer-arrow" })
            ])
          ]),
          vue.createElementVNode("view", { class: "drawer-card" }, [
            vue.createElementVNode("view", {
              class: "drawer-item",
              onClick: _cache[8] || (_cache[8] = ($event) => $setup.openDrawerPage("mini"))
            }, [
              vue.createElementVNode("view", { class: "side-icon mini-icon" }),
              vue.createElementVNode("text", null, "小程序"),
              vue.createElementVNode("view", { class: "drawer-arrow" })
            ]),
            vue.createElementVNode("view", {
              class: "drawer-item",
              onClick: _cache[9] || (_cache[9] = ($event) => $setup.openDrawerPage("moment"))
            }, [
              vue.createElementVNode("view", { class: "side-icon moment-icon" }),
              vue.createElementVNode("text", null, "瞬间"),
              vue.createElementVNode("view", { class: "drawer-arrow" })
            ])
          ]),
          vue.createElementVNode("view", { class: "drawer-bottom" }, [
            vue.createElementVNode("view", {
              class: "drawer-tool",
              onClick: $setup.startScan
            }, [
              vue.createElementVNode("view", { class: "tool-circle" }, [
                vue.createElementVNode("view", { class: "scan-side-icon" })
              ]),
              vue.createElementVNode("text", null, "扫一扫")
            ]),
            vue.createElementVNode("view", {
              class: "drawer-tool",
              onClick: _cache[10] || (_cache[10] = ($event) => $setup.openDrawerPage("help"))
            }, [
              vue.createElementVNode("view", { class: "tool-circle" }, [
                vue.createElementVNode("view", { class: "service-icon" })
              ]),
              vue.createElementVNode("text", null, "帮助与客服")
            ]),
            vue.createElementVNode("view", {
              class: "drawer-tool",
              onClick: _cache[11] || (_cache[11] = ($event) => $setup.openDrawerPage("settings"))
            }, [
              vue.createElementVNode("view", { class: "tool-circle" }, [
                vue.createElementVNode("view", { class: "setting-icon" })
              ]),
              vue.createElementVNode("text", null, "设置")
            ])
          ])
        ]),
        vue.createElementVNode("view", {
          class: "drawer-mask",
          onClick: $setup.closeDrawer
        })
      ])) : vue.createCommentVNode("v-if", true),
      vue.createVNode($setup["BottomNav"], { active: "me" })
    ]);
  }
  const PagesMeMe = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__scopeId", "data-v-19c123a7"], ["__file", "C:/Users/10038/Documents/Codex/2026-06-12/app-c-users-10038-downloads-nuxt3/outputs/xhs-uniapp-apk/pages/me/me.vue"]]);
  const _sfc_main$2 = {
    __name: "login",
    setup(__props, { expose: __expose }) {
      __expose();
      const studentId = vue.ref("");
      const userName = vue.ref("");
      const password = vue.ref("");
      const redirect = vue.ref("/pages/me/me");
      const registrationNotice = vue.ref(false);
      const passwordFocus = vue.ref(false);
      function getUsers() {
        return uni.getStorageSync("offline_users") || {};
      }
      function validateForm() {
        if (!studentId.value || !userName.value || !password.value) {
          uni.showToast({ title: "请填写学号、姓名和密码", icon: "none" });
          return false;
        }
        if (password.value.length < 4) {
          uni.showToast({ title: "密码至少 4 位", icon: "none" });
          return false;
        }
        return true;
      }
      function saveLogin() {
        uni.setStorageSync("token", `offline-demo-${studentId.value}`);
        uni.setStorageSync("user_student_id", studentId.value);
        uni.setStorageSync("user_name", userName.value);
        uni.setStorageSync("user_phone", studentId.value);
      }
      function register() {
        if (!validateForm())
          return;
        const users = getUsers();
        if (users[studentId.value]) {
          uni.showToast({ title: "该学号已经注册，请直接登录", icon: "none" });
          return;
        }
        users[studentId.value] = {
          studentId: studentId.value,
          userName: userName.value,
          password: password.value
        };
        uni.setStorageSync("offline_users", users);
        registrationNotice.value = true;
        password.value = "";
        passwordFocus.value = false;
        setTimeout(() => {
          passwordFocus.value = true;
        }, 100);
        uni.showToast({ title: "注册成功，请登录", icon: "success" });
      }
      function login() {
        if (!validateForm())
          return;
        const users = getUsers();
        const account = users[studentId.value];
        if (!account) {
          uni.showToast({ title: "请先注册账号", icon: "none" });
          return;
        }
        if (account.userName !== userName.value || account.password !== password.value) {
          uni.showToast({ title: "姓名或密码不正确", icon: "none" });
          return;
        }
        registrationNotice.value = false;
        saveLogin();
        uni.showToast({ title: "登录成功", icon: "success" });
        setTimeout(() => uni.redirectTo({ url: redirect.value }), 500);
      }
      function goBack() {
        uni.redirectTo({ url: "/pages/index/index" });
      }
      onLoad((query) => {
        if (query.redirect) {
          redirect.value = query.redirect;
        }
      });
      const __returned__ = { studentId, userName, password, redirect, registrationNotice, passwordFocus, getUsers, validateForm, saveLogin, register, login, goBack, ref: vue.ref, get onLoad() {
        return onLoad;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createElementVNode("view", {
        class: "close",
        onClick: $setup.goBack
      }),
      vue.createElementVNode("view", { class: "login-card" }, [
        vue.createElementVNode("text", { class: "brand" }, "小红书"),
        vue.createElementVNode("text", { class: "title" }, "登录后查看你的主页"),
        vue.createElementVNode("text", { class: "sub" }, "离线演示版账号保存在本机"),
        $setup.registrationNotice ? (vue.openBlock(), vue.createElementBlock("view", {
          key: 0,
          class: "success-notice"
        }, [
          vue.createElementVNode("view", { class: "success-icon" }),
          vue.createElementVNode("text", null, "账号注册成功，请输入密码登录")
        ])) : vue.createCommentVNode("v-if", true),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $setup.studentId = $event),
            class: "input",
            type: "number",
            placeholder: "学号"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $setup.studentId]
        ]),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $setup.userName = $event),
            class: "input",
            placeholder: "姓名"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $setup.userName]
        ]),
        vue.withDirectives(vue.createElementVNode("input", {
          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $setup.password = $event),
          class: "input",
          password: "",
          placeholder: "自定义密码",
          focus: $setup.passwordFocus
        }, null, 8, ["focus"]), [
          [vue.vModelText, $setup.password]
        ]),
        vue.createElementVNode("view", { class: "action-row" }, [
          vue.createElementVNode("button", {
            class: "login-button",
            onClick: $setup.login
          }, "登录账号"),
          vue.createElementVNode("button", {
            class: "register-button",
            onClick: $setup.register
          }, "注册账号")
        ]),
        vue.createElementVNode("text", { class: "agree" }, "注册或登录后可使用本地离线演示数据")
      ])
    ]);
  }
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-e4e4508d"], ["__file", "C:/Users/10038/Documents/Codex/2026-06-12/app-c-users-10038-downloads-nuxt3/outputs/xhs-uniapp-apk/pages/login/login.vue"]]);
  const _sfc_main$1 = {
    __name: "detail",
    setup(__props, { expose: __expose }) {
      __expose();
      const note = vue.ref({});
      function goBack() {
        uni.navigateBack({
          fail: () => uni.redirectTo({ url: "/pages/index/index" })
        });
      }
      onLoad(() => {
        note.value = uni.getStorageSync("current_note") || {};
      });
      const __returned__ = { note, goBack, ref: vue.ref, get onLoad() {
        return onLoad;
      } };
      Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
      return __returned__;
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "page" }, [
      vue.createElementVNode("view", { class: "topbar" }, [
        vue.createElementVNode("view", {
          class: "back",
          onClick: $setup.goBack
        }),
        vue.createElementVNode("view", { class: "author-mini" }, [
          vue.createElementVNode(
            "view",
            {
              class: "avatar",
              style: vue.normalizeStyle({ background: $setup.note.avatarBg || "#ff2442" })
            },
            vue.toDisplayString($setup.note.avatar || "我"),
            5
            /* TEXT, STYLE */
          ),
          vue.createElementVNode(
            "text",
            null,
            vue.toDisplayString($setup.note.authorName || "我"),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "more" }, [
          vue.createElementVNode("view"),
          vue.createElementVNode("view"),
          vue.createElementVNode("view")
        ])
      ]),
      vue.createElementVNode("scroll-view", {
        "scroll-y": "",
        class: "body"
      }, [
        $setup.note.cover ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          class: "hero-image",
          src: $setup.note.cover,
          mode: "aspectFill"
        }, null, 8, ["src"])) : (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 1,
            class: "hero-poster",
            style: vue.normalizeStyle({ background: $setup.note.bg || "#fff0f2" })
          },
          [
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString($setup.note.poster || $setup.note.title),
              1
              /* TEXT */
            )
          ],
          4
          /* STYLE */
        )),
        vue.createElementVNode("view", { class: "content" }, [
          vue.createElementVNode(
            "text",
            { class: "title" },
            vue.toDisplayString($setup.note.title || "未命名笔记"),
            1
            /* TEXT */
          ),
          vue.createElementVNode(
            "text",
            { class: "text" },
            vue.toDisplayString($setup.note.content || "这是一条本地离线笔记。"),
            1
            /* TEXT */
          ),
          vue.createElementVNode("view", { class: "tags" }, [
            vue.createElementVNode("text", null, "# 小红书演示"),
            vue.createElementVNode("text", null, "# 本地发布")
          ])
        ])
      ]),
      vue.createElementVNode("view", { class: "bottom-actions" }, [
        vue.createElementVNode("view", { class: "comment" }, "说点什么..."),
        vue.createElementVNode("view", { class: "action-like" }, [
          vue.createElementVNode("view", { class: "heart-icon" }),
          vue.createTextVNode(
            vue.toDisplayString($setup.note.likes || 0),
            1
            /* TEXT */
          )
        ]),
        vue.createElementVNode("view", { class: "star-icon" }),
        vue.createElementVNode("view", { class: "share-icon" })
      ])
    ]);
  }
  const PagesDetailDetail = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__scopeId", "data-v-eca06f3c"], ["__file", "C:/Users/10038/Documents/Codex/2026-06-12/app-c-users-10038-downloads-nuxt3/outputs/xhs-uniapp-apk/pages/detail/detail.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/market/market", PagesMarketMarket);
  __definePage("pages/note/note", PagesNoteNote);
  __definePage("pages/message/message", PagesMessageMessage);
  __definePage("pages/message-detail/message-detail", PagesMessageDetailMessageDetail);
  __definePage("pages/search/search", PagesSearchSearch);
  __definePage("pages/wallet/wallet", PagesWalletWallet);
  __definePage("pages/side/side", PagesSideSide);
  __definePage("pages/history/history", PagesHistoryHistory);
  __definePage("pages/group/group", PagesGroupGroup);
  __definePage("pages/group-create/group-create", PagesGroupCreateGroupCreate);
  __definePage("pages/me/me", PagesMeMe);
  __definePage("pages/login/login", PagesLoginLogin);
  __definePage("pages/detail/detail", PagesDetailDetail);
  const _sfc_main = {
    onLaunch() {
      uni.removeStorageSync("token");
      formatAppLog("log", "at App.vue:11", "offline demo app launch");
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "app-root" }, [
      vue.renderSlot(_ctx.$slots, "default")
    ]);
  }
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/10038/Documents/Codex/2026-06-12/app-c-users-10038-downloads-nuxt3/outputs/xhs-uniapp-apk/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
