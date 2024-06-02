
const firebaseConfig = {
  apiKey: "AIzaSyCbX8RTS7jKJ0xApi1s3c3TS7_iExa-BjA",
  authDomain: "fc-clone-13fe6.firebaseapp.com",
  databaseURL: "https://fc-clone-13fe6-default-rtdb.firebaseio.com",
  projectId: "fc-clone-13fe6",
  storageBucket: "fc-clone-13fe6.appspot.com",
  messagingSenderId: "1003116691829",
  appId: "1:1003116691829:web:212b427550a54b7ed0d33c"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

let EmailInp = document.getElementById('emailInp');
let PassInp = document.getElementById('passwordInp');
let MainForm = document.getElementById('MainForm');







let SignInUser = evt => {
  evt.preventDefault();
  // Set persistence to LOCAL
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
.then(() => {
  // Now we can sign in the user
  return firebase.auth().signInWithEmailAndPassword(EmailInp.value, PassInp.value);
})
.then((userCredential) => {
  // Signed in
  const user = userCredential.user;
  console.log('User signed in:', user);
  // window.location.href="../html/home.html";
})
.catch((error) => {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.error('Error setting persistence:', errorCode, errorMessage);
});
};

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user);
    // User is signed in, redirect to the dashboard
   // Replace with your desired URL
  }
});



MainForm.addEventListener('submit', SignInUser);