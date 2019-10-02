import { AComponent, IComponentProps } from "../AComponent";
import { UserVO } from "../../model/UserVO";

export interface AddUserProps extends IComponentProps {
  onAddedUser: (vo: UserVO) => void;
  onBack: () => void;
}

export class AddUser extends AComponent<AddUserProps> {
  props: AddUserProps;
  inputUserName: HTMLInputElement;
  userName: string = "";
  userConjoint: string = "";

  // ------------------------------
  //  USER ACTIONS
  // ------------------------------

  private _onChangeUserName = (event: any) => {
    this.userName = event.target.value;
  };
  private _onChangeUserConjoint = (event: any) => {
    this.userConjoint = event.target.value;
  };
  private _onSubmit = (event: any) => {
    if (this.userName == "" || this.users.getUser(this.userName)) {
      alert("Désolé mais ce nom est déjà utilisé");
      return;
    }
    if (this.userConjoint != "" && !this.users.getUser(this.userConjoint)) {
      alert("Désolé mais votre conjint n'est pas dans la liste actuellement");
      return;
    }
    const vo = new UserVO(this.userName, this.userConjoint);
    this.props.onAddedUser(vo);
  };

  // ------------------------------
  //  AComponent
  // ------------------------------
  render() {
    return `
      <form>
        User name: <input type="text" id="userName"><br>
        User conjoint: <input type="text" id="userConjoint"><br>
        <div id="buttons">
          <button type="button" id="submitButton">Submit</button>
          <button type="button" id="backButton">Back</button>
        </div>
      </form>
    `;
  }
  postRender() {
    document
      .getElementById("userName")
      .addEventListener("change", this._onChangeUserName);
    document
      .getElementById("userConjoint")
      .addEventListener("change", this._onChangeUserConjoint);
    document
      .getElementById("submitButton")
      .addEventListener("click", this._onSubmit);
    document
      .getElementById("backButton")
      .addEventListener("click", this.props.onBack);
  }
}
