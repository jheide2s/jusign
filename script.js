// Funktion, um die Suchleiste zu verwenden
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();

    // Hier kannst du eine Logik einbauen, um nach Begriffen auf der Seite zu suchen
    console.log("Suche nach:", searchTerm);
    // Zum Beispiel könntest du eine Liste von Begriffen durchsuchen:
    const terms = ["Jusign", "Home", "Über Uns", "Kontakt"];
    const results = terms.filter(term => term.toLowerCase().includes(searchTerm));
    console.log("Gefundene Begriffe:", results);
});
