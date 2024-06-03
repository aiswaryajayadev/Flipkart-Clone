// const auth = firebase.auth();
const database = firebase.database();
const wishlistRef = firebase.database().ref('wishlist');

setTimeout(function(){
  let variable = 'mobiles';
let pid='REEBOK001';
  const wishlistRef = firebase.database().ref('wishlist');
  // const username = localStorage.getItem('user');
   const username='hari';
  console.log(document.querySelector(".like"))
  document.querySelector(".like").addEventListener("click", function (event) {
    event.preventDefault();
    console.log("clcked");

    addProductToWishlist(username,variable,pid);
  });
},500)




  const addProductToWishlist = (username,category, product) => {

    const productId = category.substring(0, 4) + '-' + product;
 console.log(productId)
 console.log(username)
    wishlistRef.child(username).child(productId).set(true)
      .then(() => {
        console.log('Product added to wishlist successfully');
      })
      .catch((error) => {
        console.error('Error adding product to wishlist:', error);
      });
  };


document.addEventListener("DOMContentLoaded", function () {
  // Navbar dropdown hover effect
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

  // Price range input handling
  const priceRangeInput = document.getElementById("priceRange");
  if (priceRangeInput) {
    priceRangeInput.value = 0;
    document.getElementById("priceValue").textContent = "₹" + priceRangeInput.value;

    priceRangeInput.addEventListener("input", function () {
      document.getElementById("priceValue").textContent = "₹" + priceRangeInput.value;
    });
  }

  // Brand search filtering
  const brandSearch = document.querySelector('.brandSearch');
  const brandList = document.getElementById('brandList');
  if (brandSearch && brandList) {
    filterBrands();
    brandSearch.addEventListener('input', filterBrands);

    function filterBrands() {
      const searchTerm = brandSearch.value.trim().toLowerCase();
      const brands = brandList.querySelectorAll('li');
      let count = 0;

      brands.forEach((brand) => {
        const label = brand.textContent.trim().toLowerCase();

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
  }

  // Sorting options handling
  const sortOptions = document.querySelectorAll('.sort-option');
  if (sortOptions.length > 0) {
    sortOptions.forEach(option => {
      option.addEventListener('click', function (event) {
        event.preventDefault();
        sortOptions.forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
      });
    });
  }
  let variable = 'mobiles';
  let pid='REEBOK001';
  
const jsonURL = `http://localhost:3000/${variable}/`;
  // Fetch and display product cards

  fetch(jsonURL)
    .then(response => response.json())
    .then(data => {
      let products = data;

      function displayProductDetails(product) {
        const productDetailsContainer = document.getElementById('product-list');
        const productCard = document.createElement('div');
        productCard.classList.add('col-md-3', 'mb-4'); // Use Bootstrap classes for grid layout

        productCard.innerHTML = `
          <div class="productcard h-100">
            <div class="card-body text-start">
              <div class="d-flex justify-content-end mt-1" style="border:none;">
                <div class="btn like-btn">
                  <img class="like" src="../Assets/plainheart.png" alt="">
                </div>
              </div>
              <a href="#" class="product-link">
                <img class="card-img-top px-3" src="${product.product_images[0]}" alt="Product Image" style="max-height: 200px; object-fit: contain;">
              </a>
              <h6 class="card-title mb-0 mt-2">${product.product_name.name}</h6>
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
          </div>
        `;

        productDetailsContainer.appendChild(productCard);
      }

      function clearProductList() {
        const productDetailsContainer = document.getElementById('product-list');
        productDetailsContainer.innerHTML = '';
      }

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

      document.getElementById('priceRange').addEventListener('input', applyFilters);
      document.getElementById('assuredCheckbox').addEventListener('change', applyFilters);
      document.querySelectorAll('.ratingCheckbox').forEach(cb => cb.addEventListener('change', applyFilters));
      document.querySelectorAll('.discountCheckbox').forEach(cb => cb.addEventListener('change', applyFilters));
      document.querySelector('.brandSearch').addEventListener('input', applyFilters);

      document.getElementById('sortLowToHigh').addEventListener('click', (e) => {
        e.preventDefault();
        sortProductsByPrice('lowToHigh');
      });
      document.getElementById('sortHighToLow').addEventListener('click', (e) => {
        e.preventDefault();
        sortProductsByPrice('highToLow');
      });

      document.querySelector('a[href="#"]').addEventListener('click', (e) => {
        e.preventDefault();
        clearFilters();
      });

      products.forEach(displayProductDetails);

      // Attach event listeners to like buttons after product cards are displayed
      setTimeout(function () {
        const likeButtons = document.querySelectorAll(".like-btn");
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
    })
    .catch(error => console.error('Error fetching data:', error));

  function clearFilters() {
    document.getElementById('priceRange').value = 0;
    document.getElementById('priceValue').textContent = '';

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });

    document.querySelector('.brandSearch').value = '';

    applyFilters();
  }
});
