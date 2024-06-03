// Function to fetch and populate products for a specific display
function fetchAndPopulateProducts(displayId, containerId, category) {
    fetch('../Server/database.json') // Replace with the actual URL of your JSON file
        .then(response => response.json())
        .then(data => {
            const products = data[category]; // Access the category directly from the data object

            if (products) {
                const productCardsContainer = document.getElementById(containerId);
                
                products.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.classList.add('product-display-card');

                    const img = document.createElement('img');
                    img.src = product.product_images[0];
                    img.classList.add('product-display-image');

                    const name = document.createElement('div');
                    name.classList.add('product-display-description');
                    name.textContent = product.product_name.name;

                    const price = document.createElement('div');
                    price.classList.add('product-display-price');
                    price.textContent = `₹${product.price_details.current_price}`;

                    productCard.appendChild(img);
                    productCard.appendChild(name);
                    productCard.appendChild(price);
                    productCardsContainer.appendChild(productCard);

                    // Create the link element
                    const productLink = document.createElement('a');
                    productLink.href = `../Html/productDescription.html?category=${category}&productId=${product.product_id}`;
                    productLink.appendChild(productCard);

                    // Append the link (with the product card inside) to the container
                    productCardsContainer.appendChild(productLink);
                });
            } else {
                console.error(`No products found for category: ${category}`);
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Call the function for each product display section
fetchAndPopulateProducts('1', 'product-cards-container-1', 'laptops');
fetchAndPopulateProducts('2', 'product-cards-container-2', 'washing-machine');
fetchAndPopulateProducts('3', 'product-cards-container-3', 'mobiles');
fetchAndPopulateProducts('4', 'product-cards-container-4', 'dress');
fetchAndPopulateProducts('5', 'product-cards-container-5', 'shoes');
fetchAndPopulateProducts('6', 'product-cards-container-6', 'television');

// fetchAndPopulateProducts('4', 'product-cards-container-4', 'Washing-machine');

// Function to handle left scrolling for a specific product display

let scrollAmounts = {}; // Object to store scroll amounts for each product display

// Initialize scroll amounts for each product display section
document.querySelectorAll('.product-display').forEach(display => {
    const displayId = display.id.split('-').pop();
    scrollAmounts[displayId] = 0;
});

function scrollLeft1(displayId) {
    const container = document.getElementById(`product-cards-container-${displayId}`);
    const card = container.querySelector('.product-display-card');
    const cardWidth = card.offsetWidth + 20;  // Add margin
    console.log('Card width:', cardWidth);
    console.log('Scroll amount before:', scrollAmounts[displayId]);
    scrollAmounts[displayId] = Math.max(0, scrollAmounts[displayId] - cardWidth * 5);
    console.log('Scroll amount after:', scrollAmounts[displayId]);
    container.style.transform = `translateX(-${scrollAmounts[displayId]}px)`;
    toggleButtonVisibility(displayId); // Call function to toggle button visibility
}

// Function to handle right scrolling for a specific product display
function scrollRight(displayId) {
    const container = document.getElementById(`product-cards-container-${displayId}`);
    const cardWidth = container.querySelector('.product-display-card').offsetWidth + 20;  // Add margin
    const maxScroll = container.scrollWidth - container.clientWidth;
    scrollAmounts[displayId] = Math.min(maxScroll, scrollAmounts[displayId] + cardWidth * 5);
    container.style.transform = `translateX(-${scrollAmounts[displayId]}px)`;
    toggleButtonVisibility(displayId); // Call function to toggle button visibility
}

// Function to toggle button visibility for a specific product display
function toggleButtonVisibility(displayId) {
    const container = document.getElementById(`product-cards-container-${displayId}`);
    const maxScroll = container.scrollWidth - container.clientWidth;
    const leftButton = document.getElementById(`carousel-product-button-left-${displayId}`);
    const rightButton = document.getElementById(`carousel-product-button-right-${displayId}`);
    
    leftButton.style.display = scrollAmounts[displayId] <= 0 ? 'none' : 'inline';
    rightButton.style.display = scrollAmounts[displayId] >= maxScroll ? 'none' : 'inline';
}



  