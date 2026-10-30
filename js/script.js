/* =====================================================
   PRINTWISE - CAMPUS PRINTING COST ESTIMATOR

   SWD 417 ASSIGNMENT

   Student: David Ojogbane
   Matric Number: 2025/HND/SWD/009

   Technologies: HTML, CSS, JavaScript
===================================================== */

"use strict";


/* =====================================================
   1. LOCAL STORAGE KEYS
===================================================== */

const STORAGE_KEYS = {
    estimates: "printwise_estimates",
    pricing: "printwise_pricing",
    theme: "printwise_theme"
};


/* =====================================================
   2. DEFAULT SERVICE PRICES

   IMPORTANT:
   These are demonstration prices, not verified
   campus printing shop prices.

   Users can change them in Service Pricing.
===================================================== */

const DEFAULT_PRICING = {
    bwA4: 50,
    colorA4: 200,
    bwA3: 100,
    colorA3: 400,

    doubleSidedMultiplier: 0.90,

    photocopy: 30,
    spiral: 500,
    thermal: 800,
    lamination: 200,
    scanning: 100,
    typing: 200
};


/* =====================================================
   3. SELECT HTML ELEMENTS
===================================================== */

// Sidebar

const sidebar = document.getElementById("sidebar");
const menuToggle = document.getElementById("menuToggle");
const menuItems = document.querySelectorAll(".menu-item");
const themeToggle = document.getElementById("themeToggle");

// Header

const pageTitle = document.getElementById("pageTitle");

const resetCalculatorBtn =
    document.getElementById("resetCalculatorBtn");

const saveEstimateBtn =
    document.getElementById("saveEstimateBtn");

// Sections

const statsSection = document.getElementById("statsSection");
const welcomeBanner = document.getElementById("welcomeBanner");

const calculatorSection =
    document.getElementById("calculatorSection");

const historySection =
    document.getElementById("historySection");

const pricingSection =
    document.getElementById("pricingSection");

// Dashboard statistics

const totalEstimatesElement =
    document.getElementById("totalEstimates");

const currentEstimateElement =
    document.getElementById("currentEstimate");

const printingCostStatElement =
    document.getElementById("printingCostStat");

const processingCostStatElement =
    document.getElementById("processingCostStat");

// Calculator form

const calculatorForm =
    document.getElementById("calculatorForm");

const documentNameInput =
    document.getElementById("documentName");

const pageCountInput =
    document.getElementById("pageCount");

const copyCountInput =
    document.getElementById("copyCount");

const printTypeInput =
    document.getElementById("printType");

const paperSizeInput =
    document.getElementById("paperSize");

const printModeInput =
    document.getElementById("printMode");

const photocopyPagesInput =
    document.getElementById("photocopyPages");

const photocopyCopiesInput =
    document.getElementById("photocopyCopies");

const bindingTypeInput =
    document.getElementById("bindingType");

const bindingQuantityInput =
    document.getElementById("bindingQuantity");

const laminationQuantityInput =
    document.getElementById("laminationQuantity");

const scanningPagesInput =
    document.getElementById("scanningPages");

const typingPagesInput =
    document.getElementById("typingPages");

// Cost breakdown

const printingCostElement =
    document.getElementById("printingCost");

const photocopyCostElement =
    document.getElementById("photocopyCost");

const bindingCostElement =
    document.getElementById("bindingCost");

const laminationCostElement =
    document.getElementById("laminationCost");

const scanningCostElement =
    document.getElementById("scanningCost");

const typingCostElement =
    document.getElementById("typingCost");

const grandTotalElement =
    document.getElementById("grandTotal");

// Summary buttons

const summarySaveBtn =
    document.getElementById("summarySaveBtn");

const printEstimateBtn =
    document.getElementById("printEstimateBtn");

const startCalculatingBtn =
    document.getElementById("startCalculatingBtn");

// History

const historyContainer =
    document.getElementById("historyContainer");

const historyEmpty =
    document.getElementById("historyEmpty");

