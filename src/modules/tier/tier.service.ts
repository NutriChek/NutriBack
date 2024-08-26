import { ConflictException, Injectable } from '@nestjs/common';
import { CreateTierDto } from './dto/create-tier.dto';
import { UpdateTierDto } from './dto/update-tier.dto';
import { DBService } from '../../common/services/db.service';
import { tiers } from '../../database/schema/tiers';
import { desc, eq } from 'drizzle-orm';

@Injectable()
export class TierService extends DBService {
    async create(createTierDto: CreateTierDto) {
        const userTiers = await this.db
            .select({
                id: tiers.id,
                level: tiers.level
            })
            .from(tiers)
            .where(eq(tiers.userID, this.userID))
            .orderBy(desc(tiers.level));

        if (userTiers.length >= 3) {
            throw new ConflictException('You can only create up to 3 tiers');
        }

        // const newTier = await this.db.insert(tiers).values({
        //     name: createTierDto.name,
        //     price: createTierDto.price,
        //     description: createTierDto.description,
        //     level: userTiers[0].level + 1,
        //     userID: this.userID
        // });
    }

    findAll() {
        return `This action returns all tier`;
    }

    findOne(id: number) {
        return `This action returns a #${id} tier`;
    }

    update(id: number, updateTierDto: UpdateTierDto) {
        return `This action updates a #${id} tier`;
    }

    remove(id: number) {
        return `This action removes a #${id} tier`;
    }
}
