const STORAGE_KEY = "codevent_node_progress_v1";
 const LAST_KEY = "codevent_node_last_v1";
 
 /* ---------- Course access authorization ---------- */
 const ACCESS_TOKEN_KEY = "codevent_nodejs_access_token";
 const WORKER_URL = "https://codevent-nodejs-course.emezch93.workers.dev";
 
+function getCourseData() {
+  if (!window.COURSE || !Array.isArray(window.COURSE.modules)) {
+    throw new Error("Course data failed to load. Check that js/data.js is published before js/app.js.");
+  }
+
+  return window.COURSE;
+}
+
+const courseData = getCourseData();
+
 function renderAuthState(html) {
   const content = document.getElementById("content");
   const sidebar = document.getElementById("sidebar");
   if (sidebar) sidebar.innerHTML = "";
   if (content) content.innerHTML = html;
 }
 
 function authLoadingHtml(message) {
   return `<div class="auth-gate"><p class="auth-gate-message">${message}</p></div>`;
 }
 
 function authErrorHtml(message) {
   return `
     <div class="auth-gate">
       <p class="auth-gate-message">${message}</p>
       <button type="button" id="auth-retry-btn" class="auth-retry-btn">Retry</button>
     </div>`;
 }
 
 function lockedScreenHtml(errorMessage) {
   return `
     <div class="auth-gate">
       <div class="auth-gate-card">
         <div class="auth-gate-brand">CodeVent Digital</div>
         <h1 class="auth-gate-title">Course Locked</h1>
@@ -116,51 +126,51 @@ async function initAuth() {
     return;
   }
 
   renderAuthState(authLoadingHtml("Checking your course access..."));
 
   const result = await verifyStoredAccess(token);
 
   if (result.networkError) {
     renderAuthState(authErrorHtml("Unable to verify your course access right now. Check your connection and try again."));
     const retryBtn = document.getElementById("auth-retry-btn");
     if (retryBtn) retryBtn.addEventListener("click", initAuth);
     return;
   }
 
   if (!result.authorized) {
     localStorage.removeItem(ACCESS_TOKEN_KEY);
     showLockedScreen("Your previous access token is no longer valid. Enter a valid token to continue.");
     return;
   }
 
   startApp();
 }
 
 /* ---------- Flatten course into a linear sequence for prev/next + progress ---------- */
 const SEQUENCE = [];
-COURSE.modules.forEach((mod) => {
+courseData.modules.forEach((mod) => {
   (mod.lessons || []).forEach((lesson) => {
     SEQUENCE.push({ type: "lesson", moduleId: mod.id, id: lesson.id, title: lesson.title, data: lesson });
   });
   if (mod.project) {
     SEQUENCE.push({ type: "project", moduleId: mod.id, id: mod.project.id, title: mod.project.title, data: mod.project });
   }
   if (mod.projects) {
     mod.projects.forEach((p) => {
       SEQUENCE.push({ type: "project", moduleId: mod.id, id: p.id, title: p.title, data: p });
     });
   }
   if (mod.capstone) {
     SEQUENCE.push({ type: "capstone", moduleId: mod.id, id: mod.capstone.id, title: mod.capstone.title, data: mod.capstone });
   }
 });
 const TOTAL_ITEMS = SEQUENCE.length;
 
 function findById(id) {
   return SEQUENCE.find((entry) => entry.id === id) || null;
 }
 function indexOf(id) {
   return SEQUENCE.findIndex((entry) => entry.id === id);
 }
 
 /* ---------- Progress (localStorage) ---------- */
@@ -235,58 +245,58 @@ function codeGroup(codeObj) {
   if (!codeObj) return "";
   const langs = Object.keys(codeObj);
   return `<div class="code-group">${langs.map((l) => codeBlock(codeObj[l], l.toUpperCase())).join("")}</div>`;
 }
 
 function runNoteBlock(note) {
   if (!note) return "";
   return `<div class="run-note"><strong>Run the Code:</strong> ${escapeHtml(note)} Run this in your own Node.js environment, not in this course application.</div>`;
 }
 
 function attachCopyHandlers(root) {
   root.querySelectorAll(".copy-btn").forEach((btn) => {
     btn.addEventListener("click", () => {
       const target = document.getElementById(btn.dataset.target);
       const text = target ? target.textContent : "";
       navigator.clipboard.writeText(text).then(() => {
         const original = btn.textContent;
         btn.textContent = "Copied";
         setTimeout(() => (btn.textContent = original), 1200);
       });
     });
   });
 }
 
 function moduleOf(moduleId) {
-  return COURSE.modules.find((m) => m.id === moduleId);
+  return courseData.modules.find((m) => m.id === moduleId);
 }
 
 /* ---------- Sidebar ---------- */
 function renderSidebar() {
   const completed = getCompleted();
   const active = currentId();
-  const modulesHtml = COURSE.modules
+  const modulesHtml = courseData.modules
     .map((mod, idx) => {
       const items = [];
       (mod.lessons || []).forEach((l) => items.push({ id: l.id, title: l.title, done: completed.has(l.id) }));
       if (mod.project) items.push({ id: mod.project.id, title: mod.project.title, done: completed.has(mod.project.id), isProject: true });
       if (mod.projects) mod.projects.forEach((p) => items.push({ id: p.id, title: p.title, done: completed.has(p.id), isProject: true }));
       if (mod.capstone) items.push({ id: mod.capstone.id, title: mod.capstone.title, done: completed.has(mod.capstone.id), isProject: true });
 
       const doneCount = items.filter((i) => i.done).length;
       const isOpen = items.some((i) => i.id === active) || localStorage.getItem("open_node_" + mod.id) === "1";
 
       return `
       <div class="nav-module ${isOpen ? "open" : ""}" data-module="${mod.id}">
         <button class="nav-module-toggle" type="button" data-toggle="${mod.id}">
           <span class="nav-module-index">${String(idx + 1).padStart(2, "0")}</span>
           <span class="nav-module-title">${escapeHtml(mod.title)}</span>
           <span class="nav-module-count">${doneCount}/${items.length}</span>
         </button>
         <div class="nav-module-items">
           ${items
             .map(
               (i) => `
             <a href="#${i.id}" class="nav-item ${i.id === active ? "active" : ""} ${i.isProject ? "nav-item-project" : ""}" data-nav="${i.id}" target="_self">
               <span class="nav-item-mark">${i.done ? "✓" : ""}</span>
               <span class="nav-item-title">${escapeHtml(i.title)}</span>
             </a>`
@@ -496,79 +506,79 @@ function renderCapstoneView(mod, capstone) {
     </section>
     <section class="lesson-section">
       <h2>Evaluation Checklist</h2>
       <ul class="checklist">${capstone.checklist.map((c, i) => `<li><label><input type="checkbox" data-checklist="${capstone.id}-${i}"> ${escapeHtml(c)}</label></li>`).join("")}</ul>
     </section>
     <div class="lesson-footer">
       <button class="complete-btn ${completed ? "done" : ""}" type="button" data-complete="${capstone.id}">
         ${completed ? "Capstone Complete" : "Mark Capstone Complete"}
       </button>
       <div class="prev-next">
         ${prev ? `<a href="#${prev.id}" class="pn-link" target="_self">Previous: ${escapeHtml(prev.title)}</a>` : "<span></span>"}
         <span></span>
       </div>
     </div>
   `;
 }
 
 /* ---------- Dashboard ---------- */
 function renderDashboard() {
   const pct = progressPercent();
   const lastId = getLast();
   const lastEntry = lastId ? findById(lastId) : null;
   const continueEntry = lastEntry || SEQUENCE[0];
   const completed = getCompleted();
 
-  const moduleCards = COURSE.modules
+  const moduleCards = courseData.modules
     .map((mod, i) => {
       const items = [];
       (mod.lessons || []).forEach((l) => items.push(l.id));
       if (mod.project) items.push(mod.project.id);
       if (mod.projects) mod.projects.forEach((p) => items.push(p.id));
       if (mod.capstone) items.push(mod.capstone.id);
       const done = items.filter((id) => completed.has(id)).length;
       const first = items[0];
       return `
       <a href="#${first}" class="module-card" target="_self">
         <div class="module-card-top">
           <span class="mono">${String(i + 1).padStart(2, "0")}</span>
           <span class="module-card-count">${done}/${items.length}</span>
         </div>
         <h3>${escapeHtml(mod.title)}</h3>
         <p>${escapeHtml(mod.description)}</p>
       </a>`;
     })
     .join("");
 
   const projectCount = SEQUENCE.filter((e) => e.type === "project" && completed.has(e.id)).length;
   const totalProjects = SEQUENCE.filter((e) => e.type === "project").length;
   const capstoneEntry = SEQUENCE.find((e) => e.type === "capstone");
 
   return `
     <div class="dashboard-head">
       <h1>CodeVent Web Development</h1>
-      <p class="dashboard-tagline">${escapeHtml(COURSE.tagline)}</p>
+      <p class="dashboard-tagline">${escapeHtml(courseData.tagline)}</p>
     </div>
 
     <div class="dashboard-stats">
       <div class="stat-card">
         <div class="stat-label">Course Progress</div>
         <div class="stat-value mono">${pct}%</div>
         <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
       </div>
       <div class="stat-card">
         <div class="stat-label">Current Lesson</div>
         <div class="stat-value-small">${escapeHtml(continueEntry.title)}</div>
         <a href="#${continueEntry.id}" class="continue-btn" target="_self">Continue Learning</a>
       </div>
       <div class="stat-card">
         <div class="stat-label">Completed Projects</div>
         <div class="stat-value mono">${projectCount}/${totalProjects}</div>
         <div class="stat-label">Final Project: ${capstoneEntry && completed.has(capstoneEntry.id) ? "Complete" : "Not Started"}</div>
       </div>
     </div>
 
     <h2 class="section-heading">Modules</h2>
     <div class="module-grid">${moduleCards}</div>
   `;
 }
 
