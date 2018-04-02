
    /* global firebase moment */
    // Steps to complete:
    
    // 1. Initialize Firebase
    // 2. Create button for adding new trains - then update the html + update the database
    // 3. Create a way to retrieve trains from the train database.
    // 4. Create a way to calculate the months worked. Using difference between time and current time.
    //    Then use moment.js formatting to set difference in months.
    // 5. Calculate Total billed
    
    // 1. Initialize Firebase
    var config = {
        apiKey: "AIzaSyCl8t8iivthYYRROAA8vzUf0dkC_-CMl1A",
        authDomain: "dimas-train-scheduler.firebaseapp.com",
        databaseURL: "https://dimas-train-scheduler.firebaseio.com",
        projectId: "dimas-train-scheduler",
        storageBucket: "dimas-train-scheduler.appspot.com",
        messagingSenderId: "571326792023"
    };
    
    firebase.initializeApp(config);
    
    var database = firebase.database();

// 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#dest-input").val().trim();
//   var trainTime = moment($("#time-input").val().trim(), "DD/MM/YY").format("X");
  var trainTime = $("#time-input").val().trim();
  var trainFreq = $("#freq-input").val().trim();

  // Creates local "ttrainorary" object for holding train data
  var newTrain = {
    name: trainName,
    dest: trainDest,
    time: trainTime,
    freq: trainFreq,
    timeAdded: firebase.database.ServerValue.TIMESTAMP
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.time);
  console.log(newTrain.freq);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#dest-input").val("");
  $("#time-input").val("");
  $("#freq-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().dest;
  var trainTime = childSnapshot.val().time;
  var trainFreq = childSnapshot.val().freq;

  // Train Info
  console.log(trainName);
  console.log(trainDest);
  console.log(trainTime);
  console.log(trainFreq);


// train Time (pushed back 1 year to make sure it comes before current time)
var trainTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
console.log(trainTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % trainFreq;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = trainFreq - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));



  var trainNext = moment(nextTrain).format("hh:mm");
  var trainTimeDisplay = moment(trainTimeConverted).format("hh:mm");
 

    // Add each train's data into the table
//   $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
//   trainTimePretty + "</td><td>" + trainMonths + "</td><td>" + trainFreq + "</td><td>" + trainBilled + "</td></tr>");
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
  trainTimeDisplay + "</td><td>" + trainFreq + "</td><td>" + trainNext + "</td><td>" + tMinutesTillTrain + "</td></tr>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Train time date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any atttraint we use mets this test case
