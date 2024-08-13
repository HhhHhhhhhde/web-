import { Provide } from '@midwayjs/core';
import * as path from 'path';
import * as fs from 'fs';
@Provide()
export class PostService {
  async savePost(user: string, title: string, content: string, category: string) {
    const uploadDir = path.join(__dirname, '../public/uploads');
    
    // 创建帖子内容
    const postContent = {
      user,
      title,
      category,
      content
    };

    // 将帖子内容保存到文件（这里仅为示例，实际生产中可能需要其他方式存储）
    const postFileName = `${title}.json`;
    fs.writeFileSync(path.join(uploadDir, postFileName), JSON.stringify(postContent));

    return { success: true, message: '帖子上传成功', data: postContent };
  }
}