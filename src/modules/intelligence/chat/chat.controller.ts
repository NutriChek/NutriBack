import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { MessageDto } from './dto/message.dto';
import { Response } from 'express';
import { RenameChatDto } from './dto/rename-chat.dto';

@Controller('intelligence/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  create(@Body() messageDto: MessageDto, @Res() res: Response) {
    return this.chatService.create(messageDto, res);
  }

  @Post(':id')
  sendMessage(
    @Param('id') id: string,
    @Body() messageDto: MessageDto,
    @Res() res: Response
  ) {
    return this.chatService.sendMessage(+id, messageDto, res);
  }

  @Get()
  findMany() {
    return this.chatService.findMany();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatService.findOne(+id);
  }

  @Patch(':id')
  regenerateResponse(@Param('id') id: string, @Res() res: Response) {
    return this.chatService.regenerateResponse(+id, res);
  }

  @Patch('rename/:id')
  renameChat(@Param('id') id: string, @Body() renameChatDto: RenameChatDto) {
    return this.chatService.renameChat(+id, renameChatDto);
  }

  @Patch(':id')
  editMessage(
    @Param('id') id: string,
    @Body() messageDto: MessageDto,
    @Res() res: Response
  ) {
    return this.chatService.editMessage(+id, messageDto, res);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id);
  }
}
