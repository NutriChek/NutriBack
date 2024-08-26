import { Body, Controller, Delete, Post } from '@nestjs/common';
import { PremiumService } from './premium.service';
import { BuyPremiumDto } from './dto/buy-premium.dto';

@Controller('premium')
export class PremiumController {
    constructor(private readonly premiumService: PremiumService) {}

    @Post()
    buy(@Body() createPremiumDto: BuyPremiumDto) {
        return this.premiumService.buy(createPremiumDto);
    }

    @Delete()
    cancel() {
        return this.premiumService.cancel();
    }
}
