$(function () {
  const config = {
    apiKey: "AIzaSyBEuz8CjkppEfcz-i1el4YgzS6VudEdqnY",
    authDomain: "q1-project-77b24.firebaseapp.com",
    databaseURL: "https://q1-project-77b24.firebaseio.com",
    projectId: "q1-project-77b24",
    storageBucket: "q1-project-77b24.appspot.com",
    messagingSenderId: "323670236834"
  };
  firebase.initializeApp(config);

  // const state = {
  //   email: "",
  //   password: "",
  // }
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

    // const email = $('#js-email').val() || state.email;
    const email = $('#js-email').val();
    // const password = $('#js-password').val() || state.password;
    const password = $('#js-password').val();
    const imageID = $('#js-image-id').val();
    const imageDate = $('#js-image-date').val();
    const imageKeywords = $('#js-image-keywords').val().split(" ");



    firebase.auth().signInWithEmailAndPassword(email, password)
          .then(user => {
            // state.email = email;
            // state.password = password;
            // $('#js-login-data').addClass('hidden');
            firebase.database().ref('images').push({
                imageID, imageDate, imageKeywords, fileName
              });
              console.log(imageID, imageDate, imageKeywords);
              $('.js-form').trigger('reset');
            })
          .catch(error => {
            console.log(error);
          });
  });
});
