import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chats } from './database/chat.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { CarsService } from 'src/cars/cars.service';
import { FindOneChatDto } from './dto/find-one-chat.dto';

@Injectable()
export class ChatsService {
  constructor(@InjectRepository(Chats) private chatsRepo: Repository<Chats>, private usersService: UsersService, private carsService: CarsService) { }

  async create(createChatDto: CreateChatDto, payload: any) {
    try {
      const user = await this.usersService.findOne(payload.login_id)
      const recipient = await this.usersService.findOne(createChatDto.username)
      let car: any
      if (createChatDto.car) {
        car = await this.carsService.findOne(createChatDto.car)
      }
      if (!user || !recipient) {
        return {
          statusCode: 401,
          message: 'token invalid'
        }
      }
      let chat: any
      if (car) {
        chat = this.chatsRepo.create({
          text: createChatDto.text,
          user: user,
          recipient: recipient,
          car: car
        })
      } else {
        chat = this.chatsRepo.create({
          text: createChatDto.text,
          user: user,
          recipient: recipient,
        })
      }
      await this.chatsRepo.save(chat)
      return {
        statusCode: 201,
        message: createChatDto.text,
        recipient: recipient.login_id
      }
    } catch (error) {
      console.log(error)
      return {
        statusCode: 401,
        message: "token invalid"
      }
    }
  }

  async findAll(payload: any) {
    const user = await this.usersService.findOne(payload.login_id)
    const chats = await this.chatsRepo.find({ where: { user: { id: user.id } }, relations: ['recipient', 'user'] })
    var participants = []
    chats.forEach((chat) => {
      delete chat.recipient.password_hash
      delete chat.user.password_hash
      participants.push(chat.recipient)
      participants.push(chat.user)
    })
    const uniquerecipient = [...new Set(participants.map((participant) => participant.id).map((id) => participants.find((participant) => participant.id == id)))].filter((participant) => participant.id != user.id)
    if (!user) {
      return {
        statusCode: 401
      }
    }
    if (!uniquerecipient) {
      throw new NotFoundException()
    }
    return uniquerecipient
  }

  async findOne(payload: any, findOneChatDto: FindOneChatDto) {
    const chats = await this.chatsRepo.find({
      where: [
        { user: { login_id: findOneChatDto.username }, recipient: { login_id: payload.login_id } },
        { user: { login_id: payload.login_id }, recipient: { login_id: findOneChatDto.username } }
      ],
      relations: ['recipient', 'user', 'car', 'car.images'],
      order: { id: 'ASC' }
    })
    chats.forEach(chat => {
      delete chat.recipient.password_hash
      delete chat.user.password_hash
    })
    return chats
  }

  async join(payload: any) {
    const user = await this.usersService.findOne(payload.login_id)
    if (!user) {
      return {
        user: null,
        statusCode: 401
      }
    }
    delete user.hashPassword
    return { user, statusCode: 201 }
  }

  async identify(identify: string, id: string) {

  }

  //helper function
}
