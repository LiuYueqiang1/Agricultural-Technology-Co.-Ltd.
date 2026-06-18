/* =========================================================
   鑫源鼎丰农业科技有限公司 · 官网脚本
   - 中英文切换 (i18n)
   - 移动端菜单 / 滚动效果 / 返回顶部 / 滚动出现动画
   - 留言表单（通过邮件客户端发送，无需后端）
   ========================================================= */

/* ---------- 中英文词典 ---------- */
const I18N = {
  "meta.title": {
    zh: "鑫源鼎丰农业科技有限公司 | 蔬菜大棚保温棉被生产厂家",
    en: "Xinyuan Dingfeng Agri-Tech | Greenhouse Thermal Insulation Quilt Manufacturer"
  },

  /* 导航 */
  "nav.home":     { zh: "首页", en: "Home" },
  "nav.about":    { zh: "公司介绍", en: "About" },
  "nav.business": { zh: "业务介绍", en: "Business" },
  "nav.products": { zh: "产品展示", en: "Products" },
  "nav.why":      { zh: "选择我们", en: "Why Us" },
  "nav.contact":  { zh: "联系我们", en: "Contact" },
  "nav.cta":      { zh: "获取报价", en: "Get a Quote" },

  /* Hero */
  "hero.badge": { zh: "山东青州 · 大棚保温棉被厂家直供", en: "Shandong Qingzhou · Factory-Direct Greenhouse Quilts" },
  "hero.title": {
    zh: '专业蔬菜大棚<br><span class="warm">保温棉被</span><span class="accent">解决方案</span>',
    en: 'Greenhouse <span class="warm">Thermal Insulation</span><br><span class="accent">Quilt Solutions</span>'
  },
  "hero.lead": {
    zh: "我们专注于温室大棚保温棉被的研发与生产，保温隔寒、坚固耐用，助力农作物安全越冬、稳产增收。",
    en: "We develop and manufacture thermal insulation quilts for greenhouses — keeping crops warm through winter for safe, stable and higher yields."
  },
  "hero.cta1": { zh: "查看产品", en: "View Products" },
  "hero.cta2": { zh: "联系我们", en: "Contact Us" },
  "hero.stat1n": { zh: "厂家直供", en: "Direct" },
  "hero.stat1l": { zh: "源头工厂 无中间商", en: "Factory source, no middlemen" },
  "hero.stat2n": { zh: "按需定制", en: "Custom" },
  "hero.stat2l": { zh: "尺寸 · 厚度 · 幅宽", en: "Size · thickness · width" },
  "hero.stat3n": { zh: "5年+", en: "5yr+" },
  "hero.stat3l": { zh: "坚固耐用 抗老化", en: "Durable & anti-aging" },
  "hero.chip1": { zh: "保温性能优异", en: "Excellent insulation" },
  "hero.chip2": { zh: "坚固耐用", en: "Durable & strong" },
  "hero.callPrefix": { zh: "或致电咨询：", en: "Or call us: " },
  "fab.call": { zh: "电话咨询", en: "Call Us" },

  /* 优势条 */
  "feat1.t": { zh: "保温隔寒", en: "Superior Insulation" },
  "feat1.d": { zh: "多层复合结构，有效锁住棚内温度，抵御严寒。", en: "Multi-layer structure locks in greenhouse heat against severe cold." },
  "feat2.t": { zh: "防水抗老化", en: "Waterproof & Anti-aging" },
  "feat2.d": { zh: "表面防水处理，抗紫外线、耐风吹日晒。", en: "Waterproof, UV-resistant surface built to last." },
  "feat3.t": { zh: "厂家直供", en: "Factory Direct" },
  "feat3.d": { zh: "自有生产，省去中间环节，价格更实在。", en: "Our own production — fair prices, assured quality." },
  "feat4.t": { zh: "按需定制", en: "Made to Order" },
  "feat4.d": { zh: "按大棚尺寸、气候定制规格、厚度与幅宽。", en: "Specs, thickness and width tailored to you." },

  /* 关于我们 */
  "about.eyebrow": { zh: "关于我们", en: "About Us" },
  "about.title": { zh: "扎根青州，专注大棚保温棉被", en: "Rooted in Qingzhou, Focused on Greenhouse Insulation" },
  "about.p1": {
    zh: "鑫源鼎丰农业科技有限公司位于山东省青州市何官镇，是一家专注于蔬菜大棚保温棉被研发、生产与销售的农业科技企业。",
    en: "Xinyuan Dingfeng Agricultural Technology Co., Ltd. is located in Heguan Town, Qingzhou, Shandong Province. We focus on the R&D, production and sales of greenhouse thermal insulation quilts."
  },
  "about.p2": {
    zh: "我们采用优质原材料与成熟生产工艺，为蔬菜、瓜果、花卉等温室大棚提供保温隔寒方案，帮助农户降低能耗、稳定棚温、保障作物安全越冬。",
    en: "With quality materials and proven processes, we provide insulation solutions for vegetable, fruit and flower greenhouses — cutting energy use, stabilizing temperature and protecting crops through winter."
  },
  "about.point1t": { zh: "优质材料", en: "Quality Materials" },
  "about.point1d": { zh: "精选保温填充与面料", en: "Selected fillings & fabrics" },
  "about.point2t": { zh: "工艺成熟", en: "Proven Craft" },
  "about.point2d": { zh: "规范化生产流程", en: "Standardized production" },
  "about.point3t": { zh: "厂家直销", en: "Direct Sales" },
  "about.point3d": { zh: "源头价格更实惠", en: "Fair factory pricing" },
  "about.point4t": { zh: "贴心服务", en: "Caring Service" },
  "about.point4d": { zh: "咨询 · 定制 · 配送 · 售后", en: "Advice to after-sales" },
  "about.stampBig": { zh: "源头工厂", en: "FACTORY" },
  "about.stampSmall": { zh: "厂家直供 品质保障", en: "Direct & assured" },

  /* 业务介绍 */
  "biz.eyebrow": { zh: "业务介绍", en: "What We Do" },
  "biz.title": { zh: "从生产到售后的一站式保温方案", en: "One-Stop Insulation, From Production to Service" },
  "biz.sub": { zh: "围绕大棚保温棉被，我们提供生产制造、定制方案与配送服务的完整链条。", en: "Around greenhouse quilts, we cover manufacturing, customization and delivery end to end." },
  "biz1.t": { zh: "保温棉被生产", en: "Quilt Manufacturing" },
  "biz1.d": { zh: "多规格大棚保温棉被批量生产，质量稳定可靠。", en: "Batch production of multi-spec quilts with consistent quality." },
  "biz1.l1": { zh: "多层复合，保温性好", en: "Multi-layer, strong insulation" },
  "biz1.l2": { zh: "防水防潮面料", en: "Waterproof, moisture-proof fabric" },
  "biz1.l3": { zh: "抗老化、抗紫外线", en: "Anti-aging & UV-resistant" },
  "biz2.t": { zh: "定制化方案", en: "Custom Solutions" },
  "biz2.d": { zh: "按大棚尺寸、作物与气候定制专属保温方案。", en: "Tailored to your greenhouse size, crop and climate." },
  "biz2.l1": { zh: "尺寸、幅宽定制", en: "Custom size & width" },
  "biz2.l2": { zh: "厚度、克重可选", en: "Selectable thickness & weight" },
  "biz2.l3": { zh: "专业选型建议", en: "Expert selection advice" },
  "biz3.t": { zh: "配送与服务", en: "Delivery & Service" },
  "biz3.d": { zh: "全国配送，提供使用与维护指导，售后无忧。", en: "Nationwide delivery with guidance and after-sales support." },
  "biz3.l1": { zh: "全国物流配送", en: "Nationwide logistics" },
  "biz3.l2": { zh: "使用与维护指导", en: "Usage & maintenance guidance" },
  "biz3.l3": { zh: "售后及时响应", en: "Responsive after-sales" },

  /* 产品展示 */
  "prod.eyebrow": { zh: "产品展示", en: "Our Products" },
  "prod.title": { zh: "多种规格 满足不同大棚需求", en: "Multiple Specs for Every Greenhouse" },
  "prod.sub": { zh: "以下为常见产品类型，具体规格、厚度与幅宽均可按需定制，欢迎来电咨询。", en: "Common product types below — specs, thickness and width are all customizable. Call us anytime." },
  "prod1.t": { zh: "标准型保温棉被", en: "Standard Insulation Quilt" },
  "prod1.d": { zh: "适用于常规蔬菜大棚，保温稳定，性价比高。", en: "For regular vegetable greenhouses — reliable insulation, great value." },
  "prod1.tag": { zh: "常用款", en: "Popular" },
  "prod1.s1": { zh: "多层复合", en: "Multi-layer" },
  "prod1.s2": { zh: "防潮", en: "Moisture-proof" },
  "prod1.s3": { zh: "性价比高", en: "Great value" },
  "prod2.t": { zh: "加厚防寒型", en: "Thickened Cold-Resistant" },
  "prod2.d": { zh: "加厚加密设计，适合北方寒冷地区与严冬使用。", en: "Thicker and denser — for cold regions and harsh winters." },
  "prod2.tag": { zh: "抗严寒", en: "Extra Warm" },
  "prod2.s1": { zh: "加厚", en: "Thickened" },
  "prod2.s2": { zh: "高保温", en: "High warmth" },
  "prod2.s3": { zh: "抗严寒", en: "Cold-resistant" },
  "prod3.t": { zh: "防水牛津布面被", en: "Waterproof Oxford-Surface" },
  "prod3.d": { zh: "牛津布面料，防水耐磨，适合多雨多雪地区。", en: "Oxford-fabric surface, waterproof and wear-resistant for wet climates." },
  "prod3.tag": { zh: "防水款", en: "Waterproof" },
  "prod3.s1": { zh: "牛津布面", en: "Oxford fabric" },
  "prod3.s2": { zh: "防水", en: "Waterproof" },
  "prod3.s3": { zh: "耐磨", en: "Wear-resistant" },
  "prod4.t": { zh: "定制规格棉被", en: "Custom-Spec Quilt" },
  "prod4.d": { zh: "按大棚实际尺寸与需求，定制专属保温棉被。", en: "Made to your exact greenhouse dimensions and needs." },
  "prod4.tag": { zh: "可定制", en: "Made-to-order" },
  "prod4.s1": { zh: "尺寸定制", en: "Custom size" },
  "prod4.s2": { zh: "厚度可选", en: "Selectable thickness" },
  "prod4.s3": { zh: "幅宽可选", en: "Selectable width" },
  "prod.cta": { zh: "电话咨询", en: "Inquire" },

  /* 为什么选择我们 */
  "why.eyebrow": { zh: "为什么选择我们", en: "Why Choose Us" },
  "why.title": { zh: "让每一座大棚都温暖过冬", en: "Keeping Every Greenhouse Warm All Winter" },
  "why.sub": { zh: "用稳定的品质与务实的服务，赢得农户与合作社的信任。", en: "Earning the trust of farmers and co-ops with steady quality and practical service." },
  "why1.t": { zh: "源头工厂 价格实在", en: "Factory Source, Fair Prices" },
  "why1.d": { zh: "自有生产、厂家直供，省去中间环节，让利客户。", en: "Our own factory and direct supply — savings passed on to you." },
  "why2.t": { zh: "品质把控 用着放心", en: "Quality You Can Trust" },
  "why2.d": { zh: "严选材料、规范生产，保温与耐用兼顾。", en: "Selected materials and standardized production for warmth and durability." },
  "why3.t": { zh: "按需定制 贴心服务", en: "Custom & Caring Service" },
  "why3.d": { zh: "从选型到售后，提供专业建议与及时响应。", en: "Expert advice from selection through after-sales." },

  /* 联系我们 */
  "contact.eyebrow": { zh: "联系我们", en: "Contact Us" },
  "contact.title": { zh: "获取报价与选型建议", en: "Get a Quote & Advice" },
  "contact.sub": { zh: "大棚保温有任何需求，欢迎随时来电或留言，我们会尽快与您联系。", en: "For any greenhouse insulation need, call or message us — we'll reply soon." },
  "contact.phoneLabel": { zh: "联系电话", en: "Phone" },
  "contact.emailLabel": { zh: "电子邮箱", en: "Email" },
  "contact.addrLabel": { zh: "公司地址", en: "Address" },
  "contact.addrValue": { zh: "山东省青州市何官镇", en: "Heguan Town, Qingzhou City, Shandong, China" },
  "contact.hoursLabel": { zh: "营业时间", en: "Business Hours" },
  "contact.hoursValue": { zh: "周一至周日 8:00 - 18:00", en: "Mon–Sun 8:00–18:00" },
  "contact.mapLink": { zh: "在地图中查看", en: "View on map" },
  "contact.callNow": { zh: "立即拨打", en: "Call Now" },

  "form.title": { zh: "在线留言", en: "Send a Message" },
  "form.hint": { zh: "填写下方表单并提交，我们会第一时间收到并尽快与您联系。", en: "Fill in the form below (currently in Chinese) and submit — we'll receive it right away. If you prefer English, feel free to call or email us using the details above." },

  /* 页脚 */
  "footer.about": { zh: "专业蔬菜大棚保温棉被生产厂家，保温隔寒、坚固耐用，助力农作物安全越冬。", en: "A manufacturer of greenhouse thermal insulation quilts — warm, durable, protecting crops through winter." },
  "footer.navTitle": { zh: "快速导航", en: "Quick Links" },
  "footer.prodTitle": { zh: "产品系列", en: "Products" },
  "footer.contactTitle": { zh: "联系我们", en: "Contact" },
  "footer.copyright": { zh: "鑫源鼎丰农业科技有限公司 · 版权所有", en: "Xinyuan Dingfeng Agricultural Technology Co., Ltd. · All rights reserved" },
  "footer.icp": { zh: "ICP 备案号：待备案", en: "ICP filing: pending" }
};

