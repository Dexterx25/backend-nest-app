import { Controller, Post, Body, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { loginAdminUserDTO, registerAdminUserDTO } from 'src/utils/dto/input/auth';
import { AuthService } from './auth.service';

@ApiTags("auth")
@Controller('api/v1/nextto/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  @ApiOperation({
    summary: 'Con este endpoint puedes registrar cuenta de usuario',
  })
 async registerAdmin(
    @Body() data: registerAdminUserDTO
  ) {
    if(!data.email || !data.password || !data.rePassword){
      throw new HttpException({
           message: 'Debbe usted ingresar toda la informacion necesaria como email, password y repassword',
           status: HttpStatus.BAD_REQUEST,
           Error: Error
       }, HttpStatus.BAD_REQUEST)
    } 
    if(data.password.length < 8){
      throw new BadRequestException('Password debe ser igual o mayor a 8 caracteres')
    }
    if(data.password !== data.rePassword){
      throw new BadRequestException('Password y rePasword no son iguales')
    }
    const {names, lastnames, ...rest} = data
    const newData:registerAdminUserDTO = {
      ...rest, 
      names, 
      lastnames,
      full_name: rest.full_name ? rest.full_name : names + ' ' + lastnames
    }
  return  await this.authService.registerUSer(newData)
  };

  @Post('login')
  @ApiOperation({
    summary: 'Con este endpoint se puede logear el usuario registrado',
  })
 async login(
    @Body() data: loginAdminUserDTO
  ) {
    if(!data.email || !data.password){
      throw new HttpException({
           message: 'Debes ingresar email y password',
           status: HttpStatus.BAD_REQUEST,
           Error: Error
       }, HttpStatus.BAD_REQUEST)
    }
   return await this.authService.validateUser(data.email, data.password);
  };

};
