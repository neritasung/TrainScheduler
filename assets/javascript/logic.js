  // Initialize Firebase
var config = {
    apiKey: "AIzaSyAXsWEOOvN9AVJaRQtTTFJ3M9lnZbekMKg",
    authDomain: "train-scheduler-becbe.firebaseapp.com",
    databaseURL: "https://train-scheduler-becbe.firebaseio.com",
    projectId: "train-scheduler-becbe",
    storageBucket: "",
    messagingSenderId: "818126281047"
  };
  firebase.initializeApp(config);

//  variable to reference firebase 
var database = firebase.database();

// Initial Variables
var trainName = "";
var destination = "";
var trainTime = 0;
var frequency = 0;

// on click function for the submit button (with event default)
$(body).on("click","#submit",function(){
    event.preventDefault();
 

// logic to store data in database from input
trainName = $("#trainName-input").val().trim();
destination = $("#destination-input").val().trim();
trainTime = moment($("#time-input").val().trim(), "HH:mm").format("X");
frequency = $("#frequency-input").val().trim();

// create object for new train input
var newTrain = {
    trainName: trainName,
    desination: desination,
    trainTime: trainTime,
    frequency: frequency
  };
// use .on (push) the data to the table above
database.ref().push(newTrain);


// console log
console.log (trainName);
console.log (destination);
console.log (trainTime);
console.log (frequency);


// empty the form everytime after user click submit
$("#trainName-input").val("");
$("#destination-input").val("");
$("#time-input").val("");
$("#frequency-input").val("");


});

// use firebase to sore data to the site using child_added and add each entry to the table



// store everything in a variable


// moment.js logic to calculate the next arrival


// moment.js logic to calculate the minutes away






// use HMTL to add the data on the table




// code for handling errors
