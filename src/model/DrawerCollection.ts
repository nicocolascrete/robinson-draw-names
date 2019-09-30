import { DrawerVO } from "./DrawerVO";

export class DrawerCollection {
  drawers: DrawerVO[] = [];

  constructor() {}

  // ------------------------------
  //
  // ------------------------------
  public addDrawer(vo: DrawerVO) {
    this.drawers.push(vo);
  }
  public getDrawers(): DrawerVO[] {
    return this.drawers;
  }
}
