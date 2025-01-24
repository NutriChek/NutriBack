import { Module } from '@nestjs/common';
import { IntelligenceService } from './intelligence.service';
import { IntelligenceController } from './intelligence.controller';
import { GeminiService } from './gemini.service';
import { ChatModule } from './chat/chat.module';

@Module({
  controllers: [IntelligenceController],
  providers: [IntelligenceService, GeminiService],
  imports: [ChatModule]
})
export class IntelligenceModule {}
