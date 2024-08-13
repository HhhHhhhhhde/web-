// UserService.ts
import { Provide } from '@midwayjs/decorator';
import { User, find_user_by_name, save_user } from '../user.data';

@Provide()
export class UserService {
  async register(username: string, password: string): Promise<boolean> {
    // 检查用户名是否已存在
    const userExists = find_user_by_name(username);
    if (userExists) {
      // 用户名已存在，注册失败
      return false;
    }

    // 创建新用户并保存到文件中
    const newUser: User = {
      username,
      password // 实际应用中，密码应该被加密存储
    };
    save_user(newUser);

    // 注册成功
    return true;
  }
}