import { Controller, Param, Get} from '@nestjs/common';
import {  ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags("user")
@Controller('api/v1/nextto/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('list-users')
  @ApiOperation({
    summary: 'Con este endpoint puedes listar todos los usuarios',
    description: 'Con este endpoint puedes listarte todos los usuarios del aplicativo'
  })
 async listUsers() {
  return  await this.userService.listAllUsersDB()
  };
  @Get('get-users/:id')
  @ApiOperation({
    summary: 'Con este endpoint puedes obtener datos de un usuario',
    description: 'Con este endpoint puedes obtener datos de un usuario'
  })
  @ApiParam({
    name:'id',
    description: 'Id de usuario'
  })
 async getUser(@Param('id') id: string) {
  
  return  await this.userService.getUser(id)
  };

  @Get('list-users-byRoomId/:id')
  @ApiOperation({
    summary: 'Con este endpoint puedes listar todos los usuarios de una sala por id de sala',
    description: 'Con este endpoint puedes listarte todos los usuarios de una sala por id de sala'
  })
  @ApiParam({
    name:'id',
    description: 'Id de sala'
  })
 async listUsersRooms(@Param('id') id: string) {
   console.log('Este es el id de sala para listar todos los usuarios de esta sala--->', id)
  return  await this.userService.listAllUsersByRoomId(id)
  };
};
