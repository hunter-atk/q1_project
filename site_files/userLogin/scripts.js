const config = {
  apiKey: "AIzaSyBEuz8CjkppEfcz-i1el4YgzS6VudEdqnY",
  authDomain: "q1-project-77b24.firebaseapp.com",
  databaseURL: "https://q1-project-77b24.firebaseio.com",
  projectId: "q1-project-77b24",
  storageBucket: "q1-project-77b24.appspot.com",
  messagingSenderId: "323670236834"
};
firebase.initializeApp(config);

(function() {

//initialize Firebase
// const config = {
//   apiKey: "AIzaSyBEuz8CjkppEfcz-i1el4YgzS6VudEdqnY",
//   authDomain: "q1-project-77b24.firebaseapp.com",
//   databaseURL: "https://q1-project-77b24.firebaseio.com",
//   projectId: "q1-project-77b24",
//   storageBucket: "q1-project-77b24.appspot.com",
//   messagingSenderId: "323670236834"
// };
// firebase.initializeApp(config);

//NOTE: Below - Login/logout form

//Get elements
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('btnLogout');

//Add login event
btnLogin.addEventListener('click', ev => {
  ev.preventDefault();
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();
  //Sign in
  const promise = auth.signInWithEmailAndPassword(email, pass);
  promise.catch(ev => console.log(e.message));
})

//Add signup event
btnSignUp.addEventListener('click', ev => {
  //Get email and pass
  //TO DO: Check for real email
  ev.preventDefault();
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();
  //Sign up
  const promise = auth.createUserWithEmailAndPassword(email, pass);
  promise.catch(ev => console.log(e.message));
})

btnLogout.addEventListener('click', ev => {
  ev.preventDefault();
  firebase.auth().signOut();
})

//Add realtime authentication listener
var archiveLink = document.getElementById('archiveLink');
var adminLink = document.getElementById('adminLink');
var signInLink = document.getElementById('signInLink');
firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser){
    archiveLink.classList.remove('hidden');
    adminLink.classList.remove('hidden');
    signInLink.innerText = "Logout"
    console.log(signInLink.innerText);
    console.log(signInLink);
    btnLogout.classList.remove('hidden');
    btnSignUp.classList.add('hidden');
    btnLogin.classList.add('hidden');
  } else {
    btnLogout.classList.add('hidden');
    archiveLink.classList.add('hidden');
    adminLink.classList.add('hidden');
    signInLink.innerText = "Login";
    btnSignUp.classList.remove('hidden');
    btnLogin.classList.remove('hidden');
    event.preventDefault();
    window.location = "index.html";
  }
})

}());

//Image add form:
$(function () {
  const state = {
    email: "",
    password: "",
  }
    var fileName;

    //Image Upload
    var imageUpload = document.getElementById('js-image-upload');
    imageUpload.addEventListener('change', function(e){
      var file = e.target.files[0];
      fileName = file.name;
      var storageRef = firebase.storage().ref('images/' + file.name);
      storageRef.put(file);
    })

  $('.js-form').on('submit', event => {
    event.preventDefault();

    const email = $('#js-email').val() || state.email;
    const password = $('#js-password').val() || state.password;
    const imageID = $('#js-image-id').val();
    const imageDate = $('#js-image-date').val();
    const dateInt = new Date(imageDate).getTime();
    const imageKeywords = $('#js-image-keywords').val().split(" ");



    firebase.auth().signInWithEmailAndPassword(email, password)
          .then(user => {
            state.email = email;
            state.password = password;
            $('#js-login-data').addClass('hidden');
            //$('#js-email').addClass('hidden');
            var archiveContainer = document.getElementById('archiveResultsContainer');
            archiveContainer.innerHTML = "";
            firebase.database().ref('images').push({
                imageID, imageDate, dateInt, imageKeywords, fileName
              });
              console.log(imageID, imageDate, imageKeywords);
              $('.js-form').trigger('reset');
            })
          .catch(error => {
            console.log(error);
          });
  });
});

$(function () {
    $('body').show();
});
