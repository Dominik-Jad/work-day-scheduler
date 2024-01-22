// when the document is ready, run the following function
$(document).ready(function () {
    // display current day at top of the page 
    var today = dayjs().format('dddd D MMMM YYYY');
    $("#currentDay").text(today);
    // array of working hours 
    var workingHours = [
        "9AM",
        "10AM",
        "11AM",
        "12PM",
        "1PM",
        "2PM",
        "3PM",
        "4PM",
        "5PM"
    ];
    // present time-blocks for standard business hours (9am-5pm)
    function displayTimeBlocks() {
        for (var i = 0; i < workingHours.length; i++) {
            // create elements for time-blocks
            var descriptionEl = $("<textarea>").addClass("description col-9");
            var timeBlockEl = $("<div>").addClass("row time-block");
            var hourEl = $("<div>").addClass("hour col-1");
            var iconSaveEl = $("<i>").addClass("fas fa-save");
            var saveBtnEl = $("<button>").addClass("saveBtn col-1").append(iconSaveEl);
            var iconDeleteEl = $("<i>").addClass("fas fa-trash");
            var deleteBtnEl = $("<button>").addClass("deleteBtn col-1").append(iconDeleteEl);
            // add data attributes to elements for each hour of the work day
            hourEl.attr("data-hour", workingHours[i]);
            descriptionEl.attr("data-hour", workingHours[i]);
            saveBtnEl.attr("data-hour", workingHours[i]);
            deleteBtnEl.attr("data-hour", workingHours[i]);
            // append elements to the time-block and then appned that to the container
            timeBlockEl.append(hourEl.text(workingHours[i]));
            timeBlockEl.append(descriptionEl, saveBtnEl, deleteBtnEl);
            $(".container").append(timeBlockEl);
        }
    }
    // color code time-blocks to indicate whether it is in the past, present, or future
    function colorCode() {
        // get current hour
        var currentHour = dayjs().hour();
        // get all time-blocks
        var timeBlock = $(".time-block");
        // loop through each time-block
        timeBlock.each(function () {
            // get the hour of the time-block
            var hour = $(this).find(".hour").attr("data-hour");
            // get the description of the time-block. 
            var description = $(this).find(".description");
            // convert the hour to a number from e.g "9AM" to 9
            var hourNum = parseInt(hour);
            // if the hour is in the afternoon, add 12 to the hourNum to convert it to 24 hour time
            // leave 12PM as 12
            if (hour.includes("PM") && hourNum !== 12) {
                hourNum += 12;
            }
            // compare the hourNum to the currentHour and apply the appropriate class
            if (hourNum < currentHour) {
                description.addClass("past");
            } else if (hourNum === currentHour) {
                description.addClass("present");
            } else {
                description.addClass("future");
            }
        });
    }
    // Event listener for save button to save events to local storage delegated to the container
    $(".container").on("click", ".saveBtn", function () {
        // get the hour and description of the time-block
        var hour = $(this).attr("data-hour");
        var description = $(this).siblings(".description").val();
        // if the description is empty, alert the user to enter an event
        if (description === "") {
            return alert("Please enter an event.");
        }
        // save the event to local storage
        localStorage.setItem(hour, description);
    });
    // load from local storage 
    function loadEvents() {
        // loop through each hour of the work day
        for (var i = 0; i < workingHours.length; i++) {
            var hour = workingHours[i];
            var description = localStorage.getItem(hour);
            // add the description to the textarea with the corresponding hour
            var descriptionEl = $(`textarea[data-hour='${hour}']`);
            descriptionEl.val(description);
        }
    }
    // delete event from local storage
    $(".container").on("click", ".deleteBtn", function () {
        // get the hour and description of the time-block
        var hour = $(this).attr("data-hour");
        var description = $(this).siblings(".description").val();
        // remove the event from local storage
        localStorage.removeItem(hour, description);
        // clear the description from the textarea
        $(this).siblings(".description").val("");
    });
    // initialize the page
    function init() {
        displayTimeBlocks();
        loadEvents();
        colorCode();
    }
    init();
});