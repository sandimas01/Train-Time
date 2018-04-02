console.log("train logic javascript")

/* global firebase */

// Initialize Firebase
// Make sure that your configuration matches your firebase script version
// (Ex. 3.0 != 3.7.1)
var config = {
    apiKey: "AIzaSyB48Th2pp0_4KFw_G7uJHBeD_ImoOStKtA",
    authDomain: "dimas-project-e058f.firebaseapp.com",
    databaseURL: "https://dimas-project-e058f.firebaseio.com",
    projectId: "dimas-project-e058f",
    storageBucket: "dimas-project-e058f.appspot.com",
    messagingSenderId: "302948182156"
  };
  
  firebase.initializeApp(config);
  
  // Create a variable to reference the database
  var database = firebase.database();
  
  // Use the below initialValue
  var initialValue = 100;
  
  // Use the below variable clickCounter to keep track of the clicks.
  var clickCounter = initialValue;
  
  // --------------------------------------------------------------
  
  // At the initial load and on subsequent data value changes, get a snapshot of the current data. (I.E FIREBASE HERE)
  // This callback keeps the page updated when a value changes in firebase.
  database.ref().on("value", function(snapshot) {
    // We are now inside our .on function...
  
    // Console.log the "snapshot" value (a point-in-time representation of the database)
    console.log(snapshot.val());
    // This "snapshot" allows the page to get the most current values in firebase.
  
    // Change the value of our clickCounter to match the value in the database
    clickCounter = snapshot.val().clickCount;
  
    // Console Log the value of the clickCounter
    console.log(clickCounter);
  
    // Change the HTML using jQuery to reflect the updated clickCounter value
    $("#click-value").text(snapshot.val().clickCount);
    // Alternate solution to the above line
    //$("#click-value").html(clickCounter);
  
  // If any errors are experienced, log them to console.
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
  
  // --------------------------------------------------------------
  
  // Whenever a user clicks the click button
  $("#click-button").on("click", function() {
  
    // Reduce the clickCounter by 1
    clickCounter--;
  
    // Alert User and reset the counter
    if (clickCounter === 0) {
      alert("Phew! You made it! That sure was a lot of clicking.");
      clickCounter = initialValue;
    }
  
    // Save new value to Firebase
    database.ref().set({
      clickCount: clickCounter
    });
  
    // Log the value of clickCounter
    console.log(clickCounter);
  
  });
  
  // Whenever a user clicks the restart button
  $("#restart-button").on("click", function() {
  
    // Set the clickCounter back to initialValue
    clickCounter = initialValue;
  
    // Save new value to Firebase
    database.ref().set({
      clickCount: clickCounter
    });
  
    // Log the value of clickCounter
    console.log(clickCounter);
  
    // Change the HTML Values
    $("#click-value").text(clickCounter);
  
  });

  
  //-------------------------------------------------------------------------------------------------------------------------


  /* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
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
    var trainStartPretty = moment.unix(empStart).format("MM/DD/YY");
  
    // Calculate the months scheduled using hardcore math
    // To calculate the months arrivals
    var trainMonths = moment().diff(moment.unix(empStart, "X"), "months");
    console.log(trainMonths);
  
    // Calculate the total billed rate
    var trainScheduled = trainMonths * trainRate;
    console.log(trainScheduled);
  
    // Add each train's data into the table
    $("#employee-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
    trainStartPretty + "</td><td>" + trainMonths + "</td><td>" + trainRate + "</td><td>" + trainScheduled + "</td></tr>");
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume train start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use mets this test case
  