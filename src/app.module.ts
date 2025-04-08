import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MasterModule, NotificationModule, ChatAppModule, PaymentModule } from './apis';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MasterModule,
    PaymentModule,        
    NotificationModule,
    ChatAppModule
  ],
})
export class AppModule {}
