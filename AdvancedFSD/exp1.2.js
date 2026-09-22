const EventEmitter = require('events');

// Create an event emitter object
const button = new EventEmitter();

// Add event listeners
button.on('click', () => {
    console.log("Button was clicked!");
});

button.on('mouseover', () => {
    console.log("Mouse is over the button!");
});

// Trigger events
button.emit('click');
button.emit('mouseover');