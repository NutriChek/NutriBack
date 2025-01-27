import { Injectable } from '@nestjs/common';
import {
  Content,
  EnhancedGenerateContentResponse,
  GoogleGenerativeAI,
  Part
} from '@google/generative-ai';
import envConfig from '../../../env.config';
import { Response } from 'express';

@Injectable()
export class AiService {
  private genAI = new GoogleGenerativeAI(envConfig.GEMINI_API_KEY);

  private model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  async sendStream(
    stream: AsyncGenerator<EnhancedGenerateContentResponse>,
    res: Response
  ) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    let response = '';

    for await (const chunk of stream) {
      const chunkText = chunk.text();

      response += chunkText;

      res.write(chunkText);
    }

    res.end();

    return response;
  }

  async sendMessage(res: Response, history: Content[], message: Part[]) {
    console.log(history);

    const chat = this.model.startChat({
      history
    });

    const result = await chat.sendMessageStream(message);

    return this.sendStream(result.stream, res);
  }

  async generateChatName(prompt: string) {
    const response =
      await this.model.generateContent(`Generate a title for the following prompt:
    ${prompt}`);

    return response.response.text();
  }
}
