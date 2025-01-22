import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
import envConfig from '../../env.config';

@Injectable()
export class GeminiService {
  private genAI = new GoogleGenerativeAI(envConfig.GEMINI_API_KEY);

  private model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  generateContent() {
    return this.model.generateContent(['what are you'], {});
  }
}
