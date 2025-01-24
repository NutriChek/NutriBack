import { Injectable } from '@nestjs/common';
import { DBService } from '../../../common/services/db.service';
import { MessageDto } from './dto/message.dto';
import { chats } from '@db/chats';
import { and, eq } from 'drizzle-orm';
import { users } from '@db/users';
import { chatMessages } from '@db/chat-messages';

@Injectable()
export class ChatService extends DBService {
  async create(messageDto: MessageDto) {
    await this.db.insert(chats).values({
      userID: this.userID,
      name: ''
    });
  }

  async sendMessage(id: number, messageDto: MessageDto) {}

  async regenerateResponse(id: number) {}

  async editMessage(id: number, messageDto: MessageDto) {
    await this.db
      .update(chatMessages)
      .set({
        content: messageDto.message
      })
      .where(and(eq(chats.id, id), eq(users.id, this.userID)));
  }

  async remove(id: number) {
    await this.db
      .delete(chats)
      .where(and(eq(chats.id, id), eq(users.id, this.userID)));
  }
}
