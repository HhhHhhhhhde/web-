// src/service/postService.ts
import { Provide } from '@midwayjs/decorator';
import { readFileSync } from 'fs';
import { join } from 'path';

@Provide()
export class PostService {
  getPostByTitle(title: string) {
    try {
      const filePath = join(__dirname, '../public/uploads', `${title}.json`);
      const data = readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading post file:', error);
      return null;
    }
  }
}
