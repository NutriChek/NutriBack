import { DrizzlePGModule } from '@knaadh/nestjs-drizzle-pg';
import config from './config';

export const DatabaseModule = DrizzlePGModule.register({
    tag: 'DB',
    pg: {
        connection: 'client',
        config: {
            connectionString: config.DB_URL
        }
    }
});
