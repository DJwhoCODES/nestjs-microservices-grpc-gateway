import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { ChatAppModule, MasterModule, NotificationModule, PaymentModule } from './apis';
import { grpcClientOptions } from './libs/config/grpc-clients.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ClientsModule.register({clients:grpcClientOptions, isGlobal:true}),
    MasterModule,
    PaymentModule,
    NotificationModule,
    ChatAppModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
