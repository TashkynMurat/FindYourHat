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

    Game() {
        let gameInProgress = true;
        while(gameInProgress) {
            this.print();
            this.question();
            if (this.isHat()) {
                console.log('You won!');
                gameInProgress = false;
                break;
            } else if (this.isHole) {
                console.log('You fell in hole!');
                gameInProgress = false;
                break;
            } else if (!(this.Boundaries)) {
                console.log('You are out of boundaries!');
                gameInProgress = false;
                break;
            }

            this.field[this.locationY][this.locationX] = pathCharacter;
        }
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

    Boundaries() {
        return (
            this.locationY >= 0 &&
            this.locationX >= 0 &&
            this.locationY < this.field.length &&
            this.locationX < this.field[0].length
          );
    }
}

const test = new Field([
    ['*', '░', '0'],
    ['░', '0', '░'],
    ['░', '^', '░']]);
test.Game();