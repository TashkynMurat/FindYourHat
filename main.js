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
        let playing = true;
        while (playing) {
          this.print();
          this.askQuestion();
          if (!this.isInBounds()) {
            console.log('You are out of boundaries!');
            playing = false;
            break;
          } else if (this.isHole()) {
            console.log('You fell into the hole');
            playing = false;
            break;
          } else if (this.isHat()) {
            console.log('You won!');
            playing = false;
            break;
          }
          // Update the current location on the map
          this.field[this.locationY][this.locationX] = pathCharacter;
        }
      }
    
      askQuestion() {
        const answer = prompt('Which way? ').toUpperCase();
        switch (answer) {
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
            break;
          default:
            console.log('Enter U, D, L or R.');
            this.askQuestion();
            break;
        }
      }
    
      isInBounds() {
        return (
          this.locationY >= 0 &&
          this.locationX >= 0 &&
          this.locationY < this.field.length &&
          this.locationX < this.field[0].length
        );
      }
    
      isHat() {
        return this.field[this.locationY][this.locationX] === hat;
      }
    
      isHole() {
        return this.field[this.locationY][this.locationX] === hole;
      }
        
    
    print() {
        for(let i = 0; i < this.field.length; i++) {
            console.log(this.field[i].join(''));
        }
    }

    static generateField(width, height, percentage = 0.1) {
      let newField = new Array(height).fill(0).map(el => new Array(width));
        for (let i = 0; i < height; i++) {
          for (let j = 0; j < width; j++) {
            const probability = Math.random()
            newField[i][j] = probability > percentage ? fieldCharacter : hole;
          }
        }

        const locationOfHat = {
          x: Math.floor(Math.random() * width),
          y: Math.floor(Math.random() * height)
        };

        while (locationOfHat.x === 0 && locationOfHat.y === 0) {
          locationOfHat.x = Math.floor(Math.random() * width);
          locationOfHat.y = Math.floor(Math.random() * height);
        }
        newField[locationOfHat.y][locationOfHat.x] = hat;
        return newField;
    } 
}


const test = new Field(Field.generateField(15, 15, 0.2));
test.Game();