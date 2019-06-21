export class App {
    constructor() {
        this.name = 'My App';

    }

    getAppName() {
        return this.name;
    }

    static getType() {
        return 'class';
    }
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let obj = {
    name: 'Bob',
    age: 23,
};

const {age} = obj;

const arr2 = [...arr, 11, 12];

console.log('element', arr2[2]);