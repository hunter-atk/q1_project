const config = {
  apiKey: "AIzaSyBEuz8CjkppEfcz-i1el4YgzS6VudEdqnY",
  authDomain: "q1-project-77b24.firebaseapp.com",
  databaseURL: "https://q1-project-77b24.firebaseio.com",
  projectId: "q1-project-77b24",
  storageBucket: "q1-project-77b24.appspot.com",
  messagingSenderId: "323670236834"
};
firebase.initializeApp(config);

//reference image storage and doc elements
var ref = firebase.database().ref('images');
ref.on('value', gotData, errData);
var archiveResultsContainer = document.getElementById('archiveResultsContainer');

//helper function to append image metadata to div
function appendMetadata(imageId, imageDate, newImageResult, newImageMetadata){
  var imgIdDiv = document.createElement("div");
  imgIdDiv.innerText = imageId;
  var imgDateDiv = document.createElement("div");
  imgDateDiv.innerText = imageDate;
  newImageMetadata.appendChild(imgIdDiv);
  newImageMetadata.appendChild(imgDateDiv);
}

//helper function to add new img and tag html to archiveResultsContainer
function addImageResult(storedImage, imageId, imageDate){
  var newResult = document.createElement("div");
  newResult.setAttribute("class", "newResultContainer");
  archiveResultsContainer.appendChild(newResult);
  var newImageResult = document.createElement("img");
  var newImageMetadata = document.createElement("div");
  newImageResult.setAttribute("src", storedImage);
  newImageResult.setAttribute("class", "imgThumbnail");
  newImageMetadata.setAttribute("class", "imgMetadata");
  newResult.appendChild(newImageResult);
  newResult.appendChild(newImageMetadata);
  appendMetadata(imageId, imageDate, newImageResult, newImageMetadata);
}


//Retrieve data if data exists
let imageCalls = [];
function gotData(data){
  var images = data.val();
  var keys = Object.keys(images);
  for (let i=0; i<keys.length; i++){
    var k = keys[i];
    var imageDisplay = images[k].fileName;
    var imageId = images[k].imageID;
    var imageDate = images[k].imageDate;

    getImage(imageId,imageDisplay,imageDate)
    function getImage(id, display, date){
      firebase.storage().ref().child('images/' + display).getDownloadURL()
      .then( (url) =>{
        addImageResult(url, id, date)
      })
      .catch(function(error) {
      });
    }
   }

 }

//Return error if no data exists
function errData(err){
  console.log('Error!');
  console.log(err);
}
