import {
  Body,
  Controller,
  Get,
  OnModuleInit,
  Param,
  Post,
} from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { GrpcService } from './grpc.interface';
import { microserviceOptions } from './grpc.options';
import { CreateUserDto } from './createUser.dto';
import { Observable } from 'rxjs';

@Controller()
export class AppController implements OnModuleInit {
  @Client(microserviceOptions)
  private client: ClientGrpc;

  private grpcService: GrpcService;
  onModuleInit() {
    this.grpcService = this.client.getService<GrpcService>('AppController');
  }

  @Get(':id')
  async accumulate(@Param('id') id: number) {
    const user = await this.grpcService.accumulate({ id });
    return user;
  }

  @Post('create')
  async addUser(@Body() createUserDto: CreateUserDto) { 
    return await this.grpcService.addUser(createUserDto); 
  }

  @Get()
  async getAllUsers(): Promise<any> {
    const allusers = await this.grpcService.getAllUsers(null);
    console.log(allusers);
    return allusers;
  }
}