const clearHistoryBtn =
    document.getElementById("clearHistoryBtn");

const emptyCalculateBtn =
    document.getElementById("emptyCalculateBtn");

// Pricing

const pricingForm =
    document.getElementById("pricingForm");

const resetPricingBtn =
    document.getElementById("resetPricingBtn");


/* =====================================================
   4. APPLICATION VARIABLES
===================================================== */

let estimates = loadArray(STORAGE_KEYS.estimates);

let pricing = loadPricing();

let currentView = "dashboard";

let currentCalculation = null;


/* =====================================================
   5. LOCAL STORAGE FUNCTIONS
===================================================== */

function readStorage(key) {

    try {
        return localStorage.getItem(key);
    } catch (error) {
        console.error("Storage read error:", error);
        return null;
    }

}


function writeStorage(key, value) {

    try {

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

        return true;

    } catch (error) {

        console.error("Storage save error:", error);

        alert(
            "Unable to save your information. " +
            "Please check your browser storage settings."
        );

        return false;

    }

}


function loadArray(key) {

    try {

        const saved = readStorage(key);

        if (!saved) {
            return [];
        }

        const parsed = JSON.parse(saved);

        return Array.isArray(parsed) ? parsed : [];

    } catch (error) {

        console.error("Unable to load saved data:", error);

        return [];

    }

}


/* =====================================================
   6. LOAD SERVICE PRICING
===================================================== */

function loadPricing() {

    try {

        const saved = readStorage(STORAGE_KEYS.pricing);

        if (!saved) {
            return { ...DEFAULT_PRICING };
        }

        const parsed = JSON.parse(saved);

        if (
            !parsed ||
            typeof parsed !== "object" ||
            Array.isArray(parsed)
        ) {
            return { ...DEFAULT_PRICING };
        }

        const result = { ...DEFAULT_PRICING };

        Object.keys(DEFAULT_PRICING).forEach(key => {

            const value = Number(parsed[key]);

            if (
                parsed[key] !== undefined &&
                parsed[key] !== null &&
                parsed[key] !== "" &&
                Number.isFinite(value) &&
                value >= 0
            ) {

                result[key] = value;

            }

        });

        return result;

    } catch (error) {

        console.error("Unable to load pricing:", error);

        return { ...DEFAULT_PRICING };

    }

}


/* =====================================================
   7. GENERATE UNIQUE ID
===================================================== */

function generateId() {

    if (
        window.crypto &&
        typeof window.crypto.randomUUID === "function"
    ) {

        return window.crypto.randomUUID();

    }

    return (
        Date.now().toString(36) +
        Math.random().toString(36).slice(2)
    );

}


/* =====================================================
   8. FORMAT CURRENCY
===================================================== */

function formatCurrency(amount) {

    const value = Number(amount);

    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(
        Number.isFinite(value) ? value : 0
    );

}


/* =====================================================
   9. FORMAT DATE
===================================================== */

function formatDate(dateString) {

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
        return "Unknown date";
    }

    return date.toLocaleString("en-NG", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit"
    });

}


/* =====================================================
   10. NUMBER VALIDATION
===================================================== */

function getNumber(element, minimum = 0) {

    const value = Number(element.value);

    if (!Number.isFinite(value)) {
        return minimum;
    }

    return Math.max(minimum, value);

}


function getWholeNumber(element, minimum = 0) {

    return Math.floor(
        getNumber(element, minimum)
    );

}


/* =====================================================
   11. COLLECT CALCULATOR INPUTS
===================================================== */

function getCalculatorData() {

    return {

        documentName:
            documentNameInput.value.trim() ||
            "Untitled Document",

        pageCount: getWholeNumber(pageCountInput),

        copyCount: getWholeNumber(copyCountInput, 1),

        printType: printTypeInput.value,

        paperSize: paperSizeInput.value,

        printMode: printModeInput.value,

        photocopyPages:
            getWholeNumber(photocopyPagesInput),

        photocopyCopies:
            getWholeNumber(photocopyCopiesInput, 1),

        bindingType: bindingTypeInput.value,

        bindingQuantity:
            getWholeNumber(bindingQuantityInput),

        laminationQuantity:
            getWholeNumber(laminationQuantityInput),

        scanningPages:
            getWholeNumber(scanningPagesInput),

        typingPages:
            getWholeNumber(typingPagesInput)

    };

}


