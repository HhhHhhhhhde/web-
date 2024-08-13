// CommentService.ts
import { Provide } from '@midwayjs/core';
import * as fs from 'fs';
import * as path from 'path';

@Provide()
export class CommentService {
private commentsDir = path.join(__dirname, '../public/comments');

async getCommentsByTitle(title: string): Promise<any[]> {
    const files = fs.readdirSync(this.commentsDir);
    const comments = [];

    files.forEach(file => {
        if (path.extname(file) === '.json') {
            const filePath = path.join(this.commentsDir, file);
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const commentData = JSON.parse(fileContent);

            if (commentData.title === title) {
                comments.push({
                    user: commentData.user,
                    content: commentData.content,
                });
            }
        }
    });

    return comments;
}
}