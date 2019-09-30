export class DrawerVO {
  id: string;
  name: string;
  excludeDrawers: string[];

  constructor(name: string, conjoint: string) {
    this.id = Math.ceil(Math.random() * new Date().getTime()).toString();
    this.name = name;
    this.excludeDrawers = [];
    this.excludeDrawers.push(conjoint);
  }
}
