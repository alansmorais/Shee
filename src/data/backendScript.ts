export const GOOGLE_APPS_SCRIPT_CODE = `const PRIMARY_EMAIL = "contact@sheacademy.no";
const CC_EMAIL = "contactsheacademy@gmail.com";
const SEND_FROM_EMAIL = "kontakt@alansmsolutions.com";

// Helper function to get or create a sheet and set up headers automatically
function getOrCreateSheet(ss, sheetName, headers) {
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }
  // If the tab is newly created or exists with no headers, append bold headers and freeze row 1
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

// Handles retrieving the feedback for anyone to see on the website
function doGet(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("Feedback");
    let reviews = [];
    
    if (sheet && sheet.getLastRow() > 1) {
      const data = sheet.getDataRange().getValues();
      // Loop backwards to show the newest reviews first (skip the header row)
      for (let i = data.length - 1; i >= 1; i--) {
        // Only push if rating and comments exist
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
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify([]))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handles saving Bookings, Contacts, and Feedback
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const type = data.type || data.action; 
    
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    
    if (type === "feedback") {
      // Save feedback to the spreadsheet
      const headers = ["Timestamp", "Registered Phone", "Rating", "Comments"];
      const sheet = getOrCreateSheet(ss, "Feedback", headers);
      sheet.appendRow([new Date(), data.phone || "", data.rating || 5, data.comments || ""]);
      
    } else if (type === "contact") {
      // Anti-spam protection: reject honeypot traps and incomplete payloads
      if (data.honeypot || data.hp || data.company_website || !data.name || !data.email || !data.message) {
        // Return success response to deceive automated bots without recording spam
        return ContentService.createTextOutput(JSON.stringify({ status: "success", note: "filtered" }))
          .setMimeType(ContentService.MimeType.JSON);
      }

      const headers = ["Timestamp", "Name", "Email", "Message"];
      const sheet = getOrCreateSheet(ss, "Contact", headers);
      sheet.appendRow([new Date(), data.name, data.email, data.message]);
      
      const subject = "SHE. Website Inquiry from " + data.name;
      const body = "You have received a new contact message from the SHE. academy website.\\n\\n" +
                   "Name: " + data.name + "\\nEmail: " + data.email + "\\nMessage:\\n" + data.message + "\\n\\n" +
                   "---\\nTimestamp: " + new Date().toLocaleString();
                   
      GmailApp.sendEmail(PRIMARY_EMAIL, subject, body, {
        cc: CC_EMAIL, replyTo: data.email, from: SEND_FROM_EMAIL, name: "SHE. Academy Website"
      });
      
    } else if (type === "booking") {
      // CONCURRENCY LOCK: Prevent double-bookings by serializing requests
      const lock = LockService.getScriptLock();
      try {
        // Wait up to 10 seconds for a lock
        if (!lock.tryLock(10000)) {
          return ContentService.createTextOutput(JSON.stringify({ 
            success: false, 
            error: "System busy. Please try again in a moment." 
          })).setMimeType(ContentService.MimeType.JSON);
        }

        const headers = ["Timestamp", "Booking ID", "Client Name", "Email", "Phone", "Service", "Practitioner", "Requested Date", "Requested Time", "Notes"];
        const sheet = getOrCreateSheet(ss, "Bookings", headers);
        sheet.appendRow([
          new Date(), data.bookingId || "", (data.first || "") + " " + (data.last || ""), data.email || "", data.phone || "", 
          data.service || "", data.practitioner || "", data.date || "", data.time || "", data.notes || ""
        ]);
        
        const recipient = data.practitionerEmail || PRIMARY_EMAIL;
        const subject = "SHE. New Booking Request: " + (data.first || "") + " " + (data.last || "");
        const body = "You have new booking request from the SHE. academy website.\\n\\n" +
                     "Booking ID: " + (data.bookingId || "") + "\\n" +
                     "Client: " + (data.first || "") + " " + (data.last || "") + "\\nEmail: " + (data.email || "") + "\\nPhone: " + (data.phone || "") + "\\n\\n" +
                     "Service: " + (data.service || "") + "\\nPractitioner: " + (data.practitioner || "") + "\\n" +
                     "Requested Date: " + (data.date || "") + "\\nRequested Time: " + (data.time || "") + "\\n\\n" +
                     "Notes/Message:\\n" + (data.notes ? data.notes : "None provided.") + "\\n\\n" +
                     "---\\nTimestamp: " + new Date().toLocaleString();
                     
        GmailApp.sendEmail(recipient, subject, body, {
          cc: CC_EMAIL, replyTo: data.email, from: SEND_FROM_EMAIL, name: "SHE. Academy Website"
        });

      } catch (e) {
        return ContentService.createTextOutput(JSON.stringify({ status: "error", message: e.toString() }))
          .setMimeType(ContentService.MimeType.JSON);
      } finally {
        lock.releaseLock();
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
`;
