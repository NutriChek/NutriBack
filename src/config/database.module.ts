import { DrizzlePGModule } from '@knaadh/nestjs-drizzle-pg';
import * as schema from '../database/schema';
import config from './config';

export const DatabaseModule = DrizzlePGModule.register({
    tag: 'DB',
    config: { schema: { ...schema } },
    pg: {
        connection: 'client',
        config: {
            connectionString: config.DB_URL
        }
    }
});
