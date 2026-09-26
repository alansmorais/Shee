/**
 * ============================================================================
 * SHE. ACADEMY - UNIFIED GOOGLE APPS SCRIPT
 * For Google Sheet:
 *   - "WorkshopDates" tab:
 *       Row 1 (Headers): A1 = "Language" | B1 = "DatesJSON"
 *       Row 2: A2 = "EN"  | B2 = ["date: title", ...]  (English Website .com)
 *       Row 3: A3 = "NO"  | B3 = ["date: title", ...]  (Norwegian Website .no)
 *       Row 4: A4 = "CZ"  | B4 = ["date: title", ...]  (Czech Website .cz)
 *       Row 5: A5 = "SHE" | B5 = ["date: title", ...]  (SHE. Academy Sanctuary sheacademy.no)
 *   - "Bookings" tab (Automated booking requests & email notifications)
 *   - "Contact" tab (Inquiries with spam protection & auto-emails)
 *   - "Feedback" tab (Anonymous client testimonials & ratings)
 * ============================================================================
 */

const PRIMARY_EMAIL = "contact@sheacademy.no";
const CC_EMAIL = "contactsheacademy@gmail.com";
const SEND_FROM_EMAIL = "kontakt@alansmsolutions.com";

const WORKSHOP_SHEET_NAME = "WorkshopDates";
const SUPPORTED_LANGS = ["EN", "NO", "CZ", "SHE"];

const DEFAULT_LANG_ROWS = [
  { lang: "EN", row: 2, label: "English (.com)" },
  { lang: "NO", row: 3, label: "Norwegian (.no)" },
  { lang: "CZ", row: 4, label: "Czech (.cz)" },
  { lang: "SHE", row: 5, label: "SHE. Academy Sanctuary (sheacademy.no)" }
];

// Helper to get or auto-create the "WorkshopDates" sheet with headers and language rows
function getOrCreateWorkshopDatesSheet(ss) {
  let sheet = ss.getSheetByName(WORKSHOP_SHEET_NAME);
  if (!sheet) {
    // Check if active sheet is empty default Sheet1/Ark1
    const active = ss.getActiveSheet();
    if (active && (active.getName() === "Sheet1" || active.getName() === "Ark1") && active.getLastRow() === 0) {
      sheet = active;
      sheet.setName(WORKSHOP_SHEET_NAME);
    } else {
      sheet = ss.insertSheet(WORKSHOP_SHEET_NAME);
    }
  }

  // Row 1: Headers (Language, DatesJSON)
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1).setValue("Language");
    sheet.getRange(1, 2).setValue("DatesJSON");
    sheet.getRange(1, 1, 1, 2).setFontWeight("bold").setBackground("#f3f4f6");
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 120);
    sheet.setColumnWidth(2, 850);
  }

  // Ensure rows 2-5 exist for EN, NO, CZ, SHE
  const lastRow = Math.max(sheet.getLastRow(), 1);
  const existingRows = {};
  if (lastRow >= 2) {
    const colA = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
    for (let i = 0; i < colA.length; i++) {
      const code = String(colA[i][0] || "").trim().toUpperCase();
      if (code) existingRows[code] = i + 2;
    }
  }

  DEFAULT_LANG_ROWS.forEach(function(item) {
    if (!existingRows[item.lang]) {
      const targetRow = item.row;
      const currentCellA = sheet.getRange(targetRow, 1).getValue();
      const insertAtRow = (!currentCellA) ? targetRow : (sheet.getLastRow() + 1);
      sheet.getRange(insertAtRow, 1).setValue(item.lang);
      if (!sheet.getRange(insertAtRow, 2).getValue()) {
        sheet.getRange(insertAtRow, 2).setValue("[]");
      }
      existingRows[item.lang] = insertAtRow;
    }
  });

  return sheet;
}

