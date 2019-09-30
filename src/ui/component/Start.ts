import { AComponent } from "../AComponent";
import { DrawerVO } from "../../model/DrawerVO";

export interface StartProps {
  onAddDrawer: () => void;
  onStartDraw: () => void;
}

export class Start extends AComponent<StartProps> {
  props: StartProps;

  // ------------------------------
  //  RENDER
  // ------------------------------

  private _renderDrawer(vo: DrawerVO) {
    console.log("_renderDrawer, ", vo.name);
    return `<div>${vo.name}</div>`;
  }

  // ------------------------------
  //  AComponent
  // ------------------------------
  render() {
    return `
      <div>
        ${this.drawers.getDrawers().map(vo => this._renderDrawer(vo))}
        <button type="button" id="addButton">Add drawer</button>
        <button type="button" id="drawButton">Start Draw</button>
      </div>
    `;
  }
  postRender() {
    document
      .getElementById("addButton")
      .addEventListener("click", this.props.onAddDrawer);
    document
      .getElementById("drawButton")
      .addEventListener("click", this.props.onStartDraw);
  }
}
