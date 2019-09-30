import { IComponent } from "./IComponent";
import { DrawerCollection } from "../model/DrawerCollection";

export class AComponent<T> implements IComponent<T> {
  props: T;
  drawers: DrawerCollection;

  constructor(drawers: DrawerCollection, props: T) {
    this.props = props;
    this.drawers = drawers;
  }

  // ------------------------------
  //  RENDER
  // ------------------------------
  render() {}
  postRender() {}
}
