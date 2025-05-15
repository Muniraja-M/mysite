import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Loads and decorates the footer using fragment and metadata
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // Get the base path from metadata or fallback
  const footerPath = getMetadata('footer') || '/footer';

  // Load footer fragment (HTML)
  const fragment = await loadFragment(footerPath);

  if (fragment) {
    block.textContent = '';

    const footer = document.createElement('div');
    while (fragment.firstElementChild) {
      footer.append(fragment.firstElementChild);
    }

    // Assign semantic class names to child sections
    const classes = ['brand', 'nav', 'follow', 'disc'];
    let section = footer.firstElementChild;
    while (section && classes.length) {
      section.classList.add(classes.shift());
      section = section.nextElementSibling;
    }

    // Append decorated footer
    block.append(footer);
  }
}
