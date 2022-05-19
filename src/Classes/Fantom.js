import boardDef from "./Board.js";

class Fantome {
  x;
  y;
  direction;
  constructor() {
    this.x = 9;
    this.y = 11;
    this.direction = 1;
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  bougeMonFantome(classFantome, pacMan) {
    pacMan.collisionFantomePacman(this);
    let _grille = document.querySelector("#grille");
    this.direction = this.getRandomIntInclusive(0, 3);
    if (this.direction == 0) {
      if (this.x == boardDef[0].length) {
        this.x = 1;
      } else this.x++;
    } else if (this.direction == 1) {
      if (this.x == 1) {
        this.x = boardDef[0].length;
      } else this.x--;
    } else if (this.direction == 2) {
      this.y++;
    } else if (this.direction == 3) {
      this.y--;
    }
    this.collisionFantome();
    let blocF = document.createElement("div");
    blocF.classList.add(classFantome);
    blocF.style.gridColumn = this.x;
    blocF.style.gridRow = this.y;
    _grille.appendChild(blocF);
  }

  collisionFantome() {
    if (this.direction == 0) {
      if (boardDef[this.y - 1][this.x - 1] == 0) {
        this.x--;
      }
    } else if (this.direction == 1) {
      if (boardDef[this.y - 1][this.x - 1] == 0) {
        this.x++;
      }
    } else if (this.direction == 2) {
      if (boardDef[this.y - 1][this.x - 1] == 0) {
        this.y--;
      }
    } else if (this.direction == 3) {
      if (boardDef[this.y - 1][this.x - 1] == 0) {
        this.y++;
      }
    }
  }
}

export default Fantome;
