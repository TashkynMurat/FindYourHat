const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this.field = field;
        this.locationX = 0;
        this.locationY = 0;
        this.field[0][0] = pathCharacter;
    }

    print() {
        for(let i = 0; i < this.field.length; i++) {
            console.log(this.field[i].join(''));
        }
    }

    question() {
        const input = prompt('Where? (U, D, L, R)').toUpperCase();
        switch (input) {
            case 'U':
                this.locationY -= 1;
                break;
            case 'D':
                this.locationY += 1;
                break;
            case 'L':
                this.locationX -= 1;
                break;
            case 'R':
                this.locationX += 1;
            default:
                console.log('You enetered invalid value! Try again! (U - up, D - down, L - left, R - right)');
                this.question();
                break;

        }
    }

    isHole() {
        return this.field[this.locationY][this.locationX] === hole;
    }

    isHat() {
        return this.field[this.locationY][this.locationX] === hat;
    }
}

const test = new Field([
    ['*', '░', '0'],
    ['░', '0', '░'],
    ['░', '^', '░']]);
test.print();