/* =====================================================
   12. GET PRINTING RATE
===================================================== */

function getPrintingRate(data, rates) {

    const rateKey = {

        "bw-a4": "bwA4",
        "bw-a3": "bwA3",
        "color-a4": "colorA4",
        "color-a3": "colorA3"

    };

    const selectedKey =
        `${data.printType}-${data.paperSize}`;

    const pricingKey = rateKey[selectedKey];

    return rates[pricingKey] || 0;

}


/* =====================================================
   13. CALCULATE ALL SERVICE COSTS
===================================================== */

function calculateCosts(data, rates = pricing) {

    // PRINTING

    const printingRate = getPrintingRate(data, rates);

    let printingCost =
        data.pageCount *
        data.copyCount *
        printingRate;

    // Apply multiplier for double-sided printing.
    // The rate is charged per printed page/side.

    if (data.printMode === "double") {

        printingCost *= rates.doubleSidedMultiplier;

    }

    // PHOTOCOPYING

    const photocopyCost =
        data.photocopyPages *
        data.photocopyCopies *
        rates.photocopy;

    // BINDING

    let bindingRate = 0;

    if (data.bindingType === "spiral") {

        bindingRate = rates.spiral;

    } else if (data.bindingType === "thermal") {

        bindingRate = rates.thermal;

    }

    const bindingCost =
        data.bindingQuantity *
        bindingRate;

    // LAMINATION

    const laminationCost =
        data.laminationQuantity *
        rates.lamination;

    // SCANNING

    const scanningCost =
        data.scanningPages *
        rates.scanning;

    // TYPING

    const typingCost =
        data.typingPages *
        rates.typing;

    // TOTAL

    const processingCost =
        photocopyCost +
        bindingCost +
        laminationCost +
        scanningCost +
        typingCost;

    const grandTotal =
        printingCost +
        processingCost;

    return {

        printingCost,
        photocopyCost,
        bindingCost,
        laminationCost,
        scanningCost,
        typingCost,

        processingCost,
        grandTotal

    };

}


/* =====================================================
   14. UPDATE COST BREAKDOWN
===================================================== */

function updateCostDisplay(costs) {

    printingCostElement.textContent =
        formatCurrency(costs.printingCost);

    photocopyCostElement.textContent =
        formatCurrency(costs.photocopyCost);

    bindingCostElement.textContent =
        formatCurrency(costs.bindingCost);

    laminationCostElement.textContent =
        formatCurrency(costs.laminationCost);

    scanningCostElement.textContent =
        formatCurrency(costs.scanningCost);

    typingCostElement.textContent =
        formatCurrency(costs.typingCost);

    grandTotalElement.textContent =
        formatCurrency(costs.grandTotal);

    // DASHBOARD STATISTICS

    currentEstimateElement.textContent =
        formatCurrency(costs.grandTotal);

    printingCostStatElement.textContent =
        formatCurrency(costs.printingCost);

    processingCostStatElement.textContent =
        formatCurrency(costs.processingCost);

}


/* =====================================================
   15. CALCULATE ESTIMATE
===================================================== */

function calculateEstimate() {

    const data = getCalculatorData();

    const costs = calculateCosts(data);

    currentCalculation = {
        data,
        costs
    };

    updateCostDisplay(costs);

    return currentCalculation;

}


/* =====================================================
   16. AUTOMATIC CALCULATION EVENTS
===================================================== */

calculatorForm.addEventListener("input", () => {

    calculateEstimate();

});


calculatorForm.addEventListener("change", () => {

    calculateEstimate();

});


