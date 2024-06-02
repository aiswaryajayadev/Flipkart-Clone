
// // const productDetails = {
// //   image: "Assets/realme.png",
// //   name: "realme P1 5G (Phoenix Red, 256 GB)",
// //   ram: "8 GB RAM",
// //   seller: "PETILANTE Online",
// //   sellerImage: "Assets/flipkartassure.png",
// //   originalPrice: "₹22,999",
// //   discountedPrice: "₹16,999",
// //   discount: "26% Off",
// //   packagingFee: "+ ₹59 Secured Packaging Fee",
// //   deliveryInfo: "Delivery in 2 days, Wed |",
// //   deliveryCost: "₹70",
// //   freeDelivery: "Free"
// // };


// let variable = 'shoes';
// let pid='REEBOK001';
// const mockApiUrl=`http://localhost:3000/${variable}/`;




// async function fetchProductData(){
//   try{
//     const response = await fetch(mockApiUrl);
//     if(!response.ok){
//       throw new Error("Failed to fetch product data");
//     }
//     const data=await response.json();
//     return data;
//   }catch(error){
//     console.log("Error fetching product data:",error);
//     return{};
//   }
// }




// function displayProductDetails() {
//   try{
//     const productData= fetchProductData();
//     console.log(productData);
//     if(productData===0){
//       console.log("No product data found");
//       return
//     }

//     productData.product_id=pid;
//    console.log(productData.product_id);
//    const index =productData.findIndex(product=> product.product_id===pid);
//    console.log(index); 
//    const details=productData[index];
 
//   document.getElementById('productImage').src = details.image;
//   document.getElementById('productName').textContent = details.name;
//   document.getElementById('productRAM').textContent = details.ram;
//   document.getElementById('productSeller').firstChild.textContent = `Seller: ${details.seller} `;
//   document.getElementById('sellerImage').src = details.sellerImage;
//   document.getElementById('originalPrice').textContent = details.originalPrice;
//   document.getElementById('discountedPrice').textContent = details.discountedPrice;
//   document.getElementById('discount').textContent = details.discount;
//   document.getElementById('packagingFee').textContent = details.packagingFee;
//   document.getElementById('deliveryInfo').textContent = details.deliveryInfo;
//   document.getElementById('deliveryCost').textContent = details.deliveryCost;
//   document.getElementById('freeDelivery').textContent = details.freeDelivery;
// }
// catch(error){
// console.log("error displaying product details:",error)
// }
// }

// document.addEventListener('DOMContentLoaded', displayProductDetails);



// const inputFields = document.querySelectorAll('.checkout_nonmty-small-input');

//   function updateCount(inputField, operation) {
//     let count = parseInt(inputField.value);
//     if (operation === 'increment') {
//       count = Math.min(count + 1, 10);
//     } else if (operation === 'decrement') {
//       count = Math.max(count - 1, 1);
//     }
//     inputField.value = count.toString();
//   }

//   function updateQuantity(operation) {
//     const quantityInput = document.querySelector('.checkout_nonmty-small-input');
//     updateCount(quantityInput, operation);
//   }




let variable = 'shoes';
let pid = 'REEBOK001';
const mockApiUrl = `http://localhost:3000/${variable}/`;

async function fetchProductData() {
  try {
    console.log(`Fetching data from: ${mockApiUrl}`);  // Debugging URL
    const response = await fetch(mockApiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch product data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching product data:", error);
    return [];
  }
}

async function displayProductDetails() {
  try {
    const productData = await fetchProductData();
    console.log("Fetched product data:", productData);

    if (!productData || productData.length === 0) {
      console.log("No product data found");
      return;
    }

    const index = productData.findIndex(product => product.product_id === pid);
    console.log(index);
    if (index === -1) {
      console.log(`Product with id ${pid} not found`);
      return;
    }

    const details = productData[index];
console.log(1);
    console.log("Product details:", details);

    // Now update the HTML with the product details
   document.getElementById('productImage').src = details.product_images[0];
    document.getElementById('productName').textContent = details.product_name.name;  
    document.getElementById('originalPrice').textContent = details.price_details.original_price;
    document.getElementById('discountedPrice').textContent = details.price_details.current_price;
    document.getElementById('discount').textContent = details.price_details.discount_percent;
    document.getElementById('totalPrice').textContent = details.price_details.original_price;
    document.getElementById('chkt-discount').textContent = details.price_details.discount_percent+"%";

    let totalAmount = details.price_details.original_price - details.price_details.discount_percent;
    document.getElementById('chkt-totalAmount').textContent = details.price_details.current_price;
    
    console.log(totalAmount);
   

  } catch (error) {
    console.log("Error displaying product details:", error);
  }
}

document.addEventListener('DOMContentLoaded', displayProductDetails);

const inputFields = document.querySelectorAll('.checkout_nonmty-small-input');

// function updateCount(inputField, operation) {
//   let count = parseInt(inputField.value);
//   if (operation === 'increment') {
//     count = Math.min(count + 1, 10);
//     return count;
//   } else if (operation === 'decrement') {
//     count = Math.max(count - 1, 1);
//   }
//   inputField.value = count.toString();
// }




function updateCount(inputField,operation) {
  // const inputField = document.getElementById('productQuantity');
  let count = parseInt(inputField.value);

  if (operation === 'increment') {
    count = Math.min(count + 1, 10);
  } else if (operation === 'decrement') {
    count = Math.max(count - 1, 1);
  }
  
  inputField.value = count.toString();
  
  // Get the current price per unit
  const currentPrice = parseFloat(document.getElementById('originalPrice').textContent);
  const totalDiscountPrice = parseFloat(document.getElementById('discountedPrice').textContent);
  // Calculate the new total price
  const totalPrice = currentPrice * count;
  const finalPrice=totalDiscountPrice * count;
  
  // Update the total price display
  document.getElementById('totalPrice').textContent = `₹${totalPrice.toFixed(2)}`;
  document.getElementById('chkt-totalAmount').textContent = `₹${finalPrice.toFixed(2)}`;
}




function updateQuantity(operation) {
  const quantityInput = document.querySelector('.checkout_nonmty-small-input');

  updateCount(quantityInput, operation);
}

// Add event listeners for quantity buttons
document.querySelector('.checkout_nonmty-quantity_col1').addEventListener('click', () => updateQuantity('decrement'));
document.querySelector('.checkout_nonmty-quantity_col3').addEventListener('click', () => updateQuantity('increment'));

// document.addEventListener("DOMContentLoaded", function() {
//   // Sample product data
//   var products = [
//       { name: "Product 1", price: 5000 },
//       { name: "Product 2", price: 6000 },
//       { name: "Product 3", price: 7000 },
//       { name: "Product 4", price: 8000 }
//   ];

//   // Calculate total price and discount
//   var totalPrice = products.reduce((acc, curr) => acc + curr.price, 0);
//   var discount = 5003; // Example discount

//   // Update price details in HTML
//   document.querySelector('.checkout_nonmty-price-line .checkout_nonmty-price-right').textContent = '₹' + totalPrice;
//   document.querySelector('.checkout_nonmty-price-line:nth-child(2) .checkout_nonmty-price-right').textContent = '− ₹' + discount;

//   // Calculate and update total amount
//   var totalAmount = totalPrice - discount;
//   document.querySelector('.checkout_nonmty-price-righttotal').textContent = '₹' + totalAmount;

//   // Calculate and update savings
//   var savings = totalPrice + discount - totalAmount;
//   document.querySelector('.checkout_nonmty-price-center').textContent = 'You will save ₹' + savings + ' on this order';
// });
