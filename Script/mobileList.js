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
          <div class="productcard">
              <div class="d-flex justify-content-end mt-1 mx-1" style="border:none;">
                  <div class="btn like-btn"><img class="like" src="../Assets/plainheart.png" alt=""></div>
              </div>
              <a href="../Html/productDescription.html?category=mobiles&productId=${mobile.product_id}";
              productLink.appendChild(productCard)" class="product-link">
                  <img class="card-img-top px-3 product-img" src="${mobile.product_images[0]}" alt="Product Image">
              </a>
              <div class="card-body m-auto">
                  <h6 class="card-title"><a href="../Html/productDescription.html?category=mobiles&productId=${mobile.product_id}" class="product-name">${mobile.product_name.name}</a></h6>
                  <div class="d-flex justify-content-around">
                  <div class="rating bg-success text-white small m-1">
                  <span>${mobile.rating}<i class="bi bi-star-fill"></i></span>
                </div>
                      <div class="salesCount"><span>(${mobile.customer_reviews.length})</span></div>
                  </div>
                  <p class="card-price d-flex justify-content-start align-items-start">
                      <span class="text-dark pr-2 ">₹${mobile.price_details.current_price.toLocaleString('en-IN')}</span>
                      <span class="text-muted pr-2"><del>₹${mobile.price_details.original_price.toLocaleString('en-IN')}</del></span>
                      <span class="text-success discount">${mobile.price_details.discount_percent}% off</span>
                  </p>
              </div>
          </div>
      </div>
  `;
}

function createBrandSection(brand, products) {
  return `
      <div class="col-md-12">
          <div class="d-flex justify-content-between align-items-center mb-4">
              <h4>${brand}</h4><a href="../Html/filterPage.html?category=mobiles">
              <button class="btn btn-primary">View All</button>
          </div>
          <div class="row mb-4" id="${brand.toLowerCase().replace(/\s+/g, '-')}-product-list">
              ${products.map(createProductCard).join('')}
          </div>
      </div>
  `;
}

document.addEventListener('DOMContentLoaded', async () => {
  const mobiles = await fetchMobiles();

  
  const brands = [...new Set(mobiles.map(mobile => mobile.product_name.brand.toLowerCase()))];
  
  const brandSections = brands.map(brand => {
    const normalizedBrand = brand.charAt(0).toUpperCase() + brand.slice(1);
    const brandProducts = mobiles.filter(mobile => mobile.product_name.brand.toLowerCase() === brand);
    return createBrandSection(normalizedBrand, brandProducts);
  });

  document.getElementById('brand-sections').innerHTML = brandSections.join('');
});


  setTimeout(function () {
    const likeButtons = document.querySelectorAll(".like-btn");
    console.log(likeButtons); 
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
  }, 100); 
