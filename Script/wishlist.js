let selectedOption = null;

function changeColor(element) {
    if (selectedOption !== null) {
        selectedOption.classList.remove('selected');
    }
    element.classList.add('selected');
    selectedOption = element;
};


const firebaseConfig = {
  apiKey: "AIzaSyCbX8RTS7jKJ0xApi1s3c3TS7_iExa-BjA",
  authDomain: "fc-clone-13fe6.firebaseapp.com",
  databaseURL: "https://fc-clone-13fe6-default-rtdb.firebaseio.com",
  projectId: "fc-clone-13fe6",
  storageBucket: "fc-clone-13fe6.appspot.com",
  messagingSenderId: "1003116691829",
  appId: "1:1003116691829:web:212b427550a54b7ed0d33c"
};

// Make a GET request to fetch data from the server
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

// Reference to the wishlist node
const wishlistRef = firebase.database().ref('wishlist');

// Function to add product to wishlist
const addProductToWishlist = (username, productId) => {
  wishlistRef.child(username).child(productId).set(true)
    .then(() => {
      console.log('Product added to wishlist successfully');
    })
    .catch((error) => {
      console.error('Error adding product to wishlist:', error);
    });
};

document.getElementById('add-to-wishlist-button').addEventListener('click', function(event) {
  event.preventDefault();
  const username = "fardeen";
  const productId = "41321312";
  addProductToWishlist(username, productId);
});