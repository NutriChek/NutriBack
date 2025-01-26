import { Body, Injectable } from '@nestjs/common';
import { DBService } from '../../../common/services/db.service';
import { MessageDto } from './dto/message.dto';
import { chats } from '@db/chats';
import { and, eq } from 'drizzle-orm';
import { users } from '@db/users';
import { chatMessages } from '@db/chat-messages';
import { AiService } from '../ai.service';
import { Response } from 'express';
import { RenameChatDto } from './dto/rename-chat.dto';

@Injectable()
export class ChatService extends DBService {
  constructor(private readonly aiService: AiService) {
    super();
  }

  async create(messageDto: MessageDto, res: Response) {
    const response = await this.aiService.sendMessage(res, [], []);
  }

  async sendMessage(id: number, messageDto: MessageDto, res: Response) {}

  async renameChat(id: number, renameChatDto: RenameChatDto) {
    await this.db
      .update(chats)
      .set({
        name: renameChatDto.name
      })
      .where(and(eq(chats.id, id), eq(chats.userID, this.userID)));
  }

  async regenerateResponse(id: number, res: Response) {}

  async editMessage(id: number, messageDto: MessageDto, res: Response) {}

  async remove(id: number) {
    await this.db
      .delete(chats)
      .where(and(eq(chats.id, id), eq(users.id, this.userID)));
  }
}
