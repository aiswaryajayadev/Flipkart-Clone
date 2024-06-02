let scrollAmount = 0;

function scrollLeft1() {
    const container = document.querySelector('.product-cards-container');
    const cardWidth = document.querySelector('.product-display-card').offsetWidth + 20;  // Add margin
    scrollAmount = Math.max(0, scrollAmount - cardWidth * 5);
    container.style.transform = `translateX(-${scrollAmount}px)`;
    toggleLeftButtonVisibility(); // Call function to toggle left button visibility
}

function scrollRight1() {
    const container = document.querySelector('.product-cards-container');
    const cardWidth = document.querySelector('.product-display-card').offsetWidth + 20;  // Add margin
    const maxScroll = container.scrollWidth - container.clientWidth;
    scrollAmount = Math.min(maxScroll, scrollAmount + cardWidth * 5);
    container.style.transform = `translateX(-${scrollAmount}px)`;
    document.querySelector('.carousel-product-button.left').style.display = 'inline'; // Show left button
}

function toggleLeftButtonVisibility() {
    const container = document.querySelector('.product-cards-container');
    const maxScroll = container.scrollWidth - container.clientWidth;
    const leftButton = document.querySelector('.carousel-product-button.left');
    if (scrollAmount <= 0) {
        leftButton.style.display = 'none'; // Hide left button if scrolled to beginning
    } else {
        leftButton.style.display = 'inline'; // Show left button otherwise
    }
}