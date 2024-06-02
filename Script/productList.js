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


document.addEventListener("DOMContentLoaded", () => {
  fetch("../Server/database.json")
      .then((response) => {
          if (!response.ok) {
              throw new Error("Network response was not ok " + response.statusText);
          }
          return response.json();
      })
      .then((data) => {
          console.log("Data fetched:", data); // Debugging log

          const productSections = [
              { brand: "Samsung", containerId: "samsung-product-list" },
              { brand: "Apple", containerId: "apple-product-list" },
              { brand: "Realme", containerId: "realme-product-list" },
              { brand: "IQOO", containerId: "iqoo-product-list" },
              { brand: "Google Pixel", containerId: "google-pixel-product-list" },
          ];

          productSections.forEach(section => {
              const products = data.mobiles.filter(
                  (mobile) => mobile.product_name.brand.toLowerCase() === section.brand.toLowerCase()
              );

              if (products.length === 0) {
                  console.warn(`No ${section.brand} products found in the data`); // Debugging log
              }

              const productList = document.getElementById(section.containerId);
              products.forEach((mobile) => {
                  const card = document.createElement("div");
                  card.className = "col-md-2 mb-2 d-flex cardRow";

                  card.innerHTML = `
                 
                          <div class="card">
                              <div class="d-flex justify-content-end mt-1 mx-1">
                                  <button id="add-to-wishlist-button" class="btn like-btn"><img class="like" src="../Assets/plainheart.png" alt=""></button>
                              </div>
                              <a href="#" class="product-link">
                              <img class="card-img-top px-3 product-img" src="${mobile.product_images[0]}" alt="Product Image">
                              <div class="card-body m-auto"></a>
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
                                      <span class="text-success">${mobile.price_details.discount_percent}% off</span>
                                  </p>
                              </div>
                              
                            
                          </div>

                  `;
                  productList.appendChild(card);
              });
          });
      })
      .catch((error) => console.error("Error fetching data:", error));
});


// const rating = productData.rating;
// const ratingContainer = document.getElementById("current-rating");
// const ratingElement = document.createElement("p");
// const ratingImage = document.createElement("img");
// ratingImage.src = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg==`;
// ratingImage.classList.add("star");
// ratingElement.innerHTML = rating;
// ratingContainer.appendChild(ratingElement);
// ratingContainer.appendChild(ratingImage);


  


  

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

