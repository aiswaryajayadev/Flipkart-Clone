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
  // Your existing code to fetch and display product cards

  // Wait for the product cards to be displayed, then attach event listener to like buttons
  setTimeout(function () {
    const likeButtons = document.querySelectorAll(".like-btn");
    console.log(likeButtons); // Check if this logs the correct elements
    likeButtons.forEach(function (likeButton) {
      const likeImage = likeButton.querySelector(".like");

      likeButton.addEventListener("click", function () {
        const currentSrc = likeImage.src;

        if (currentSrc.includes("plainheart.png")) {
          likeImage.src = "../Assets/redheart.png";
        } else {
          likeImage.src = "../Assets/plainheart.png";
        }
      });
    });
  }, 100); // Adjust the timeout value as needed based on your application's timing
});


const jsonURL = 'http://localhost:3000/mobiles';

// Fetch JSON data from the provided URL
fetch(jsonURL)
.then(response => response.json())
.then(data => {
  let products = data;

  // Function to display product details
  function displayProductDetails(product) {
    const productDetailsContainer = document.getElementById('product-list');
    const productCard = document.createElement('div');
    productCard.classList.add('card');
  
    productCard.innerHTML = `
      <div class="card-body text-start">
        <div class="d-flex justify-content-end mt-1" style="border:none;">
          <div class="btn like-btn">
            <img class="like" src="../Assets/plainheart.png" alt="">
          </div>
        </div>
        <a href="#" class="product-link">
         <img class="card-img-top px-3" src="${product.product_images[0]}" alt="Product Image">
        </a>
        <h6 class="card-title mb-0">${product.product_name.name}</h6>
        <div class="d-flex justify-content-start align-items-center">
          <div class="rating bg-success text-white small m-1">
            <span>${product.rating}<i class="bi bi-star-fill"></i></span>
          </div>
          <div class="salesCount"><span>(${product.customer_reviews.length})</span></div>
          <div>
            ${product.assured === 'yes' ? '<img class="imgAssured mx-3 mt-0" src="../Assets/images/assured.png" alt="Assured">' : ''}
          </div>
        </div>
        <p class="card-text m-0 p-0">
          <span class="text-dark">₹${product.price_details.current_price}</span>
          <span class="text-muted"><del>₹${product.price_details.original_price}</del></span>
          <span class="text-success px-1">${product.price_details.discount_percent}% off</span>
        </p>
        <p class="freeDelivery small">Free delivery</p>
      </div>
    `;
  
    productDetailsContainer.appendChild(productCard);
}


    
  // Function to clear all displayed products
  function clearProductList() {
    const productDetailsContainer = document.getElementById('product-list');
    productDetailsContainer.innerHTML = '';
  }

  // Function to apply filters
  function applyFilters() {
    clearProductList();

    const priceRange = document.getElementById('priceRange').value;
    const assuredChecked = document.getElementById('assuredCheckbox').checked;
    const selectedRating = [...document.querySelectorAll('.ratingCheckbox:checked')].map(cb => parseInt(cb.dataset.rating));
    const selectedDiscount = [...document.querySelectorAll('.discountCheckbox:checked')].map(cb => parseInt(cb.dataset.discount));
    const searchBrand = document.querySelector('.brandSearch').value.toLowerCase();

    const filteredProducts = products.filter(product => {
        const matchesPrice = product.price_details.current_price <= priceRange;
        const matchesAssured = !assuredChecked || product.assured === 'yes';
        const matchesRating = selectedRating.length === 0 || selectedRating.includes(parseInt(product.rating));
        const matchesDiscount = selectedDiscount.length === 0 || selectedDiscount.some(discount => product.price_details.discount_percent >= discount);
        const matchesBrand = searchBrand === '' || product.product_name.name.toLowerCase().includes(searchBrand);

        return matchesPrice && matchesAssured && matchesRating && matchesDiscount && matchesBrand;
    });

    filteredProducts.forEach(displayProductDetails);
}


  // Function to sort products by price
  function sortProductsByPrice(order) {
    const sortedProducts = [...products].sort((a, b) => {
      if (order === 'lowToHigh') {
        return a.price_details.current_price - b.price_details.current_price;
      } else if (order === 'highToLow') {
        return b.price_details.current_price - a.price_details.current_price;
      }
    });
    clearProductList();
    sortedProducts.forEach(displayProductDetails);
  }

  // Event listeners for filters
  document.getElementById('priceRange').addEventListener('input', applyFilters);
  document.getElementById('assuredCheckbox').addEventListener('change', applyFilters);
  document.querySelectorAll('.ratingCheckbox').forEach(cb => cb.addEventListener('change', applyFilters));
  document.querySelectorAll('.discountCheckbox').forEach(cb => cb.addEventListener('change', applyFilters));
  document.querySelector('.brandSearch').addEventListener('input', applyFilters);

  // Event listeners for sorting
  document.getElementById('sortLowToHigh').addEventListener('click', (e) => {
    e.preventDefault();
    sortProductsByPrice('lowToHigh');
  });
  document.getElementById('sortHighToLow').addEventListener('click', (e) => {
    e.preventDefault();
    sortProductsByPrice('highToLow');
  });

  // Clear filters and display all products
  document.querySelector('a[href="#"]').addEventListener('click', (e) => {
    e.preventDefault();
    clearFilters();
  });

  // Initial display of all products
  products.forEach(displayProductDetails);
})
.catch(error => console.error('Error fetching data:', error));

// Function to clear all filters
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

// Apply filters to refresh the product display with all products available
applyFilters();
}
