import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { join } from 'path';
import axios from 'axios';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'PAYMENT_PACKAGE',
        useFactory: async () => {
          const { data: paymentUrl } = await axios.get(
            'http://localhost:3000/discover?service=payment-service',
          );
          console.log(paymentUrl);
          return {
            transport: Transport.GRPC,
            options: {
              package: 'payment',
              protoPath: join(__dirname, '../../libs/proto/payment.proto'),
              url: paymentUrl,
            },
          };
        },
      },
    ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
