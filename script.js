(function () {
  "use strict";

  var p = typeof profile !== "undefined" ? profile : {};

  /* ---------------- helpers ---------------- */

  function digitsOnly(str) {
    return (str || "").replace(/[^\d+]/g, "");
  }

  function initials(name) {
    var parts = (name || "").trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return "";
    var first = parts[0].charAt(0);
    var last = parts.length > 1 ? parts[parts.length - 1].charAt(0) : "";
    return (first + last).toUpperCase();
  }

  function show(el) {
    if (el) el.hidden = false;
  }

  function icon(name) {
    var icons = {
      phone:
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.21 2.2z"/></svg>',
      whatsapp:
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.06-1.33A10 10 0 1 0 12 2zm0 18.1a8.05 8.05 0 0 1-4.1-1.13l-.29-.17-2.98.78.8-2.9-.19-.3A8.09 8.09 0 1 1 12 20.1zm4.44-6.06c-.24-.12-1.43-.7-1.65-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1-.37-1.9-1.18-.7-.62-1.18-1.39-1.32-1.63-.14-.24-.01-.37.11-.49.12-.12.27-.31.4-.47.13-.16.18-.28.27-.46.09-.18.05-.34-.03-.46-.08-.12-.53-1.28-.73-1.75-.19-.46-.39-.4-.54-.4-.14 0-.31 0-.48 0-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2.02s.87 2.35.99 2.51c.12.16 1.65 2.52 4 3.44 2.36.92 2.36.61 2.79.57.43-.04 1.43-.58 1.63-1.15.2-.57.2-1.06.14-1.16-.06-.1-.24-.16-.48-.28z"/></svg>',
      mail:
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm16 4.24-7.42 5.3a1 1 0 0 1-1.16 0L4 8.24V18h16zM4.4 6l7.6 5.43L19.6 6z"/></svg>',
      linkedin:
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.5 3A1.5 1.5 0 1 0 4.5 6 1.5 1.5 0 1 0 4.5 3zM3 8h3v13H3zm6 0h2.9v1.78h.04C12.4 8.7 13.7 8 15.5 8 19 8 20 10.1 20 13.2V21h-3v-6.9c0-1.65-.03-3.77-2.3-3.77-2.3 0-2.65 1.8-2.65 3.65V21H9z"/></svg>'
    };
    return icons[name] || "";
  }

  /* ---------------- render profile ---------------- */

  function renderIdentity() {
    document.title = p.name ? p.name + " | " + p.company : p.company + " | Digital Business Card";

    var nameEl = document.getElementById("name");
    nameEl.textContent = p.name || p.company;

    var roleEl = document.getElementById("role");
    roleEl.textContent = p.title ? p.title + " | " + p.company : p.company;

    var locEl = document.getElementById("location");
    if (p.location) {
      locEl.textContent = p.location;
      show(locEl);
    }

    var tagEl = document.getElementById("tagline");
    if (p.tagline) {
      tagEl.textContent = p.tagline;
      show(tagEl);
    }

    var footerLoc = document.getElementById("footer-location");
    footerLoc.textContent = p.location || p.company;

    var avatarWrap = document.getElementById("avatar-wrap");
    if (p.photo) {
      var img = document.createElement("img");
      img.className = "avatar";
      img.src = p.photo;
      img.alt = p.name ? p.name + " profile photo" : "Profile photo";
      avatarWrap.appendChild(img);
    } else {
      var fallback = document.createElement("div");
      fallback.className = "avatar-fallback";
      fallback.setAttribute("role", "img");
      fallback.setAttribute("aria-label", p.name ? p.name + " initials" : "Profile");
      fallback.textContent = initials(p.name) || p.company.charAt(0);
      avatarWrap.appendChild(fallback);
    }
  }

  function renderActions() {
    var container = document.getElementById("actions");
    var buttons = [];

    if (p.phone) {
      buttons.push({
        href: "tel:" + digitsOnly(p.phone),
        label: "Call " + (p.name || ""),
        icon: "phone"
      });
    }
    if (p.whatsapp) {
      var wa = digitsOnly(p.whatsapp).replace(/^\+/, "");
      buttons.push({
        href: "https://wa.me/" + wa,
        label: "Message on WhatsApp",
        icon: "whatsapp",
        external: true
      });
    }
    if (p.email) {
      buttons.push({
        href: "mailto:" + p.email,
        label: "Email " + (p.name || ""),
        icon: "mail"
      });
    }
    if (p.linkedin) {
      buttons.push({
        href: p.linkedin,
        label: "View LinkedIn profile",
        icon: "linkedin",
        external: true
      });
    }

    buttons.forEach(function (b) {
      var a = document.createElement("a");
      a.className = "action-btn";
      a.href = b.href;
      a.setAttribute("aria-label", b.label);
      if (b.external) {
        a.target = "_blank";
        a.rel = "noopener";
      }
      a.innerHTML = icon(b.icon);
      container.appendChild(a);
    });
  }

  function renderEvent() {
    var ev = p.event || {};
    if (!ev.name) return;

    var line = document.getElementById("event-line");
    var text = document.getElementById("event-text");
    var link = document.getElementById("event-link");

    var parts = ["Next: " + ev.name];
    if (ev.location) parts.push(ev.location);
    if (ev.date) parts.push(ev.date);
    text.textContent = parts.join(" · ");

    if (ev.link) {
      link.href = ev.link;
      show(link);
    }
    show(line);
  }

  function renderMoreLink() {
    if (!p.linkedin) return;
    var more = document.getElementById("more-link");
    more.href = p.linkedin;
    show(more);
  }

  /* ---------------- vCard ---------------- */

  function escapeVCard(value) {
    return String(value)
      .replace(/\\/g, "\\\\")
      .replace(/\n/g, "\\n")
      .replace(/,/g, "\\,")
      .replace(/;/g, "\\;");
  }

  function splitName(fullName) {
    var parts = (fullName || "").trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return { first: "", last: "" };
    if (parts.length === 1) return { first: parts[0], last: "" };
    return { first: parts.slice(0, -1).join(" "), last: parts[parts.length - 1] };
  }

  function buildVCard(profile) {
    var name = splitName(profile.name);
    var lines = ["BEGIN:VCARD", "VERSION:3.0"];

    lines.push("N:" + escapeVCard(name.last) + ";" + escapeVCard(name.first) + ";;;");
    lines.push("FN:" + escapeVCard(profile.name || profile.company));

    if (profile.company) lines.push("ORG:" + escapeVCard(profile.company));
    if (profile.title) lines.push("TITLE:" + escapeVCard(profile.title));
    if (profile.phone) lines.push("TEL;TYPE=CELL,VOICE:" + escapeVCard(profile.phone));
    if (profile.email) lines.push("EMAIL;TYPE=INTERNET:" + escapeVCard(profile.email));
    if (profile.website) lines.push("URL;TYPE=Work:" + escapeVCard(profile.website));
    if (profile.linkedin) lines.push("URL;TYPE=LinkedIn:" + escapeVCard(profile.linkedin));
    if (profile.whatsapp) {
      lines.push("X-SOCIALPROFILE;TYPE=whatsapp:https://wa.me/" + digitsOnly(profile.whatsapp).replace(/^\+/, ""));
    }
    if (profile.location) lines.push("NOTE:" + escapeVCard(profile.location));

    lines.push("END:VCARD");
    return lines.join("\r\n") + "\r\n";
  }

  function saveContact() {
    var vcard = buildVCard(p);
    var blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    var filename = (p.name || p.company || "contact").replace(/\s+/g, "_") + ".vcf";
    var url = URL.createObjectURL(blob);

    var isIOS = /iP(hone|ad|od)/.test(navigator.userAgent);

    if (isIOS) {
      // iOS Safari opens the native "Add to Contacts" sheet when navigated
      // to a vCard URL directly, but treats a forced download differently.
      window.location.href = url;
    } else {
      var a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 4000);
  }

  /* ---------------- share ---------------- */

  function showToast(message) {
    var toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("visible");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () {
      toast.classList.remove("visible");
    }, 2200);
  }

  function shareCard() {
    var shareData = {
      title: p.name ? p.name + " | " + p.company : p.company,
      text: p.name ? p.name + " — " + p.company : "Digital business card",
      url: window.location.href
    };

    if (navigator.share) {
      navigator.share(shareData).catch(function () {
        /* user cancelled — no action needed */
      });
      return;
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(shareData.url)
        .then(function () {
          showToast("Link copied to clipboard");
        })
        .catch(function () {
          showToast(shareData.url);
        });
    } else {
      showToast(shareData.url);
    }
  }

  /* ---------------- QR modal ---------------- */

  function initQrModal() {
    var modal = document.getElementById("qr-modal");
    var btn = document.getElementById("qr-btn");
    var closeBtn = document.getElementById("qr-close");
    var copyBtn = document.getElementById("qr-copy");
    var img = document.getElementById("qr-image");
    var fallback = document.getElementById("qr-fallback");
    var requested = false;
    var qrTimeout;

    function showFallback() {
      clearTimeout(qrTimeout);
      img.hidden = true;
      fallback.hidden = false;
    }

    btn.addEventListener("click", function () {
      if (!requested) {
        requested = true;
        var data = encodeURIComponent(window.location.href);

        img.addEventListener("load", function () {
          clearTimeout(qrTimeout);
        });
        img.addEventListener("error", showFallback);

        // If the QR image (an on-demand external request, only made here,
        // never on initial page load) doesn't resolve quickly — e.g. no
        // signal at a venue — fall back to a copyable link instead of
        // leaving the modal looking stuck.
        qrTimeout = setTimeout(showFallback, 5000);

        img.src = "https://api.qrserver.com/v1/create-qr-code/?size=440x440&margin=8&data=" + data;
        img.hidden = false;
      }
      if (typeof modal.showModal === "function") {
        modal.showModal();
      } else {
        modal.setAttribute("open", "");
      }
    });

    copyBtn.addEventListener("click", function () {
      var url = window.location.href;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function () {
          showToast("Link copied to clipboard");
        });
      } else {
        showToast(url);
      }
    });

    closeBtn.addEventListener("click", function () {
      if (typeof modal.close === "function") modal.close();
      else modal.removeAttribute("open");
    });

    modal.addEventListener("click", function (e) {
      if (e.target === modal) {
        if (typeof modal.close === "function") modal.close();
      }
    });
  }

  /* ---------------- init ---------------- */

  function init() {
    renderIdentity();
    renderActions();
    renderEvent();
    renderMoreLink();
    initQrModal();

    document.getElementById("save-contact").addEventListener("click", saveContact);
    document.getElementById("share-btn").addEventListener("click", shareCard);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
