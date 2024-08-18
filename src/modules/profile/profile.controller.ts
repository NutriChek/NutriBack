import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateBodyProfileDto } from './dto/update-body-profile.dto';
import { UpdateNutritionalPreferencesDto } from './dto/update-nutritional-preferences.dto';

@Controller()
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Get('body-profile')
    findBodyProfile() {
        return this.profileService.findBodyProfile();
    }

    @Get('nutritional-preferences')
    findNutritionalPreferences() {
        return this.profileService.findNutritionalPreferences();
    }

    @Patch('body-profile')
    updateBodyProfile(@Body() updateBodyProfileDto: UpdateBodyProfileDto) {
        return this.profileService.updateBodyProfile(updateBodyProfileDto);
    }

    @Patch('nutritional-preferences')
    updateNutritionalPreferences(
        @Body() updateNutritionalPreferencesDto: UpdateNutritionalPreferencesDto
    ) {
        return this.profileService.updateNutritionalPreferences(
            updateNutritionalPreferencesDto
        );
    }
}
