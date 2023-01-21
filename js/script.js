// The app should:
// * Display the current day at the top of the calender when a user opens the planner.
// * Present timeblocks for standard business hours when the user scrolls down.
// * Color-code each timeblock based on past, present, and future when the timeblock is viewed.
// * Allow a user to enter an event when they click a timeblock
// * Save the event in local storage when the save button is clicked in that timeblock.
// * Persist events between refreshes of a page

$(document).ready(function () {

    // Displaying the current day at the top of the calendar
    var weekDay = moment().format("dddd, MMMM Do");
    $("#currentDay").text(weekDay);

    // Global variables
    // Setting number of business hours in a day
    var stdBusHours = 9;
    var startTime = 9;
    var plannerContainer = $(".container");
    var currentHour = moment().hour();
    // Sets storedValues variable to equal empty array if local storage is undefined
    var storedValues = JSON.parse(localStorage.getItem("storedValues")) || [];
    
    // For loop to create the time blocks for each business hour
    for (let i = 0; i < stdBusHours; i++) { 
        // Creating the timeblock row, adding clas and id attributes
        var timeBlock = $("<div>");
        timeBlock.addClass("row time-block");
        timeBlock.attr("id", "hour" + i);
        
        // Creating the hour element, adding class and setting text value for hours
        var hour = $("<div>");
        hour.addClass("hour col-sm-1");
        hour.text(moment().hour(i + startTime).format("hA"));

        // Creating the text area and adding class
        var textArea = $("<textarea>");
        textArea.addClass("eventText col-sm-10 future");

        // Creating the save button, adding class and data-index attribute
        var saveBtn = $("<button>");
        saveBtn.addClass("btn btn-primary saveBtn col-sm-1 fas fa-save");
        saveBtn.attr("data-index", i);

        // Setting eventText attribute to equal the storedValues array (in the loop)
        var eventText = storedValues[i];
        
        // Setting eventText to equal textArea value or empty string
        if (eventText) {
            textArea.text(eventText);
        }
        else {
            textArea.text("");
        }

        // Adding elements to the timeBlock row
        timeBlock.append(hour);
        timeBlock.append(textArea);
        timeBlock.append(saveBtn);
        
        // Adding timeBlock row to the container div
        plannerContainer.append(timeBlock);

        // Setting the class to past or present depending upon current time (default is future)
        if (currentHour > (i + startTime)) {
            textArea.attr("class", "eventText col-sm-10 past");
        }
        else if (currentHour === (i + startTime)){
            textArea.attr("class", "eventText col-sm-10 present");
        }

        // using for loop to get items from local storage
        $(("#hour" + i) + " .eventText").val(localStorage.getItem("hour" + i));
    };
        
    // event handler to save items to local storage upon click save button
    $(".saveBtn").on("click", function (event) {
        event.preventDefault();
        var currValue = $(this).siblings(".eventText").val();
        var currHour = $(this).parent().attr("id");
        localStorage.setItem(currHour, currValue);
    });
});