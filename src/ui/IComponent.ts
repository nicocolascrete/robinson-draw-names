export interface IComponent<T> {
  props: T;
  render: () => void;
  postRender: () => void;
}
