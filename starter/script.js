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
    var storedValues = JSON.parse(localStorage.getItem("storedValues")) || [];
    
     
    // getStoredValues();
    
    // TODO: Create an array of timeblocks for business hours
    for (let i = 0; i < stdBusHours; i++) { 
        // Creating the timeblock row
        var timeBlock = $("<div>");
        timeBlock.addClass("row time-block");
        timeBlock.attr("id", "hour" + i);
        
        // Creating the hour element
        var hour = $("<div>");
        hour.addClass("hour col-sm-1");
        hour.text(moment().hour(i + startTime).format("hA"));

        // Creating the text area
        var textArea = $("<textarea>");
        textArea.addClass("eventText col-sm-10 future");

        // Creating the save button
        var saveBtn = $("<button>");
        saveBtn.addClass("btn btn-primary saveBtn col-sm-1 fas fa-save");
        saveBtn.attr("data-index", i);

        

        // Adding elements to the timeBlock row
        timeBlock.append(hour);
        timeBlock.append(textArea);
        timeBlock.append(saveBtn);
        
        // Adding timeBlock row to the container div
        plannerContainer.append(timeBlock);

        if (currentHour > (i + startTime)) {
            textArea.attr("class", "eventText col-sm-10 past");
        }
        else if (currentHour === (i + startTime)){
            textArea.attr("class", "eventText col-sm-10 present");
        }

        
    };
        
    $(".saveBtn").on("click", function (event) {
        event.preventDefault();
        var currValue = $(this).siblings(".eventText").val();
        var currHour = $(this).parent().attr("id");
        localStorage.setItem(currHour, currValue);
    });
});