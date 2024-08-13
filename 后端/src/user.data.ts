// user.data.ts
import { IUserOptions } from "./user.interface";
import * as fs from 'fs';
import * as path from 'path';

const usersFilePath = path.join(__dirname, './users.json');

export function loadUsers(): IUserOptions[] {
  try {
    const data = fs.readFileSync(usersFilePath);
    return JSON.parse(data.toString());
  } catch (error) {
    return [];
  }
}

const users = loadUsers();

export function find_user_by_name(username: string): IUserOptions | undefined {
  return users.find(target_user => target_user.username === username);
}

export class User implements IUserOptions {
  username: string;
  password: string;
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}

export function save_user(user: User): void {
  const index = users.findIndex(u => u.username === user.username);
  if (index !== -1) {
    users[index] = { ...users[index], ...user }; // 更新现有用户信息
  } else {
    users.push(user); // 添加新用户
  }
  fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
    if (err) {
      console.error('Error writing to users.json:', err);
    } else {
      console.log('Users saved successfully.');
    }
  });
  console.log(usersFilePath)
}