calculatorForm.addEventListener("submit", event => {

    event.preventDefault();

    calculateEstimate();

});


/* =====================================================
   17. RESET CALCULATOR
===================================================== */

function resetCalculator() {

    calculatorForm.reset();

    pageCountInput.value = 0;

    copyCountInput.value = 1;

    photocopyPagesInput.value = 0;

    photocopyCopiesInput.value = 1;

    bindingQuantityInput.value = 0;

    laminationQuantityInput.value = 0;

    scanningPagesInput.value = 0;

    typingPagesInput.value = 0;

    calculateEstimate();

}


resetCalculatorBtn.addEventListener("click", () => {

    const confirmed = confirm(
        "Reset all calculator fields?"
    );

    if (confirmed) {

        resetCalculator();

        switchView("calculator");

    }

});


/* =====================================================
   18. CHECK IF ESTIMATE HAS SERVICES
===================================================== */

function hasSelectedServices(data) {

    return (

        data.pageCount > 0 ||

        data.photocopyPages > 0 ||

        (
            data.bindingType !== "none" &&
            data.bindingQuantity > 0
        ) ||

        data.laminationQuantity > 0 ||

        data.scanningPages > 0 ||

        data.typingPages > 0

    );

}


/* =====================================================
   19. SAVE ESTIMATE
===================================================== */

function saveEstimate() {

    // Validate form before saving.

    if (!calculatorForm.reportValidity()) {
        return;
    }

    const calculation = calculateEstimate();

    const data = calculation.data;

    if (!hasSelectedServices(data)) {

        alert(
            "Please enter at least one printing " +
            "or document processing service."
        );

        return;

    }

    const newEstimate = {

        id: generateId(),

        documentName: data.documentName,

        data: { ...data },

        costs: { ...calculation.costs },

        // Save rates used for this particular estimate.
        rates: { ...pricing },

        createdAt: new Date().toISOString()

    };

    const updatedEstimates = [
        newEstimate,
        ...estimates
    ];

    if (
        !writeStorage(
            STORAGE_KEYS.estimates,
            updatedEstimates
        )
    ) {
        return;
    }

    estimates = updatedEstimates;

    updateStatistics();

    renderHistory();

    alert("Estimate saved successfully!");

}


/* =====================================================
   20. SAVE ESTIMATE BUTTONS
===================================================== */

saveEstimateBtn.addEventListener(
    "click",
    saveEstimate
);


summarySaveBtn.addEventListener(
    "click",
    saveEstimate
);


/* =====================================================
   21. UPDATE DASHBOARD STATISTICS
===================================================== */

function updateStatistics() {

    totalEstimatesElement.textContent =
        estimates.length;

    if (currentCalculation) {

        updateCostDisplay(
            currentCalculation.costs
        );

    }

}


/* =====================================================
   22. CREATE HTML ELEMENT HELPER
===================================================== */

function createElement(
    tag,
    className = "",
    text = ""
) {

    const element = document.createElement(tag);

    if (className) {
        element.className = className;
    }

    if (text !== "") {
        element.textContent = text;
    }

    return element;

}


/* =====================================================
   23. CREATE HISTORY CARD
===================================================== */

