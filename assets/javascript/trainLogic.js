
  //-------------------------------------------------------------------------------------------------------------------------


  /* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new trains - then update the html + update the database
// 3. Create a way to retrieve trains from the train database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyB48Th2pp0_4KFw_G7uJHBeD_ImoOStKtA",
    authDomain: "dimas-project-e058f.firebaseapp.com",
    databaseURL: "https://dimas-project-e058f.firebaseio.com",
    projectId: "dimas-project-e058f",
    storageBucket: "dimas-project-e058f.appspot.com",
    messagingSenderId: "302948182156"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding Trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainStart = moment($("#start-input").val().trim(), "DD/MM/YY").format("X");
    var trainRate = $("#rate-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      start: trainStart,
      rate: trainRate
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.rate);
  
    // Alert
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");
  });
  
  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainRate = childSnapshot.val().rate;
  
    // train Info
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainStart);
    console.log(trainRate);
  
    // Prettify the train start
    var trainStartPretty = moment.unix(trainStart).format("MM/DD/YY");
  
    // Calculate the months scheduled using hardcore math
    // To calculate the months arrivals
    var trainMonths = moment().diff(moment.unix(trainStart, "X"), "months");
    console.log(trainMonths);
  
    // Calculate the total billed rate
    var trainScheduled = trainMonths * trainRate;
    console.log(trainScheduled);
  
    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
    trainStartPretty + "</td><td>" + trainMonths + "</td><td>" + trainRate + "</td><td>" + trainScheduled + "</td></tr>");
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume train start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use mets this test case
  