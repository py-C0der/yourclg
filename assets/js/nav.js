// Navigation and Back to Top
document.addEventListener("DOMContentLoaded", () => {
    const navbar = document.querySelector(".navbar");
    const navToggle = document.getElementById("navToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    const closeMenu = document.getElementById("closeMenu");

    // Helper functions to open and close mobile drawer
    function openDrawer() {
        if (!mobileMenu) return;
        const currentPopover = document.getElementById("appsLauncherPopover");
        if (currentPopover && currentPopover.classList.contains("open")) {
            currentPopover.classList.remove("open");
            const currentBtn = document.getElementById("appsLauncherBtn");
            const currentMobileBtn = document.getElementById("mobileAppsLauncherBtn");
            if (currentBtn) currentBtn.classList.remove("active");
            if (currentMobileBtn) currentMobileBtn.classList.remove("active");
        }
        if (navbar && navbar.classList.contains("scrolled")) {
            mobileMenu.classList.add("is-scrolled");
        } else {
            mobileMenu.classList.remove("is-scrolled");
        }
        mobileMenu.classList.add("open");
        if (navToggle) navToggle.classList.add("active");
        document.body.style.overflow = "hidden";
        if (typeof updateStorageUI === "function") {
            updateStorageUI();
        }
    }

    function closeDrawer() {
        if (!mobileMenu) return;
        mobileMenu.classList.remove("open");
        if (navToggle) navToggle.classList.remove("active");
        document.body.style.overflow = "";
    }

    if (navToggle && mobileMenu) {
        navToggle.addEventListener("click", () => {
            if (mobileMenu.classList.contains("open")) {
                closeDrawer();
            } else {
                openDrawer();
            }
        });

        if (closeMenu) {
            closeMenu.addEventListener("click", closeDrawer);
        }

        // Close on clicking backdrop (outside .mobile-menu-panel)
        mobileMenu.addEventListener("click", (e) => {
            if (e.target === mobileMenu) {
                closeDrawer();
            }
        });

        // Close when clicking any menu link inside drawer
        const menuLinks = mobileMenu.querySelectorAll("a");
        menuLinks.forEach(link => {
            link.addEventListener("click", () => {
                closeDrawer();
            });
        });

        // Close on Escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && mobileMenu.classList.contains("open")) {
                closeDrawer();
            }
        });
    }

    // Scroll state for navbar (.scrolled) and back-to-top button
    const btt = document.getElementById("backToTop");
    let isTicking = false;

    function handleScroll() {
        const scrollY = window.scrollY;

        // Dynamic scrolled navbar styling
        if (navbar) {
            if (scrollY > 20) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }

        // Back to top button visibility
        if (btt) {
            btt.classList.toggle("visible", scrollY > 400);
        }

        isTicking = false;
    }

    window.addEventListener("scroll", () => {
        if (!isTicking) {
            window.requestAnimationFrame(handleScroll);
            isTicking = true;
        }
    }, { passive: true });

    // Initial check on load in case page is refreshed while scrolled
    handleScroll();

    if (btt) {
        btt.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // ══════════════════════════════════════════════════════════════════════
    // BROWSER STORAGE PROFILE INDICATOR (Desktop Navbar & Mobile Drawer)
    // ══════════════════════════════════════════════════════════════════════

    function getStorageStats() {
        let totalChars = 0;
        try {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key) {
                    const val = localStorage.getItem(key) || '';
                    totalChars += key.length + val.length;
                }
            }
        } catch (e) {}

        const totalBytes = totalChars * 2; // UTF-16 chars = ~2 bytes
        const maxBytes = 5 * 1024 * 1024; // 5 MB standard allocation
        const freeBytes = Math.max(0, maxBytes - totalBytes);

        const usedMB = (totalBytes / (1024 * 1024)).toFixed(2);
        const freeMB = (freeBytes / (1024 * 1024)).toFixed(2);
        const freePercent = ((freeBytes / maxBytes) * 100).toFixed(1);
        const usedPercent = (100 - parseFloat(freePercent)).toFixed(1);

        return {
            totalMB: '5.00 MB',
            usedMB,
            freeMB,
            freePercent,
            usedPercent,
            totalBytes
        };
    }

    function updateStorageUI() {
        const stats = getStorageStats();

        // 1. Update Desktop Popover
        const popoverFreeVal = document.getElementById("popoverFreeVal");
        const popoverUsedVal = document.getElementById("popoverUsedVal");
        const popoverProgressFill = document.getElementById("popoverProgressFill");
        const desktopStorageDot = document.getElementById("desktopStorageDot");

        if (popoverFreeVal) {
            popoverFreeVal.innerText = `${stats.freeMB} MB (${stats.freePercent}% Baaki)`;
        }
        if (popoverUsedVal) {
            popoverUsedVal.innerText = `${stats.usedMB} MB / 5.00 MB`;
        }
        if (popoverProgressFill) {
            popoverProgressFill.style.width = `${stats.freePercent}%`;
            if (parseFloat(stats.freePercent) < 15) {
                popoverProgressFill.style.background = "#ef4444";
                if (desktopStorageDot) desktopStorageDot.style.background = "#ef4444";
            } else if (parseFloat(stats.freePercent) < 40) {
                popoverProgressFill.style.background = "#eab308";
                if (desktopStorageDot) desktopStorageDot.style.background = "#eab308";
            } else {
                popoverProgressFill.style.background = "linear-gradient(90deg, #22c55e, #38bdf8)";
                if (desktopStorageDot) desktopStorageDot.style.background = "#22c55e";
            }
        }

        // 2. Update Mobile Drawer Widget
        const mobileFreeVal = document.getElementById("mobileFreeVal");
        const mobileFreeBadge = document.getElementById("mobileFreeBadge");
        const mobileProgressFill = document.getElementById("mobileProgressFill");

        if (mobileFreeVal) {
            mobileFreeVal.innerText = `${stats.freeMB} MB Baaki`;
        }
        if (mobileFreeBadge) {
            mobileFreeBadge.innerText = `${stats.freePercent}% Free`;
        }
        if (mobileProgressFill) {
            mobileProgressFill.style.width = `${stats.freePercent}%`;
            if (parseFloat(stats.freePercent) < 15) {
                mobileProgressFill.style.background = "#ef4444";
            } else if (parseFloat(stats.freePercent) < 40) {
                mobileProgressFill.style.background = "#eab308";
            } else {
                mobileProgressFill.style.background = "linear-gradient(90deg, #22c55e, #38bdf8)";
            }
        }

        // 3. Update Apps Launcher Bottom Bar (Zero text, only the bar)
        const appsStorageFill = document.getElementById("appsStorageFill");
        const appsStorageTrack = document.getElementById("appsStorageTrack");
        if (appsStorageFill) {
            appsStorageFill.style.width = `${stats.freePercent}%`;
            if (parseFloat(stats.freePercent) < 15) {
                appsStorageFill.style.background = "#ef4444";
            } else if (parseFloat(stats.freePercent) < 40) {
                appsStorageFill.style.background = "#eab308";
            } else {
                appsStorageFill.style.background = "linear-gradient(90deg, #22c55e, #38bdf8)";
            }
        }
        if (appsStorageTrack) {
            appsStorageTrack.title = `Browser Storage: ${stats.freeMB} Free (${stats.freePercent}%)`;
        }
    }

    function initStorageWidgets() {
        // Mobile Drawer Injection (Bottom of drawer panel)
        const mobilePanel = document.querySelector(".mobile-menu-panel");
        if (mobilePanel && !document.getElementById("mobileStorageWidget")) {
            const msw = document.createElement("div");
            msw.className = "mobile-storage-widget";
            msw.id = "mobileStorageWidget";
            msw.innerHTML = `
                <div class="msw-header">
                    <div class="msw-avatar">
                        <i class="fas fa-database"></i>
                    </div>
                    <div class="msw-info">
                        <span class="msw-title">Browser Storage</span>
                        <span class="msw-val" id="mobileFreeVal">5.00 MB Baaki</span>
                    </div>
                    <span class="msw-badge" id="mobileFreeBadge">100% Free</span>
                </div>
                <div class="msw-progress-bar">
                    <div class="msw-progress-fill" id="mobileProgressFill" style="width: 100%;"></div>
                </div>
                <div class="msw-sub">
                    <span>5 MB Maximum Allocated</span>
                    <span>Highlights &amp; Offline Cache</span>
                </div>
            `;
            mobilePanel.appendChild(msw);
        }

        updateStorageUI();
    }

    // ══════════════════════════════════════════════════════════════════════
    // GOOGLE & ZOHO STYLE 3x3 APPS LAUNCHER MATRIX (16x16)
    // ══════════════════════════════════════════════════════════════════════

    function initAppsLauncher() {
        // Ensure shared SVG gradients are defined globally in body (never display:none, zero duplicate IDs)
        if (!document.getElementById("neonGradientNav")) {
            const globalDefs = document.createElement("div");
            globalDefs.innerHTML = `
                <svg width="0" height="0" style="position:absolute;width:0;height:0;overflow:hidden;pointer-events:none;" aria-hidden="true">
                    <defs>
                        <linearGradient id="neonGradientNav" x1="120" y1="30" x2="955" y2="520" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stop-color="#00f2fe" />
                            <stop offset="35%" stop-color="#2563eb" />
                            <stop offset="72%" stop-color="#d946ef" />
                            <stop offset="100%" stop-color="#ec4899" />
                        </linearGradient>
                        <linearGradient id="coreGradientNav" x1="120" y1="30" x2="955" y2="520" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stop-color="#ffffff" />
                            <stop offset="50%" stop-color="#d8e2ff" />
                            <stop offset="100%" stop-color="#ffd6f9" />
                        </linearGradient>
                    </defs>
                </svg>
            `.trim();
            if (globalDefs.firstElementChild) {
                document.body.insertBefore(globalDefs.firstElementChild, document.body.firstChild);
            }
        }

        const lowerPath = window.location.pathname.toLowerCase();
        const inSubdir = lowerPath.includes('1styearsub') || lowerPath.includes('2ndyearsub');
        const prefix = inSubdir ? '../' : '';

        const appsLauncherIconHTML = `
            <span class="apps-icon-stack">
                <svg class="apps-matrix-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <circle cx="2.5" cy="2.5" r="1.6"></circle>
                    <circle cx="8" cy="2.5" r="1.6"></circle>
                    <circle cx="13.5" cy="2.5" r="1.6"></circle>
                    <circle cx="2.5" cy="8" r="1.6"></circle>
                    <circle cx="8" cy="8" r="1.6"></circle>
                    <circle cx="13.5" cy="8" r="1.6"></circle>
                    <circle cx="2.5" cy="13.5" r="1.6"></circle>
                    <circle cx="8" cy="13.5" r="1.6"></circle>
                    <circle cx="13.5" cy="13.5" r="1.6"></circle>
                </svg>
                <svg class="apps-neon-icon" width="16" height="16" viewBox="7 -35 1060 1060" fill="none" aria-hidden="true">
                    <path d="M 124 35 L 124 195 C 124 275, 165 305, 255 335 C 420 390, 560 442, 692 484 C 560 526, 420 582, 255 645 C 165 680, 124 715, 122 800 L 122 955 C 330 890, 535 765, 622 685 C 785 595, 895 520, 916 499 L 952 484 L 916 469 C 895 440, 785 350, 622 252 C 535 190, 330 95, 124 35 Z" stroke="url(#neonGradientNav)" stroke-width="70" stroke-opacity="0.25" stroke-linejoin="round" />
                    <path class="neon-laser-path" pathLength="1000" d="M 124 35 L 124 195 C 124 275, 165 305, 255 335 C 420 390, 560 442, 692 484 C 560 526, 420 582, 255 645 C 165 680, 124 715, 122 800 L 122 955 C 330 890, 535 765, 622 685 C 785 595, 895 520, 916 499 L 952 484 L 916 469 C 895 440, 785 350, 622 252 C 535 190, 330 95, 124 35 Z" stroke="url(#neonGradientNav)" stroke-width="120" stroke-linecap="round" stroke-linejoin="round" />
                    <path class="neon-core-path" pathLength="1000" d="M 124 35 L 124 195 C 124 275, 165 305, 255 335 C 420 390, 560 442, 692 484 C 560 526, 420 582, 255 645 C 165 680, 124 715, 122 800 L 122 955 C 330 890, 535 765, 622 685 C 785 595, 895 520, 916 499 L 952 484 L 916 469 C 895 440, 785 350, 622 252 C 535 190, 330 95, 124 35 Z" stroke="url(#coreGradientNav)" stroke-width="50" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </span>
        `;
        const matrixSVG = appsLauncherIconHTML;

        const appsPopoverHTML = `
            <div class="alp-header">
                <span class="alp-header-title">Apps</span>
            </div>
            <div class="alp-grid">
                <a href="https://angkor-ai-dlm.vercel.app/" target="_blank" rel="noopener noreferrer" class="alp-item" title="Angkor AI">
                    <div class="alp-item-icon">
                        <img src="${prefix}images/angkor.png" alt="Angkor AI" onerror="this.onerror=null;this.src='https://angkor-ai-dlm.vercel.app/favicon.ico';" />
                    </div>
                    <span class="alp-item-name">Angkor AI</span>
                </a>
                <a href="https://meta-cleaner-dlm.vercel.app/" target="_blank" rel="noopener noreferrer" class="alp-item" title="MetaCleaner">
                    <div class="alp-item-icon">
                        <img src="${prefix}images/metacleaner.png" alt="MetaCleaner" onerror="this.onerror=null;this.src='https://meta-cleaner-dlm.vercel.app/favicon.ico';" />
                    </div>
                    <span class="alp-item-name">MetaCleaner</span>
                </a>
                <a href="https://k6dlm.vercel.app/" target="_blank" rel="noopener noreferrer" class="alp-item" title="K6 Engine — NIFTY 50 Directional Intelligence">
                    <div class="alp-item-icon">
                        <img src="${prefix}images/k6.png" alt="K6 Engine" onerror="this.onerror=null;this.src='https://k6dlm.vercel.app/favicon.ico';" />
                    </div>
                    <span class="alp-item-name">K6 Engine</span>
                </a>
                <a href="${prefix}index.html" class="alp-item" title="BTechX">
                    <div class="alp-item-icon">
                        <img src="${prefix}logo.png" alt="BTechX Logo" onerror="this.onerror=null;this.src='${prefix}images/btechx.png';this.onerror=function(){this.src='https://raw.githubusercontent.com/py-C0der/yourclg/main/logo.png';};" style="
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            border-radius: 50%;
                        " />
                    </div>
                    <span class="alp-item-name">BTechX</span>
                </a>
            </div>
            <div class="alp-storage-track" id="appsStorageTrack" title="Browser Storage">
                <div class="alp-storage-fill" id="appsStorageFill" style="width: 100%;"></div>
            </div>
        `;

        // 1. Desktop Navbar Wrapper
        const navbarLinks = document.querySelector(".navbar-links");
        let wrapper = document.getElementById("appsLauncherWrapper");

        if (navbarLinks && !wrapper) {
            const oldAppsLink = navbarLinks.querySelector('a[href*="apps.html"]');

            wrapper = document.createElement("div");
            wrapper.className = "apps-launcher-wrapper";
            wrapper.id = "appsLauncherWrapper";
            wrapper.innerHTML = `
                <button class="apps-launcher-btn" id="appsLauncherBtn" type="button" title="Apps" aria-label="Apps" aria-expanded="false">
                    ${matrixSVG}
                </button>
                <div class="apps-launcher-popover" id="appsLauncherPopover" role="dialog" aria-label="DLM Apps Launcher">
                    ${appsPopoverHTML}
                </div>
            `;

            if (oldAppsLink) {
                oldAppsLink.replaceWith(wrapper);
            } else {
                navbarLinks.appendChild(wrapper);
            }
        }

        // Get popover reference (it may be in wrapper or in body)
        let popover = document.getElementById("appsLauncherPopover");
        if (!popover && wrapper) {
            popover = wrapper.querySelector("#appsLauncherPopover");
        }
        if (!popover) {
            popover = document.createElement("div");
            popover.className = "apps-launcher-popover";
            popover.id = "appsLauncherPopover";
            popover.setAttribute("role", "dialog");
            popover.setAttribute("aria-label", "DLM Apps Launcher");
            popover.innerHTML = appsPopoverHTML;
            if (wrapper) {
                wrapper.appendChild(popover);
            } else {
                document.body.appendChild(popover);
            }
        }

        const btn = document.getElementById("appsLauncherBtn");

        // 2. Ensure popover is placed in document.body when on mobile (<= 900px)
        // This is critical because on mobile .navbar-links has display: none, which hides all children!
        function syncPopoverLocation() {
            const currentPopover = document.getElementById("appsLauncherPopover");
            const currentWrapper = document.getElementById("appsLauncherWrapper");
            if (!currentPopover) return;

            if (window.innerWidth <= 900) {
                if (currentPopover.parentElement !== document.body) {
                    document.body.appendChild(currentPopover);
                }
            } else {
                if (currentWrapper && currentPopover.parentElement !== currentWrapper) {
                    currentWrapper.appendChild(currentPopover);
                }
            }
        }

        syncPopoverLocation();
        window.addEventListener("resize", syncPopoverLocation);

        function toggleLauncher(e) {
            if (e) {
                e.preventDefault();
                e.stopPropagation();
            }
            const currentPopover = document.getElementById("appsLauncherPopover");
            if (!currentPopover) return;

            // Ensure popover is in body if on mobile
            if (window.innerWidth <= 900 && currentPopover.parentElement !== document.body) {
                document.body.appendChild(currentPopover);
            }

            const isOpen = currentPopover.classList.toggle("open");
            const currentBtn = document.getElementById("appsLauncherBtn");
            const currentMobileBtn = document.getElementById("mobileAppsLauncherBtn");

            if (currentBtn) {
                currentBtn.classList.toggle("active", isOpen);
                currentBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
            }
            if (currentMobileBtn) {
                currentMobileBtn.classList.toggle("active", isOpen);
                currentMobileBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
            }

            // Close storage profile popover if open
            const storagePopover = document.getElementById("storageProfilePopover");
            const storageBtn = document.getElementById("storageProfileBtn");
            if (isOpen && storagePopover) {
                storagePopover.classList.remove("open");
                if (storageBtn) storageBtn.classList.remove("active");
            }
        }

        function closeLauncher() {
            const currentPopover = document.getElementById("appsLauncherPopover");
            if (currentPopover && currentPopover.classList.contains("open")) {
                currentPopover.classList.remove("open");
                const currentBtn = document.getElementById("appsLauncherBtn");
                const currentMobileBtn = document.getElementById("mobileAppsLauncherBtn");
                if (currentBtn) {
                    currentBtn.classList.remove("active");
                    currentBtn.setAttribute("aria-expanded", "false");
                }
                if (currentMobileBtn) {
                    currentMobileBtn.classList.remove("active");
                    currentMobileBtn.setAttribute("aria-expanded", "false");
                }
            }
        }

        if (btn) {
            btn.addEventListener("click", toggleLauncher);
        }

        // Close when clicking outside
        document.addEventListener("click", (e) => {
            const currentPopover = document.getElementById("appsLauncherPopover");
            const currentWrapper = document.getElementById("appsLauncherWrapper");
            const currentMobileBtn = document.getElementById("mobileAppsLauncherBtn");

            if (
                (currentWrapper && currentWrapper.contains(e.target)) ||
                (currentPopover && currentPopover.contains(e.target)) ||
                (currentMobileBtn && currentMobileBtn.contains(e.target))
            ) {
                return;
            }
            closeLauncher();
        });

        // Close on Escape key
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                closeLauncher();
            }
        });

        // Prevent click events inside popover from bubbling up and closing it
        if (popover) {
            popover.addEventListener("click", (e) => {
                e.stopPropagation();
            });

            // Close launcher when an app link item is clicked
            popover.querySelectorAll(".alp-item").forEach(item => {
                item.addEventListener("click", () => {
                    closeLauncher();
                });
            });
        }

        // 3. Mobile Navbar Trigger Button on Left Side (smaller 3x3 matrix)
        const navbarBrand = document.querySelector(".navbar-brand");
        let mobileBtn = document.getElementById("mobileAppsLauncherBtn");
        if (navbarBrand && !mobileBtn) {
            mobileBtn = document.createElement("button");
            mobileBtn.className = "apps-launcher-btn mobile-apps-btn";
            mobileBtn.id = "mobileAppsLauncherBtn";
            mobileBtn.type = "button";
            mobileBtn.title = "Apps";
            mobileBtn.setAttribute("aria-label", "Apps");
            mobileBtn.innerHTML = matrixSVG;

            navbarBrand.insertBefore(mobileBtn, navbarBrand.firstChild);
        }

        if (mobileBtn) {
            mobileBtn.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleLauncher(e);
                if (mobileMenu && mobileMenu.classList.contains("open")) {
                    closeDrawer();
                }
            });
        }
    }

    initAppsLauncher();
    initStorageWidgets();

    // Sync storage if highlights are updated in another tab or viewer
    window.addEventListener("storage", () => {
        updateStorageUI();
    });

    // Track internal link navigation so intro isn't triggered when switching pages (About -> Home, etc.)
    document.addEventListener("click", (e) => {
        const link = e.target.closest("a");
        if (!link) return;
        const href = link.getAttribute("href");
        if (!href || href.startsWith("#") || href.startsWith("javascript:")) return;
        if (!href.startsWith("http://") && !href.startsWith("https://") && !href.startsWith("mailto:") && !href.startsWith("tel:")) {
            try {
                sessionStorage.setItem("btxLastInternalNav", Date.now().toString());
            } catch (err) {}
        } else if (href.includes(window.location.hostname) || href.includes("btechx")) {
            try {
                sessionStorage.setItem("btxLastInternalNav", Date.now().toString());
            } catch (err) {}
        }
    }, { capture: true, passive: true });
});
