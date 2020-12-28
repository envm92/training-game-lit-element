import { LitElement, html } from 'lit-element';

export class Score extends LitElement {
  static get properties() {
    return {
      won: { type: Number },
      lost: { type: Number }
    };
  }

  constructor() {
    super();
    this.won = 0;
    this.lost = 0;
  }

  render () {
    return html`
      <div>
        <h2>Won: ${this.won}</h2> |
        <h2>Lost: ${this.lost}</h2>
      </div>
    `;
  }
}