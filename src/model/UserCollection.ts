import { UserVO } from "./UserVO";
import { MatchVO } from "./MatchVO";

export class UserCollection {
  users: UserVO[] = [];

  constructor() {}

  // ------------------------------
  //
  // ------------------------------
  public addUser(vo: UserVO) {
    this.users.push(vo);
  }
  public reset() {
    this.users = [];
  }
  public getUsers(): UserVO[] {
    return this.users;
  }
  public getUser(name: string): UserVO {
    const results = this.users.filter(user => user.name == name);
    if (results.length > 0) {
      return results[0];
    }
    return null;
  }
  public matching(): MatchVO[] {
    let matchs: MatchVO[] = [];
    let givers: UserVO[] = [];
    let usersMatchable = Object.assign([], this.users);
    let users = Object.assign([], this.users);
    users = this._shuffle<UserVO>(users);
    //TODO sort drawers, drawer with exlude drawer in first

    // matching
    for (let user of users) {
      let a = Object.assign([], usersMatchable);
      //exclude current user
      a = a.filter(vo => vo.name !== user.name);
      //current drawer excludeUsers
      for (let name of user.excludeUsers) {
        const undesirable = this.getUser(name);
        if (undesirable !== null) {
          a = a.filter(vo => vo.name !== undesirable.name);
        }
      }

      // priority to no givers
      if (a.length - givers.length > 0) {
        for (let giver of givers) {
          a = a.filter(vo => vo.name !== giver.name);
        }
      }

      if (a.length > 0) {
        //select reciver
        const receveuverId = Math.floor(Math.random() * a.length);
        const receveuver = a[receveuverId];
        usersMatchable = usersMatchable.filter(
          vo => vo.name !== receveuver.name
        );
        //givers
        givers.push(user);
        //match
        const match = new MatchVO(user, receveuver);
        matchs.push(match);
      }
    }
    // algorythme à améliorer
    if (matchs.length == this.users.length) {
      return matchs;
    } else {
      return this.matching();
    }
  }

  // ------------------------------
  //
  // ------------------------------

  // utils to externalise in UtilsArray
  private _shuffle<T>(a: T[]): T[] {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}
