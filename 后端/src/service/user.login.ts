import { Provide } from '@midwayjs/core';
import { find_user_by_name } from '../user.data';

@Provide()
export class UserService {
  async validateCredentials(username:string,password:string):
  Promise<boolean>{
      const user=find_user_by_name(username);
      if(user){
        return user.password===password;
      }
      return false;
  }

  async getUserInfoByUsername(username: string): 
  Promise<any> {
    return find_user_by_name(username);
  }

}