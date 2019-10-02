import { AppSate } from "./config/AppState";
import { UserCollection } from "./model/UserCollection";
import { AComponent, IComponentProps } from "./ui/AComponent";
import { Results } from "./ui/component/Results";
import { Start } from "./ui/component/Start";
import { ComponentName } from "./ui/ComponentName";
import { AddUser } from "./ui/component/AddUser";
import { UserVO } from "./model/UserVO";

class App {
  rootElement: HTMLElement;
  component: AComponent<IComponentProps>;
  drawerCollection: UserCollection = new UserCollection();
  state: AppSate = AppSate.Start;
  prevState: AppSate = null;

  constructor(rootElement: HTMLElement) {
    this.rootElement = rootElement;
  }

  // ------------------------------
  //  STATE
  // ------------------------------

  private _setState(newState: AppSate) {
    if (this.state != newState) {
      this.prevState = this.state;
      this.state = newState;
      this.render();
    }
  }

  // ------------------------------
  //  COMPONENT
  // ------------------------------

  private _setComponent(name: ComponentName) {
    let props: any = {};
    switch (name) {
      case ComponentName.Start:
        props = {
          onUpdate: this.onUpdate,
          onAddUser: this.onAddUser,
          onStartDraw: this.onStartDraw
        };
        this.component = new Start(this.drawerCollection, props);
        break;
      case ComponentName.AddUser:
        props = {
          onUpdate: this.onUpdate,
          onAddedUser: this.onAddedUser,
          onBack: this.onBack
        };
        this.component = new AddUser(this.drawerCollection, props);
        break;
      case ComponentName.Results:
        props = {
          onAddUser: this.onAddUser,
          onUpdate: this.onUpdate,
          onRestart: this.onRestart
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
  onBack = (event: any) => {
    this._setState(this.prevState);
  };
  onAddUser = (event: any) => {
    this._setState(AppSate.AddDrawer);
  };
  onAddedUser = (vo: UserVO) => {
    this.drawerCollection.addUser(vo);
    this._setState(this.prevState);
  };
  onStartDraw = (event: any) => {
    this._setState(AppSate.Results);
  };
  onRestart = (event: any) => {
    this.drawerCollection.reset();
    this._setState(AppSate.Start);
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
        this._setComponent(ComponentName.AddUser);
        break;
      case AppSate.Results:
        this._setComponent(ComponentName.Results);
        break;
    }

    // render
    let html = `
      <div id='root'>
        <div id='content'>
          <h3>ROBINSON DRAW NAMES</h3>
          ${this.component.render()}
        </div>
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
