// gateway/src/apis/payment/payment.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentRequest } from '../../libs/proto-types/payment';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  makePayment(@Body() data: PaymentRequest) {
    return this.paymentService.makePayment(data);
  }

  @Get()
  async TestMicroservice() {
    const response = await this.paymentService.TestMicroservice();
    return response;
  }
}
