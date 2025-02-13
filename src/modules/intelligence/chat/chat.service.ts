import { Get, Injectable } from '@nestjs/common';
import { DBService } from '../../../common/services/db.service';
import { MessageDto } from './dto/message.dto';
import { chats } from '@db/chats';
import { and, eq } from 'drizzle-orm';
import { users } from '@db/users';
import { chatMessages } from '@db/chat-messages';
import { AiService } from '../ai.service';
import { RenameChatDto } from './dto/rename-chat.dto';
import {
  firstRow,
  jsonAgg,
  jsonBuildObject
} from '../../../common/utils/drizzle.utils';

@Injectable()
export class ChatService extends DBService {
  constructor(private readonly aiService: AiService) {
    super();
  }

  async create(messageDto: MessageDto) {
    const response = await this.aiService.sendMessage(
      [],
      [
        {
          text: messageDto.message
        }
      ]
    );

    const name = await this.aiService.generateChatName(messageDto.message);

    const chat = await firstRow(
      this.db
        .insert(chats)
        .values({
          userID: this.userID,
          name
        })
        .returning({ id: chats.id })
    );

    const [userMessage, modelMessage] = await this.db
      .insert(chatMessages)
      .values([
        {
          role: 'user',
          parts: [{ text: messageDto.message }],
          chatID: chat?.id!,
          userID: this.userID
        },
        {
          role: 'model',
          parts: [{ text: response }],
          chatID: chat?.id!,
          userID: this.userID
        }
      ])
      .returning({
        id: chatMessages.id
      });

    return {
      message: response,
      chatID: chat?.id,
      userMessageID: userMessage.id,
      modelMessageID: modelMessage.id
    };
  }

  async sendMessage(id: number, messageDto: MessageDto) {
    const history = await this.db
      .select({
        role: chatMessages.role,
        parts: chatMessages.parts
      })
      .from(chatMessages)
      .where(eq(chatMessages.id, id));

    const response = await this.aiService.sendMessage(
      history as unknown as any,
      [
        {
          text: messageDto.message
        }
      ]
    );

    const [userMessage, modelMessage] = await this.db
      .insert(chatMessages)
      .values([
        {
          role: 'user',
          parts: [{ text: messageDto.message }],
          chatID: id,
          userID: this.userID
        },
        {
          role: 'model',
          parts: [{ text: response }],
          chatID: id,
          userID: this.userID
        }
      ])
      .returning({
        id: chatMessages.id
      });

    return {
      message: response,
      userMessageID: userMessage.id,
      modelMessageID: modelMessage.id
    };
  }

  findMany() {
    return this.db
      .select({
        id: chats.id,
        name: chats.name,
        createdAt: chats.createdAt
      })
      .from(chats)
      .where(eq(chats.userID, this.userID))
      .orderBy(chats.createdAt);
  }

  @Get(':id')
  findOne(id: number) {
    return firstRow(
      this.db
        .select({
          id: chats.id,
          name: chats.name,
          createdAt: chats.createdAt,
          messages: jsonAgg(
            jsonBuildObject({
              id: chatMessages.id,
              parts: chatMessages.parts,
              createdAt: chatMessages.createdAt,
              role: chatMessages.role
            }),
            chatMessages.id
          )
        })
        .from(chats)
        .where(and(eq(chats.id, id), eq(chats.userID, this.userID)))
        .leftJoin(chatMessages, eq(chatMessages.chatID, id))
        .groupBy(chats.id)
    );
  }

  async renameChat(id: number, renameChatDto: RenameChatDto) {
    await this.db
      .update(chats)
      .set({
        name: renameChatDto.name
      })
      .where(and(eq(chats.id, id), eq(chats.userID, this.userID)));
  }

  async regenerateResponse(id: number) {}

  async editMessage(id: number, messageDto: MessageDto) {}

  async remove(id: number) {
    await this.db
      .delete(chats)
      .where(and(eq(chats.id, id), eq(users.id, this.userID)));
  }
}
