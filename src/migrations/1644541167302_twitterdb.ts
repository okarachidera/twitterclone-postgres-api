/* eslint-disable @typescript-eslint/naming-convention */
import { timeStamp } from 'console';
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {

    pgm.createExtension('uuid-ossp', { ifNotExists: true });

    pgm.createTable('users', {
        id: {
            type: 'uuid',
            primaryKey: true,
            default: pgm.func('uuid_generate_v4()')
        },
        name: {
            type: 'TEXT',
            notNull: true
        },
        email: {
            type: 'TEXT',
            unique: true,
            notNull: true
        },
        password: {
            type: 'TEXT',
            notNull: true,
        },
        isactive: {
            type: 'TEXT',
        },
        date_created: {
            type: 'timestamp',
            default: pgm.func('current_timestamp')
        }
    })
    pgm.createTable('tweets', {
        id: {
            type: 'uuid',
            primaryKey: true,
            default: pgm.func('uuid_generate_v4()')
        },
        user_id: {
            type: "uuid",
            references: 'users(id)',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        tweet_body: {
            type: 'TEXT'
        },
        image: {
            type: 'TEXT'
        },
        who_can_reply: {
            type: 'TEXT'
        },
        date_created: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp')
        }

    })
    pgm.createTable('comments', {
        id: {
            type: 'uuid',
            primaryKey: true,
            default: pgm.func('uuid_generate_v4()')
        },
        user_id: {
            type: 'uuid',
            references: 'users(id)',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        tweet_id: {
            type: 'uuid',
            references: 'tweets(id)',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        content: {
            type: 'TEXT'
        },
        date_created: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp')
        }

    })
    pgm.createTable('likes', {
        id: {
            type: 'uuid',
            default: pgm.func('uuid_generate_v4()'),
            primaryKey: true
        },
        userId: {
            type: 'uuid',
            references: 'users(id)',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        tweetId: {
            type: 'uuid',
            references: 'tweets(id)',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        date_created: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp')
        }
    })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable('comments')
    pgm.dropTable('likes')
    pgm.dropTable('tweets')
    pgm.dropTable('users') 
}
