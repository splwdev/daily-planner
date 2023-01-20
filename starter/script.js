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

    // Timeblock variables
    var stdBusHours = 9;
    
    
    
    
    // TODO: Create an array of timeblocks for business hours
    for (let i = 0; i < stdBusHours; i++) { 
        // Creating the timeblock row
        var timeBlock = $("<div>");
        timeBlock.addClass("row time-block");
        
        
       
    };
        
    // TODO: eventhandler to add an event when the save button is clicked

});