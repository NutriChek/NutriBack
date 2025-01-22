import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import envConfig from '../../../env.config';
import { Response } from 'express';

@Injectable()
export class GeminiService {
  private genAI = new GoogleGenerativeAI(envConfig.GEMINI_API_KEY);

  private model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  async generateContent(res: Response) {
    const result = await this.model.generateContentStream([
      'write a 500 word essay'
    ]);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();

      res.write(chunkText);
    }

    res.end();
  }
}
