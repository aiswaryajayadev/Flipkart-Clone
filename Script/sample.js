

 
const firebaseConfig = {
  apiKey: "AIzaSyCbX8RTS7jKJ0xApi1s3c3TS7_iExa-BjA",
  authDomain: "fc-clone-13fe6.firebaseapp.com",
  databaseURL: "https://fc-clone-13fe6-default-rtdb.firebaseio.com",
  projectId: "fc-clone-13fe6",
  storageBucket: "fc-clone-13fe6.appspot.com",
  messagingSenderId: "1003116691829",
  appId: "1:1003116691829:web:212b427550a54b7ed0d33c"
};



 

// firebase.initializeApp(firebaseConfig);
// const auth = firebase.auth();
// const database = firebase.database();
  



// var urlParams = new URLSearchParams(window.location.search);
// var category= urlParams.get("category");
// var urlParams = new URLSearchParams(window.location.search);
// var pid= urlParams.get("productId");


firebase.initializeApp(firebaseConfig);


// let variable = 'shoes';
// let pid = 'REEBOKZ001';
const username = 'emna';

var urlParams = new URLSearchParams(window.location.search);
var variable = urlParams.get("category");

var urlParams = new URLSearchParams(window.location.search);
var pid = urlParams.get("productId");

const auth = firebase.auth();

const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const wishlistRef = database.ref('wishlist');

setTimeout(function() {
  // Replace with dynamic value as needed

  const wishlistIcon = document.getElementById("wishlist-icon");
  if (wishlistIcon) {
    wishlistIcon.addEventListener("click", function(event) {
      event.preventDefault();
      console.log("clicked");

      addProductToWishlist(username, variable, pid);
    });
  } else {
    console.error('Wishlist icon element not found');
  }
}, 500);

const addProductToWishlist = (username, category, product) => {
  const productId = category.substring(0, 4) + '-' + product;
  console.log('Product ID:', productId);
  console.log('Username:', username);

  wishlistRef.child(username).child(productId).set(true)
    .then(() => {
      console.log('Product added to wishlist successfully');
    })
    .catch((error) => {
      console.error('Error adding product to wishlist:', error);
    });
};








 



