import { Module, OnModuleInit, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: (configService.get<string>('DB_TYPE') || process.env.DB_TYPE || 'postgres') as any,
        host: configService.get<string>('DB_HOST') || process.env.DB_HOST,
        port: parseInt(configService.get<string>('DB_PORT') || process.env.DB_PORT || '5432'),
        username: configService.get<string>('DB_USERNAME') || process.env.DB_USERNAME,
        password: configService.get<string>('DB_PASSWORD') || process.env.DB_PASSWORD,
        database: configService.get<string>('DB_NAME') || process.env.DB_NAME,
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class DatabaseModule implements OnModuleInit {
  private readonly logger = new Logger('DatabaseModule');

  constructor(private readonly dataSource: DataSource) {}

  onModuleInit() {
    if (this.dataSource.isInitialized) {
      this.logger.log('Database connected successfully');
      console.log('Database connected successfully');
    }
  }
}

