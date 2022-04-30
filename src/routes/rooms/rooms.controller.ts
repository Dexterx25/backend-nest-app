import { Controller, Post, Param, Get, Body, UseGuards, Session} from '@nestjs/common';
import {  ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { AccessGuard } from '@src/guards/access.guard';
import { RoomBodyDTO } from 'src/utils/dto/input/rooms';
import { RoomsService } from './rooms.service';

@UseGuards(AccessGuard)
@ApiBearerAuth()
@ApiTags("rooms")
@Controller('api/v1/nextto/rooms')
export class UserController {
  constructor(private readonly roomsService: RoomsService) {}
  @Get('list-rooms')
  @ApiOperation({
    summary: 'Con este endpoint puedes listar todos los rooms',
    description: 'Con este endpoint puedes listarte todos los rooms del aplicativo'
  })
 async listRooms() {
  return  await this.roomsService.listAllRoomsDB()
  };

  @Get('list-room-members/:id')
  @ApiOperation({
    summary: 'Con este endpoint puedes listar todos los miembros de una sala por id de sala',
    description: 'Con este endpoint puedes listarte todos los miembros de una sala por id de sala'
  })
  @ApiParam({
    name:'id',
    description: 'Id de sala'
  })
 async listRoomMembers(@Param('id') id: string) {
          
  return  await this.roomsService.listMembersRoom(id)
  };

  @Get('list-my-rooms')
  @ApiOperation({
    summary: 'Con este endpoint puedes listar todos los rooms de un usuario por id de usuario',
    description: 'Con este endpoint puedes listarte todos los rooms de un usuario por id de usuario'
  })
 async listUsersRooms(@Session() {id}: Record<string, any>) {
   console.log('Este es el id de usuario para listar todos las rooms de este usuario--->', id)
  return  await this.roomsService.listAllRoomsByUserId(id)
  };
  @Get('get-room/:id')
  @ApiOperation({
    summary: 'Con este endpoint puedes obtener datos de una sala por su id',
    description: 'Con este endpoint puedes obtener datos de una sala por su id'
  })
  @ApiParam({
    name:'id',
    description: 'Id de sala'
  })
 async getRooms(@Param('id') id: string) {
   console.log('Este es el id de sala--->', id)
  return  await this.roomsService.getRoom(id)
  };

  @Post('create-room')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Con este endpoint puedes crear una sala por token de usuario logeado junto con los integrantes',
    description: 'Con este endpoint puedes crear una sala por token de usuario logeado junto con los integrantes'
  })
  
 async creteRoom(@Body() {members, name}: RoomBodyDTO, @Session() {id} : Record<string, any>) {
   console.warn('headerXDDDDDDDDDDDDDDD id-->', id)
   return  await this.roomsService.createRoomByUserId(members, id, name)
  };
};
