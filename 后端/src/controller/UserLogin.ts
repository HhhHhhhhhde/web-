import { Inject, Controller, Body, Post } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.login';

@Controller('/login')
export class LoginController {
    @Inject()
    ctx: Context;

    @Inject()
    userService: UserService; // 使用注入的 userService 实例

    @Post()
    async login(@Body() credentials: { username: string; password: string }) {
        // 使用注入的 userService 实例来验证凭证
        const isCorrect = await this.userService.validateCredentials(credentials.username, credentials.password);

        // 返回登录结果
        if (isCorrect) {
            const user = await this.userService.getUserInfoByUsername(credentials.username);
            return {
              success: true,
              message: '登录成功',
              data: user // 假设 getUserInfoByUsername 返回完整的用户信息
            };
        } else {
            return {
                success: false,
                message: '登录失败',
            };
        }
    }
}