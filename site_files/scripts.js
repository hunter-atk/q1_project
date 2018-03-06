const config = {
  apiKey: "AIzaSyBEuz8CjkppEfcz-i1el4YgzS6VudEdqnY",
  authDomain: "q1-project-77b24.firebaseapp.com",
  databaseURL: "https://q1-project-77b24.firebaseio.com",
  projectId: "q1-project-77b24",
  storageBucket: "q1-project-77b24.appspot.com",
  messagingSenderId: "323670236834"
};
var archiveResultsContainer = document.getElementsByClassName("archiveResultsContainer")[0];
firebase.initializeApp(config);

//reference image storage and doc elements
var ref = firebase.database().ref('images').orderByChild('imageDate');
var searchEntry = document.getElementById('searchBar');
var searchButton = document.getElementById('searchSubmit');

function returnResults(){
  ref.on('value', gotData, errData);

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
}

function returnSearchResults(){
  ref.on('value', gotData, errData);

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
     var imageKeywords = images[k].imageKeywords;
     for(let m=0; m<imageKeywords.length; m++){
       if(imageKeywords[m] == searchEntry.value){
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
    }

  }

  //Return error if no data exists
  function errData(err){
    console.log('Error!');
    console.log(err);
  }
}

returnResults();

//filter results according to user inputed start and end date
searchButton.addEventListener('click', function(event){
  // var startDate = new Date(document.getElementById('startDate').value).getTime();
  // var endDate = new Date(document.getElementById('endDate').value).getTime();
  var startDate = document.getElementById('startDate').value;
  var endDate = document.getElementById('endDate').value;
  var searchEntry = document.getElementById('searchBar');
  event.preventDefault();
  // ref = firebase.database().ref('images').orderByChild('dateInt').startAt(startDate).endAt(endDate);
  ref = firebase.database().ref('images').orderByChild('imageDate').startAt(startDate).endAt(endDate);
  let oldResults = document.getElementsByClassName("archiveResultsContainer")[0];
  var tester = document.getElementsByClassName('newResultContainer');
  oldResults.innerHTML = "";
  if(searchEntry.value != ""){
    returnSearchResults();
    console.log(searchEntry.value);
    console.log("nope");
  } else {
  returnResults();
  console.log(searchEntry.value);
  console.log("THIS THANG");
 }
})
