import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({

    imports: [

        TypeOrmModule.forRootAsync({

            useFactory: (configService: ConfigService) => ({

                type: 'mysql',
                host: configService.getOrThrow('MYSQL_HOST'),
                port: configService.getOrThrow('MYSQL_PORT'),
                database: configService.getOrThrow('MYSQL_DATABASE'),
                password: configService.getOrThrow('MYSQL_ROOT_PASSWORD'),
                username: configService.getOrThrow('MYSQL_USERNAME'),
                autoLoadEntities: true,
                synchronize: configService.getOrThrow('MYSQL_SYNCHRONIZE')

            }),

            inject: [ConfigService]

        })

    ]

})
export class DatabaseModule { }
