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
    let a = [];
    this.drawers.getDrawers().map(vo => a.push(this._renderDrawer(vo)));
    return a;
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

  // ------------------------------
  //  AComponent
  // ------------------------------
  render() {
    let html = `
      <div>
        <table id="table"><tr><td>NAME: </td></tr>${this._renderListDrawers()}</table>
        <button type="button" id="addButton">Add drawer</button>
        ${this._renderMatchingButton()}
        <button type="button" id="resetButton">Reset</button>
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
    document
      .getElementById("drawButton")
      .addEventListener("click", this.props.onStartDraw);
    document
      .getElementById("resetButton")
      .addEventListener("click", this._onReset);
  }
}
