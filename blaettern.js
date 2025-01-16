document.addEventListener('DOMContentLoaded', () => {
  // Array mit Bilddaten und Namen
  const bilder = [
    { linkeSeite: 'gast1.jpg', rechteSeite: 'gast2.jpg', nameLinks: 'Armin und Willi', nameRechts: 'Conni und Keanu' },
    { linkeSeite: 'gast3.jpg', rechteSeite: 'gast4.jpg', nameLinks: 'Onkel Johan', nameRechts: 'Waldemar' },
    { linkeSeite: 'gast5.jpg', rechteSeite: 'gast6.jpg', nameLinks: 'Julian und Evi', nameRechts: 'Sixxer' },
    { linkeSeite: 'gast7.jpg', rechteSeite: 'gast8.jpg', nameLinks: 'Willi, Bekki, Paula', nameRechts: 'Luisa und Kevin' },
    { linkeSeite: 'gast9.jpg', rechteSeite: 'gast10.jpg', nameLinks: 'Emi und Emily', nameRechts: 'Emily, Marie und Lisa' }
  ];

  let aktuelleSeite = 0; // Startseite ist 0

  // HTML-Elemente für die Bilder und Namen
  const bildLinks = document.querySelector('.bild-linke-seite .bild');
  const nameLinks = document.querySelector('.bild-linke-seite .name');
  const bildRechts = document.querySelector('.bild-rechte-seite .bild');
  const nameRechts = document.querySelector('.bild-rechte-seite .name');

  // Buttons
  const zurückButton = document.querySelector('.blättern.zurück');
  const weiterButton = document.querySelector('.blättern.weiter');

  // Funktion, um die Seite zu aktualisieren
  function seiteAktualisieren() {
    const daten = bilder[aktuelleSeite];
    bildLinks.src = daten.linkeSeite;
    nameLinks.textContent = daten.nameLinks;
    bildRechts.src = daten.rechteSeite;
    nameRechts.textContent = daten.nameRechts;

    // Buttons aktivieren/deaktivieren je nach Seite
    zurückButton.disabled = aktuelleSeite === 0;
    weiterButton.disabled = aktuelleSeite === bilder.length - 1;
  }

  // Event-Listener für die Buttons
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

  // Initial die erste Seite laden
  seiteAktualisieren();
});