// let variable = 'shoes';
// let pid='REEBOK001';
const mockApiUrl = `http://localhost:3000/${variable}/`;






  
  
 async function fetchProductData() {
  try {
    const response = await fetch(mockApiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch product data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    return {};
  }
}




  // const wishlistRef = firebase.database().ref('wishlist');
  // const username = localStorage.getItem('user');
  // document.getElementById("wishlist-icon").addEventListener("click", function (event) {
  //   event.preventDefault();
  //   console.log("clcked");
   
  //   addProductToWishlist(username,variable,pid);
  // });
  

  // const addProductToWishlist = (username,category, product) => {
  
  //   const productId = category.substring(0, 4) + '-' + product;
  
  //   wishlistRef.child(username).child(productId).set(true)
  //     .then(() => {
  //       console.log('Product added to wishlist successfully');
  //     })
  //     .catch((error) => {
  //       console.error('Error adding product to wishlist:', error);
  //     });
  // };
  




async function displayDetails() {
  try {
    const productData = await fetchProductData();
    console.log(productData);
    if (productData === 0) {
      console.log("No product data found");
      return;
    }

    

    productData.product_id = pid; 
    console.log(productData.product_id);
    
    const index = productData.findIndex(product => product.product_id === pid);
    
    console.log(index); 
    
    
    const laptop = productData[index];

console.log(laptop);

// Function to show notification
function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.classList.add('notification');
  notification.textContent = message;

  // Append notification to the body
  document.body.appendChild(notification);

  // Remove notification after a delay
  setTimeout(() => {
    notification.remove();
  }, 4000); // Remove after 3 seconds
}

// Function to add to wishlist and show notification
function addToWishList(category, productIndex) {
  // Add to wishlist
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  wishlist.push({ category, productIndex });
  localStorage.setItem('wishlist', JSON.stringify(wishlist));

  // Show notification
  showNotification('Item added to wishlist');
}

// Example icon click event listener
const wishlistIcon = document.getElementById('wishlist-icon');
wishlistIcon.addEventListener('click', function() {
 
  addToWishList(variable,index);
});




function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.classList.add('notification');
  notification.textContent = message;

  // Append notification to the body
  document.body.appendChild(notification);

  // Remove notification after a delay
  setTimeout(() => {
    notification.remove();
  }, 4000); // Remove after 3 seconds
}

// Function to add to wishlist and show notification
function addToCart(category, productIndex) {
  // Add to wishlist
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  wishlist.push({ category, productIndex });
  localStorage.setItem('wishlist', JSON.stringify(wishlist));

  // Show notification
  showNotification('Item added to cart');
}

// Example icon click event listener
const cartIcon = document.getElementById('cart-click');
cartIcon.addEventListener('click', function() {
 
  addToCart(variable,index);
});


function buy(category, productIndex) {
  // Add to wishlist
  let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
  wishlist.push({ category, productIndex });
  localStorage.setItem('wishlist', JSON.stringify(wishlist));


}

// Example icon click event listener
const buyIcon = document.getElementById('buy-click');
buyIcon.addEventListener('click', function() {
 
  buy(variable,index);
});








    const productImages = laptop.product_images;
    const productName = laptop.product_name.name;
    const imageContainer = document.getElementById("image-container");
    const previewContainer = document.getElementById("preview-image");

    if (imageContainer && previewContainer) {
        productImages.forEach((imgUrl, index) => {
            const imgElement = document.createElement("img");
            imgElement.src = imgUrl;
            imgElement.alt = productName;

          
            imgElement.addEventListener("mouseover", () => {
              previewContainer.src = imgUrl;
              imgElement.classList.add("hovered");
          });

          imgElement.addEventListener("mouseout", () => {
              imgElement.classList.remove("hovered");
          });
            if (index === 0) {
                previewContainer.src = imgUrl;
            }

            imageContainer.appendChild(imgElement);
        });
    }









 
    const productContainer = document.getElementById("product-heading");
    if (productContainer) {
      const productElement = document.createElement("p");
      productElement.innerHTML = productName;
      productContainer.appendChild(productElement);
    }

  
    const rating = laptop.rating;
    const ratingContainer = document.getElementById("current-rating");
    if (ratingContainer) {
      const ratingElement = document.createElement("p");
      const ratingImage = document.createElement("img");
      ratingImage.src = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg==`;
      ratingImage.classList.add("star");
      ratingElement.textContent = rating;
      ratingContainer.appendChild(ratingElement);
      ratingContainer.appendChild(ratingImage);
    }

  
    const rupeeSymbol = "₹";
    const currentPrice = laptop.price_details.current_price;
    const originalPrice = laptop.price_details.original_price;
    const discount = laptop.price_details.discount_percent;
    const amountContainer = document.getElementById("amount");

    if (amountContainer) {
      const currentPriceElement = document.createElement("div");
      currentPriceElement.innerHTML = rupeeSymbol + currentPrice;
      currentPriceElement.classList.add("current-product-price");
      amountContainer.appendChild(currentPriceElement);

      const originalPriceElement = document.createElement("div");
      originalPriceElement.innerHTML = rupeeSymbol + originalPrice;
      originalPriceElement.classList.add("original-product-price");
      amountContainer.appendChild(originalPriceElement);

      const discountElement = document.createElement("div");
      discountElement.innerHTML = discount + "%";
      discountElement.classList.add("discount");
      amountContainer.appendChild(discountElement);
    }

 
    const offerContainer = document.getElementById("list1");
    const offers = laptop.offers;

    if (offerContainer) {
      offers.forEach((offer) => {
        const offerItem = document.createElement("div");
        offerItem.classList.add("offer-item");

        const offerImage = document.createElement("img");
        offerImage.src = `https://rukminim2.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90`;
        offerImage.classList.add("list-image");

        const offerTypeElement = document.createElement("div");
        offerTypeElement.innerHTML = offer.offer_type;
        offerTypeElement.classList.add("offer1-name");

        const offerDescriptionElement = document.createElement("div");
        offerDescriptionElement.innerHTML = offer.description;
        offerDescriptionElement.classList.add("offer-description");

        const moreElement = document.createElement("div");
        moreElement.innerHTML = "Know More";
        moreElement.classList.add("know-more");

        offerItem.appendChild(offerImage);
        offerItem.appendChild(offerTypeElement);
        offerItem.appendChild(offerDescriptionElement);
        offerItem.appendChild(moreElement);

        offerContainer.appendChild(offerItem);
      });
    }

   
    const highLight = laptop.highlights;
    const highlightsList = document.getElementById("highlights-list");

    if (highlightsList) {
      highlightsList.innerHTML = "";
      highLight.forEach((highlight) => {
        const listItem = document.createElement("li");
        listItem.textContent = highlight;
        highlightsList.appendChild(listItem);
      });
    }

 
    const specifications = laptop.specifications;
    const tbody = document.querySelector(".specification-table tbody");

    if (tbody) {
      tbody.innerHTML = "";

      specifications.forEach((spec, index) => {
        const title = spec.title;
        const details = spec.details;

        const titleRow = document.createElement("tr");
        titleRow.innerHTML = `<th colspan="2">${title}</th>`;
        tbody.appendChild(titleRow);

        const nestedRow = document.createElement("tr");
        const nestedCell = document.createElement("td");
        nestedCell.colSpan = 2;
        const nestedTable = document.createElement("table");

        details.forEach((detail) => {
          const detailParts = detail.split(":");
          const detailRow = document.createElement("tr");
          detailRow.innerHTML = `<td style="width: 200px;">${detailParts[0]}:</td><td style="max-width: 300px; word-wrap: break-word;">${detailParts[1]}</td>`;
          nestedTable.appendChild(detailRow);
        });

        nestedCell.appendChild(nestedTable);
        nestedRow.appendChild(nestedCell);
        tbody.appendChild(nestedRow);

        const blankRow = document.createElement("tr");
        const blankCell = document.createElement("td");
        blankCell.colSpan = 2;
        blankCell.innerHTML = "&nbsp;";
        blankRow.appendChild(blankCell);
        tbody.appendChild(blankRow);

      
        if (index !== 0) {
          titleRow.style.display = "none";
          nestedRow.style.display = "none";
        }

       
        if (index === 0) {
          const readMoreRow = document.createElement("tr");
          const readMoreCell = document.createElement("td");
          readMoreCell.colSpan = 2;
          const readMoreLink = document.createElement("a");
          readMoreLink.href = "#";
          readMoreLink.textContent = "Read More";

          readMoreLink.onclick = function () {
      
            for (let i = 1; i < tbody.children.length; i++) {
              tbody.children[i].style.display = "table-row";
            }
          
            readMoreRow.style.display = "none";
            return false;
          };

          readMoreCell.appendChild(readMoreLink);
          readMoreRow.appendChild(readMoreCell);
          tbody.appendChild(readMoreRow);
        }
      });
    }

   
    const review = laptop.customer_reviews;
    const reviewElement = document.getElementById("customer-review");

    if (reviewElement) {
      review.forEach((reviewItem) => {
        const rate = reviewItem.rating;
        const reviewText = reviewItem.review;
        const reviewerName = reviewItem.customer_name;

        const ratingElements = document.createElement("p");
        const reviewImage = document.createElement("img");
        reviewImage.src = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg==`;
        reviewImage.classList.add("star");
        const reviewName=document.createElement("p");

        const reviewRating = document.createTextNode(` ${rate}`);
        const reviewTextElement = document.createTextNode(` ${reviewText}`);
        const reviewerNameElement=document.createTextNode(`${reviewerName}`);

        reviewName.innerHTML=`<div class="row review-row">
                               <p class=fipkart-buyer>${reviewerName }<p> Flipkart Customer
                               <svg width="14" height="14" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" class="VjlQyz"><g><circle cx="6" cy="6" r="6" fill="#878787"></circle><path stroke="#FFF" stroke-width="1.5" d="M3 6l2 2 4-4" fill="#878787"></path></g></svg>
                               Certified Buyer , 1 day ago</p></p>
                               `

        ratingElements.appendChild(reviewRating);
        ratingElements.appendChild(reviewImage);
        ratingElements.classList.add("review-rating");
        reviewElement.appendChild(ratingElements);

        const reviewElements = document.createElement("p");
        reviewElements.appendChild(reviewTextElement);
        reviewElements.classList.add("review-text");
        
    
        reviewElement.appendChild(reviewElements);
        reviewElement.appendChild(reviewName);
        reviewName.classList.add("name");
      });
    }

  
    const questions = laptop.qna;
    const questionsElement = document.getElementById("customer-question");

    if (questionsElement) {
      questions.forEach((qna) => {
        const question = qna.question;
        const answer = qna.answer;

        const questionElement = document.createElement("div");
        questionElement.classList.add("customer-questions");

        const questionText = document.createTextNode(`Q: ${question}`);
        const answerText = document.createTextNode(`A: ${answer}`);

        const questionParagraph = document.createElement("p");
        questionParagraph.appendChild(questionText);
        questionParagraph.classList.add("question-from-customer");
        questionParagraph.style.fontWeight = "400";

        const answerParagraph = document.createElement("p");
        answerParagraph.appendChild(answerText);
        answerParagraph.classList.add("word-wrap");

        questionElement.appendChild(questionParagraph);
        questionElement.appendChild(answerParagraph);

        questionsElement.appendChild(questionElement);

      });



    

    }
  } catch (error) {
    console.error("Error displaying product details:", error);
  }
}

document.addEventListener("DOMContentLoaded", displayDetails);









// Function to display the first three product cards
function displayFirstThreeCards(productData) {
  const cardsContainer = document.getElementById("product-cards-container");

  if (!cardsContainer) {
    console.error("Product cards container not found");
    return;
  }

  // Clear previous cards
  cardsContainer.innerHTML = '';

  // Display the first three cards
  for (let i = 0; i < 3; i++) {
    const product = productData[i];
    if (!product) return; // Make sure there are enough products

    const card = createProductCard(product);
    cardsContainer.appendChild(card);
  }
}

// Function to create a single product card element
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-display-card";

  // Product image
  const imgElement = document.createElement("img");
  imgElement.src = product.product_images[0];
  imgElement.alt = product.product_name.name;
  imgElement.className = "product-display-image";
  card.appendChild(imgElement);

  // Product details container
  const detailsContainer = document.createElement("div");
  detailsContainer.className = "product-details";

  // Product description
  const descriptionElement = document.createElement("div");
  descriptionElement.className = "product-display-description";
  descriptionElement.textContent = product.product_name.name;
  detailsContainer.appendChild(descriptionElement);

  // Product discount
  const discountElement = document.createElement("div");
  discountElement.className = "product-off-percent";
  discountElement.textContent = `${product.price_details.discount_percent}% off`;
  detailsContainer.appendChild(discountElement);

  // Shop Now button
  const anchorElement = document.createElement("a");
  anchorElement.href = `../Html/productDescription.html?category=${variable}&productId=${product.product_id}`;
  detailsContainer.appendChild(anchorElement);
  
  const buttonElement = document.createElement("button");
  buttonElement.type = "submit";
  buttonElement.textContent = "Shop Now";
  anchorElement.appendChild(buttonElement);
  

  card.appendChild(detailsContainer);

  return card;
}

// Function to initialize the carousel functionality
function initializeCarousel(productData) {
  let currentIndex = 0; // Index of the first visible card

  // Display the first three cards
  displayFirstThreeCards(productData);

  // Function to move the carousel to the left
  function scrollLeft() {
    if (currentIndex === 0) return; // Already at the beginning

    const cardsContainer = document.getElementById("product-cards-container");
    if (!cardsContainer) return;

    currentIndex--;
    cardsContainer.innerHTML = ''; // Clear previous cards

    // Display the cards from currentIndex to currentIndex + 2
    for (let i = currentIndex; i < currentIndex + 3; i++) {
      const product = productData[i];
      if (!product) return; // No more products to display

      const card = createProductCard(product);
      cardsContainer.appendChild(card);
    }
  }

  // Function to move the carousel to the right
  function scrollRight1() {
    const cardsContainer = document.getElementById("product-display-card");
    if (!cardsContainer) return;

    if (currentIndex + 3 >= productData.length) return; // Already at the end

    currentIndex++;
    cardsContainer.innerHTML = ''; // Clear previous cards

    // Display the cards from currentIndex to currentIndex + 2
    for (let i = currentIndex; i < currentIndex + 5; i++) {
      const product = productData[i];
      if (!product) return; // No more products to display

      const card = createProductCard(product);
      cardsContainer.appendChild(card);
    }
  }

  // Add event listeners to the arrow buttons
  const leftButton = document.getElementById("carousel-left-button");
  const rightButton = document.getElementById("carousel-right-button");
  if (leftButton && rightButton) {
    leftButton.addEventListener("click", scrollLeft1);
    rightButton.addEventListener("click", scrollRight1);
  }
}

// Call initializeCarousel function when DOM content is loaded
document.addEventListener("DOMContentLoaded", async () => {
  const productData = await fetchProductData(); // Fetch product data
  initializeCarousel(productData);
});
