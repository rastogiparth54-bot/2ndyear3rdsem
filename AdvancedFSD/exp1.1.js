const EventEmitter = require('events');

const emitter = new EventEmitter();

// Greet event
emitter.on('greet', () => {
    console.log('Hello! Welcome!');
});

// Exit event
emitter.on('exit', () => {
    console.log('Goodbye! Exiting...');
});

// Trigger events
emitter.emit('greet');
emitter.emit('exit');