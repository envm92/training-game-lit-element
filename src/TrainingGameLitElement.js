import { LitElement, html, css } from 'lit-element';
import '@material/mwc-top-app-bar';

export class TrainingGameLitElement extends LitElement {
  static get properties() {
    return {
      title: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        height: 100vh;
        display: flex;
        flex-direction: column;
      }
      main {
        flex-grow: 4;
      }
      main h1 {
        text-align: center;
      }

      mwc-top-app-bar {
        --mdc-theme-primary: lightgray;
        --mdc-theme-on-primary: black;
        --mdc-typography-headline6-font-size: 12px;
      }
    `;
  }

  constructor() {
    super();
    this.title = 'Traing Game';
  }

  render() {
    return html`
      <main>
        <h1>${this.title}</h1>
        <my-board></my-board>
      </main>
      <mwc-top-app-bar centerTitle class="footer">
        <div slot="title">Made with LitElement 🌸 by Eri Val  </div>
      </mwc-top-app-bar>
    `;
  }
}
