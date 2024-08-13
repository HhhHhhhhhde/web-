import { Provide } from '@midwayjs/core';
import * as path from 'path';
import * as fs from 'fs/promises'; // 使用 promises API

@Provide()
export class PostService {
  async savePost(user: string, title: string, content: string) {
    const uploadDir = path.join(__dirname, '../public/comments');
    
    // 创建帖子内容
    const postContent = {
      user,
      title,
      content
    };

    try {
      // 使用 promises API 读取目录
      const files = await fs.readdir(uploadDir);
      
      // 过滤出.json文件并计算数量
      const jsonFiles = files.filter(file => path.extname(file) === '.json');
      const nextFileNumber = jsonFiles.length + 1;
      
      const postFileName = `${title}_${nextFileNumber}.json`; // 使用下划线提高可读性

      console.log(postFileName); // 输出新的文件名

      // 将帖子内容保存到文件
      await fs.writeFile(path.join(uploadDir, postFileName), JSON.stringify(postContent));

      return { success: true, message: '帖子上传成功', data: postContent };
    } catch (error) {
      console.error('Error saving post:', error);
      return { success: false, message: '帖子上传失败', error: error.message };
    }
  }
}