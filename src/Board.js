import { LitElement, html, css } from 'lit-element';
import {live} from 'lit-html/directives/live';
import '@material/mwc-textfield';

export class Board extends LitElement {
  
  static get properties() {
    return {
      won: { type: Number },
      lost: { type: Number },
      boxCount: { type: Number },
      boxes: { type: Array },
      winner: { type: Number },
      isWinner: { type: Boolean },
      tries: { type: Number }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      div {
        display: grid;
        width: 100%;
        height: auto;
        grid: auto-flow / 1fr 1fr 1fr 1fr 1fr;
      }
    `;
  }

  _endGame(isOver) {
    if (isOver) {
      this._showAlert((this.isWinner) ? 'You win!!' : 'Game over');
      this._updateScore(this.isWinner);
      this._resetGame();
    }
  }

  _initGame() {
    this.winner = Math.floor(Math.random() * Math.floor(this.boxCount));
    this.boxes = Array.from({length: this.boxCount}, (value, i) => {
      return {
        isOpen: false,
        isWinner: i === this.winner,
      }
    });
  }

  boxIsOpen(e) {
    if (e.detail) {
      if(!e.detail.isWinner) {
        this.tries += 1; 
      } else {
        this.isWinner = true;
      }
      this._endGame(this.isWinner || this.tries === 3);
    }
  }

  _showAlert(msg) {
    alert(msg);
  }

  _resetGame() {
    this.isWinner = false;
    this.tries = 0;
    this.boxes = [];
    setTimeout(() => {
      this._initGame();
    }, 200);

  }

  _updateScore(win) {
    if (win) {
      this.won += 1; 
    } else {
      this.lost += 1;
    }
  }

  inputChange() {
    this.boxCount = this.inputEl.value;
    this._resetGame();
  }

  constructor() {
    super();
    this.won = 0;
    this.lost = 0;
    this.boxCount = 5;
    this.boxes = [];
    this.winner = -1;
    this.isWinner = false;
    this.tries = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    this._initGame();
    document.addEventListener('openBox', (e) =>{
      if (e.detail) {
        if(!e.detail.isWinner) {
          this.tries += 1; 
        } else {
          this.isWinner = true;
        }
        this._endGame(this.isWinner || this.tries === 3);
      }
    });
  }

  render () {
    return html`
      <mwc-textfield id="count" outlined max="10000" min="5" type="number" .value=${live(this.boxCount || 5)} @input="${this.inputChange}"></mwc-textfield>
      <my-score .lost=${this.lost} .won=${this.won}></my-score>
      <h2>Tries: ${this.tries}</h2>
      <div>
        ${this.boxes.map(item => html`<my-box ?iswinner="${item.isWinner}"></my-box>`)}
      </div>
    `;
  }

  get inputEl() {
    return this.shadowRoot.getElementById('count');
  }
}