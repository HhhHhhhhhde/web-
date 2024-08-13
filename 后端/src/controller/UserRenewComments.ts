// CommentController.ts
import { Controller, Get, Query, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa'; // 使用 Context 替代 IMidwayKoaContext
import { CommentService } from '../service/user.renewcomments';

@Controller('/renew')
export class CommentController {
  @Inject()
  commentService: CommentService;

  @Get('/')
  async getComments(@Query('title') title: string, ctx: Context) {
    try {
      const comments = await this.commentService.getCommentsByTitle(title);
      console.log(comments);
      // 直接返回响应数据
      return ctx.body = {
        success: true,
        data: comments,
      };
    } catch (error) {
      // 直接返回错误信息
      return ctx.body = {
        success: false,
        message: '获取评论失败',
        error: error.message,
      };
    }
  }
}