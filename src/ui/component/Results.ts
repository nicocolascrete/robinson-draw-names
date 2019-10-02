import { AComponent, IComponentProps } from "../AComponent";
import { MatchVO } from "../../model/MatchVO";

export interface ResultsProps extends IComponentProps {
  onAddUser: () => void;
  onRestart: () => void;
}

export class Results extends AComponent<ResultsProps> {
  props: ResultsProps;

  // ------------------------------
  //  USER ACTIONS
  // ------------------------------

  private _onMatching = (event: any) => {
    this.update();
  };

  // ------------------------------
  //  RENDER
  // ------------------------------

  private _renderMatch(vo: MatchVO) {
    return `<tr><td>${vo.giver.name}</td><td>${vo.receveuver.name}</td></tr>`;
  }

  // ------------------------------
  //    ACOMPONENT
  // ------------------------------
  render() {
    const matchs = this.users.matching();
    let html = `
      <div>
        <table><tr><td>GIVER</td><td>RECEVER</td></tr>${matchs.map(vo =>
          this._renderMatch(vo)
        )}</table>
        <button type="button" id="matchButton">Rematch</button>
        <button type="button" id="addButton">Add drawer</button>
        <button type="button" id="restartButton">Restart</button>
      </div>
    `;
    // patch
    html = html.replace(/,/g, "");
    return html;
  }
  postRender() {
    document
      .getElementById("matchButton")
      .addEventListener("click", this._onMatching);
    document
      .getElementById("addButton")
      .addEventListener("click", this.props.onAddUser);
    document
      .getElementById("restartButton")
      .addEventListener("click", this.props.onRestart);
  }
}
