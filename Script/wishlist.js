let selectedOption = null;

function changeColor(element) {
  if (selectedOption !== null) {
    selectedOption.classList.remove("selected");
  }
  element.classList.add("selected");
  selectedOption = element;
}

const firebaseConfig = {
  apiKey: "AIzaSyCbX8RTS7jKJ0xApi1s3c3TS7_iExa-BjA",
  authDomain: "fc-clone-13fe6.firebaseapp.com",
  databaseURL: "https://fc-clone-13fe6-default-rtdb.firebaseio.com",
  projectId: "fc-clone-13fe6",
  storageBucket: "fc-clone-13fe6.appspot.com",
  messagingSenderId: "1003116691829",
  appId: "1:1003116691829:web:212b427550a54b7ed0d33c",
};

// Make a GET request to fetch data from the server
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.database();
let productIds;
const nameUser = localStorage.getItem("user");

// Reference to the wishlist node
const wishlistRef = firebase.database().ref("wishlist");
// Function to add product to wishlist
const addProductToWishlist = (username, category, product) => {
  const productId = category.substring(0, 4) + "-" + product;

  wishlistRef
    .child(username)
    .child(productId)
    .set(true)
    .then(() => {
      console.log("Product added to wishlist successfully");
    })
    .catch((error) => {
      console.error("Error adding product to wishlist:", error);
    });
};

function getFullProductId(product, productIdArray) {
  for (let fullProductId of productIdArray) {
    if (fullProductId.substring(5) === product) {
      return fullProductId;
    }
  }
  return null;
}

const deleteProductFromWishlist = (username, product) => {

  const fullProductId = getFullProductId(product, productIds);
  console.log(username, fullProductId);
  // wishlistRef
  //   .child(username)
  //   .child(fullProductId)
  //   .remove()
  //   .then(() => {
  //     console.log("Product removed from wishlist successfully");
  //   })
  //   .catch((error) => {
  //     console.error("Error removing product from wishlist:", error);
  //   });
  location.reload();
};


