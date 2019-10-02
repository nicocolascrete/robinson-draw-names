import { UserVO } from "./UserVO";

export class MatchVO {
  id: string;
  giver: UserVO;
  receveuver: UserVO;

  constructor(giver: UserVO, receveuver: UserVO) {
    this.id = Math.ceil(Math.random() * new Date().getTime()).toString();
    this.giver = giver;
    this.receveuver = receveuver;
  }
}
