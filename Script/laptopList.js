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
  
  
  async function fetchLaptops() {
    const response = await fetch('http://localhost:3000/laptops');
    const laptops = await response.json();
    return laptops;
}

function createProductCard(laptop) {
    return `
        <div class="col-md-2 mb-4">
            <div class="card">
                <div class="d-flex justify-content-end mt-1 mx-1">
                    <button class="btn like-btn"><img class="like" src="../Assets/plainheart.png" alt=""></button>
                </div>
                <a href="#" class="product-link">
                    <img class="card-img-top px-3 product-img" src="${laptop.product_images[0]}" alt="Product Image">
                </a>
                <div class="card-body m-auto">
                    <h6 class="card-title"><a href="#" class="product-name">${laptop.product_name.name}</a></h6>
                    <div class="d-flex justify-content-around">
                        <div class="rating bg-success text-white px-2 mb-2">
                            <span>${laptop.rating}<i class="bi bi-star-fill"></i></span>
                        </div>
                        <div class="salesCount"><span>(${laptop.customer_reviews.length})</span></div>
                    </div>
                    <p class="card-price d-flex justify-content-start align-items-start">
                        <span class="text-dark pr-2">₹${laptop.price_details.current_price.toLocaleString('en-IN')}</span>
                        <span class="text-muted pr-2"><del>₹${laptop.price_details.original_price.toLocaleString('en-IN')}</del></span>
                        <span class="text-success discount">${laptop.price_details.discount_percent}% off</span>
                    </p>
                </div>
            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', async () => {
    const laptops = await fetchLaptops();
    const i3Laptops = laptops.filter(laptop => laptop.model.includes('i3'));
    const i5Laptops = laptops.filter(laptop => laptop.model.includes('i5'));
    const i7Laptops = laptops.filter(laptop => laptop.model.includes('i7'));

    const i3ProductList = document.getElementById('i3-product-list');
    const i5ProductList = document.getElementById('i5-product-list');
    const i7ProductList = document.getElementById('i7-product-list');

    i3ProductList.innerHTML = i3Laptops.map(createProductCard).join('');
    i5ProductList.innerHTML = i5Laptops.map(createProductCard).join('');
    i7ProductList.innerHTML = i7Laptops.map(createProductCard).join('');
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
  