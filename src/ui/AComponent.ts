import { IComponent } from "./IComponent";
import { DrawerCollection } from "../model/DrawerCollection";
export interface IComponentProps {
  onUpdate: () => void;
}
export class AComponent<T extends IComponentProps> implements IComponent<T> {
  props: T;
  drawers: DrawerCollection;

  constructor(drawers: DrawerCollection, props: T) {
    this.props = props;
    this.drawers = drawers;
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
