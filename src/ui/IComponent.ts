import { IComponentProps } from "./AComponent";

export interface IComponent<T extends IComponentProps> {
  props: T;
  update: () => void;
  render: () => void;
  postRender: () => void;
}
