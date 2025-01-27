import { initSlideshow } from './slideshow.js';
import { initBlaettern } from './blaettern.js';

document.addEventListener('DOMContentLoaded', async () => {

  await initSlideshow();
  await initBlaettern();
});
