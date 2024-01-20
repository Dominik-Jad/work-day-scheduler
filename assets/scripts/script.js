// when the document is ready, run the following function
$(document).ready(function () {
// display current day at top of the page 
var today = dayjs().format('dddd D MMMM YYYY');
$("#currentDay").text(today);

// present time-blocks for standard business hours (9am-5pm)
var workingHours = [
    "9am",
    "10am",
    "11am",
    "12pm",
    "1pm",
    "2pm",
    "3pm",
    "4pm",
    "5pm"
];

function displayTimeBlocks() {
         for (var i = 0; i < workingHours.length; i++) {
            
        var descriptionEl = $("<textarea>").addClass("description col-10");
        var timeBlockEl = $("<div>").addClass("row time-block");
        var hourEl = $("<div>").addClass("hour col-1");
        var iconEl = $("<i>").addClass("fas fa-save");
        var saveBtnEl = $("<button>").addClass("saveBtn col-1").append(iconEl);
        
        hourEl.attr("data-hour", parseInt(workingHours[i]));
        descriptionEl.attr("data-hour", parseInt(workingHours[i]));
        saveBtnEl.attr("data-hour", parseInt(workingHours[i]));

        timeBlockEl.append(hourEl.text(workingHours[i]));
        timeBlockEl.append(descriptionEl);
        timeBlockEl.append(saveBtnEl);

        $(".container").append(timeBlockEl);
    }
}
// color code time-blocks to indicate whether it is in the past, present, or future


// user can enter an event in a time-block 


// user can save event to local storage


// saved events persist when page is refreshed
function init() {
    displayTimeBlocks();
}
init();
});