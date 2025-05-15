import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);

    // Loop through children and apply class names
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'about-us-image';
      } else if (div.classList.contains('social-media')) {
        div.className = 'about-us-social';
      } else {
        div.className = 'about-us-body';
      }
    });

    // Add social media links with custom images (facebook.png, instagram.png, x.png)
    const socialMediaDiv = document.createElement('div');
    socialMediaDiv.classList.add('about-us-social');
    socialMediaDiv.innerHTML = `
      <a href="https://facebook.com" target="_blank">
        <img src="/icons/facebook-circular-logo.png" alt="Facebook" class="social-icon">
      </a>
      <a href="https://instagram.com" target="_blank">
        <img src="/icons/instagram-logo.png" alt="Instagram" class="social-icon">
      </a>
      <a href="https://twitter.com" target="_blank">
        <img src="/icons/twitter.png" alt="X" class="social-icon">
      </a>
    `;
    li.append(socialMediaDiv);

    ul.append(li);
  });

  // Optimize image loading
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));

  block.textContent = '';
  block.append(ul);
}
