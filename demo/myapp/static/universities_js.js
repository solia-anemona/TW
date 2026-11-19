
const PRIMARY_API = "https://universities.hipolabs.com/search?country=Romania";
const FALLBACK_API = "https://corsproxy.io/?" + encodeURIComponent(PRIMARY_API);

const LOCAL_BACKUP = [
    { name: "West University of Timisoara", country: "Romania", web_pages: ["https://www.uvt.ro"] },
    { name: "Politehnica University of Timisoara", country: "Romania", web_pages: ["https://www.upt.ro"] },
    { name: "University of Bucharest", country: "Romania", web_pages: ["https://unibuc.ro"] },
    { name: "Babes-Bolyai University", country: "Romania", web_pages: ["https://www.ubbcluj.ro"] },
    { name: "Technical University of Cluj-Napoca", country: "Romania", web_pages: ["https://www.utcluj.ro"] },
    { name: "Alexandru Ioan Cuza University", country: "Romania", web_pages: ["https://www.uaic.ro"] }
];

const status = document.getElementById("status");
const tbody = document.getElementById("tbody");
const qInput = document.getElementById("q");
const exportBtn = document.getElementById("export-btn");

let all = [];
let filteredData = [];

function setStatus(text) {
    if (status) status.textContent = text;
}

function render(data) {
    if (!tbody) return;
    if (!data || data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align:center; padding: 20px;">Nicio universitate găsită.</td></tr>`;
        return;
    }

    tbody.innerHTML = data.map(u => {
        const site = u.web_pages?.[0]
            ? `<a href="${u.web_pages[0]}" target="_blank" rel="noopener noreferrer">${u.web_pages[0]}</a>`
            : "N/A";
        return `
        <tr>
            <td>${u.name || ""}</td>
            <td>${u.country || ""}</td>
            <td>${site}</td>
        </tr>`;
    }).join("");
}

async function loadUniversities() {
    setStatus("Se încarcă datele...");
    tbody.innerHTML = "";

    try {
        let res = await fetch(PRIMARY_API);
        if (!res.ok) throw new Error("Eroare API primar");
        all = await res.json();
    } catch (err1) {
        try {
            let res = await fetch(FALLBACK_API);
            if (!res.ok) throw new Error("Eroare API secundar");
            all = await res.json();
        } catch (err2) {
            console.warn("Utilizare date de rezervă locale din cauza blocajului de rețea/CORS.");
            all = LOCAL_BACKUP;
        }
    }

    filteredData = all;
    render(all);
    setStatus(`Încărcat (${all.length} rezultate).`);
}

if (qInput) {
    qInput.addEventListener("input", () => {
        const q = qInput.value.trim().toLowerCase();
        filteredData = q
            ? all.filter(u => (u.name || "").toLowerCase().includes(q))
            : all;
        render(filteredData);
        setStatus(`Filtrate: ${filteredData.length} din ${all.length}.`);
    });
}

function exportCSV(data) {
    if (!data || !data.length) return alert("Nu există date de exportat.");

    const header = ["Nume", "Țara", "Site"];
    const rows = data.map(u => [
        u.name || "",
        u.country || "",
        (u.web_pages && u.web_pages[0]) || ""
    ]);

    const csvContent = [header, ...rows]
        .map(r => r.map(v => `"${v.replace(/"/g, '""')}"`).join(","))
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "universitati_romania.csv";
    a.click();
    URL.revokeObjectURL(url);
}

if (exportBtn) {
    exportBtn.addEventListener("click", () => {
        exportCSV(filteredData);
    });
}

loadUniversities();