const getWishlistData = (username) => {
  wishlistRef
    .child(username)
    .once("value")
    .then(async (snapshot) => {
      if (snapshot.exists()) {
        // console.log('Wishlist data:', snapshot.val());
        const wishlistData = snapshot.val();
        productIds = Object.keys(wishlistData);
        console.log('Product IDs:', productIds);

        const resultL = await fetch("http://localhost:3000/laptops");
        let laptops = await resultL.json();

        const resultW = await fetch("http://localhost:3000/washing-machine");
        let washingMachine = await resultW.json();

        const resultM = await fetch("http://localhost:3000/mobiles");
        let mobiles = await resultM.json();

        const resultD = await fetch("http://localhost:3000/mobiles");
        let dress = await resultD.json();

        const resultS = await fetch("http://localhost:3000/mobiles");
        let shoes = await resultS.json();

        const resultT = await fetch("http://localhost:3000/mobiles");
        let television = await resultT.json();

        // If you want to do something with each product ID
        productIds.forEach((productId) => {

          const productList = document.getElementById("product-list");

          const category = productId.substring(0, 4); // Extracting the first 4 letters as the category
          const product = productId.substring(5);

          if (category == "mobi") {
            mobiles.forEach((laptop) => {
              if (laptop.product_id == product) {
                var found = laptop;
                // console.log(found);
                let productCard = document.createElement("div");
                productCard.className = "product-container border-bottom";
                productCard.innerHTML = `
                
                <div class="product-image">
                            <img
                                src="${found.product_images[0]}"
                                alt="product image" width="130px">
                        </div>
    
                        <div class="product-details">
                            <p class="product-heading ">${found.product_name.name} </p>
                            <div class="details-row1">
                                    <div class="rating">${found.rating} <img src="../Assets/images/star.svg" alt=""></div>
                                    <p class="review-number">(332)</p>
                                    <img src="./assets/images/fa_62673a.png" alt="" height="21">
                            </div>
                            <div class="details-row1">
                                <h3 class="price">₹ ${found.price_details.current_price}</h3>
                                <p class="real-price"> ₹ ${found.price_details.original_price}</p>
                                <p class="off-percentage" > ${found.price_details.discount_percent}% off</p>
                        </div>      
                        </div>
                        <div class="remove-btn">
                            <button class="add-to-wishlist-button" data-product-id="${found.product_id}" ><img src="../Assets/images/remove-btn.svg" alt="remove-btn"></button>
                        </div>
                        <div>
                        </div>
                `;
                productList.appendChild(productCard);

                //category and productid
              }
              
                
            });

           
          }

          if (category == "lapt") {
            laptops.forEach((laptop) => {
              console.log(laptop);
              if (laptop.product_id == product) {
                var found = laptop;
                console.log(found);
                let productCard = document.createElement("div");
                productCard.className = "product-container border-bottom";
                productCard.innerHTML = `
                
                <div class="product-image">
                            <img
                                src="${found.product_images[0]}"
                                alt="product image" width="130px">
                        </div>
    
                        <div class="product-details">
                            <p class="product-heading ">${found.product_name.name} </p>
                            <div class="details-row1">
                                    <div class="rating">${found.rating} <img src="../Assets/images/star.svg" alt=""></div>
                                    <p class="review-number">(332)</p>
                                    <img src="./assets/images/fa_62673a.png" alt="" height="21">
                            </div>
                            <div class="details-row1">
                                <h3 class="price">₹ ${found.price_details.current_price}</h3>
                                <p class="real-price"> ₹ ${found.price_details.original_price}</p>
                                <p class="off-percentage" > ${found.price_details.discount_percent}% off</p>
                        </div>      
                        </div>
                        <div class="remove-btn">
                            <button id="add-to-wishlist-button data-product-id="${found.product_id}" ><img src="../Assets/images/remove-btn.svg" alt="remove-btn"></button>
                        </div>
                        <div>
                        </div>
                `;
                productList.appendChild(productCard);
              }
            });
          }
          if (category == "wash") {
            washingMachine.forEach((laptop) => {
              console.log(laptop);
              if (laptop.product_id == product) {
                var found = laptop;
                console.log(found);
                let productCard = document.createElement("div");
                productCard.className = "product-container border-bottom";
                productCard.innerHTML = `
                
                <div class="product-image">
                            <img
                                src="${found.product_images[0]}"
                                alt="product image" width="130px">
                        </div>
    
                        <div class="product-details">
                            <p class="product-heading ">${found.product_name.name} </p>
                            <div class="details-row1">
                                    <div class="rating">${found.rating} <img src="../Assets/images/star.svg" alt=""></div>
                                    <p class="review-number">(332)</p>
                                    <img src="./assets/images/fa_62673a.png" alt="" height="21">
                            </div>
                            <div class="details-row1">
                                <h3 class="price">₹ ${found.price_details.current_price}</h3>
                                <p class="real-price"> ₹ ${found.price_details.original_price}</p>
                                <p class="off-percentage" > ${found.price_details.discount_percent}% off</p>
                        </div>      
                        </div>
                        <div class="remove-btn">
                            <button id="add-to-wishlist-button" ><img src="../Assets/images/remove-btn.svg" alt="remove-btn"></button>
                        </div>
                        <div>
                        </div>
                `;
                productList.appendChild(productCard);
              }
            });
          }
          if (category == "dres") {
            dress.forEach((laptop) => {
              console.log(laptop);
              if (laptop.product_id == product) {
                var found = laptop;
                console.log(found);
                let productCard = document.createElement("div");
                productCard.className = "product-container border-bottom";
                productCard.innerHTML = `
                
                <div class="product-image">
                            <img
                                src="${found.product_images[0]}"
                                alt="product image" width="130px">
                        </div>
    
                        <div class="product-details">
                            <p class="product-heading ">${found.product_name.name} </p>
                            <div class="details-row1">
                                    <div class="rating">${found.rating} <img src="../Assets/images/star.svg" alt=""></div>
                                    <p class="review-number">(332)</p>
                                    <img src="./assets/images/fa_62673a.png" alt="" height="21">
                            </div>
                            <div class="details-row1">
                                <h3 class="price">₹ ${found.price_details.current_price}</h3>
                                <p class="real-price"> ₹ ${found.price_details.original_price}</p>
                                <p class="off-percentage" > ${found.price_details.discount_percent}% off</p>
                        </div>      
                        </div>
                        <div class="remove-btn">
                            <button id="add-to-wishlist-button" ><img src="../Assets/images/remove-btn.svg" alt="remove-btn"></button>
                        </div>
                        <div>
                        </div>
                `;
                productList.appendChild(productCard);
              }
            });
          }
          if (category == "shoe") {
            shoes.forEach((laptop) => {
              console.log(laptop);
              if (laptop.product_id == product) {
                var found = laptop;
                console.log(found);
                let productCard = document.createElement("div");
                productCard.className = "product-container border-bottom";
                productCard.innerHTML = `
                
                <div class="product-image">
                            <img
                                src="${found.product_images[0]}"
                                alt="product image" width="130px">
                        </div>
    
                        <div class="product-details">
                            <p class="product-heading ">${found.product_name.name} </p>
                            <div class="details-row1">
                                    <div class="rating">${found.rating} <img src="../Assets/images/star.svg" alt=""></div>
                                    <p class="review-number">(332)</p>
                                    <img src="./assets/images/fa_62673a.png" alt="" height="21">
                            </div>
                            <div class="details-row1">
                                <h3 class="price">₹ ${found.price_details.current_price}</h3>
                                <p class="real-price"> ₹ ${found.price_details.original_price}</p>
                                <p class="off-percentage" > ${found.price_details.discount_percent}% off</p>
                        </div>      
                        </div>
                        <div class="remove-btn">
                            <button id="add-to-wishlist-button" ><img src="../Assets/images/remove-btn.svg" alt="remove-btn"></button>
                        </div>
                        <div>
                        </div>
                `;
                productList.appendChild(productCard);
              }
            });
          }
          if (category == "tele") {
            television.forEach((laptop) => {
              console.log(laptop);
              if (laptop.product_id == product) {
                var found = laptop;
                console.log(found);
                let productCard = document.createElement("div");
                productCard.className = "product-container border-bottom";
                productCard.innerHTML = `
                
                <div class="product-image">
                            <img
                                src="${found.product_images[0]}"
                                alt="product image" width="130px">
                        </div>
    
                        <div class="product-details">
                            <p class="product-heading ">${found.product_name.name} </p>
                            <div class="details-row1">
                                    <div class="rating">${found.rating} <img src="../Assets/images/star.svg" alt=""></div>
                                    <p class="review-number">(332)</p>
                                    <img src="./assets/images/fa_62673a.png" alt="" height="21">
                            </div>
                            <div class="details-row1">
                                <h3 class="price">₹ ${found.price_details.current_price}</h3>
                                <p class="real-price"> ₹ ${found.price_details.original_price}</p>
                                <p class="off-percentage" > ${found.price_details.discount_percent}% off</p>
                        </div>      
                        </div>
                        <div class="remove-btn">
                            <button id="add-to-wishlist-button" ><img src="../Assets/images/remove-btn.svg" alt="remove-btn"></button>
                        </div>
                        <div>
                        </div>
                `;
                productList.appendChild(productCard);
              }
            });
          }

          // You can add more logic here to handle each product ID
        });
      } else {
        console.log("No wishlist data found for the user");
      }
    }).then(()=>{
      const button = document.querySelectorAll('.add-to-wishlist-button');
      console.log(button);
                for(let i=0; i<button.length; i++){
                  button[i].addEventListener('click', function (event) {
                    event.preventDefault();
                    const productId = this.getAttribute('data-product-id');
                    console.log(`Product ID: ${productId}`);
                    deleteProductFromWishlist(getNameFromEmail(nameUser),productId);
                  });
                }
    })
    .catch((error) => {
      console.error("Error fetching wishlist data:", error);
    });
};

// document.getElementById("add-to-wishlist-button").addEventListener("click", function (event) {
//     event.preventDefault();
//     const name = localStorage.getItem('user');
//     function getNameFromEmail(name) {
//       const namePart = name.split('@')[0];
//       return namePart;
//       }
//     const username = getNameFromEmail(name);
//     console.log(username);
//   });

// setTimeout(function () {
//   const button = document.getElementById("add-to-wishlist-button");
//   button.addEventListener("click", function (event) {
//     event.preventDefault();
//     const productId = this.getAttribute('data-product-id');
//     console.log(`Product ID: ${productId}`);

//   });
//   console.log("Event listener added");
// }, 2000);

function onDocumentLoad() {
  console.log("Document is fully loaded");
  getWishlistData(getNameFromEmail(nameUser));
}

// Add an event listener for the DOMContentLoaded event
document.addEventListener("DOMContentLoaded", onDocumentLoad);


function getNameFromEmail(name) {
  const namePart = name.split("@")[0];
  return namePart;
}