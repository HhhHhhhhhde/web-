// src/controller/postController.ts
import { Controller, Get, Inject, Param } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { PostService } from '../service/user.file';

@Controller('/file')
export class PostController {
  @Inject()
  ctx: Context;

  @Inject()
  postService: PostService;

  @Get('/:title')
  async getPostByTitle(@Param('title') title: string) {
    const post = await this.postService.getPostByTitle(title);
    if (!post) {
      this.ctx.status = 404;
      return { message: 'Post not found' };
    }
    return post;
  }
}
