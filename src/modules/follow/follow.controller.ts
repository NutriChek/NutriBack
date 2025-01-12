import { Controller, Delete, Post } from '@nestjs/common';
import { FollowService } from './follow.service';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post(':id')
  follow() {}

  @Delete(':id')
  unfollow() {}
}
