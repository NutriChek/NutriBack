import { Module } from '@nestjs/common';
import { IntelligenceService } from './intelligence.service';
import { IntelligenceController } from './intelligence.controller';
import { AiService } from './ai.service';
import { ChatModule } from './chat/chat.module';

@Module({
  controllers: [IntelligenceController],
  providers: [IntelligenceService, AiService],
  imports: [ChatModule]
})
export class IntelligenceModule {}
