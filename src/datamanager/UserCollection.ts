import { UserVO } from "./model/UserVO";
import { MatchVO } from "./model/MatchVO";

export class UserCollection {
  users: UserVO[] = [];

  constructor() {}

  // ------------------------------
  //
  // ------------------------------
  public addUser(vo: UserVO) {
    // don't add user if already exist
    if (this.users.filter(user => user.name === vo.name).length > 0) {
      console.warn(
        "UserCollection, addUser, you already have a user with the name : " +
          vo.name
      );
      return;
    }
    // don't add user with exlude user wich don't exist
    if (
      vo.excludeUsers.length > 0 &&
      this.users.filter(user => user.name === vo.excludeUsers[0]).length == 0
    ) {
      console.warn(
        "UserCollection, addUser, you try to add a user with an exclude user wich not exist :  " +
          vo.excludeUsers
      );
      return;
    }
    // add user
    this.users.push(vo);
    // when add a user with conjoint automaticly assiote him
    if (vo.excludeUsers.length > 0) {
      for (const excludeUser of vo.excludeUsers) {
        for (const user of this.users) {
          if (user.name == excludeUser) {
            user.excludeUsers.push(vo.name);
            break;
          }
        }
      }
    }
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
        a = a.filter(vo => vo.name !== name);
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
    // algorythme à revoir ... cette sécurité peut entrainer le crash ...
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
