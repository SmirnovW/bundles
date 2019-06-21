import {App} from 'app';

const myApp = new App();
console.log('application name', myApp.getAppName());


function* test() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
}

const generator = test();

generator.next();
generator.next();
generator.next();