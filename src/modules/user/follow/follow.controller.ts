import { Controller, Delete, Param, Post } from '@nestjs/common';
import { FollowService } from './follow.service';

@Controller('user/:id/follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post()
  follow(@Param() id: string) {
    return this.followService.follow(+id);
  }

  @Delete()
  unfollow(@Param() id: string) {
    return this.followService.unfollow(+id);
  }
}
