import { Injectable } from '@nestjs/common';
import { CreateIntelligenceDto } from './dto/create-intelligence.dto';
import { UpdateIntelligenceDto } from './dto/update-intelligence.dto';

@Injectable()
export class IntelligenceService {
  create(createIntelligenceDto: CreateIntelligenceDto) {
    return 'This action adds a new intelligence';
  }

  findAll() {
    return `This action returns all intelligence`;
  }

  findOne(id: number) {
    return `This action returns a #${id} intelligence`;
  }

  update(id: number, updateIntelligenceDto: UpdateIntelligenceDto) {
    return `This action updates a #${id} intelligence`;
  }

  remove(id: number) {
    return `This action removes a #${id} intelligence`;
  }
}