function createHistoryCard(estimate) {

    const card = createElement(
        "article",
        "history-card"
    );

    // TOP

    const top = createElement(
        "div",
        "history-top"
    );

    const icon = createElement(
        "div",
        "history-icon",
        "🧾"
    );

    const date = createElement(
        "span",
        "history-date",
        formatDate(estimate.createdAt)
    );

    top.append(icon, date);

    // DOCUMENT NAME

    const title = createElement(
        "h3",
        "",
        estimate.documentName
    );

    // DETAILS

    const details = createElement(
        "div",
        "history-details"
    );

    const data = estimate.data;

    const detailLines = [

        `Printing: ${data.pageCount} page(s)`,

        `Copies: ${data.copyCount}`,

        `Photocopying: ${data.photocopyPages} page(s)`,

        `Binding: ${data.bindingType}`

    ];

    detailLines.forEach(line => {

        const paragraph = createElement(
            "p",
            "",
            line
        );

        details.appendChild(paragraph);

    });

    // AMOUNT

    const amountBox = createElement(
        "div",
        "history-amount"
    );

    const amountLabel = createElement(
        "span",
        "",
        "Estimated Total"
    );

    const amountValue = createElement(
        "strong",
        "",
        formatCurrency(
            estimate.costs.grandTotal
        )
    );

    amountBox.append(
        amountLabel,
        amountValue
    );

    // ACTIONS

    const actions = createElement(
        "div",
        "history-actions"
    );

    const viewButton = createElement(
        "button",
        "card-btn view",
        "👁️ View Estimate"
    );

    viewButton.type = "button";

    viewButton.addEventListener("click", () => {

        loadSavedEstimate(estimate.id);

    });

    const deleteButton = createElement(
        "button",
        "card-btn delete",
        "🗑️ Delete"
    );

    deleteButton.type = "button";

    deleteButton.addEventListener("click", () => {

        deleteEstimate(estimate.id);

    });

    actions.append(
        viewButton,
        deleteButton
    );

    // BUILD CARD

    card.append(
        top,
        title,
        details,
        amountBox,
        actions
    );

    return card;

}


/* =====================================================
   24. RENDER ESTIMATE HISTORY
===================================================== */

function renderHistory() {

    historyContainer.replaceChildren();

    if (estimates.length === 0) {

        historyEmpty.style.display = "block";

        clearHistoryBtn.disabled = true;

        return;

    }

    historyEmpty.style.display = "none";

    clearHistoryBtn.disabled = false;

    const sortedEstimates = [...estimates].sort(
        (a, b) => {

            return (
                new Date(b.createdAt) -
                new Date(a.createdAt)
            );

        }
    );

    sortedEstimates.forEach(estimate => {

        historyContainer.appendChild(
            createHistoryCard(estimate)
        );

    });

}


/* =====================================================
   25. LOAD SAVED ESTIMATE
===================================================== */

function loadSavedEstimate(id) {

    const estimate = estimates.find(
        item => item.id === id
    );

    if (!estimate) {

        alert("Estimate not found.");

        return;

    }

    const data = estimate.data;

    // RESTORE FORM VALUES

    documentNameInput.value =
        data.documentName || "";

    pageCountInput.value =
        data.pageCount;

    copyCountInput.value =
        data.copyCount;

    printTypeInput.value =
        data.printType;

    paperSizeInput.value =
        data.paperSize;

    printModeInput.value =
        data.printMode;

    photocopyPagesInput.value =
        data.photocopyPages;

    photocopyCopiesInput.value =
        data.photocopyCopies;

    bindingTypeInput.value =
        data.bindingType;

    bindingQuantityInput.value =
        data.bindingQuantity;

    laminationQuantityInput.value =
        data.laminationQuantity;

    scanningPagesInput.value =
        data.scanningPages;

    typingPagesInput.value =
        data.typingPages;

    // Recalculate using the CURRENT service rates.
    // Saved historical totals remain unchanged in history.

    calculateEstimate();

    switchView("calculator");

    alert(
        "Estimate loaded successfully.\n\n" +
        "The calculator uses your current service rates. " +
        "The original saved amount remains in history."
    );

}


/* =====================================================
   26. DELETE ESTIMATE
===================================================== */

function deleteEstimate(id) {

    const estimate = estimates.find(
        item => item.id === id
    );

    if (!estimate) {
        return;
    }

    const confirmed = confirm(
        `Delete the estimate for "${estimate.documentName}"?`
    );

    if (!confirmed) {
        return;
    }

    const updatedEstimates = estimates.filter(
        item => item.id !== id
    );

    if (
        !writeStorage(
            STORAGE_KEYS.estimates,
            updatedEstimates
        )
    ) {
        return;
    }

    estimates = updatedEstimates;

    renderHistory();

    updateStatistics();

}


