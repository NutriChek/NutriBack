import { Module } from '@nestjs/common';
import { IntelligenceService } from './intelligence.service';
import { IntelligenceController } from './intelligence.controller';
import { GeminiService } from './gemini.service';

@Module({
  controllers: [IntelligenceController],
  providers: [IntelligenceService, GeminiService]
})
export class IntelligenceModule {}
