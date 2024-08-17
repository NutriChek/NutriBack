import { Controller, Delete, Param, Post } from '@nestjs/common';
import { FollowService } from './follow.service';

@Controller('follow')
export class FollowController {
    constructor(private readonly followService: FollowService) {}

    @Post(':id')
    follow(@Param('id') id: string) {
        return this.followService.follow(+id);
    }

    @Delete(':id')
    unfollow(@Param('id') id: string) {
        return this.followService.unfollow(+id);
    }
}
