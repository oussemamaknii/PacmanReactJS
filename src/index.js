import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Fantome from "./Classes/Fantom.js";
import board from "./Classes/Board.js";
import PacMan from "./Classes/Pacman.js";

function Game() {
  const fps = 10;

  var fantomeBleu = new Fantome();
  var fantomeRouge = new Fantome();
  var fantomeOrange = new Fantome();
  var fantomeVert = new Fantome();

  var pacMan = new PacMan();

  useEffect(() => {
    document.onkeypress = appuieTouche;
    boucleRefresh();
  }, []);

  function boucleRefresh() {
    initBoard();
    fantomeBleu.bougeMonFantome("fantome-bleu", pacMan);
    fantomeRouge.bougeMonFantome("fantome-rouge", pacMan);
    fantomeOrange.bougeMonFantome("fantome-orange", pacMan);
    fantomeVert.bougeMonFantome("fantome-vert", pacMan);

    pacMan.bougePacMan(fantomeBleu, fantomeRouge, fantomeOrange, fantomeVert);
    setTimeout(boucleRefresh, 1000 / fps);
    var directionElem = document.getElementById("sens");
    directionElem.innerHTML = "Sens Pacman : " + pacMan.derniereDirection;
    var scoreElem = document.getElementById("score");
    scoreElem.innerHTML = "Score : " + pacMan.score;
  }

  function initBoard() {
    let _grille = document.querySelector("#grille");
    _grille.innerHTML = "";
    _grille.style =
      "grid-template-columns: repeat(" +
      board[0].length +
      ", 40px);  grid-template-rows: repeat(" +
      board.length +
      ", 40px)";

    board.map((boardLine, indexX) => {
      return boardLine.map((boardElement, indexY) => {
        let monElement = document.createElement("div");
        if (boardElement == 0) {
          monElement.classList.add("mur");
        } else if (boardElement == 1) {
          monElement.classList.add("sol");
        } else if (boardElement == 2) {
          monElement.classList.add("bonbon");
        }
        monElement.style.gridColumn = +indexY + 1;
        monElement.style.gridRow = +indexX + 1;
        _grille.appendChild(monElement);
      });
    });
  }

  function appuieTouche(event) {
    switch (event.key) {
      case "d":
      case "D":
        pacMan.direction = 0;
        pacMan.derniereDirection = "Avance";
        break;
      case "q":
      case "Q":
        pacMan.direction = 1;
        pacMan.derniereDirection = "Recule";
        break;
      case "s":
      case "S":
        pacMan.direction = 2;
        pacMan.derniereDirection = "Descend";
        break;
      case "z":
      case "Z":
        pacMan.direction = 3;
        pacMan.derniereDirection = "Monte";
        break;
    }
  }

  return (
    <div className="game">
      <div className="game-info">
        <p id="score">Score :</p>
        <p id="sens">Sens Pacman :</p>
      </div>
      <h1>Pacman</h1>
      <div id="grille"></div>
    </div>
  );
}

// ========================================

const root = createRoot(document.getElementById("root"));
root.render(<Game />);
