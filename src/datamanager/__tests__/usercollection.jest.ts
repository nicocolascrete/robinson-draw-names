import { UserCollection } from "../UserCollection";
import { UserVO } from "../model/UserVO";

it("can add user", async () => {
  const userCollections = new UserCollection();
  const user = new UserVO("test");
  userCollections.addUser(user);
  expect(userCollections.getUsers().length).toBe(1);
});
it("can add user with conjoint", async () => {
  const userCollections = new UserCollection();
  const userName1 = "test1";
  const user1 = new UserVO(userName1);
  userCollections.addUser(user1);
  const userName2 = "test2";
  const user2 = new UserVO(userName2, userName1);
  userCollections.addUser(user2);

  const users = userCollections.getUsers();
  expect(users.length).toBe(2);
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    expect(user).toBeInstanceOf(UserVO);
    expect(user.excludeUsers.length).toBe(1);
  }

  // add test to user name
});
it("can't add user with exclude user wich not exist", async () => {
  const userCollections = new UserCollection();
  const userName = "test";
  const user = new UserVO(userName, "test1");
  userCollections.addUser(user);
  expect(userCollections.getUsers().length).toBe(0);
});
it("can't add user with same name", async () => {
  const userCollections = new UserCollection();
  const userName = "test";
  const user = new UserVO(userName);
  userCollections.addUser(user);
  expect(userCollections.getUsers().length).toBe(1);
  userCollections.addUser(user);
  expect(userCollections.getUsers().length).toBe(1);
});
it("can reset", async () => {
  const userCollections = new UserCollection();
  const usersToAdd = 10;
  for (let i = 0; i < usersToAdd; i++) {
    const user = new UserVO("test" + i);
    userCollections.addUser(user);
  }
  expect(userCollections.getUsers().length).toBe(usersToAdd);
  userCollections.reset();
  expect(userCollections.getUsers().length).toBe(0);
});
it("can find user", async () => {
  const userCollections = new UserCollection();
  for (let i = 0; i < 10; i++) {
    const user = new UserVO("test" + i);
    userCollections.addUser(user);
  }
  const userName = "test0";
  const user = userCollections.getUser(userName);
  expect(user).toBeInstanceOf(UserVO);
  expect(user!.name).toBe(userName);
});
it("can't find user", async () => {
  const userCollections = new UserCollection();
  for (let i = 0; i < 10; i++) {
    const user = new UserVO("test" + i);
    userCollections.addUser(user);
  }
  const userName = "test100";
  const user = userCollections.getUser(userName);
  expect(user).toBe(null);
});
it("can match", async () => {
  const userCollections = new UserCollection();
  const usersToAdd = 10;
  for (let i = 0; i < usersToAdd; i++) {
    const user = new UserVO("test" + i);
    userCollections.addUser(user);
  }
  const matchs = userCollections.matching();
  expect(matchs.length).toBe(usersToAdd);
  const userTest = "test0";
  let giver = 0;
  let receveuver = 0;
  for (let match of matchs) {
    if (match.giver.name == userTest) {
      giver++;
    }
    if (match.receveuver.name == userTest) {
      receveuver++;
    }
  }
  expect(giver).toBe(1);
  expect(receveuver).toBe(1);
});
it("can match with exclude user", async () => {
  const userCollections = new UserCollection();
  const userName1 = "test1";
  userCollections.addUser(new UserVO(userName1));
  const userName2 = "test2";
  userCollections.addUser(new UserVO(userName2, userName1));
  const userName3 = "test3";
  userCollections.addUser(new UserVO(userName3));
  const userName4 = "test4";
  userCollections.addUser(new UserVO(userName4, userName3));
  const matchs = userCollections.matching();
  expect(matchs.length).toBe(4);

  for (let match of matchs) {
    if (match.giver.name === userName1) {
      expect(match.receveuver.name === userName2).toBe(false);
    }
    if (match.receveuver.name === userName1) {
      expect(match.giver.name === userName2).toBe(false);
    }
  }
});
