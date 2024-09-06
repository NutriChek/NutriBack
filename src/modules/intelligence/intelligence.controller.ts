import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IntelligenceService } from './intelligence.service';
import { CreateIntelligenceDto } from './dto/create-intelligence.dto';
import { UpdateIntelligenceDto } from './dto/update-intelligence.dto';

@Controller('intelligence')
export class IntelligenceController {
  constructor(private readonly intelligenceService: IntelligenceService) {}

  @Post()
  create(@Body() createIntelligenceDto: CreateIntelligenceDto) {
    return this.intelligenceService.create(createIntelligenceDto);
  }

  @Get()
  findAll() {
    return this.intelligenceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.intelligenceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIntelligenceDto: UpdateIntelligenceDto) {
    return this.intelligenceService.update(+id, updateIntelligenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.intelligenceService.remove(+id);
  }
}
