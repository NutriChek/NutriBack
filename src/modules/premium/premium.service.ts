import { Injectable } from '@nestjs/common';
import { BuyPremiumDto } from './dto/buy-premium.dto';
import { DBService } from '../../common/services/db.service';
import { users } from '../../database/schema/users';
import { eq } from 'drizzle-orm';

@Injectable()
export class PremiumService extends DBService {
    async buy(createPremiumDto: BuyPremiumDto) {
        await this.db
            .update(users)
            .set({
                premium: true
            })
            .where(eq(users.id, this.userID));
    }

    async cancel() {
        await this.db
            .update(users)
            .set({
                premium: false
            })
            .where(eq(users.id, this.userID));
    }
}
