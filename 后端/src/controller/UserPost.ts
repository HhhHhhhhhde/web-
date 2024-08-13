import { Controller, Post, Body, Inject } from '@midwayjs/core';
import { PostService } from '../service/user.post';

@Controller('/post')
export class PostController {
  @Inject()
  postService: PostService;

  @Post()
  async uploadPost(
    @Body() body: { user: string; title: string; category: string; content: string }
  ) {
    console.log(body.category)
    if (!body.title || !body.category || !body.content) {
        return {
            status: 400,
            body: { success: false, message: '缺少必要的内容' }
        };
    }

    try {
      const result = await this.postService.savePost(body.user, body.title, body.content, body.category);
      return {
        status: 201,
        body: { success: true, message: '帖子上传成功', data: result }
      };
    } catch (error) {
        return {
            status: 500,
            body: { success: false, message: '服务器错误', error: error.message }
          };
    }
  }
}
