document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('.main-nav a');

  links.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = event.target.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);

      targetSection.scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const firstLookGrid = document.querySelector("f.jpg");

  const images = [
    { src: "1.jpg", text: "Ein magischer Moment..." },
    { src: "https://via.placeholder.com/300", text: "Ein unvergesslicher Tag." },
    { src: "https://via.placeholder.com/300", text: "Ein besonderes Lächeln." },
    { src: "https://via.placeholder.com/300", text: "Glück und Liebe." }
  ];

  images.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("image-card");

    const description = document.createElement("div");
    description.classList.add("image-description");
    description.innerHTML = `<p>${item.text}</p>`;

    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.text;

    card.appendChild(description);
    card.appendChild(img);
    firstLookGrid.appendChild(card);
  });
});
