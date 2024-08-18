import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Get()
    findOwn() {
        return this.profileService.findOwn();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.profileService.findOne(+id);
    }

    @Patch()
    update(@Body() updateProfileDto: UpdateProfileDto) {
        return this.profileService.update(updateProfileDto);
    }
}
