import { Controller, Post, Body, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.register';

@Controller('/register')
export class RegisterController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Post()
  async register(@Body() credentials: { username: string; password: string }): Promise<any> {

    // 调用服务注册用户
    const isRegistered = await this.userService.register(credentials.username, credentials.password);

    // 返回注册结果
    if (isRegistered) {
      return {
        success: true,
        message: '注册成功',
      };
    } else {
      return {
        success: false,
        message: '注册失败，用户名可能已存在',
      };
    }
  }
}
