
const firebaseConfig = {
  apiKey: "AIzaSyCbX8RTS7jKJ0xApi1s3c3TS7_iExa-BjA",
  authDomain: "fc-clone-13fe6.firebaseapp.com",
  databaseURL: "https://fc-clone-13fe6-default-rtdb.firebaseio.com",
  projectId: "fc-clone-13fe6",
  storageBucket: "fc-clone-13fe6.appspot.com",
  messagingSenderId: "1003116691829",
  appId: "1:1003116691829:web:212b427550a54b7ed0d33c"
};

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

let EmailInp = document.getElementById('emailInp');
let PassInp = document.getElementById('passwordInp');
let MainForm = document.getElementById('MainForm');

let SignInUser = evt => {
  evt.preventDefault();
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
.then(() => {
  return firebase.auth().signInWithEmailAndPassword(EmailInp.value, PassInp.value);
})
.then((userCredential) => {
  // Signed in
  const user = userCredential.user;
  console.log('User signed in:', user.email);
  localStorage.setItem('user', user.email);
  toastr.success('Login Successful', 'SUCCESS');
  wait(2000).then(() => {
    window.location.href="../html/login-navbar-home.html";
  });
})
.catch((error) => {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.error('Error setting persistence:', errorCode, errorMessage);
  toastr.error('Invalid Credentials', 'ERROR');
});
};


//Sign out conditions
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user);
    // User is signed in, redirect to the dashboard
      // Replace with your desired URL
  } else {
    // User is signed out, you can handle this case if needed
    console.log('No user is signed in.');

    // window.location.href = "../html/home.html";
  }
});



MainForm.addEventListener('submit', SignInUser);