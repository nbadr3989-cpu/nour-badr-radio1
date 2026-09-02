

(() => {
  "use strict";

  
  const CONFIG = {
    // غيّر رقم الواتساب هنا (بصيغة دولية بدون + وبدون مسافات، مثال: 201234567890)
    whatsapp: "+201080067810",

    // غيّر رقم الهاتف المعروض للعميل هنا
    phone: "01080067807",

    // غيّر العنوان هنا
    address: "شارع اللمعي , مدينة تلا , المنوفية",

    // غيّر مواعيد العمل هنا
    workingHours: "يوميًا من 10 صباحًا حتى 11 مساءً",

    // اسم المتجر (يستخدم في رسالة الواتساب)
    storeName: " Nour_ Badr",

    // جملة "صف الثقة" اللي بتظهر أعلى الصفحة الرئيسية - اكتبها بحاجة حقيقية عن متجرك
    trustText: "عملاء بيثقوا في نور بدر كل يوم",
  };

  /* ========================================================================
     🗂️ 2) التصنيفات — Categories
     أضف أو احذف تصنيف بسهولة عن طريق إضافة/حذف سطر من المصفوفة دي.
     "icon" هو أي إيموجي أو رمز بسيط.
     ======================================================================== */
  const CATEGORIES = [
    { id: "all", name: "الكل", icon: "🗂️" },
    { id: "portable", name: "راديو محمول", icon: "📻" },
    { id: "car", name: "راديو سيارة", icon: "🚗" },
    { id: "vintage", name: "راديو كلاسيك", icon: "📟" },
    { id: "bluetooth", name: "راديو بلوتوث", icon: "🔵" },
    { id: "solar", name: "راديو شمسي", icon: "☀️" },
  ];

  /* ========================================================================
     📻 3) المنتجات — Products (راديوهات فقط)
     // أضف المنتجات هنا: انسخ أي راديو والصقه وغيّر بياناته.
     // غيّر بيانات المنتج هنا: الاسم، السعر، السعر القديم، الصورة، الوصف، القسم.

     - image: اسم ملف الصورة داخل مجلد images/ (مثال: "images/product-1.jpg")
     - category: لازم يكون نفس الـ id الموجود في CATEGORIES فوق
     - oldPrice: اتركه null لو مفيش سعر قديم
     - badge: اتركه null لو مفيش شارة، أو اكتب مثلاً "عرض" أو "جديد"
     ======================================================================== */
  const PRODUCTS = [
    {
      id: 1,
      name: "راديو GOLON كلاسيك 11 موجة",
      price: 480,
      oldPrice: null,
      image: "images/product-1.jpg",
      category: "vintage",
      description: "راديو قوي متعدد الموجات بصوت نقي وتصميم كلاسيكي متين.",
      badge: "عرض",
    },
    {
      id: 2,
      name: "راديو GOLON متعدد النطاقات",
      price: 290,
      oldPrice: null,
      image: "images/product-2.jpg",
      category: "portable",
      description: "راديو محمول عملي بـ 5 موجات والتقاط فائق لجميع المحطات.",
      badge: "جديد",
    },
    {
      id: 3,
      name: "راديو انتيك كلاسيك فاخر",
      price: 750,
      oldPrice: null,
      image: "images/product-3.jpg",
      category: "vintage",
      description: "تصميم تراثي أنيق يجمع بين أصالة الماضي ودقة الصوت الحديث.",
      badge: "عرض",
    },
    {
      id: 4,
      name: "راديو خشبي كلاسيكي كبير",
      price: 950,
      oldPrice: null,
      image: "images/product-4.jpg",
      category: "bluetooth",
      description: "هيكل خشبي فاخر بصوت دافئ ومؤشرات ضبط كلاسيكية دقيقة.",
      badge: null,
    },
    {
      id: 5,
      name: "راديو ميني مودرن ببطارية قابلة للشحن",
      price: 750,
      oldPrice: null,
      image: "images/product-5.jpg",
      category: "portable",
      description: "راديو مدمج أنيق ببطارية ليثيوم شحن وإريال قوي للإشارة.",
      badge: "عرض",
    },
    {
      id: 6,
      name: "راديو GOLON بساعة مدمجة",
      price: 750,
      oldPrice: null,
      image: "images/product-6.jpg",
      category: "bluetooth",
      description: "راديو بتصميم ريترو مزود بساعة عقارب ودعم USB وبلوتوث.",
      badge: "جديد",
    },
    {
      id: 7,
      name: "راديو GOLON مكتبي متعدد المداخل",
      price: 650,
      oldPrice: null,
      image: "images/product-7.jpg",
      category: "portable",
      description: "راديو 3 موجات عملي يدعم كروت الذاكرة وبطارية تدوم طويلاً.",
      badge: "جديد",
    },
  ];

  /* ========================================================================
     من هنا تحت: كود العرض والتحليلات وتسجيل الدخول — لا تحتاج لتعديله
     ======================================================================== */

  const whatsappUrl = (message) =>
    `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;

  const orderMessage = (product) =>
    `مرحبًا، أريد طلب منتج: ${product.name} بسعر ${product.price} جنيه.`;

  const generalMessage = `مرحبًا ${CONFIG.storeName}، أريد الاستفسار عن منتجاتكم.`;

  /* ---------- تعبئة روابط واتساب الثابتة في الصفحة ---------- */
  function setupWhatsappLinks() {
    const generalLink = whatsappUrl(generalMessage);
    const contactBtn = document.getElementById("contactWhatsappBtn");
    const navBtn = document.getElementById("navWhatsapp");
    if (contactBtn) contactBtn.href = generalLink;
    if (navBtn) navBtn.href = generalLink;
  }

  /* ---------- تعبئة بيانات التواصل ---------- */
  function setupContactInfo() {
    const phoneEl = document.getElementById("contactPhone");
    const addressEl = document.getElementById("contactAddress");
    const hoursEl = document.getElementById("contactHours");
    const trustEl = document.getElementById("trustText");
    if (phoneEl) phoneEl.textContent = CONFIG.phone;
    if (addressEl) addressEl.textContent = CONFIG.address;
    if (hoursEl) hoursEl.textContent = CONFIG.workingHours;
    if (trustEl) trustEl.textContent = CONFIG.trustText;
  }

  /* ---------- رسم التصنيفات ---------- */
  let activeCategory = "all";

  function renderCategories() {
    const list = document.getElementById("categoriesList");
    if (!list) return;

    list.innerHTML = CATEGORIES.map((cat, index) => `
      <button
        type="button"
        class="category-card card-enter${cat.id === activeCategory ? " is-active" : ""}"
        data-category="${cat.id}"
        style="animation-delay:${index * 0.04}s"
      >
        <span class="category-card__icon">${cat.icon}</span>
        <span>${cat.name}</span>
      </button>
    `).join("");

    list.querySelectorAll("[data-category]").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeCategory = btn.dataset.category;
        renderCategories();
        renderProducts();
        document.getElementById("products")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  /* ---------- إنشاء عنصر صورة مع Placeholder عند الفشل + إمكانية تكبيرها ---------- */
  function buildMediaHtml(product) {
    return `
      <button type="button" class="product-card__media-btn" data-lightbox-id="${product.id}" aria-label="تكبير صورة ${product.name}">
        <img
          src="${product.image}"
          alt="${product.name}"
          loading="lazy"
          onerror="this.parentElement.innerHTML = '<div class=&quot;img-placeholder&quot;>ضع صورة<br>${product.image}</div>'"
        >
      </button>
    `;
  }

  /* ---------- رسم كروت المنتجات ---------- */
  function renderProducts() {
    const grid = document.getElementById("productsGrid");
    if (!grid) return;

    const filtered = activeCategory === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

    if (filtered.length === 0) {
      grid.innerHTML = `<p class="products-empty">لا توجد منتجات في هذا القسم حاليًا.</p>`;
      return;
    }

    grid.innerHTML = filtered.map((product, index) => `
      <article class="product-card card-enter" style="animation-delay:${index * 0.05}s">
        <div class="product-card__media">
          ${buildMediaHtml(product)}
          ${product.badge ? `<span class="product-card__badge">${product.badge}</span>` : ""}
        </div>
        <div class="product-card__body">
          <span class="product-card__name">${product.name}</span>
          <p class="product-card__desc">${product.description}</p>
          <div class="product-card__prices">
            <span class="product-card__price">${product.price} جنيه</span>
            ${product.oldPrice ? `<span class="product-card__old-price">${product.oldPrice} جنيه</span>` : ""}
          </div>
          <button type="button" class="product-card__cta" data-order-id="${product.id}">
            اطلب الآن
          </button>
        </div>
      </article>
    `).join("");

    // زر الطلب: يفتح واتساب + يسجّل عملية طلب في التحليلات
    grid.querySelectorAll("[data-order-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = Number(btn.dataset.orderId);
        const product = PRODUCTS.find((p) => p.id === id);
        if (!product) return;
        trackProductEvent(id, "orders");
        window.open(whatsappUrl(orderMessage(product)), "_blank", "noopener");
      });
    });

    // صورة المنتج: تفتح تكبير الصورة + تسجّل مشاهدة في التحليلات
    grid.querySelectorAll("[data-lightbox-id]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = Number(btn.dataset.lightboxId);
        const product = PRODUCTS.find((p) => p.id === id);
        if (!product) return;
        trackProductEvent(id, "views");
        openLightbox(product);
      });
    });
  }

  /* ---------- تفعيل عنصر Bottom Nav النشط حسب القسم الظاهر ---------- */
  function setupBottomNavActiveState() {
    const navItems = Array.from(document.querySelectorAll(".bottom-nav__item[data-nav]"));
    const sections = navItems
      .map((item) => document.querySelector(item.getAttribute("href")))
      .filter(Boolean);

    if (!("IntersectionObserver" in window) || sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navItems.forEach((item) => item.classList.remove("is-active"));
          const match = navItems.find((item) => item.getAttribute("href") === `#${entry.target.id}`);
          if (match) match.classList.add("is-active");
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  /* ---------- السنة في الفوتر ---------- */
  function setupFooterYear() {
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  /* ========================================================================
     🔢 عداد الإحصائيات المتحرك (Count-up)
     بيقرأ data-target و data-decimals و data-suffix من كل رقم في قسم الإحصائيات
     ويشغّل العداد لما القسم يظهر على الشاشة أثناء التمرير.
     ======================================================================== */
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateCount(el) {
    const target = parseFloat(el.dataset.target || "0");
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const suffix = el.dataset.suffix || "";

    const prefersReducedMotion = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    if (prefersReducedMotion) {
      el.textContent = target.toFixed(decimals) + suffix;
      return;
    }

    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = easeOutCubic(progress);
      const value = target * eased;
      el.textContent = value.toFixed(decimals) + suffix;
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = target.toFixed(decimals) + suffix;
      }
    }
    requestAnimationFrame(tick);
  }

  function setupStatsCountUp() {
    const statValues = document.querySelectorAll("[data-count]");
    if (statValues.length === 0) return;

    if (!("IntersectionObserver" in window)) {
      // متصفح قديم مايدعمش IntersectionObserver: شغّل العداد على طول
      statValues.forEach(animateCount);
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCount(entry.target);
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.4 }
    );

    statValues.forEach((el) => observer.observe(el));
  }

  /* ---------- ظهور تدريجي للأقسام أثناء التمرير للأسفل ---------- */
  function setupScrollReveal() {
    const sections = document.querySelectorAll(".reveal-on-scroll");
    if (sections.length === 0) return;

    if (!("IntersectionObserver" in window)) {
      sections.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    sections.forEach((el) => observer.observe(el));
  }

  /* ========================================================================
     🖼️ Lightbox — تكبير صورة المنتج عند الضغط عليها
     ======================================================================== */
  function openLightbox(product) {
    const lightbox = document.getElementById("lightbox");
    const img = document.getElementById("lightboxImage");
    const caption = document.getElementById("lightboxCaption");
    if (!lightbox || !img) return;

    img.src = product.image;
    img.alt = product.name;
    if (caption) caption.textContent = `${product.name} — ${product.price} جنيه`;

    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  }

  function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  }

  function setupLightbox() {
    document.getElementById("lightboxClose")?.addEventListener("click", closeLightbox);
    document.getElementById("lightbox")?.addEventListener("click", (e) => {
      if (e.target.id === "lightbox") closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeLightbox();
    });
  }

  /* ========================================================================
     🔥 Firebase — التحليلات الحقيقية (زيارات + ضغطات) وتسجيل الدخول
     كل البيانات دي بتتحسب لكل الزوار من كل الأجهزة، مش جهازك بس.
     لو لسه مفعّلتش Firebase (راجع README)، الموقع هيشتغل عادي
     بدون تحليلات وبدون تسجيل دخول، وهيظهر تنبيه بسيط في نافذة الحساب.
     ======================================================================== */
  let firebaseReady = false;
  let db = null;
  let auth = null;

  function isFirebaseConfigured() {
    return (
      typeof FIREBASE_CONFIG !== "undefined" &&
      FIREBASE_CONFIG.apiKey &&
      !FIREBASE_CONFIG.apiKey.startsWith("ضع-")
    );
  }

  function initFirebase() {
    if (!isFirebaseConfigured()) {
      console.info("Firebase غير مفعّل بعد. راجع js/firebase-config.js و README.md.");
      return;
    }
    try {
      firebase.initializeApp(FIREBASE_CONFIG);
      db = firebase.firestore();
      auth = firebase.auth();
      firebaseReady = true;
    } catch (err) {
      console.error("تعذّر تفعيل Firebase:", err);
    }
  }

  // تسجيل زيارة جديدة للموقع (مرة واحدة لكل تحميل صفحة)
  function trackVisit() {
    if (!firebaseReady) return;
    db.collection("siteStats").doc("main").set(
      { visits: firebase.firestore.FieldValue.increment(1) },
      { merge: true }
    ).catch((err) => console.error("تعذّر تسجيل الزيارة:", err));
  }

  // تسجيل ضغطة على منتج: field = "views" أو "orders"
  function trackProductEvent(productId, field) {
    if (!firebaseReady) return;
    db.collection("productStats").doc(String(productId)).set(
      { [field]: firebase.firestore.FieldValue.increment(1) },
      { merge: true }
    ).catch((err) => console.error("تعذّر تسجيل الحدث:", err));
  }

  /* ========================================================================
     👤 نافذة تسجيل الدخول / إنشاء حساب
     ======================================================================== */
  function openAuthModal() {
    const modal = document.getElementById("authModal");
    if (!modal) return;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");

    const notice = document.getElementById("authFirebaseNotice");
    if (notice) notice.hidden = firebaseReady;
  }

  function closeAuthModal() {
    const modal = document.getElementById("authModal");
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  }

  function showAuthError(message) {
    const errorEl = document.getElementById("authError");
    if (!errorEl) return;
    errorEl.textContent = message;
    errorEl.hidden = false;
  }

  function clearAuthError() {
    const errorEl = document.getElementById("authError");
    if (errorEl) errorEl.hidden = true;
  }

  function switchAuthTab(tab) {
    document.querySelectorAll("[data-auth-tab]").forEach((btn) => {
      btn.classList.toggle("is-active", btn.dataset.authTab === tab);
    });
    document.querySelectorAll("[data-auth-panel]").forEach((panel) => {
      panel.hidden = panel.dataset.authPanel !== tab;
    });
    clearAuthError();
  }

  function updateAccountUI(user) {
    const icon = document.getElementById("topbarAccountIcon");
    const formsPanel = document.getElementById("authPanelForms");
    const accountPanel = document.getElementById("authPanelAccount");

    if (user) {
      if (icon) icon.textContent = "✅";
      if (formsPanel) formsPanel.hidden = true;
      if (accountPanel) {
        accountPanel.hidden = false;
        document.getElementById("authAccountName").textContent = `أهلًا, ${user.displayName || "بيك"}`;
        document.getElementById("authAccountEmail").textContent = user.email || "";
      }
    } else {
      if (icon) icon.textContent = "👤";
      if (formsPanel) formsPanel.hidden = false;
      if (accountPanel) accountPanel.hidden = true;
    }
  }

  function setupAuth() {
    document.getElementById("topbarAccountBtn")?.addEventListener("click", openAuthModal);
    document.getElementById("authModalClose")?.addEventListener("click", closeAuthModal);
    document.getElementById("authModalBackdrop")?.addEventListener("click", closeAuthModal);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeAuthModal();
    });

    document.querySelectorAll("[data-auth-tab]").forEach((btn) => {
      btn.addEventListener("click", () => switchAuthTab(btn.dataset.authTab));
    });

    const loginForm = document.getElementById("authPanelLogin");
    const signupForm = document.getElementById("authPanelSignup");
    const logoutBtn = document.getElementById("authLogoutBtn");

    loginForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      clearAuthError();
      if (!firebaseReady) {
        showAuthError("خاصية الحسابات لسه مش مفعّلة. راجع README.md.");
        return;
      }
      const email = loginForm.email.value.trim();
      const password = loginForm.password.value;
      auth.signInWithEmailAndPassword(email, password)
        .then(() => {
          loginForm.reset();
          closeAuthModal();
        })
        .catch((err) => showAuthError(translateAuthError(err)));
    });

    signupForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      clearAuthError();
      if (!firebaseReady) {
        showAuthError("خاصية الحسابات لسه مش مفعّلة. راجع README.md.");
        return;
      }
      const name = signupForm.name.value.trim();
      const phone = signupForm.phone.value.trim();
      const email = signupForm.email.value.trim();
      const password = signupForm.password.value;

      auth.createUserWithEmailAndPassword(email, password)
        .then((cred) => {
          return cred.user.updateProfile({ displayName: name }).then(() => {
            // نحفظ رقم الموبايل والاسم كملف بيانات إضافي في Firestore
            return db.collection("users").doc(cred.user.uid).set({
              name,
              phone,
              email,
              createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            });
          });
        })
        .then(() => {
          signupForm.reset();
          closeAuthModal();
        })
        .catch((err) => showAuthError(translateAuthError(err)));
    });

    logoutBtn?.addEventListener("click", () => {
      if (!firebaseReady) return;
      auth.signOut();
      closeAuthModal();
    });

    if (firebaseReady) {
      auth.onAuthStateChanged((user) => updateAccountUI(user));
    }
  }

  function translateAuthError(err) {
    const map = {
      "auth/email-already-in-use": "البريد الإلكتروني ده مسجل بالفعل.",
      "auth/invalid-email": "البريد الإلكتروني غير صحيح.",
      "auth/weak-password": "كلمة المرور لازم تكون 6 أحرف على الأقل.",
      "auth/user-not-found": "لا يوجد حساب بهذا البريد الإلكتروني.",
      "auth/wrong-password": "كلمة المرور غير صحيحة.",
      "auth/invalid-credential": "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
    };
    return map[err.code] || "حدث خطأ، حاول مرة أخرى.";
  }

  /* ---------- تشغيل كل شيء بعد تحميل الصفحة ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    // كل خطوة معزولة عن التانية: لو حصل خطأ غير متوقع في حاجة،
    // باقي الموقع يفضل شغال بدل ما يقف كله.
    const steps = [
      initFirebase,
      setupWhatsappLinks,
      setupContactInfo,
      renderCategories,
      renderProducts,
      setupBottomNavActiveState,
      setupFooterYear,
      setupStatsCountUp,
      setupScrollReveal,
      setupLightbox,
      setupAuth,
      trackVisit,
    ];

    steps.forEach((step) => {
      try {
        step();
      } catch (err) {
        console.error(`تعذّر تشغيل ${step.name}:`, err);
      }
    });
  });
})();
