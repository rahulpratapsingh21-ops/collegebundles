/**
 * SYU Task Automation Studio - Client Application Controller
 */

document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const tabGoogleSheetBtn = document.getElementById("tabGoogleSheetBtn");
  const tabUploadFileBtn = document.getElementById("tabUploadFileBtn");
  const googleSheetContent = document.getElementById("googleSheetContent");
  const uploadFileContent = document.getElementById("uploadFileContent");

  const sheetUrlInput = document.getElementById("sheetUrlInput");
  const loadSheetBtn = document.getElementById("loadSheetBtn");
  const uploadDropzone = document.getElementById("uploadDropzone");
  const fileInput = document.getElementById("fileInput");
  const uploadedFileBanner = document.getElementById("uploadedFileBanner");
  const uploadedFileName = document.getElementById("uploadedFileName");
  const clearFileBtn = document.getElementById("clearFileBtn");

  const statTotalRows = document.getElementById("statTotalRows");
  const statSheetRange = document.getElementById("statSheetRange");
  const statConnection = document.getElementById("statConnection");

  const startRowInput = document.getElementById("startRowInput");
  const stepperDownBtn = document.getElementById("stepperDownBtn");
  const stepperUpBtn = document.getElementById("stepperUpBtn");
  const previewRowBtn = document.getElementById("previewRowBtn");

  const rowPreviewContainer = document.getElementById("rowPreviewContainer");
  const previewModeTag = document.getElementById("previewModeTag");
  const previewRowTitle = document.getElementById("previewRowTitle");
  const previewNewsTitle = document.getElementById("previewNewsTitle");
  const previewCategory = document.getElementById("previewCategory");
  const previewTab = document.getElementById("previewTab");
  const previewWriter = document.getElementById("previewWriter");
  const previewEditor = document.getElementById("previewEditor");
  const previewLiveUrlLink = document.getElementById("previewLiveUrlLink");

  const batchPills = document.querySelectorAll("#batchPills .pill-btn");
  const headlessToggle = document.getElementById("headlessToggle");
  const startAgentBtn = document.getElementById("startAgentBtn");
  const stopAgentBtn = document.getElementById("stopAgentBtn");

  const agentStatusPill = document.getElementById("agentStatusPill");
  const statusDot = document.getElementById("statusDot");
  const statusText = document.getElementById("statusText");

  const currentTaskDisplay = document.getElementById("currentTaskDisplay");
  const progressPercentBadge = document.getElementById("progressPercentBadge");
  const progressBarFill = document.getElementById("progressBarFill");

  const terminalLogs = document.getElementById("terminalLogs");
  const clearLogsBtn = document.getElementById("clearLogsBtn");

  const processedTasksTbody = document.getElementById("processedTasksTbody");
  const processedCountBadge = document.getElementById("processedCountBadge");
  const emptyTablePlaceholder = document.getElementById("emptyTablePlaceholder");

  let currentSource = sheetUrlInput.value.trim();
  let selectedBatchCount = 1;
  let statusPollInterval = null;
  let eventSource = null;

  // --- 1. Theme Toggle ---
  themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("theme-light");
    const isLight = document.body.classList.contains("theme-light");
    localStorage.setItem("syu_theme", isLight ? "light" : "dark");
  });

  const savedTheme = localStorage.getItem("syu_theme");
  if (savedTheme === "dark") {
    document.body.classList.remove("theme-light");
  }

  // --- 2. Source Toggle Tabs ---
  tabGoogleSheetBtn.addEventListener("click", () => {
    tabGoogleSheetBtn.classList.add("active");
    tabUploadFileBtn.classList.remove("active");
    googleSheetContent.classList.remove("hidden");
    uploadFileContent.classList.add("hidden");
    currentSource = sheetUrlInput.value.trim();
    if (currentSource) {
      loadSheetInfo(currentSource);
    } else {
      loadSheetInfo("");
    }
  });

  tabUploadFileBtn.addEventListener("click", () => {
    tabUploadFileBtn.classList.add("active");
    tabGoogleSheetBtn.classList.remove("active");
    uploadFileContent.classList.remove("hidden");
    googleSheetContent.classList.add("hidden");
  });

  // --- 3. Sheet Loading & Inspection ---
  loadSheetBtn.addEventListener("click", () => {
    currentSource = sheetUrlInput.value.trim();
    if (!currentSource) {
      alert("Please paste a Google Sheet link first!");
      sheetUrlInput.focus();
      return;
    }
    loadSheetInfo(currentSource);
  });

  async function loadSheetInfo(sourceUrl) {
    if (!sourceUrl) {
      statConnection.textContent = "No Sheet";
      statConnection.className = "stat-badge";
      statTotalRows.textContent = "--";
      statSheetRange.textContent = "No Sheet Connected";
      previewCurrentRow();
      return;
    }
    statConnection.textContent = "Loading...";
    statConnection.className = "stat-badge";
    try {
      const resp = await fetch(`/api/sheet-info?source=${encodeURIComponent(sourceUrl)}`);
      const data = await resp.json();
      if (data.success) {
        statTotalRows.textContent = data.data.total_rows.toLocaleString();
        statSheetRange.textContent = `Rows ${data.data.min_row} to ${data.data.max_row}`;
        statConnection.textContent = "Connected";
        statConnection.className = "stat-badge connected";
        appendLog(`[SHEET] Successfully connected to sheet: ${data.data.total_rows} rows found.`, "success");
        
        // Update max on startRowInput
        startRowInput.max = data.data.max_row;
        previewCurrentRow();
      } else {
        statConnection.textContent = "Error";
        statConnection.className = "stat-badge error";
        appendLog(`[SHEET ERROR] ${data.error}`, "error");
      }
    } catch (err) {
      statConnection.textContent = "Offline";
      statConnection.className = "stat-badge error";
      appendLog(`[NETWORK ERROR] Could not connect to backend: ${err.message}`, "error");
    }
  }

  // File Upload Handling
  uploadDropzone.addEventListener("click", () => fileInput.click());
  uploadDropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    uploadDropzone.style.borderColor = "var(--accent-pink)";
  });
  uploadDropzone.addEventListener("dragleave", () => {
    uploadDropzone.style.borderColor = "";
  });
  uploadDropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    uploadDropzone.style.borderColor = "";
    if (e.dataTransfer.files.length) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  });

  fileInput.addEventListener("change", () => {
    if (fileInput.files.length) {
      handleFileUpload(fileInput.files[0]);
    }
  });

  async function handleFileUpload(file) {
    const formData = new FormData();
    formData.append("file", file);
    appendLog(`[UPLOAD] Uploading local file: ${file.name}...`, "info");

    try {
      const resp = await fetch("/api/upload-sheet", {
        method: "POST",
        body: formData
      });
      const data = await resp.json();
      if (data.success) {
        currentSource = data.data.source;
        uploadedFileName.textContent = data.data.filename;
        uploadedFileBanner.classList.remove("hidden");
        uploadDropzone.classList.add("hidden");

        statTotalRows.textContent = data.data.total_rows.toLocaleString();
        statSheetRange.textContent = `Rows ${data.data.min_row} to ${data.data.max_row}`;
        statConnection.textContent = "Uploaded";
        statConnection.className = "stat-badge connected";
        appendLog(`[UPLOAD] File parsed: ${data.data.total_rows} rows ready.`, "success");

        previewCurrentRow();
      } else {
        alert("Upload failed: " + data.error);
        appendLog(`[UPLOAD ERROR] ${data.error}`, "error");
      }
    } catch (err) {
      appendLog(`[UPLOAD ERROR] ${err.message}`, "error");
    }
  }

  clearFileBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    fileInput.value = "";
    uploadedFileBanner.classList.add("hidden");
    uploadDropzone.classList.remove("hidden");
    currentSource = sheetUrlInput.value.trim();
    loadSheetInfo(currentSource);
  });

  // --- 4. Starting Row Stepper & Live Preview ---
  stepperDownBtn.addEventListener("click", () => {
    let val = parseInt(startRowInput.value) || 2;
    if (val > 2) {
      startRowInput.value = val - 1;
      previewCurrentRow();
    }
  });

  stepperUpBtn.addEventListener("click", () => {
    let val = parseInt(startRowInput.value) || 2;
    startRowInput.value = val + 1;
    previewCurrentRow();
  });

  startRowInput.addEventListener("change", () => previewCurrentRow());
  previewRowBtn.addEventListener("click", () => previewCurrentRow());

  async function previewCurrentRow() {
    const rowNum = parseInt(startRowInput.value) || 2;
    previewRowTitle.textContent = `Row #${rowNum} Preview`;

    if (!currentSource) {
      previewNewsTitle.textContent = "Please paste your Google Sheet link above and click 'Load'.";
      previewModeTag.textContent = "WAITING";
      previewModeTag.className = "preview-tag";
      previewCategory.textContent = "--";
      previewTab.textContent = "--";
      previewWriter.textContent = "--";
      previewEditor.textContent = "--";
      previewLiveUrlLink.textContent = "None";
      previewLiveUrlLink.removeAttribute("href");
      const grid = document.getElementById("tabCheckboxesGrid");
      if (grid) grid.innerHTML = '<div style="color:var(--text-muted);font-size:13px;padding:8px 0;">No sheet connected yet. Paste link above.</div>';
      return;
    }

    previewNewsTitle.textContent = "Loading row details...";

    try {
      const resp = await fetch(`/api/preview-row?row_number=${rowNum}&source=${encodeURIComponent(currentSource)}`);
      const data = await resp.json();
      if (data.success) {
        const item = data.data;
        previewNewsTitle.textContent = item.title || "(No Title)";
        previewModeTag.textContent = item.mode;
        previewModeTag.className = item.mode === "UPDATION" ? "preview-tag mode-tag" : "preview-tag mode-tag new-tag";

        previewCategory.textContent = item.category || "Auto Detect";
        previewTab.textContent = item.sub_page || "Overview";
        previewWriter.textContent = item.writer || "Default (contentwriter@syu.com)";
        previewEditor.textContent = item.editor || "Default (contenteditor@syu.com)";

        if (item.live_url) {
          previewLiveUrlLink.textContent = item.live_url;
          previewLiveUrlLink.href = item.live_url;
          previewLiveUrlLink.style.display = "inline";
        } else {
          previewLiveUrlLink.textContent = "None (Brand New Task)";
          previewLiveUrlLink.removeAttribute("href");
        }

        renderSubtaskTabs(item);
      } else {
        previewNewsTitle.textContent = `Row #${rowNum} not found or empty.`;
      }
    } catch (err) {
      previewNewsTitle.textContent = `Error previewing row: ${err.message}`;
    }
  }

  // --- Subtask Tabs Configuration ---
  function getSelectedSubtaskTabs() {
    const checked = Array.from(document.querySelectorAll("#tabCheckboxesGrid input[type='checkbox']:checked"));
    return checked.map(cb => cb.value);
  }

  function renderSubtaskTabs(item) {
    const grid = document.getElementById("tabCheckboxesGrid");
    const badge = document.getElementById("tabsCategoryBadge");
    const summary = document.getElementById("tabsSelectedSummary");
    const quickActions = document.getElementById("tabsQuickActions");
    const hint = document.getElementById("tabsExplorationHint");

    if (!grid) return;
    badge.textContent = item.category || "Colleges";

    if (item.category_key === "blogs") {
      if (quickActions) quickActions.style.display = "none";
      if (hint) hint.textContent = "CMS Subtask Policy for Blogs: Exactly 1 subtask is created.";
      grid.innerHTML = `
        <div class="blog-tab-badge">
          <strong>✓ 1 Subtask: Blog Content</strong> (Title: Blog Content, Page: Blog Content, Mandatory: No)
        </div>
      `;
      if (summary) summary.innerHTML = "<span>Selected: <strong>1</strong> subtask (Blog Content)</span>";
      return;
    }

    if (item.mode === "UPDATION") {
      if (quickActions) quickActions.style.display = "none";
      if (hint) hint.textContent = "Updation Task: Modifies the target tab specified in the Excel sheet.";
      grid.innerHTML = `
        <div class="updation-tab-badge">
          <strong>✓ Updation Target Tab: ${item.sub_page || "Overview"}</strong> (Preserving existing Page URL)
        </div>
      `;
      if (summary) summary.innerHTML = `<span>Target Tab: <strong>${item.sub_page || "Overview"}</strong></span>`;
      return;
    }

    // NEW TASK for College, Exam, Course: User chooses which/how many tabs to create!
    if (quickActions) quickActions.style.display = "flex";
    if (hint) hint.textContent = "NEW TASK DETECTED: Select which tabs / how many tabs to create as subtasks:";

    const availableTabs = item.available_tabs || ["Overview"];
    grid.innerHTML = "";

    availableTabs.forEach((tabName, idx) => {
      const label = document.createElement("label");
      label.className = "tab-pill-toggle" + (idx === 0 ? " selected" : "");
      
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.value = tabName;
      // Default: select Overview
      cb.checked = (idx === 0);

      cb.addEventListener("change", () => {
        label.classList.toggle("selected", cb.checked);
        updateTabsCount();
      });

      label.appendChild(cb);
      label.appendChild(document.createTextNode(tabName));
      grid.appendChild(label);
    });

    updateTabsCount();
  }

  function updateTabsCount() {
    const selected = getSelectedSubtaskTabs();
    const countEl = document.getElementById("tabsSelectedCount");
    if (countEl) countEl.textContent = selected.length;
    const summary = document.getElementById("tabsSelectedSummary");
    if (summary) {
      summary.innerHTML = `<span>Selected: <strong>${selected.length}</strong> tab(s) will be created as subtasks in CMS</span>`;
    }
  }

  const selectAllTabsBtn = document.getElementById("selectAllTabsBtn");
  if (selectAllTabsBtn) {
    selectAllTabsBtn.addEventListener("click", () => {
      document.querySelectorAll("#tabCheckboxesGrid .tab-pill-toggle").forEach(lbl => {
        const cb = lbl.querySelector("input[type='checkbox']");
        if (cb) {
          cb.checked = true;
          lbl.classList.add("selected");
        }
      });
      updateTabsCount();
    });
  }

  const overviewOnlyTabsBtn = document.getElementById("overviewOnlyTabsBtn");
  if (overviewOnlyTabsBtn) {
    overviewOnlyTabsBtn.addEventListener("click", () => {
      document.querySelectorAll("#tabCheckboxesGrid .tab-pill-toggle").forEach(lbl => {
        const cb = lbl.querySelector("input[type='checkbox']");
        if (cb) {
          cb.checked = (cb.value === "Overview");
          lbl.classList.toggle("selected", cb.checked);
        }
      });
      updateTabsCount();
    });
  }

  // --- 5. Batch Count Pills ---
  batchPills.forEach(pill => {
    pill.addEventListener("click", () => {
      batchPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      selectedBatchCount = pill.getAttribute("data-count");
    });
  });

  // --- 6. Launch & Stop Agent ---
  startAgentBtn.addEventListener("click", async () => {
    currentSource = currentSource || sheetUrlInput.value.trim();
    if (!currentSource) {
      alert("Please enter a Google Sheet URL or upload a file first!");
      sheetUrlInput.focus();
      return;
    }

    const startRow = parseInt(startRowInput.value) || 2;
    const isHeadless = headlessToggle ? headlessToggle.checked : false;
    const selectedTabs = getSelectedSubtaskTabs();

    startAgentBtn.classList.add("hidden");
    stopAgentBtn.classList.remove("hidden");
    setAgentStatus("running", "Agent Active");

    appendLog(`[LAUNCH] Starting agent from Row #${startRow} (Count: ${selectedBatchCount}, Tabs: [${selectedTabs.join(", ")}], Headless: ${isHeadless})...`, "system");

    try {
      const resp = await fetch("/api/start-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          start_row: startRow,
          count: selectedBatchCount,
          headless: isHeadless,
          source: currentSource,
          selected_tabs: selectedTabs
        })
      });
      const data = await resp.json();
      if (!data.success) {
        alert("Failed to start agent: " + data.error);
        resetAgentButtons();
      } else {
        startStatusPolling();
        connectLogStream();
      }
    } catch (err) {
      alert("Error starting agent: " + err.message);
      resetAgentButtons();
    }
  });

  stopAgentBtn.addEventListener("click", async () => {
    stopAgentBtn.textContent = "Stopping...";
    try {
      await fetch("/api/stop-agent", { method: "POST" });
      appendLog("[STOP] Stop request sent to agent...", "warning");
    } catch (err) {
      console.error(err);
    }
  });

  function resetAgentButtons() {
    startAgentBtn.classList.remove("hidden");
    stopAgentBtn.classList.add("hidden");
    stopAgentBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <rect x="6" y="6" width="12" height="12"></rect>
      </svg>
      <span>Stop Execution</span>
    `;
    setAgentStatus("idle", "System Ready");
    if (statusPollInterval) clearInterval(statusPollInterval);
  }

  function setAgentStatus(status, text) {
    statusDot.className = `status-dot ${status}`;
    statusText.textContent = text;
  }

  // --- 7. Status Polling & Stepper Updates ---
  function startStatusPolling() {
    if (statusPollInterval) clearInterval(statusPollInterval);
    statusPollInterval = setInterval(async () => {
      try {
        const resp = await fetch("/api/agent-status");
        const json = await resp.json();
        if (json.success) {
          const state = json.state;
          currentTaskDisplay.textContent = state.step_description;
          progressPercentBadge.textContent = `${state.progress_percent}%`;
          progressBarFill.style.width = `${state.progress_percent}%`;

          updateStepper(state.step);
          updateProcessedTable(state.processed_tasks);

          if (!state.is_running) {
            resetAgentButtons();
          }
        }
      } catch (err) {
        console.error("Status poll error:", err);
      }
    }, 1500);
  }

  function updateStepper(stepName) {
    const steps = ["step1", "step2", "step3", "step4", "step5"];
    steps.forEach(s => {
      const el = document.getElementById(s);
      if (el) el.className = "step-item";
    });

    if (stepName === "starting" || stepName === "logging_in") {
      document.getElementById("step1").classList.add("active");
    } else if (stepName === "processing_task") {
      document.getElementById("step1").classList.add("completed");
      document.getElementById("step2").classList.add("completed");
      document.getElementById("step3").classList.add("active");
      document.getElementById("step4").classList.add("active");
    } else if (stepName === "completed") {
      steps.forEach(s => document.getElementById(s).classList.add("completed"));
    }
  }

  // --- 8. Real-time Terminal Log Stream (SSE) ---
  function connectLogStream() {
    if (eventSource) eventSource.close();
    eventSource = new EventSource("/api/stream-logs");

    eventSource.onmessage = (e) => {
      try {
        const entry = JSON.parse(e.data);
        let logClass = "info";
        if (entry.text.includes("[SUCCESS]") || entry.text.includes("successfully")) logClass = "success";
        else if (entry.text.includes("[STAGE") || entry.text.includes("[AI DECISION]")) logClass = "system";
        else if (entry.text.includes("[Warn") || entry.text.includes("WARNING")) logClass = "warning";
        else if (entry.text.includes("[Error") || entry.text.includes("Exception")) logClass = "error";

        appendLog(`[${entry.timestamp}] ${entry.text}`, logClass);
      } catch (err) {}
    };

    eventSource.onerror = () => {
      if (eventSource) eventSource.close();
    };
  }

  function appendLog(text, className = "info") {
    const line = document.createElement("div");
    line.className = `log-line ${className}`;
    line.textContent = text;
    terminalLogs.appendChild(line);
    terminalLogs.scrollTop = terminalLogs.scrollHeight;
  }

  clearLogsBtn.addEventListener("click", () => {
    terminalLogs.innerHTML = "";
  });

  // --- 9. Processed Tasks Activity Table ---
  const clearProcessedTasksBtn = document.getElementById("clearProcessedTasksBtn");
  if (clearProcessedTasksBtn) {
    clearProcessedTasksBtn.addEventListener("click", async () => {
      try {
        await fetch("/api/clear-processed-tasks", { method: "POST" });
        updateProcessedTable([]);
      } catch (err) {
        console.error("Error clearing processed tasks:", err);
      }
    });
  }

  function updateProcessedTable(tasks) {
    if (!tasks || !tasks.length) {
      processedTasksTbody.innerHTML = `
        <tr class="empty-row" id="emptyTablePlaceholder">
          <td colspan="6">No tasks processed in this session yet.</td>
        </tr>
      `;
      processedCountBadge.textContent = "0 Tasks";
      return;
    }

    processedCountBadge.textContent = `${tasks.length} Task${tasks.length > 1 ? "s" : ""}`;
    processedTasksTbody.innerHTML = "";

    tasks.forEach(t => {
      const tr = document.createElement("tr");
      const isSuccess = t.status === "SUCCESS";
      const taskIdHtml = t.task_id && t.task_id !== "FAILED"
        ? `<a href="https://cms.selectyouruniversity.com/admin/collections/tasks?limit=100" target="_blank" class="task-id-link">#${t.task_id}</a>`
        : `<span style="color:#ef4444">Failed</span>`;

      tr.innerHTML = `
        <td><strong>#${t.row_number}</strong></td>
        <td><div style="max-width:280px; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;" title="${t.title}">${t.title}</div></td>
        <td><span class="preview-tag ${t.mode === 'UPDATION' ? 'mode-tag' : 'new-tag'}">${t.mode}</span></td>
        <td>${taskIdHtml}</td>
        <td><span class="status-badge ${isSuccess ? 'success' : 'warning'}">${isSuccess ? 'Created (Mandatory: No)' : 'Pending'}</span></td>
        <td style="color:var(--text-muted); font-size:0.75rem;">${t.time}</td>
      `;
      processedTasksTbody.appendChild(tr);
    });
  }

  // --- 10. Live Anywhere Modal & Network URLs ---
  const liveNetworkBtn = document.getElementById("liveNetworkBtn");
  const liveModal = document.getElementById("liveModal");
  const closeLiveModalBtn = document.getElementById("closeLiveModalBtn");
  const publicUrlText = document.getElementById("publicUrlText");
  const networkUrlText = document.getElementById("networkUrlText");
  const localUrlText = document.getElementById("localUrlText");

  async function fetchNetworkInfo() {
    try {
      const res = await fetch("/api/network-info");
      const d = await res.json();
      if (d.success && d.data) {
        if (d.data.public_url) {
          publicUrlText.textContent = d.data.public_url;
        } else {
          publicUrlText.innerHTML = "<em>Run 'start_live_anywhere.bat' to activate Public Cloudflare link</em>";
        }
        networkUrlText.textContent = d.data.local_network;
        localUrlText.textContent = d.data.localhost;
      }
    } catch (err) {
      console.warn("Could not fetch network info:", err);
    }
  }

  if (liveNetworkBtn && liveModal) {
    liveNetworkBtn.addEventListener("click", () => {
      liveModal.style.display = "flex";
      fetchNetworkInfo();
    });

    if (closeLiveModalBtn) {
      closeLiveModalBtn.addEventListener("click", () => {
        liveModal.style.display = "none";
      });
    }

    liveModal.addEventListener("click", (e) => {
      if (e.target === liveModal) liveModal.style.display = "none";
    });
  }

  window.copyUrl = function(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const text = el.textContent.trim();
    if (!text || text.includes("Run 'start_live_anywhere.bat'")) return;
    navigator.clipboard.writeText(text).then(() => {
      const btn = el.parentElement.querySelector(".copy-url-btn");
      if (btn) {
        const orig = btn.textContent;
        btn.textContent = "Copied!";
        btn.style.background = "#10b981";
        setTimeout(() => {
          btn.textContent = orig;
          btn.style.background = "";
        }, 1800);
      }
    });
  };

  // Initial Sheet Load & Preview
  if (currentSource) {
    loadSheetInfo(currentSource);
  } else {
    loadSheetInfo("");
  }
  fetchNetworkInfo();
});
