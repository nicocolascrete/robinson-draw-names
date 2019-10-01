import { AComponent, IComponentProps } from "../AComponent";
import { DrawerVO } from "../../model/DrawerVO";

export interface StartProps extends IComponentProps {
  onAddDrawer: () => void;
  onStartDraw: () => void;
}

export class Start extends AComponent<StartProps> {
  props: StartProps;

  // ------------------------------
  //  USER ACTIONS
  // ------------------------------

  private _onReset = (event: any) => {
    this.drawers.reset();
    this.update();
  };

  // ------------------------------
  //  RENDER
  // ------------------------------

  private _renderListDrawers() {
    if (this.drawers.getDrawers().length > 0) {
      let a = [];
      this.drawers.getDrawers().map(vo => a.push(this._renderDrawer(vo)));
      return `<table id="table"><tr><td>NAME</td></tr>${a}</table>`;
    }
    return `<p>Welcome to robinson draw names, the application that will allow you to prepare the draw for your family gifts.</p>`;
  }
  private _renderDrawer(vo: DrawerVO) {
    return `<tr><td>${vo.name}</td></tr>`;
  }
  private _renderMatchingButton() {
    if (this.drawers.getDrawers().length > 1) {
      return `<button type="button" id="drawButton">Start Draw</button>`;
    }
    return "";
  }
  private _renderResetButton() {
    if (this.drawers.getDrawers().length > 0) {
      return `<button type="button" id="resetButton">Reset</button>`;
    }
    return "";
  }

  // ------------------------------
  //  AComponent
  // ------------------------------
  render() {
    let html = `
      <div>
        ${this._renderListDrawers()}
        <button type="button" id="addButton">Add drawer</button>
        ${this._renderMatchingButton()}
        ${this._renderResetButton()}
      </div>
    `;
    // patch
    html = html.replace(/,/g, "");
    return html;
  }
  postRender() {
    //user action
    document
      .getElementById("addButton")
      .addEventListener("click", this.props.onAddDrawer);
    if (document.getElementById("drawButton")) {
      document
        .getElementById("drawButton")
        .addEventListener("click", this.props.onStartDraw);
    }
    if (document.getElementById("resetButton")) {
      document
        .getElementById("resetButton")
        .addEventListener("click", this._onReset);
    }
  }
}
