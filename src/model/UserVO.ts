export class UserVO {
  id: string;
  name: string;
  excludeUsers: string[];

  constructor(name: string, conjoint: string) {
    this.id = Math.ceil(Math.random() * new Date().getTime()).toString();
    this.name = name;
    this.excludeUsers = [];
    if (conjoint != "") {
      this.excludeUsers.push(conjoint);
    }
  }
}