// Helper to get or create standard sheets (Bookings, Contact, Feedback)
function getOrCreateSheet(ss, sheetName, headers) {
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#f3f4f6");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Helper to format workshop entry
function formatWorkshopEntry(ws) {
  if (!ws) return "";
  if (typeof ws === "string") return ws.trim();
  const date = (ws.date || "").trim();
  const title = (ws.title || "").trim();
  if (date && title) return date + ": " + title;
  return title || date;
}

// Helper: Read dates JSON from "WorkshopDates" sheet
function getDatesData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = getOrCreateWorkshopDatesSheet(ss);
  const data = { "EN": [], "NO": [], "CZ": [], "SHE": [] };

  const lastRow = sheet.getLastRow();
  if (lastRow >= 2) {
    const values = sheet.getRange(2, 1, lastRow - 1, 2).getValues();
    for (let i = 0; i < values.length; i++) {
      const lang = String(values[i][0] || "").trim().toUpperCase();
      const rawJson = values[i][1];
      if (lang) {
        let parsed = [];
        if (typeof rawJson === "string" && rawJson.trim()) {
          try {
            parsed = JSON.parse(rawJson);
          } catch (e) {
            parsed = rawJson.split(/[\n,]+/).map(function(s) { return s.trim(); }).filter(Boolean);
          }
        } else if (Array.isArray(rawJson)) {
          parsed = rawJson;
        }
        data[lang] = Array.isArray(parsed) ? parsed : [];
      }
    }
  }

  SUPPORTED_LANGS.forEach(function(l) {
    if (!data[l]) data[l] = [];
  });

  return data;
}

// Helper: Save dates JSON into Column B of "WorkshopDates"
function saveDatesData(currentData) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = getOrCreateWorkshopDatesSheet(ss);

  const lastRow = Math.max(sheet.getLastRow(), 1);
  const rowMap = {};
  if (lastRow >= 2) {
    const colA = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
    for (let i = 0; i < colA.length; i++) {
      const code = String(colA[i][0] || "").trim().toUpperCase();
      if (code) rowMap[code] = i + 2;
    }
  }

  SUPPORTED_LANGS.forEach(function(lang) {
    if (currentData && currentData[lang] !== undefined) {
      let targetRow = rowMap[lang];
      if (!targetRow) {
        targetRow = sheet.getLastRow() + 1;
        sheet.getRange(targetRow, 1).setValue(lang);
        rowMap[lang] = targetRow;
      }
      const list = Array.isArray(currentData[lang]) ? currentData[lang] : [];
      sheet.getRange(targetRow, 2).setValue(JSON.stringify(list));
    }
  });

  return true;
}

