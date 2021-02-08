const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this._field = field;
    }

    get field() {
        return this._field;
    }

    print() {
        for(let i = 0; i < this.field.length; i++) {
            console.log(this.field[i].join(''));
        }
    }
}

const test = new Field([
    ['*', '░', '0'],
    ['░', '0', '░'],
    ['░', '^', '░']]);
test.print();