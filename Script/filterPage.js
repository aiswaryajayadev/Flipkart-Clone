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
    productCard.classList.add('card', 'col-sm-3', 'm-2');
  
    productCard.innerHTML = `
      <div class="card-body text-start">
        <div class="d-flex justify-content-end mt-1 mx-1" style="border:none;">
          <button class="btn like-btn">
            <img class="like" src="../Assets/plainheart.png" alt="">
          </button>
        </div>
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
    const selectedRating = [...document.querySelectorAll('.ratingCheckbox:checked')].map(cb => parseFloat(cb.dataset.rating));
    const selectedDiscount = [...document.querySelectorAll('.discountCheckbox:checked')].map(cb => parseFloat(cb.dataset.discount));
    const searchBrand = document.querySelector('.brandSearch').value.toLowerCase();

    const filteredProducts = products.filter(product => {
      const matchesPrice = product.price_details.current_price <= priceRange;
      const matchesAssured = !assuredChecked || product.assured === 'yes';
      const matchesRating = selectedRating.length === 0 || selectedRating.includes(parseFloat(product.rating));
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
