let currentIndex = 0;
let carouselContainer;
let images;
let totalImages;
let dotsContainer;
let dots;

function updateCarousel() {
    const imageWidth = images[0].clientWidth;
    carouselContainer.style.transform = `translateX(${-currentIndex * imageWidth}px)`;
    updateDots();
}

function carouselScrollLeft1() {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = totalImages - 1;
    }
    updateCarousel();
}

function carouselScrollRight() {
    if (currentIndex < totalImages - 1) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateCarousel();
}

function autoScroll() {
    carouselScrollRight();
    setTimeout(autoScroll, 3000); // Change image every 3 seconds
}

function createDots() {
    for (let i = 0; i < totalImages; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === currentIndex) {
            dot.classList.add('active');
        }
        dotsContainer.appendChild(dot);
    }
    dots = document.querySelectorAll('.dot');
}

function updateDots() {
    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

window.onload = function() {
    carouselContainer = document.getElementById('carousel-container');
    images = document.querySelectorAll('.carousel-display-image');
    totalImages = images.length;
    dotsContainer = document.getElementById('dots-container');
    createDots();
    updateCarousel();
    autoScroll();
};

window.onresize = updateCarousel; // Recalculate carousel position on window resize
