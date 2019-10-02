import { IComponent } from "./IComponent";
import { UserCollection } from "../model/UserCollection";
export interface IComponentProps {
  onUpdate: () => void;
}
export class AComponent<T extends IComponentProps> implements IComponent<T> {
  props: T;
  users: UserCollection;

  constructor(drawers: UserCollection, props: T) {
    this.props = props;
    this.users = drawers;
  }

  // ------------------------------
  //  RENDER
  // ------------------------------
  update() {
    this.props.onUpdate();
  }
  render() {}
  postRender() {}
}
