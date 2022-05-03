import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsGateway } from './events.gateway';

@Module({
    imports: [],
    controllers: [],
    providers: [EventsGateway],
})

@Module({
    imports: [
      TypeOrmModule.forRoot({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'gudehd',
        database: 'test',
        entities: [],
        synchronize: true,
      }),
    ],
  })
export class EventsModule { }
