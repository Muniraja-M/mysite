/**
 * @param {HTMLElement} block
 */
export default function decorate(block) {
  [...block.querySelectorAll('a[href]')].forEach((link) => {
    // Skip if already inside a button-container
    if (!link.closest('.button-container')) {
      const wrapper = document.createElement('p');
      wrapper.className = 'button-container';

      link.classList.add('button');
      link.replaceWith(wrapper);
      wrapper.appendChild(link);
    }
  });
}