/* ---------- i18n 应用 ---------- */
function applyLang(lang) {
  const root = document.documentElement;
  root.setAttribute("lang", lang === "en" ? "en" : "zh-CN");

  // 文本
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const dict = I18N[el.getAttribute("data-i18n")];
    if (dict && dict[lang] != null) el.textContent = dict[lang];
  });
  // 富文本（含 HTML）
  document.querySelectorAll("[data-i18n-html]").forEach(el => {
    const dict = I18N[el.getAttribute("data-i18n-html")];
    if (dict && dict[lang] != null) el.innerHTML = dict[lang];
  });
  // 占位符
  document.querySelectorAll("[data-i18n-ph]").forEach(el => {
    const dict = I18N[el.getAttribute("data-i18n-ph")];
    if (dict && dict[lang] != null) el.setAttribute("placeholder", dict[lang]);
  });
  // 标题
  if (I18N["meta.title"]) document.title = I18N["meta.title"][lang];

  // 切换按钮状态
  document.querySelectorAll(".lang-toggle button").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  try { localStorage.setItem("xydf-lang", lang); } catch (e) {}
}

/* ---------- 初始化 ---------- */
document.addEventListener("DOMContentLoaded", () => {
  // 语言：读取本地偏好，默认中文
  let saved = "zh";
  try { saved = localStorage.getItem("xydf-lang") || "zh"; } catch (e) {}
  applyLang(saved);

  document.querySelectorAll(".lang-toggle button").forEach(btn => {
    btn.addEventListener("click", () => applyLang(btn.dataset.lang));
  });

  // 头部滚动样式
  const header = document.querySelector(".header");
  const toTop = document.querySelector(".to-top");
  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 10);
    if (toTop) toTop.classList.toggle("show", y > 480);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // 返回顶部
  if (toTop) toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // 移动端菜单
  const burger = document.querySelector(".nav__burger");
  const panel = document.querySelector(".mobile-panel");
  if (burger && panel) {
    burger.addEventListener("click", () => panel.classList.toggle("open"));
    panel.querySelectorAll("a").forEach(a => a.addEventListener("click", () => panel.classList.remove("open")));
  }

  // 平滑锚点滚动（考虑固定头部高度）
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });

  // 滚动出现动画
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add("in"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add("in"));
  }

  // 留言表单：已改为内嵌「金数据」在线表单（iframe），提交与通知由金数据后台处理。
  // 如需更换表单服务，替换 index.html 中联系板块的 <iframe> 地址即可。

  // 页脚年份
  const yearEl = document.querySelector("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
