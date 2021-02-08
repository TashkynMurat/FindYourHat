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
}
