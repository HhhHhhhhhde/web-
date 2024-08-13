import { Controller, Get, Inject } from '@midwayjs/core';
import { PostService } from '../service/user.read';

@Controller('/reads')
export class PostController {
    @Inject()
    postService: PostService;

    @Get('/')
    async getPosts(ctx): Promise<void> {
        try {
            const posts = await this.postService.readPosts();
            ctx.body = posts;
        } catch (error) {
            ctx.status = 500;
            ctx.body = { error: 'Error reading posts' };
        }
    }
}
