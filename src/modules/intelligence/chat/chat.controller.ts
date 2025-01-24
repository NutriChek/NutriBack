import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { MessageDto } from './dto/message.dto';

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

  @Patch(':id')
  regenerateResponse(@Param('id') id: string) {
    return this.chatService.regenerateResponse(+id);
  }

  @Patch(':id')
  editMessage(@Param('id') id: string, @Body() messageDto: MessageDto) {
    return this.chatService.editMessage(+id, messageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatService.remove(+id);
  }
}
