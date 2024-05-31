
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

  auth.signInWithEmailAndPassword(EmailInp.value, PassInp.value)
      .then((credentials) => {
          console.log(credentials);
          alert("Sign in successful!");
          window.location.href="../html/home.html";
      })
      .catch((error) => {
          alert(error.message);
          console.log(error.code);
          console.log(error.message);
      });
}

MainForm.addEventListener('submit', SignInUser);