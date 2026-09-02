
(() => {
  "use strict";

 
  const PRODUCT_NAMES = {
    1: "راديو محمول كلاسيك",
    2: "راديو سيارة USB",
    3: "راديو بلوتوث محمول",
    4: "راديو شمسي للطوارئ",
    5: "راديو جيب صغير",
    6: "راديو منزلي كبير",
  };

  let db = null;
  let firebaseReady = false;

  function isFirebaseConfigured() {
    return (
      typeof FIREBASE_CONFIG !== "undefined" &&
      FIREBASE_CONFIG.apiKey &&
      !FIREBASE_CONFIG.apiKey.startsWith("ضع-")
    );
  }

  function initFirebase() {
    if (!isFirebaseConfigured()) return;
    try {
      firebase.initializeApp(FIREBASE_CONFIG);
      db = firebase.firestore();
      firebaseReady = true;
    } catch (err) {
      console.error("تعذّر تفعيل Firebase:", err);
    }
  }

  /* ---------- شاشة كلمة السر ---------- */
  function setupLockScreen() {
    const lockScreen = document.getElementById("lockScreen");
    const dashboard = document.getElementById("dashboardContent");
    const form = document.getElementById("lockForm");
    const input = document.getElementById("lockPassword");
    const error = document.getElementById("lockError");

    // لو كان المستخدم دخل صح قبل كده في نفس الجلسة، متطلبش كلمة السر تاني
    // (بعض المتصفحات بتمنع sessionStorage لو فتحت الملف مباشرة من غير سيرفر،
    // فبنستخدم try/catch عشان الصفحة تفضل شغالة حتى لو الميزة دي معطّلة)
    try {
      if (sessionStorage.getItem("nourBadrDashboardUnlocked") === "1") {
        unlock();
      }
    } catch (err) {
      console.info("sessionStorage غير متاح (طبيعي عند فتح الملف مباشرة بدون سيرفر).");
    }

    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      const expected = (typeof ADMIN_CONFIG !== "undefined" && ADMIN_CONFIG.dashboardPassword) || "";
      if (input.value === expected && expected !== "") {
        try {
          sessionStorage.setItem("nourBadrDashboardUnlocked", "1");
        } catch (err) {
          // متجاهلين الخطأ - مش مشكلة لو الحفظ فشل، هيطلب كلمة السر تاني بس
        }
        unlock();
      } else {
        error.hidden = false;
      }
    });

    function unlock() {
      lockScreen.hidden = true;
      dashboard.hidden = false;
      loadStats();
    }
  }

  /* ---------- تحميل الإحصائيات وعرضها ---------- */
  async function loadStats() {
    const notice = document.getElementById("dashboardNotice");

    if (!firebaseReady) {
      notice.hidden = false;
      document.getElementById("dashboardTableBody").innerHTML =
        `<tr><td colspan="3" class="dashboard-table__empty">لا توجد بيانات — فعّل Firebase أولًا.</td></tr>`;
      return;
    }
    notice.hidden = true;

    try {
      // زيارات الموقع
      const siteDoc = await db.collection("siteStats").doc("main").get();
      const visits = siteDoc.exists ? (siteDoc.data().visits || 0) : 0;
      document.getElementById("statVisits").textContent = visits.toLocaleString("ar-EG");

      // إحصائيات كل منتج
      const productStatsSnap = await db.collection("productStats").get();
      const rows = [];
      let totalViews = 0;
      let totalOrders = 0;

      productStatsSnap.forEach((doc) => {
        const data = doc.data();
        const views = data.views || 0;
        const orders = data.orders || 0;
        totalViews += views;
        totalOrders += orders;
        rows.push({ id: doc.id, views, orders });
      });

      // رتّب المنتجات الأكثر طلبًا في الأعلى
      rows.sort((a, b) => b.orders - a.orders);

      document.getElementById("statOrders").textContent = totalOrders.toLocaleString("ar-EG");
      document.getElementById("statViews").textContent = totalViews.toLocaleString("ar-EG");

      const tbody = document.getElementById("dashboardTableBody");
      if (rows.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" class="dashboard-table__empty">لا توجد بيانات لسه — لسه محدش دخل الموقع أو ضغط على منتج.</td></tr>`;
        return;
      }

      tbody.innerHTML = rows.map((row) => `
        <tr>
          <td>${PRODUCT_NAMES[row.id] || `منتج رقم ${row.id}`}</td>
          <td>${row.views.toLocaleString("ar-EG")}</td>
          <td>${row.orders.toLocaleString("ar-EG")}</td>
        </tr>
      `).join("");
    } catch (err) {
      console.error("تعذّر تحميل الإحصائيات:", err);
      document.getElementById("dashboardTableBody").innerHTML =
        `<tr><td colspan="3" class="dashboard-table__empty">حدث خطأ أثناء تحميل البيانات.</td></tr>`;
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    initFirebase();
    setupLockScreen();
    document.getElementById("dashboardRefresh")?.addEventListener("click", loadStats);
  });
})();
