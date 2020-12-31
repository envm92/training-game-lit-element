import { LitElement, html, css } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map';

export class Box extends LitElement {
  static get properties() {
    return {
      isWinner: { type: Boolean },
      isOpen: { type: Boolean, attribute: true },
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
    this.styles = { background: 'gray', cursor: 'pointer' };

  }

  _onClick() {
    if (!this.isOpen) {
      this.isOpen = true;
    }
  }

  _itemChange() {
    let currStyle = { background: 'gray'};
    if (this.isOpen) {
      currStyle.background = this.isWinner ? 'blue' : 'red';
      currStyle.cursor = 'not-allowed';
      this.updateComplete.then(() => {
        document.dispatchEvent(new CustomEvent('openBox', {detail: {
          isWinner: this.isWinner
        }}));
      });
    }
    this.styles = currStyle;
    
  }

  update(changedProperties) {
    super.update(changedProperties);
    if(changedProperties.has('isOpen') && (changedProperties.get('isOpen') !== undefined)) {
      this._itemChange();
    }
  }

  render () {
    return html`
      <div id="box" @click="${this._onClick}" style=${styleMap(this.styles)}></div>
    `;
  }
}