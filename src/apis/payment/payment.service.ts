// gateway/src/apis/payment/payment.service.ts
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';
import { PaymentServiceClient, PaymentRequest, PaymentResponse } from '../../libs/proto-types/payment';

@Injectable()
export class PaymentService implements OnModuleInit {
  private paymentClient: PaymentServiceClient;

  constructor(@Inject('PAYMENT_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.paymentClient = this.client.getService<PaymentServiceClient>('PaymentService');
  }

  makePayment(data: PaymentRequest): Observable<PaymentResponse> {
    return this.paymentClient.makePayment(data);
  }

  async TestMicroservice(): Promise<PaymentResponse> {
    return await firstValueFrom(this.paymentClient.testMicroservice({}));
  }
}
