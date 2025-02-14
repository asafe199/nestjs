import { Module } from '@nestjs/common';
import { MongoService } from '@app/common/mongo/mongo.service';

@Module({
  imports: [],
  exports: [MongoService],
  providers: [MongoService],
  controllers: [],
})
export class MongoModule {}
