document.addEventListener("DOMContentLoaded", function () {
  var dropdowns = document.querySelectorAll(".navbar-nav .dropdown");

  dropdowns.forEach(function (dropdown) {
    var dropdownMenu = dropdown.querySelector(".dropdown-menu");

    dropdown.addEventListener("mouseenter", function () {
      dropdownMenu.classList.add("show");
    });

    dropdown.addEventListener("mouseleave", function () {
      dropdownMenu.classList.remove("show");
    });
  });
});


async function fetchMobiles() {
  const response = await fetch('http://localhost:3000/mobiles');
  const mobiles = await response.json();
  return mobiles;
}

function createProductCard(mobile) {
  return `
      <div class="col-md-2 mb-2">
          <div class="card">
              <div class="d-flex justify-content-end mt-1 mx-1" style="border:"none;">
                  <button class="btn like-btn"><img class="like" src="../Assets/plainheart.png" alt=""></button>
              </div>
              <a href="#" class="product-link">
                  <img class="card-img-top px-3 product-img" src="${mobile.product_images[0]}" alt="Product Image">
              </a>
              <div class="card-body m-auto">
                  <h6 class="card-title"><a href="#" class="product-name">${mobile.product_name.name}</a></h6>
                  <div class="d-flex justify-content-around">
                      <div class="rating bg-success text-white px-2 mb-2">
                          <span>${mobile.rating}<i class="bi bi-star-fill"></i></span>
                      </div>
                      <div class="salesCount"><span>(${mobile.customer_reviews.length})</span></div>
                  </div>
                  <p class="card-price d-flex justify-content-start align-items-start">
                      <span class="text-dark pr-2">₹${mobile.price_details.current_price.toLocaleString('en-IN')}</span>
                      <span class="text-muted pr-2"><del>₹${mobile.price_details.original_price.toLocaleString('en-IN')}</del></span>
                      <span class="text-success discount">${mobile.price_details.discount_percent}% off</span>
                  </p>
              </div>
          </div>
      </div>
  `;
}

document.addEventListener('DOMContentLoaded', async () => {
  const mobiles = await fetchMobiles();
  

  const Samsung = mobiles.filter(mobile => mobile.product_name.brand && mobile.product_name.brand.toLowerCase().includes('samsung'));
  const Apple = mobiles.filter(mobile => mobile.product_name.brand && mobile.product_name.brand.toLowerCase().includes('apple'));
  const Realme = mobiles.filter(mobile => mobile.product_name.brand && mobile.product_name.brand.toLowerCase().includes('realme'));
  const IQOO = mobiles.filter(mobile => mobile.product_name.brand && mobile.product_name.brand.toLowerCase().includes('iqoo'));
  const GooglePixel = mobiles.filter(mobile => mobile.product_name.brand && mobile.product_name.brand.toLowerCase().includes('google pixel'));

  const SamsungProductList = document.getElementById('samsung-product-list');
  const AppleProductList = document.getElementById('apple-product-list');
  const RealmeProductList = document.getElementById('realme-product-list');
  const IqooProductList = document.getElementById('iqoo-product-list');
  const PixelProductList = document.getElementById('google-pixel-product-list');

  SamsungProductList.innerHTML = Samsung.map(createProductCard).join('');
  AppleProductList.innerHTML = Apple.map(createProductCard).join('');
  RealmeProductList.innerHTML = Realme.map(createProductCard).join('');
  IqooProductList.innerHTML = IQOO.map(createProductCard).join('');
  PixelProductList.innerHTML = GooglePixel.map(createProductCard).join('');
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
