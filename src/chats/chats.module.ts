import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsGateway } from './chats.gateway';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chats } from './database/chat.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CarsModule } from 'src/cars/cars.module';

@Module({
  providers: [ChatsGateway, ChatsService],
  imports: [TypeOrmModule.forFeature([Chats]), UsersModule, AuthModule, CarsModule]
})
export class ChatsModule { }
