import { AppSate } from "./config/AppState";
import { DrawerCollection } from "./model/DrawerCollection";
import { AComponent, IComponentProps } from "./ui/AComponent";
import { Results } from "./ui/component/Results";
import { Start } from "./ui/component/Start";
import { ComponentName } from "./ui/ComponentName";
import { AddDrawer } from "./ui/component/AddDrawer";
import { DrawerVO } from "./model/DrawerVO";

class App {
  rootElement: HTMLElement;
  component: AComponent<IComponentProps>;
  drawerCollection: DrawerCollection = new DrawerCollection();
  state: AppSate = AppSate.Start;

  constructor(rootElement: HTMLElement) {
    this.rootElement = rootElement;
  }

  // ------------------------------
  //  STATE
  // ------------------------------

  private _setState(newState: AppSate) {
    if (this.state != newState) {
      this.state = newState;
      this.render();
    }
  }

  // ------------------------------
  //  COMPONENT
  // ------------------------------

  private _setComponent(name: ComponentName) {
    console.log("_setComponent, ", this.drawerCollection.getDrawers());
    let props: any = {};
    switch (name) {
      case ComponentName.Start:
        props = {
          onUpdate: this.onUpdate,
          onAddDrawer: this.onAddDrawer,
          onStartDraw: this.onStartDraw
        };
        this.component = new Start(this.drawerCollection, props);
        break;
      case ComponentName.AddDrawer:
        props = {
          onUpdate: this.onUpdate,
          onAddedDrawer: this.onAddedDrawer
        };
        this.component = new AddDrawer(this.drawerCollection, props);
        break;
      case ComponentName.Results:
        props = {
          onAddDrawer: this.onAddDrawer,
          onUpdate: this.onUpdate
        };
        this.component = new Results(this.drawerCollection, props);
        break;
    }
  }

  // ------------------------------
  //  USER ACTIONS
  // ------------------------------

  onUpdate = () => {
    this.render();
  };
  onAddDrawer = (event: any) => {
    this._setState(AppSate.AddDrawer);
  };
  onAddedDrawer = (vo: DrawerVO) => {
    this.drawerCollection.addDrawer(vo);
    this._setState(AppSate.Start);
  };
  onStartDraw = (event: any) => {
    this._setState(AppSate.Results);
  };

  // ------------------------------
  //  RENDER
  // ------------------------------

  render() {
    // define html stack
    switch (this.state) {
      case AppSate.Start:
        this._setComponent(ComponentName.Start);
        break;
      case AppSate.AddDrawer:
        this._setComponent(ComponentName.AddDrawer);
        break;
      case AppSate.Results:
        this._setComponent(ComponentName.Results);
        break;
    }

    // render
    let html = `
      <div id='root'>
        ${this.component.render()}
      </div>
    `;
    this.rootElement.innerHTML = html;

    // map user actions
    this.component.postRender();
  }
}

// render start up
const app = new App(document.getElementById("app"));
app.render();
