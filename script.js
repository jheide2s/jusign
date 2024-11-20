const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();

    console.log("Suche nach:", searchTerm);
    const terms = ["Jusign", "Home", "Über Uns", "Kontakt"];
    const results = terms.filter(term => term.toLowerCase().includes(searchTerm));
    console.log("Gefundene Begriffe:", results);
});
