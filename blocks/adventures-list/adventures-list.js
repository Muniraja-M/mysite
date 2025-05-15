export default function decorate(block) {
  // Clear existing block content
  block.textContent = '';

  // Define categories
  const categories = [
    'All',
    'Climbing',
    'Cycling',
    'Skiing',
    'Surfing',
    'Travel',
  ];

  // Create wrapper div
  const wrapper = document.createElement('div');
  wrapper.className = 'adventure-list';

  // Create and append buttons
  categories.forEach((category, index) => {
    const button = document.createElement('button');
    button.className = 'adventure-button';
    if (index === 0) button.classList.add('active');
    button.textContent = category;

    button.addEventListener('click', () => {
      block
        .querySelectorAll('.adventure-button')
        .forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');

      // Optional: emit custom event or perform filtering
      const event = new CustomEvent('adventure-select', {
        detail: { category },
      });
      block.dispatchEvent(event);
    });

    wrapper.appendChild(button);
  });

  block.appendChild(wrapper);
}
