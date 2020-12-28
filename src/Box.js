import { LitElement, html, css } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';

export class Box extends LitElement {
  static get properties() {
    return {
      isWinner: { type: Boolean },
      isOpen: { type: Boolean, attribute: true },
      currentColor: { type: String },
      styles: { type: String },
    };
  }

  static get styles() {
    return css`
      div {
        align-items: center;
        text-shadow: #000 0 0;
        border-radius: 15px;
        margin: 10px;
        height: 60px;
        width: 60px;
      }
    `;
  }

  constructor() {
    super();
    this.isWinner = false;
    this.isOpen = false;
    this.currentColor = 'gray';
    this.styles = { background: this.currentColor, cursor: 'pointer' };

  }

  _onClick() {
    if (!this.isOpen) {
      this.isOpen = true;
      this.currentColor = this.isWinner ? 'blue' : 'red';
      this.styles = { background: this.currentColor, cursor: 'pointer' };
      setTimeout(() => {
        document.dispatchEvent(new CustomEvent('openBox', {detail: {
          isWinner: this.isWinner
        }}));
      }, 200);
    }
  }

  render () {
    return html`
      <div id="box" @click="${this._onClick}" style=${styleMap(this.styles)}></div>
    `;
  }
}