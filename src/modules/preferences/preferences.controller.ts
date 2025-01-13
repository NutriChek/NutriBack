import { Controller, Get, Body, Patch } from '@nestjs/common';
import { PreferencesService } from './preferences.service';
import { UpdatePreferenceDto } from './dto/update-preference.dto';

@Controller('preferences')
export class PreferencesController {
  constructor(private readonly preferencesService: PreferencesService) {}

  @Get()
  findOne() {
    return this.preferencesService.findOne();
  }

  @Patch()
  update(@Body() updatePreferenceDto: UpdatePreferenceDto) {
    return this.preferencesService.update(updatePreferenceDto);
  }
}
