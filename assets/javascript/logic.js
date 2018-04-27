 $(document).ready(function(){

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
$("#submit").on("click",function(){
    event.preventDefault();
 

// logic to store data in database from input
trainName = $("#trainName-input").val();
destination = $("#destination-input").val();
trainTime = moment($("#time-input").val().trim(), "HH:mm").subtract(1, "years").format("X");
frequency = $("#frequency-input").val().trim();

// create object for new train input
var newTrain = {
    trainName: trainName,
    destination: destination,
    trainTime: trainTime,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
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

// Looping the train_min function to capture train new time
function train_min() {
  database.ref().child('train-scheduler-becbe').once('value', function (snapshot) {
      snapshot.forEach(function (child_snap) {
          newTime = moment().format('X');
          database.ref('train-scheduler-becbe/' + child_snap.key).update({
              traintime: newTime,
          })
      })
  });
};

//Count down the train new time every one min
setInterval(train_min, 60000);

// clear out data
database.ref().child('train-scheduler-becbe').on('value', function (snapshot) {
  $('tbody').empty();
}, function (errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

// use child_added to add data from Firebase
database.ref().orderByChild("dateAdded").on("child_added", function(childSnapshot){

// store everything in a variable

var snap_val = childSnapshot.val();
var t_n = snap_val.trainName; //train name
var t_d = snap_val.destination;//train destination
var t_f = snap_val.frequency;//train frequency
var t_t = snap_val.trainTime;//train start time

// Difference between time
var timeDiff = moment().diff(moment.unix(trainTime), "minutes");

// Difference between now and train start time
var timeRemainder = moment().diff(moment.unix(t_t), "minutes") % t_f;
       console.log(timeRemainder);

//  Minutes away calculation
var min = t_f - timeRemainder;
       console.log(min);

// format next arrival time
var nextTrainArrival = moment().add(min, "m").format("HH:mm");

// use HMTL to add the data on the table
$("#train_details").append("<tr>" + "<td>" + t_n + "</td>" + "<td>" + t_d + "</td>" +
"<td>" + t_f + "</td>" + "<td>" + nextTrainArrival + "</td>" + "<td>" + min + "</td>" + "</tr>");
console.log("details");
// Handle the errors

   }), function (errorObject) {
       console.log("Errors handled: " + errorObject.code);
   }
});