// Handles GET requests (JSON API or HTML Manager Dialog)
function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // 1. Workshop JSON API
    if (e && e.parameter && (e.parameter.action === "get_workshops" || e.parameter.format === "json")) {
      const dates = getDatesData();
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        data: dates,
        languages: SUPPORTED_LANGS,
        timestamp: new Date().toISOString()
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // 2. Feedback reviews JSON
    if (e && e.parameter && e.parameter.action === "get_feedback") {
      const sheet = ss.getSheetByName("Feedback");
      const reviews = [];
      if (sheet && sheet.getLastRow() > 1) {
        const data = sheet.getDataRange().getValues();
        for (let i = data.length - 1; i >= 1; i--) {
          if (data[i][2] && data[i][3]) {
            reviews.push({
              rating: data[i][2],
              text: data[i][3],
              date: new Date(data[i][0]).toLocaleDateString()
            });
          }
        }
      }
      return ContentService.createTextOutput(JSON.stringify(reviews))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // 3. Default browser view: Interactive Workshop Dates Manager Dialog
    return HtmlService.createHtmlOutput(getWorkshopManagerHtml())
      .setTitle("SHE. Academy - Workshop Dates Manager")
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handles POST requests (Bookings, Contact, Feedback, Workshops)
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action || data.type;
    const ss = SpreadsheetApp.getActiveSpreadsheet();

    // A. SYNC WORKSHOPS
    if (action === "sync_workshops") {
      const list = data.workshops || [];
      const lang = (data.lang || "SHE").toUpperCase();
      const entries = list.map(formatWorkshopEntry).filter(Boolean);
      const targets = (lang === "ALL") ? SUPPORTED_LANGS : [lang];

      const current = getDatesData();
      targets.forEach(function(l) {
        current[l] = entries;
      });
      saveDatesData(current);

      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "Successfully synchronized " + entries.length + " workshops to " + targets.join(", ") + " in WorkshopDates tab (Column B)",
        count: entries.length
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // B. ADD WORKSHOP
    if (action === "add_workshop") {
      const ws = data.workshop || data;
      const lang = (data.lang || "SHE").toUpperCase();
      const entry = formatWorkshopEntry(ws);
      const targets = (lang === "ALL") ? SUPPORTED_LANGS : [lang];

      const current = getDatesData();
      targets.forEach(function(l) {
        if (!current[l]) current[l] = [];
        current[l].push(entry);
      });
      saveDatesData(current);

      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "Workshop added to " + targets.join(", ") + " in WorkshopDates tab (Column B)",
        entry: entry
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // C. SAVE DATES DIRECTLY
    if (action === "save_dates" || data.currentData) {
      const payload = data.currentData || data.data || data;
      saveDatesData(payload);
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "All workshop dates saved successfully to WorkshopDates tab"
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // D. INITIALIZE TABS & HEADERS
    if (action === "init_tabs") {
      getOrCreateWorkshopDatesSheet(ss);
      getOrCreateSheet(ss, "Bookings", ["Timestamp", "Booking ID", "Client Name", "Email", "Phone", "Service", "Practitioner", "Requested Date", "Requested Time", "Notes"]);
      getOrCreateSheet(ss, "Contact", ["Timestamp", "Name", "Email", "Message"]);
      getOrCreateSheet(ss, "Feedback", ["Timestamp", "Registered Phone", "Rating", "Comments"]);
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        message: "WorkshopDates sheet (Col A: Language, Col B: DatesJSON) and client tabs verified."
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // E. FEEDBACK
    if (action === "feedback") {
      const sheet = getOrCreateSheet(ss, "Feedback", ["Timestamp", "Registered Phone", "Rating", "Comments"]);
      sheet.appendRow([new Date(), data.phone || "", data.rating || 5, data.comments || ""]);
      return ContentService.createTextOutput(JSON.stringify({ status: "success" })).setMimeType(ContentService.MimeType.JSON);
    }

    // F. CONTACT FORM INQUIRY
    if (action === "contact") {
      if (data.honeypot || data.hp || data.company_website || !data.name || !data.email || !data.message) {
        return ContentService.createTextOutput(JSON.stringify({ status: "success", note: "filtered" })).setMimeType(ContentService.MimeType.JSON);
      }
      const sheet = getOrCreateSheet(ss, "Contact", ["Timestamp", "Name", "Email", "Message"]);
      sheet.appendRow([new Date(), data.name, data.email, data.message]);

      const subject = "SHE. Website Inquiry from " + data.name;
      const body = "You have received a new contact message from the SHE. academy website.\n\n" +
                   "Name: " + data.name + "\nEmail: " + data.email + "\nMessage:\n" + data.message + "\n\n" +
                   "---\nTimestamp: " + new Date().toLocaleString();
      GmailApp.sendEmail(PRIMARY_EMAIL, subject, body, {
        cc: CC_EMAIL, replyTo: data.email, from: SEND_FROM_EMAIL, name: "SHE. Academy Website"
      });
      return ContentService.createTextOutput(JSON.stringify({ status: "success" })).setMimeType(ContentService.MimeType.JSON);
    }

    // G. BOOKING REQUEST
    if (action === "booking") {
      const lock = LockService.getScriptLock();
      try {
        if (!lock.tryLock(10000)) {
          return ContentService.createTextOutput(JSON.stringify({ success: false, error: "System busy. Please try again in a moment." })).setMimeType(ContentService.MimeType.JSON);
        }

        const headers = ["Timestamp", "Booking ID", "Client Name", "Email", "Phone", "Service", "Practitioner", "Requested Date", "Requested Time", "Notes"];
        const sheet = getOrCreateSheet(ss, "Bookings", headers);
        sheet.appendRow([
          new Date(), data.bookingId || "", (data.first || "") + " " + (data.last || ""), data.email || "", data.phone || "", 
          data.service || "", data.practitioner || "", data.date || "", data.time || "", data.notes || ""
        ]);

        const recipient = data.practitionerEmail || PRIMARY_EMAIL;
        const subject = "SHE. New Booking Request: " + (data.first || "") + " " + (data.last || "");
        const body = "You have a new booking request from the SHE. academy website.\n\n" +
                     "Booking ID: " + (data.bookingId || "") + "\n" +
                     "Client: " + (data.first || "") + " " + (data.last || "") + "\nEmail: " + (data.email || "") + "\nPhone: " + (data.phone || "") + "\n\n" +
                     "Service: " + (data.service || "") + "\nPractitioner: " + (data.practitioner || "") + "\n" +
                     "Requested Date: " + (data.date || "") + "\nRequested Time: " + (data.time || "") + "\n\n" +
                     "Notes/Message:\n" + (data.notes ? data.notes : "None provided.") + "\n\n" +
                     "---\nTimestamp: " + new Date().toLocaleString();

        GmailApp.sendEmail(recipient, subject, body, {
          cc: CC_EMAIL, replyTo: data.email, from: SEND_FROM_EMAIL, name: "SHE. Academy Website"
        });

        return ContentService.createTextOutput(JSON.stringify({ status: "success" })).setMimeType(ContentService.MimeType.JSON);
      } finally {
        lock.releaseLock();
      }
    }

    return ContentService.createTextOutput(JSON.stringify({ status: "success" })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Google Sheets Custom Menu
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("🌸 SHE. Academy")
    .addItem("Workshop Dates Manager UI", "showWorkshopDatesManager")
    .addItem("Initialize WorkshopDates Sheet & Headers", "initWorkshopDatesSheet")
    .addItem("Initialize All Client Tabs (Bookings, Contact, Feedback)", "initClientTabs")
    .addToUi();
}

function showWorkshopDatesManager() {
  const html = HtmlService.createHtmlOutput(getWorkshopManagerHtml())
    .setWidth(780)
    .setHeight(650)
    .setTitle("SHE. Academy - Workshop Dates Manager");
  SpreadsheetApp.getUi().showModalDialog(html, "🌸 SHE. Academy - Workshop Dates Manager");
}

function initWorkshopDatesSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  getOrCreateWorkshopDatesSheet(ss);
  SpreadsheetApp.getUi().alert(
    "Success",
    'Sheet "WorkshopDates" is verified with headers [Language, DatesJSON] and rows: EN (Row 2), NO (Row 3), CZ (Row 4), SHE (Row 5).',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

function initClientTabs() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  getOrCreateSheet(ss, "Bookings", ["Timestamp", "Booking ID", "Client Name", "Email", "Phone", "Service", "Practitioner", "Requested Date", "Requested Time", "Notes"]);
  getOrCreateSheet(ss, "Contact", ["Timestamp", "Name", "Email", "Message"]);
  getOrCreateSheet(ss, "Feedback", ["Timestamp", "Registered Phone", "Rating", "Comments"]);
  SpreadsheetApp.getUi().alert("Success", "Bookings, Contact, and Feedback tabs are ready.", SpreadsheetApp.getUi().ButtonSet.OK);
}

// Interactive Workshop Dates Manager Dialog HTML (Supports EN, NO, CZ, SHE)
function getWorkshopManagerHtml() {
  return '<!DOCTYPE html>' +
'<html>' +
'  <head>' +
'    <base target="_top">' +
'    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">' +
'    <style>' +
'      :root { --accent: #ee5a7a; --accent-dark: #d44967; --bg: #faf7f2; --card: #ffffff; --text: #23201d; --muted: #78716c; --line: #e7e2da; }' +
'      body { font-family: "Plus Jakarta Sans", sans-serif; background: var(--bg); padding: 20px; color: var(--text); margin: 0; box-sizing: border-box; }' +
'      .container { max-width: 720px; margin: auto; background: var(--card); padding: 26px; border-radius: 16px; border: 1px solid var(--line); box-shadow: 0 4px 20px rgba(0,0,0,0.04); }' +
'      .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--line); padding-bottom: 14px; margin-bottom: 20px; }' +
'      h2 { font-family: "Playfair Display", serif; margin: 0; font-weight: 500; font-size: 24px; color: var(--text); }' +
'      .subtitle { font-size: 12px; color: var(--muted); margin-top: 4px; }' +
'      .badge { font-size: 11px; background: #ffe4e6; color: #e11d48; padding: 4px 10px; border-radius: 999px; font-weight: 600; }' +
'      .tabs { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 20px; }' +
'      .tab { padding: 12px 6px; text-align: center; cursor: pointer; border: 1px solid var(--line); border-radius: 10px; background: #fdfbf7; font-weight: 500; font-size: 13px; transition: 0.15s; }' +
'      .tab:hover { background: #f5efe6; }' +
'      .tab.active { background: var(--accent); color: white; border-color: var(--accent); box-shadow: 0 2px 8px rgba(238,90,122,0.3); }' +
'      .tab-label { font-size: 11px; opacity: 0.85; display: block; margin-top: 2px; }' +
'      .lang-section { display: none; }' +
'      .lang-section.active { display: block; }' +
'      .date-row { display: flex; gap: 8px; margin-bottom: 8px; align-items: center; }' +
'      .date-input { flex: 1; padding: 10px 12px; border: 1px solid var(--line); border-radius: 8px; font-size: 13px; background: #fff; font-family: inherit; }' +
'      .date-input:focus { border-color: var(--accent); outline: none; box-shadow: 0 0 0 2px rgba(238,90,122,0.15); }' +
'      .btn { padding: 9px 14px; border: none; border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 500; transition: 0.15s; font-family: inherit; }' +
'      .btn-add { background: #f0fdf4; color: #166534; border: 1px dashed #86efac; margin-top: 8px; width: 100%; }' +
'      .btn-add:hover { background: #dcfce7; }' +
'      .btn-del { background: #fee2e2; color: #dc2626; padding: 8px 12px; font-size: 15px; border-radius: 8px; }' +
'      .btn-del:hover { background: #fecaca; }' +
'      .btn-save { background: var(--accent); color: white; width: 100%; margin-top: 22px; font-size: 14px; padding: 12px; font-weight: 600; border-radius: 10px; cursor: pointer; }' +
'      .btn-save:hover { background: var(--accent-dark); }' +
'      #loader { text-align: center; padding: 30px; font-size: 14px; color: var(--muted); }' +
'      #status { margin-top: 14px; text-align: center; font-weight: 500; font-size: 13px; min-height: 20px; }' +
'      .info-box { font-size: 11px; color: var(--muted); background: #fdfbf7; border: 1px solid var(--line); border-radius: 8px; padding: 10px 14px; margin-bottom: 16px; line-height: 1.5; }' +
'    </style>' +
'  </head>' +
'  <body>' +
'    <div class="container">' +
'      <div class="header">' +
'        <div>' +
'          <h2>🌸 Workshop Dates Manager</h2>' +
'          <div class="subtitle">Sheet: <strong>WorkshopDates</strong> &bull; Col A: Language &bull; Col B: DatesJSON</div>' +
'        </div>' +
'        <span class="badge">4 Websites</span>' +
'      </div>' +
'      <div class="info-box">' +
'        Directly edits <code>DatesJSON</code> in the <strong>WorkshopDates</strong> sheet across all 4 websites. Missing rows or headers are auto-generated.' +
'      </div>' +
'      <div class="tabs" id="tabs" style="display:none;">' +
'        <div class="tab active" onclick="switchTab(\'EN\')">EN<span class="tab-label">.com (Row 2)</span></div>' +
'        <div class="tab" onclick="switchTab(\'NO\')">NO<span class="tab-label">.no (Row 3)</span></div>' +
'        <div class="tab" onclick="switchTab(\'CZ\')">CZ<span class="tab-label">.cz (Row 4)</span></div>' +
'        <div class="tab" onclick="switchTab(\'SHE\')">SHE<span class="tab-label">sheacademy.no (Row 5)</span></div>' +
'      </div>' +
'      <div id="loader">Loading workshop dates from Google Sheet...</div>' +
'      <div id="form-content" style="display:none;"></div>' +
'      <button class="btn btn-save" id="save-btn" style="display:none;" onclick="saveAll()">💾 Save All Dates to Sheet</button>' +
'      <div id="status"></div>' +
'    </div>' +
'    <script>' +
'      var langs = [\'EN\', \'NO\', \'CZ\', \'SHE\'];' +
'      var currentData = { EN: [], NO: [], CZ: [], SHE: [] };' +
'      var activeLang = \'EN\';' +
'      document.addEventListener("DOMContentLoaded", function() {' +
'        if (typeof google !== "undefined" && google.script && google.script.run) {' +
'          google.script.run.withSuccessHandler(initForm).getDatesData();' +
'        } else {' +
'          fetch("?format=json&action=get_workshops").then(function(r){return r.json();}).then(function(res){' +
'            initForm(res.data || {});' +
'          }).catch(function(){ initForm({}); });' +
'        }' +
'      });' +
'      function initForm(data) {' +
'        currentData = data || {};' +
'        langs.forEach(function(l) {' +
'          if (!currentData[l] || !Array.isArray(currentData[l])) currentData[l] = [];' +
'        });' +
'        var container = document.getElementById("form-content");' +
'        container.innerHTML = "";' +
'        langs.forEach(function(l, i) {' +
'          var sec = document.createElement("div");' +
'          sec.id = "sec-" + l;' +
'          sec.className = "lang-section" + (i === 0 ? " active" : "");' +
'          sec.innerHTML = \'<div id="list-\' + l + \'"></div><button type="button" class="btn btn-add" onclick="addDate(\\\'\' + l + \'\\\')">+ Add New Date</button>\';' +
'          container.appendChild(sec);' +
'          renderList(l);' +
'        });' +
'        document.getElementById("loader").style.display = "none";' +
'        document.getElementById("tabs").style.display = "grid";' +
'        document.getElementById("form-content").style.display = "block";' +
'        document.getElementById("save-btn").style.display = "block";' +
'      }' +
'      function switchTab(l) {' +
'        activeLang = l;' +
'        document.querySelectorAll(".tab").forEach(function(el, idx) {' +
'          el.classList.toggle("active", langs[idx] === l);' +
'        });' +
'        langs.forEach(function(code) {' +
'          var s = document.getElementById("sec-" + code);' +
'          if (s) s.classList.toggle("active", code === l);' +
'        });' +
'      }' +
'      function renderList(l) {' +
'        var container = document.getElementById("list-" + l);' +
'        container.innerHTML = "";' +
'        var arr = currentData[l] || [];' +
'        if (arr.length === 0) {' +
'          container.innerHTML = \'<div style="padding:14px; text-align:center; color:#94a3b8; font-style:italic;">No workshop dates yet. Click + Add New Date below.</div>\';' +
'          return;' +
'        }' +
'        arr.forEach(function(val, idx) {' +
'          var row = document.createElement("div");' +
'          row.className = "date-row";' +
'          row.innerHTML = \'<input type="text" class="date-input" value="\' + escapeHtml(val) + \'" oninput="updateVal(\\\'\' + l + \'\\\', \' + idx + \', this.value)" placeholder="e.g. 7.–8.11.2026: Larvik Vital Essence - 3650kr"><button type="button" class="btn btn-del" onclick="delDate(\\\'\' + l + \'\\\', \' + idx + \')">&times;</button>\';' +
'          container.appendChild(row);' +
'        });' +
'      }' +
'      function updateVal(l, idx, val) { currentData[l][idx] = val; }' +
'      function addDate(l) { currentData[l].push(""); renderList(l); }' +
'      function delDate(l, idx) { currentData[l].splice(idx, 1); renderList(l); }' +
'      function saveAll() {' +
'        var status = document.getElementById("status");' +
'        status.style.color = "#0284c7";' +
'        status.innerText = "Saving to Google Sheet...";' +
'        langs.forEach(function(l) {' +
'          currentData[l] = currentData[l].map(function(s){return s.trim();}).filter(Boolean);' +
'        });' +
'        if (typeof google !== "undefined" && google.script && google.script.run) {' +
'          google.script.run.withSuccessHandler(function() {' +
'            status.style.color = "#16a34a";' +
'            status.innerText = "✓ Saved to WorkshopDates tab successfully!";' +
'            setTimeout(function(){ status.innerText = ""; }, 4000);' +
'          }).saveDatesData(currentData);' +
'        } else {' +
'          fetch("", { method: "POST", body: JSON.stringify({ action: "save_dates", currentData: currentData }) })' +
'            .then(function() {' +
'              status.style.color = "#16a34a";' +
'              status.innerText = "✓ Saved successfully!";' +
'              setTimeout(function(){ status.innerText = ""; }, 4000);' +
'            });' +
'        }' +
'      }' +
'      function escapeHtml(t) { return (t || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }' +
'    </script>' +
'  </body>' +
'</html>';
}