/* =====================================================
   27. CLEAR ESTIMATE HISTORY
===================================================== */

function clearHistory() {

    if (estimates.length === 0) {
        return;
    }

    const confirmed = confirm(
        "Delete all saved estimates?\n\n" +
        "This action cannot be undone."
    );

    if (!confirmed) {
        return;
    }

    if (
        !writeStorage(
            STORAGE_KEYS.estimates,
            []
        )
    ) {
        return;
    }

    estimates = [];

    renderHistory();

    updateStatistics();

    alert("Estimate history cleared.");

}


clearHistoryBtn.addEventListener(
    "click",
    clearHistory
);


/* =====================================================
   28. PRICING INPUT MAPPING
===================================================== */

const PRICING_INPUTS = {

    bwA4: "rateBwA4",

    colorA4: "rateColorA4",

    bwA3: "rateBwA3",

    colorA3: "rateColorA3",

    doubleSidedMultiplier:
        "doubleSidedMultiplier",

    photocopy: "ratePhotocopy",

    spiral: "rateSpiral",

    thermal: "rateThermal",

    lamination: "rateLamination",

    scanning: "rateScanning",

    typing: "rateTyping"

};


/* =====================================================
   29. DISPLAY PRICING VALUES
===================================================== */

function displayPricing() {

    Object.entries(PRICING_INPUTS).forEach(
        ([key, inputId]) => {

            const input =
                document.getElementById(inputId);

            if (input) {

                input.value = pricing[key];

            }

        }
    );

}


/* =====================================================
   30. GET PRICING FORM VALUES
===================================================== */

function getPricingFormData() {

    const updatedPricing = {};

    for (const [key, inputId] of Object.entries(
        PRICING_INPUTS
    )) {

        const input =
            document.getElementById(inputId);

        const value = Number(input.value);

        if (
            input.value.trim() === "" ||
            !Number.isFinite(value) ||
            value < 0
        ) {

            alert(
                "Please enter a valid non-negative " +
                "price for every service."
            );

            input.focus();

            return null;

        }

        updatedPricing[key] = value;

    }

    return updatedPricing;

}


/* =====================================================
   31. SAVE SERVICE PRICING
===================================================== */

function savePricing(event) {

    event.preventDefault();

    if (!pricingForm.reportValidity()) {
        return;
    }

    const updatedPricing =
        getPricingFormData();

    if (!updatedPricing) {
        return;
    }

    if (
        !writeStorage(
            STORAGE_KEYS.pricing,
            updatedPricing
        )
    ) {
        return;
    }

    pricing = updatedPricing;

    calculateEstimate();

    alert("Service pricing updated successfully!");

}


pricingForm.addEventListener(
    "submit",
    savePricing
);


/* =====================================================
   32. RESTORE DEFAULT PRICES
===================================================== */

function resetPricing() {

    const confirmed = confirm(
        "Restore all service prices to their default values?"
    );

    if (!confirmed) {
        return;
    }

    const defaults = { ...DEFAULT_PRICING };

    if (
        !writeStorage(
            STORAGE_KEYS.pricing,
            defaults
        )
    ) {
        return;
    }

    pricing = defaults;

    displayPricing();

    calculateEstimate();

    alert("Default service prices restored.");

}


resetPricingBtn.addEventListener(
    "click",
    resetPricing
);


/* =====================================================
   33. PAGE NAVIGATION
===================================================== */

