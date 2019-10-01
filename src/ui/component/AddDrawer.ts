import { AComponent, IComponentProps } from "../AComponent";
import { DrawerVO } from "../../model/DrawerVO";

export interface AddDrawerProps extends IComponentProps {
  onAddedDrawer: (vo: DrawerVO) => void;
  onBack: () => void;
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
    if (this.drawerName == "" || this.drawers.getDrawer(this.drawerName)) {
      alert("Désolé mais ce nom est déjà utilisé");
      return;
    }
    if (
      this.drawerConjoint != "" &&
      !this.drawers.getDrawer(this.drawerConjoint)
    ) {
      alert("Désolé mais votre conjint n'est pas dans la liste actuellement");
      return;
    }
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
        <button type="button" id="backButton">Back</button>
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
    document
      .getElementById("backButton")
      .addEventListener("click", this.props.onBack);
  }
}
