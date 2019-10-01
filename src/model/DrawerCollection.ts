import { DrawerVO } from "./DrawerVO";
import { MatchVO } from "./MatchVO";

export class DrawerCollection {
  drawers: DrawerVO[] = [];

  constructor() {}

  // ------------------------------
  //
  // ------------------------------
  public addDrawer(vo: DrawerVO) {
    this.drawers.push(vo);
  }
  public reset() {
    this.drawers = [];
  }
  public getDrawers(): DrawerVO[] {
    return this.drawers;
  }
  public getDrawer(name: string): DrawerVO {
    const results = this.drawers.filter(drawer => drawer.name == name);
    if (results.length > 0) {
      return results[0];
    }
    return null;
  }
  public matching(): MatchVO[] {
    let matchs: MatchVO[] = [];
    let drawerMatchable = Object.assign([], this.drawers);
    let drawers = Object.assign([], this.drawers);
    drawers = this._shuffle<DrawerVO>(drawers);
    //TODO sort drawers, drawer with exlude drawer in first

    // matching
    for (let drawer of drawers) {
      let a = Object.assign([], drawerMatchable);
      //exclude current drawer
      a = a.filter(vo => vo.name !== drawer.name);
      //current drawer excludeDrawers
      for (let name of drawer.excludeDrawers) {
        const undesirable = this.getDrawer(name);
        if (undesirable !== null) {
          a = a.filter(vo => vo.name !== undesirable.name);
        }
      }
      if (a.length > 0) {
        const receveuverId = Math.floor(Math.random() * a.length);
        const receveuver = a[receveuverId];
        drawerMatchable = drawerMatchable.filter(
          vo => vo.name !== receveuver.name
        );
        const match = new MatchVO(drawer, receveuver);
        matchs.push(match);
      }
    }
    // algorythme à améliorer
    if (matchs.length == this.drawers.length) {
      return matchs;
    } else {
      return this.matching();
    }
  }

  // utils to externalise in UtilsArray
  private _shuffle<T>(a: T[]): T[] {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}
