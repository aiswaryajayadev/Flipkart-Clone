document.addEventListener("DOMContentLoaded", function () {
    var dropdowns = document.querySelectorAll('.navbar-nav .dropdown');

    dropdowns.forEach(function (dropdown) {
        var dropdownMenu = dropdown.querySelector('.dropdown-menu');

        dropdown.addEventListener("mouseenter", function () {
            dropdownMenu.classList.add('show');
        });

        dropdown.addEventListener("mouseleave", function () {
            dropdownMenu.classList.remove('show');
        });
    });
});




document.addEventListener("DOMContentLoaded", function () {
    // Get the price range input element
    const priceRangeInput = document.getElementById("priceRange");

    // Set the value to 0 when the page is loaded or refreshed
    priceRangeInput.value = 0;

    // Update the price value display
    document.getElementById("priceValue").textContent = "₹" + priceRangeInput.value;

    // Add event listener to update price value display when the input value changes
    priceRangeInput.addEventListener("input", function () {
        document.getElementById("priceValue").textContent = "₹" + priceRangeInput.value;
    });
});


const brandSearch = document.querySelector('.brandSearch');
const brandList = document.getElementById('brandList');

// Call filterBrands function once at the beginning
filterBrands();

// Add event listener for input event on brandSearch
brandSearch.addEventListener('input', filterBrands);

function filterBrands() {
    const searchTerm = brandSearch.value.trim().toLowerCase();
    const brands = brandList.querySelectorAll('li');
    let count = 0;

    brands.forEach((brand) => {
        const label = brand.textContent.trim().toLowerCase();
        const checkbox = brand.querySelector('input[type="checkbox"]');

        if (label.includes(searchTerm)) {
            brand.style.display = 'block';
            if (count < 4) {
                count++;
            } else {
                brand.style.display = 'none';
            }
        } else {
            brand.style.display = 'none';
        }
    });
}



function clearFilters() {
    // Reset the price range
    document.getElementById('priceRange').value = 0;
    document.getElementById('priceValue').textContent = '';

    // Reset checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
    });

    // Reset brand search input
    document.querySelector('.brandSearch').value = '';
}


document.addEventListener('DOMContentLoaded', function () {
    const sortOptions = document.querySelectorAll('.sort-option');

    sortOptions.forEach(option => {
        option.addEventListener('click', function (event) {
            event.preventDefault();
            // Remove active class from all options
            sortOptions.forEach(opt => opt.classList.remove('active'));
            // Add active class to the clicked option
            this.classList.add('active');
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const likeButtons = document.querySelectorAll('.like-btn');

    likeButtons.forEach(function (likeButton) {
        const likeImage = likeButton.querySelector('.like');

        likeButton.addEventListener('click', function () {
            const currentSrc = likeImage.src;

            if (currentSrc.includes('plainheart.png')) {
                likeImage.src = '../Assets/redheart.png';
            } else {
                likeImage.src = '../Assets/plainheart.png';
            }
        });
    });
});

// Fetch JSON data from the provided URL
const jsonURL = 'http://localhost:3000/mobiles';
fetch(jsonURL)
  .then(response => response.json())
  .then(data => {
    // Function to display product details
    function displayProductDetails(product) {
      const productDetailsContainer = document.getElementById('product-list');

      // Create elements for product details
      const productCard = document.createElement('div');
      productCard.classList.add('card');

      // Populate product card content
      productCard.innerHTML = `
        <div class="card-body text-start">
          <img class="card-img-top px-3" src="${product.product_images[0]}" alt="Product Image">
          <h6 class="card-title mb-0">${product.product_name.name}</h6>
          <p class="quantity-wght text-secondary small mt-0 p-0">800g</p>
          <div class="d-flex justify-content-center align-items-center">
            <div class="rating bg-success text-white small m-1">
              <span>${product.rating}<i class="bi bi-star-fill"></i></span>
            </div>
            <div class="salesCount"><span>(1000)</span></div>
            <div>
              ${product.assured === 'yes' ? '<img class="imgAssured mx-3 mt-0" src="asset/assured.png" alt="Assured">' : ''}
            </div>
          </div>
          <p class="card-text m-0 p-0">
            <span class="text-dark">₹${product.price_details.current_price}</span>
            <span class="text-muted"><del>₹${product.price_details.original_price}</del></span>
            <span class="text-success px-1">${product.price_details.discount_percent}% off</span>
          </p>
          <p class="freeDelivery small">Free delivery</p>
          <!-- Add more details as needed -->
        </div>
      `;

      // Append the product card to the container
      productDetailsContainer.appendChild(productCard);
    }

    // Display details for each product in the data
    data.forEach(product => displayProductDetails(product));
  })
  .catch(error => console.error('Error fetching data:', error));


