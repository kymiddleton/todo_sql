// Gathering date/hours to render different background image for morning, afternoon and evening. 

/**
 * Returns a different background image depending on the time of day.
 * A conditional is used to set the morning image if the time is less than 12 hours.
 * The afternoon image displays if the time is between 12 and 17 hours.
 * The evening image displays if the time is equal or greater than 17 hours to 24 hours.
 */

const hours = new Date().getHours();
// const hours = 13;
const morning = ('morning');
const afternoon = ('afternoon');
const evening = ('evening');

if (hours >= 0 && hours < 12) {
    message = morning;
    document.body.className = "morning"; 

} else if (hours >= 12 && hours < 17) {
    message = afternoon;
    document.body.className = "afternoon"; 

} else if (hours >= 17 && hours < 24) {
    message = evening;
    document.body.className = "evening"; 
}

// $('#background').append(message);