// gateway/src/apis/payment/payment.controller.ts
import { Controller, Post, Body, Get } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentRequest } from '../../libs/proto-types/payment';
import axios from 'axios';

@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  makePayment(@Body() data: PaymentRequest) {
    return this.paymentService.makePayment(data);
  }

  @Get('test')
  async TestMicroservice() {
    const response = await this.paymentService.TestMicroservice();
    return response;
  }

  @Get('payment-test')
  async proxyToExampleService() {
    const { data: exampleUrl } = await axios.get(
      'http://localhost:3000/discover?service=payment-service',
    );
    console.log(exampleUrl);
    const { data } = await axios.get(`${exampleUrl}`);
    return data;
  }
}
