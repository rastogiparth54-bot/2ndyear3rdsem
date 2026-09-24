const EventEmitter = require('events');

class Element extends EventEmitter {
    constructor(name, parent = null) {
        super();
        this.name = name;
        this.parent = parent;
    }

    addEventListener(type, handler) {
        this.on(type, handler);
    }

    removeEventListener(type, handler) {
        this.off(type, handler);
    }

    dispatchEvent(type, data) {
        const event = {
            type: type,
            target: this,
            currentTarget: this,
            data: data,
            stopped: false,

            stopPropagation() {
                this.stopped = true;
            }
        };

        let current = this;

        while (current) {
            event.currentTarget = current;

            current.emit(type, event);

            if (event.stopped) {
                break;
            }

            current = current.parent;
        }
    }
}

const documentElement = new Element('document');
const form = new Element('form', documentElement);
const button = new Element('button', form);

function buttonClickHandler(event) {
    console.log(
        `Button handler: target = ${event.target.name}, currentTarget = ${event.currentTarget.name}`
    );
}

function formClickHandler(event) {
    console.log(
        `Form handler: target = ${event.target.name}, currentTarget = ${event.currentTarget.name}`
    );
}

function documentClickHandler(event) {
    console.log(
        `Document handler: target = ${event.target.name}, currentTarget = ${event.currentTarget.name}`
    );
}

button.addEventListener('click', buttonClickHandler);
form.addEventListener('click', formClickHandler);
documentElement.addEventListener('click', documentClickHandler);


console.log('\n--- Scenario A ---');
console.log('Clicking button:');

button.dispatchEvent('click', 'Button clicked');


console.log('\n--- Scenario B ---');
console.log('Form stops propagation:');

function stopFormPropagation(event) {
    console.log(
        `Form handler: target = ${event.target.name}, currentTarget = ${event.currentTarget.name}`
    );

    event.stopPropagation();
}

form.removeEventListener('click', formClickHandler);
form.addEventListener('click', stopFormPropagation);

button.dispatchEvent('click', 'Button clicked');


console.log('\n--- Scenario C ---');
console.log('Button listener removed:');

button.removeEventListener('click', buttonClickHandler);

button.dispatchEvent('click', 'Button clicked');

console.log('\n--- Keypress Event ---');

form.addEventListener('keypress', (event) => {
    console.log(
        `Keypress handler: target = ${event.target.name}, currentTarget = ${event.currentTarget.name}, data = ${event.data}`
    );
});

form.dispatchEvent('keypress', 'Enter key pressed');