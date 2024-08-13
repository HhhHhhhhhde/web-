import { Controller, Post, Body, Inject } from '@midwayjs/core';
import { PostService } from '../service/user.comment';

@Controller('/comments')
export class PostController {
  @Inject()
  postService: PostService;

  @Post()
  async uploadPost(
    @Body() body: { user: string; title: string; content: string }
  ) {

    if (!body.content) {
        return {
            status: 400,
            body: { success: false, message: '缺少必要的内容' }
        };
    }

    try {
      const result = await this.postService.savePost(body.user, body.title, body.content);
      return {
        status: 201,
        body: { success: true, message: '评论成功!', data: result }
      };
    } catch (error) {
        return {
            status: 500,
            body: { success: false, message: '服务器错误', error: error.message }
          };
    }
  }
}
