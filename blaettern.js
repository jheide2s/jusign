export async function initBlaettern() {
  console.log("Blättern initialisiert"); // Debugging-Hinweis

  let bilder = [];
  let aktuelleSeite = 0;

  const bildLinks = document.querySelector('.bild-linke-seite .bild');
  const nameLinks = document.querySelector('.bild-linke-seite .name');
  const bildRechts = document.querySelector('.bild-rechte-seite .bild');
  const nameRechts = document.querySelector('.bild-rechte-seite .name');

  const zurückButton = document.querySelector('.blättern.zurück');
  const weiterButton = document.querySelector('.blättern.weiter');

  function seiteAktualisieren() {
    const daten = bilder[aktuelleSeite];
    bildLinks.src = daten.linkeSeite;
    nameLinks.textContent = `${daten.nameLinks}`;
    bildRechts.src = daten.rechteSeite;
    nameRechts.textContent = `${daten.nameRechts}`;

    zurückButton.disabled = aktuelleSeite === 0;
    weiterButton.disabled = aktuelleSeite === bilder.length - 1;
  }

  zurückButton.addEventListener('click', () => {
    if (aktuelleSeite > 0) {
      aktuelleSeite--;
      seiteAktualisieren();
    }
  });

  weiterButton.addEventListener('click', () => {
    if (aktuelleSeite < bilder.length - 1) {
      aktuelleSeite++;
      seiteAktualisieren();
    }
  });

  try {
    const response = await fetch('bilder.json');
    if (!response.ok) {
      throw new Error('Netzwerkantwort war nicht ok');
    }
    bilder = await response.json();
    seiteAktualisieren();
  } catch (error) {
    console.error('Fehler beim Laden der Bilddaten:', error);
  }
}
