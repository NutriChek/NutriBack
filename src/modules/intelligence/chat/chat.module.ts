import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { AiService } from '../ai.service';

@Module({
  controllers: [ChatController],
  providers: [ChatService, AiService]
})
export class ChatModule {}
