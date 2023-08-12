import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientRequest } from './client-request.entity';
import { ClientRequestController } from './client-request.controller';
import { ClientRequestService } from './client-request.service';
import { ServiceModule } from '../service/service.module';

@Module({
  imports: [TypeOrmModule.forFeature([ClientRequest]), ServiceModule],
  controllers: [ClientRequestController],
  providers: [ClientRequestService],
  exports: [ClientRequestService],
})
export class ClientRequestModule {}
