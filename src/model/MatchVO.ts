import { DrawerVO } from "./DrawerVO";

export class MatchVO {
  id: string;
  giver: DrawerVO;
  receveuver: DrawerVO;

  constructor(giver: DrawerVO, receveuver: DrawerVO) {
    this.id = Math.ceil(Math.random() * new Date().getTime()).toString();
    this.giver = giver;
    this.receveuver = receveuver;
  }
}
