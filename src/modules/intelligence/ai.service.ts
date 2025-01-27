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

  private model = this.genAI.getGenerativeModel({
    model: envConfig.GEMINI_MODEL
  });

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
    const chat = this.model.startChat({
      history
    });

    const result = await chat.sendMessage(message);

    const text = result.response.text();

    console.log(text);

    return text;
  }

  async generateChatName(prompt: string) {
    const response =
      await this.model.generateContent(`Generate a title for the following prompt:
    ${prompt}`);

    return response.response.text();
  }
}
