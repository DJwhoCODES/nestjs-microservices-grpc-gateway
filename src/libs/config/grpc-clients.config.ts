import { ClientProviderOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

export const grpcClientOptions: ClientProviderOptions[] = [
  {
    name: 'PAYMENT_PACKAGE',
    transport: Transport.GRPC,
    options: {
      package: 'payment',
      protoPath: join(__dirname, '../../libs/proto/payment.proto'),
      url: `${process.env.PAYMENT_HOST}:${process.env.PAYMENT_PORT}`
    },
  },
  // {
  //   name: 'MASTER_PACKAGE',
  //   transport: Transport.GRPC,
  //   options: {
  //     package: 'master',
  //     protoPath: join(__dirname, '..', 'proto', 'master.proto'),
  //     url: `${process.env.MASTER_HOST}:${process.env.MASTER_PORT}`,
  //   },
  // },
  // {
  //   name: 'NOTIFICATION_PACKAGE',
  //   transport: Transport.GRPC,
  //   options: {
  //     package: 'notification',
  //     protoPath: join(__dirname, '..', 'proto', 'notification.proto'),
  //     url: `${process.env.NOTIFICATION_HOST}:${process.env.NOTIFICATION_PORT}`,
  //   },
  // },
];
