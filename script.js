const searchInput = document.getElementById("searchInput");
const resultContainer = document.createElement('div');
document.body.appendChild(resultContainer);

fetch('terms.json')
    .then(response => response.json())
    .then(data => {
        const terms = data.terms;

        searchInput.addEventListener("input", () => {
            const searchTerm = searchInput.value.toLowerCase();

            console.log("Suche nach:", searchTerm);

            const filteredTerms = terms.filter(term => term.toLowerCase().includes(searchTerm));

            const mappedTerms = filteredTerms.map(term => term.toUpperCase());

            const count = mappedTerms.reduce((accumulator, currentValue) => accumulator + 1, 0);

            console.log("Gefundene Begriffe:", mappedTerms);
            console.log("Anzahl der gefundenen Begriffe:", count);

            resultContainer.innerHTML = mappedTerms.length > 0
                ? `<p>Gefundene Begriffe: ${mappedTerms.join(', ')}</p>`
                : "<p>Keine Ergebnisse gefunden.</p>";
        });
    })
    .catch(error => {
        console.error('Fehler beim Laden der JSON-Datei:', error);
    });
