import './styles/main.css';
import { initNavigation } from './js/navigation';
import { initAnimations } from './js/animations';
import { initContact } from './js/contact';
import { initNamePuzzle } from './js/namePuzzle';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initAnimations();
  initContact();
  initNamePuzzle();
});
