import { LitElement, html, css } from 'lit-element';

export class Score extends LitElement {
  static get properties() {
    return {
      won: { type: Number },
      lost: { type: Number }
    };
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        flex-direction: row;
      }
      div {
        padding: 0 2vh 
      }
    `;
  }

  constructor() {
    super();
    this.won = 0;
    this.lost = 0;
  }

  render () {
    return html`
      <div>
        <h2>Won: ${this.won}</h2>
      </div>
      <div>
        <h2>Lost: ${this.lost}</h2>
      </div>
    `;
  }
}