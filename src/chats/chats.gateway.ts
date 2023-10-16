import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { OnModuleInit, Request, UseGuards } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io'
import { WebSocketGuard } from 'src/auth/guard/web-socket.guard';
import { FindOneChatDto } from './dto/find-one-chat.dto';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class ChatsGateway implements OnModuleInit, OnGatewayDisconnect {

  private bucket = {}

  @WebSocketServer()
  server: Server

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(`Connected ${socket.id}`)
    })
  }

  handleDisconnect(client: Socket) {
    Object.keys(this.bucket).forEach((key) => {
      if (this.bucket[key] === client.id) {
        delete this.bucket[key]
      }
    })
    console.log(`Disconnected ${client.id}`)
  }

  constructor(private readonly chatsService: ChatsService) { }



  @UseGuards(WebSocketGuard)
  @SubscribeMessage('join')
  async join(@Request() req: any, @ConnectedSocket() client: Socket) {
    const { user, statusCode } = await this.chatsService.join(req.user)
    this.bucket[user.login_id] = client.id
    return { statusCode }
  }

  @UseGuards(WebSocketGuard)
  @SubscribeMessage('createChat')
  async create(@MessageBody() createChatDto: CreateChatDto, @Request() req: any,) {
    const { message, recipient, ...rest } = await this.chatsService.create(createChatDto, req.user);
    const receiver = this.bucket[recipient]
    if (!receiver) {
      return {
        statusCode: 400,
        message: "Receiver not online"
      }
    }
    const receiver_socket = this.server.to(receiver)
    receiver_socket.emit('private-message', { message, sender: req.user.login_id })
    return rest
  }

  @UseGuards(WebSocketGuard)
  @SubscribeMessage('findAllChats')
  async findAll(@Request() req: any) {
    return this.chatsService.findAll(req.user);
  }

  @UseGuards(WebSocketGuard)
  @SubscribeMessage('findOneChat')
  async findOne(@Request() req: any, @MessageBody() findOneChatDto: FindOneChatDto) {
    return this.chatsService.findOne(req.user, findOneChatDto);
  }
  @SubscribeMessage('testing')
  async testing(@MessageBody() data: any, @MessageBody('id') id: number) {
    console.log(data)
    console.log(id)
    this.server.emit('hi', { data: data.text })
    return id
  }
}
