import { Provide } from '@midwayjs/core';
import * as fs from 'fs';
import * as path from 'path';

@Provide()
export class PostService {
    private uploadsDir = path.join(__dirname,'../public/uploads');

    async readPosts(): Promise<any[]> {
        const files = fs.readdirSync(this.uploadsDir);
        const posts = [];
        for (const file of files) {
            if (path.extname(file) === '.json') {
                const filePath = path.join(this.uploadsDir, file);
                const fileContent = fs.readFileSync(filePath, 'utf8');
                const postData = JSON.parse(fileContent);
                posts.push({
                    user: postData.user,
                    title: postData.title,
                    category: postData.category,
                    
                });
            }
        }
        return posts;
    }
}