function switchView(view) {

    const validViews = [
        "dashboard",
        "calculator",
        "history",
        "pricing"
    ];

    if (!validViews.includes(view)) {
        return;
    }

    currentView = view;

    // UPDATE ACTIVE MENU

    menuItems.forEach(item => {

        const isActive =
            item.dataset.view === view;

        item.classList.toggle(
            "active",
            isActive
        );

    });

    // HIDE ALL SECTIONS

    statsSection.hidden = true;

    welcomeBanner.hidden = true;

    calculatorSection.hidden = true;

    historySection.hidden = true;

    pricingSection.hidden = true;

    // SHOW SELECTED PAGE

    if (view === "dashboard") {

        pageTitle.textContent = "Dashboard";

        statsSection.hidden = false;

        welcomeBanner.hidden = false;

        calculatorSection.hidden = false;

    } else if (view === "calculator") {

        pageTitle.textContent = "Cost Calculator";

        calculatorSection.hidden = false;

    } else if (view === "history") {

        pageTitle.textContent = "Estimate History";

        historySection.hidden = false;

        renderHistory();

    } else if (view === "pricing") {

        pageTitle.textContent = "Service Pricing";

        pricingSection.hidden = false;

        displayPricing();

    }

    // SHOW CALCULATOR BUTTONS ONLY WHERE NEEDED

    const showCalculatorActions =
        view === "dashboard" ||
        view === "calculator";

    resetCalculatorBtn.hidden =
        !showCalculatorActions;

    saveEstimateBtn.hidden =
        !showCalculatorActions;

    // CLOSE MOBILE SIDEBAR

    sidebar.classList.remove("open");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   34. SIDEBAR NAVIGATION EVENTS
===================================================== */

menuItems.forEach(item => {

    item.addEventListener("click", () => {

        switchView(
            item.dataset.view
        );

    });

});


/* =====================================================
   35. START CALCULATING BUTTON
===================================================== */

startCalculatingBtn.addEventListener(
    "click",
    () => {

        switchView("calculator");

        documentNameInput.focus();

    }
);


/* =====================================================
   36. EMPTY HISTORY BUTTON
===================================================== */

emptyCalculateBtn.addEventListener(
    "click",
    () => {

        switchView("calculator");

        documentNameInput.focus();

    }
);


/* =====================================================
   37. MOBILE SIDEBAR
===================================================== */

menuToggle.addEventListener("click", () => {

    const isOpen =
        sidebar.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

});


document.addEventListener("click", event => {

    if (window.innerWidth > 700) {
        return;
    }

    if (
        sidebar.classList.contains("open") &&
        !sidebar.contains(event.target) &&
        !menuToggle.contains(event.target)
    ) {

        sidebar.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }

});


/* =====================================================
   38. DARK MODE
===================================================== */

function applyTheme(theme) {

    const isDark = theme === "dark";

    document.body.classList.toggle(
        "dark-mode",
        isDark
    );

    themeToggle.textContent = isDark
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";

    themeToggle.setAttribute(
        "aria-pressed",
        String(isDark)
    );

}


let savedTheme = "light";

try {

    savedTheme =
        localStorage.getItem(
            STORAGE_KEYS.theme
        ) || "light";

} catch (error) {

    console.warn(
        "Unable to load saved theme:",
        error
    );

}

applyTheme(savedTheme);


themeToggle.addEventListener("click", () => {

    const isDark =
        document.body.classList.contains(
            "dark-mode"
        );

    const newTheme =
        isDark ? "light" : "dark";

    applyTheme(newTheme);

    try {

        localStorage.setItem(
            STORAGE_KEYS.theme,
            newTheme
        );

    } catch (error) {

        console.warn(
            "Unable to save theme:",
            error
        );

    }

});


/* =====================================================
   39. CLOSE SIDEBAR WITH ESCAPE
===================================================== */

document.addEventListener("keydown", event => {

    if (
        event.key === "Escape" &&
        sidebar.classList.contains("open")
    ) {

        sidebar.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.focus();

    }

});


/* =====================================================
   40. PRINT ESTIMATE
===================================================== */

function printEstimate() {

    if (!calculatorForm.reportValidity()) {
        return;
    }

    const calculation = calculateEstimate();

    if (!hasSelectedServices(calculation.data)) {

        alert(
            "Please enter at least one service " +
            "before printing an estimate."
        );

        return;

    }

    const data = calculation.data;
    const costs = calculation.costs;

    // Generate a temporary printable summary.
    // The original dashboard is restored automatically.

    const printContainer = document.createElement("div");

    printContainer.id = "printwisePrintSheet";

    const heading = createElement(
        "h1",
        "",
        "PrintWise - Cost Estimate"
    );

    const subtitle = createElement(
        "p",
        "",
        "Campus Printing and Document Processing"
    );

    const documentTitle = createElement(
        "p",
        "",
        `Document: ${data.documentName}`
    );

    const generatedDate = createElement(
        "p",
        "",
        `Generated: ${formatDate(new Date().toISOString())}`
    );

    const table = document.createElement("table");

    const tableHeader = document.createElement("thead");

    const headerRow = document.createElement("tr");

    ["Service", "Estimated Cost"].forEach(label => {

        const th = document.createElement("th");

        th.textContent = label;

        headerRow.appendChild(th);

    });

    tableHeader.appendChild(headerRow);

    const tableBody = document.createElement("tbody");

    const rows = [

        ["Printing", costs.printingCost],

        ["Photocopying", costs.photocopyCost],

        ["Binding", costs.bindingCost],

        ["Lamination", costs.laminationCost],

        ["Scanning", costs.scanningCost],

        ["Typing", costs.typingCost]

    ];

    rows.forEach(([label, amount]) => {

        const row = document.createElement("tr");

        const nameCell = document.createElement("td");

        nameCell.textContent = label;

        const amountCell = document.createElement("td");

        amountCell.textContent =
            formatCurrency(amount);

        row.append(nameCell, amountCell);

        tableBody.appendChild(row);

    });

    const totalRow = document.createElement("tr");

    const totalLabel = document.createElement("th");

    totalLabel.textContent = "TOTAL";

    const totalAmount = document.createElement("th");

    totalAmount.textContent =
        formatCurrency(costs.grandTotal);

    totalRow.append(totalLabel, totalAmount);

    tableBody.appendChild(totalRow);

    table.append(tableHeader, tableBody);

    const note = createElement(
        "p",
        "",
        "Note: This is an estimated amount. " +
        "Actual service prices may vary."
    );

    printContainer.append(
        heading,
        subtitle,
        documentTitle,
        generatedDate,
        table,
        note
    );

    // Add print-only CSS.

    const printStyle = document.createElement("style");

    printStyle.id = "printwiseTemporaryPrintStyle";

    printStyle.textContent = `
        #printwisePrintSheet {
            display: none;
        }

        @media print {

            body > *:not(#printwisePrintSheet) {
                display: none !important;
            }

            #printwisePrintSheet {
                display: block !important;
                padding: 25px;
                color: #000;
                background: #fff;
                font-family: Arial, sans-serif;
            }

            #printwisePrintSheet h1 {
                font-size: 25px;
                margin-bottom: 10px;
            }

            #printwisePrintSheet p {
                font-size: 12px;
                margin-bottom: 12px;
                color: #333;
            }

            #printwisePrintSheet table {
                width: 100%;
                border-collapse: collapse;
                margin: 25px 0;
            }

            #printwisePrintSheet th,
            #printwisePrintSheet td {
                border: 1px solid #ccc;
                padding: 12px;
                text-align: left;
                font-size: 13px;
            }

            #printwisePrintSheet th {
                font-weight: bold;
            }
        }
    `;

    document.head.appendChild(printStyle);

    document.body.appendChild(printContainer);

    // Clean up after the print dialog closes.

    const cleanupPrint = () => {

        printContainer.remove();

        printStyle.remove();

        window.removeEventListener(
            "afterprint",
            cleanupPrint
        );

    };

    window.addEventListener(
        "afterprint",
        cleanupPrint
    );

    window.print();

}


printEstimateBtn.addEventListener(
    "click",
    printEstimate
);


/* =====================================================
   41. INITIALIZE APPLICATION
===================================================== */

function initializeApp() {

    displayPricing();

    calculateEstimate();

    renderHistory();

    updateStatistics();

    switchView("dashboard");

    console.log(
        "PrintWise Campus Printing Cost Estimator is ready!"
    );

}


initializeApp();
