import boardDef from "./Board.js";
import React, { useEffect, useState } from "react";

class Pacman {
  x;
  y;
  direction;
  derniereDirection;
  score;
  nombreBonbon = 178;
  constructor() {
    this.x = 5;
    this.y = 2;
    this.direction = 4;
    this.derniereDirection = "";
    this.score = 0;
  }

  bougePacMan() {
    let _grille = document.querySelector("#grille");
    let pacMan = document.createElement("div");

    if (this.direction == 0) {
      this.x++;
      pacMan.style.transform = "rotate(0deg)";
    } else if (this.direction == 1) {
      this.x--;
      pacMan.style.transform = "rotate(180deg)";
    } else if (this.direction == 2) {
      this.y++;
      pacMan.style.transform = "rotate(90deg)";
    } else if (this.direction == 3) {
      this.y--;
      pacMan.style.transform = "rotate(270deg)";
    }
    pacMan.classList.add("pacman");
    this.testCollisionPacMan();
    this.sortMur();
    this.mangeBonbon();
    pacMan.style.gridColumn = this.x;
    pacMan.style.gridRow = this.y;
    _grille.appendChild(pacMan);
    if (this.nombreBonbon <= 0) {
      alert("Vous avez gagné !");
      window.location.reload();
    }
  }

  testCollisionPacMan() {
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

  sortMur() {
    if (this.x > boardDef[0].length) {
      this.x = 1;
    }
    if (this.x < 1) {
      this.x = boardDef[0].length;
    }
  }

  compteBonbon() {
    for (let ligne in boardDef) {
      for (let col in boardDef[ligne]) {
        if (boardDef[ligne][col] == 2) {
          this.nombreBonbon++;
        }
      }
    }
  }

  mangeBonbon() {
    if (boardDef[this.y - 1][this.x - 1] == 2) {
      boardDef[this.y - 1][this.x - 1] = 1;
      this.nombreBonbon--;
      this.score++;
    }
  }

  collisionFantomePacman(blocF) {
    if (blocF.x == this.x) {
      if (blocF.y == this.y) {
        this.direction = -1;
        this.blocF = -1;
        alert("Game over...");
        window.location.reload();
      }
    } else if (this.direction == 0 && blocF.direction == 1) {
      if (blocF.x - 1 == this.x) {
        if (blocF.y == this.y) {
          this.direction = -1;
          this.blocF = -1;
          alert("Game over...");
          window.location.reload();
        }
      }
    } else if (this.direction == 1 && blocF.direction == 0) {
      if (blocF.x + 1 == this.x) {
        if (blocF.y == this.y) {
          this.direction = -1;
          this.blocF = -1;
          alert("Game over...");
          window.location.reload();
        }
      }
    } else if (this.direction == 2 && blocF.direction == 3) {
      if (blocF.y + 1 == this.y) {
        if (blocF.x == this.x) {
          this.direction = -1;
          this.blocF = -1;
          alert("Game over...");
          window.location.reload();
        }
      }
    } else if (this.direction == 3 && blocF.direction == 2) {
      if (blocF.y - 1 == this.y) {
        if (blocF.x == this.x) {
          this.direction = -1;
          this.blocF = -1;
          alert("Game over...");
          window.location.reload();
        }
      }
    }
  }
}

export default Pacman;
