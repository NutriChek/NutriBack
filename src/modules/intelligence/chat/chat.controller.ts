import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { MessageDto } from './dto/message.dto';
import { RenameChatDto } from './dto/rename-chat.dto';

@Controller('intelligence/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  create(@Body() messageDto: MessageDto) {
    return this.chatService.create(messageDto);
  }

  @Post(':id')
  sendMessage(@Param('id') id: string, @Body() messageDto: MessageDto) {
    return this.chatService.sendMessage(+id, messageDto);
  }

  @Get()
  findMany() {
    return this.chatService.findMany();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(+id);
  }

  @Patch('regenerate/:id')
  regenerateResponse(@Param('id') id: string) {
    return this.chatService.regenerateResponse(+id);
  }

  @Patch('edit/:id')
  editMessage(@Param('id') id: string, @Body() messageDto: MessageDto) {
    return this.chatService.editMessage(+id, messageDto);
  }

  @Patch('rename/:id')
  renameChat(@Param('id') id: string, @Body() renameChatDto: RenameChatDto) {
    return this.chatService.renameChat(+id, renameChatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id);
  }
}
