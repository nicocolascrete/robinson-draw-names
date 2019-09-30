import { AComponent } from "../AComponent";
import { DrawerVO } from "../../model/DrawerVO";

export interface AddDrawerProps {
  onAddedDrawer: (vo: DrawerVO) => void;
}

export class AddDrawer extends AComponent<AddDrawerProps> {
  props: AddDrawerProps;
  inputDrawerName: HTMLInputElement;
  drawerName: string = "";
  drawerConjoint: string = "";

  // ------------------------------
  //  USER ACTIONS
  // ------------------------------

  private _onChangeDrawerName = (event: any) => {
    this.drawerName = event.target.value;
  };
  private _onChangeDrawerConjoint = (event: any) => {
    this.drawerConjoint = event.target.value;
  };
  private _onSubmit = (event: any) => {
    const vo = new DrawerVO(this.drawerName, this.drawerConjoint);
    this.props.onAddedDrawer(vo);
  };

  // ------------------------------
  //  AComponent
  // ------------------------------
  render() {
    return `
      <form>
        Drawer name: <input type="text" id="drawerName"><br>
        Drawer conjoint: <input type="text" id="drawerConjoint"><br>
        <input type="button" value="Submit" id="submitButton">
      </form>
    `;
  }
  postRender() {
    document
      .getElementById("drawerName")
      .addEventListener("change", this._onChangeDrawerName);
    document
      .getElementById("drawerConjoint")
      .addEventListener("change", this._onChangeDrawerConjoint);
    document
      .getElementById("submitButton")
      .addEventListener("click", this._onSubmit);
  }
}
