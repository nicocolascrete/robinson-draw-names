import { AComponent } from "../AComponent";

export interface ResultsProps {}

export class Results extends AComponent<ResultsProps> {
  props: ResultsProps;

  // ------------------------------
  // ------------------------------
  render() {
    return `
      <div>
        RESULTS
      </div>
    `;
  }
  postRender() {}
}
