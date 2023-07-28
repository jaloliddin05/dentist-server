import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Visit } from './visit.entity';
import { VisitController } from './visit.controller';
import { VisitService } from './visit.service';
import { UserModule } from '../user/user.module';
import { PatientModule } from '../patient/patient.module';
import { ServiceModule } from '../service/service.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Visit]),
    UserModule,
    PatientModule,
    ServiceModule,
  ],
  controllers: [VisitController],
  providers: [VisitService],
  exports: [VisitService],
})
export class VisitModule {}
