import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { AuthRepository } from "src/database/repositories/auth";
import { UserRepository } from "src/database/repositories/users";
import { registerAdminUserDTO } from "src/utils/dto/input/auth";
import * as bcrypt from 'bcryptjs'
import { User } from "src/database/entities/users/index";
import { JWTService } from "src/utils/jwt";

@Injectable()
export class AuthService {
  constructor(
      private readonly authRepository: AuthRepository,
      private readonly userRepository: UserRepository, 
      private readonly jwtService: JWTService
    ) {}
 
  public async registerUSer(data: registerAdminUserDTO){
    console.log('data to register-->', data)
    const userInstance = await this.userRepository.create(data)
    const authWithPasswordEncrypted = {
        ...data,
        password: bcrypt.hashSync(data.password!, 5)
    }
    console.log('this is the authWithPasswordEncrypted-->', authWithPasswordEncrypted)
    const authFound = await this.userRepository.findOne({where:{email: data.email}})
     if(authFound) throw new BadRequestException('email de uuario registrado previamente');
    const authInstance = await this.authRepository.create(authWithPasswordEncrypted);
    console.log('User and Auth Instnace to CreateUserAuthUSer-->', userInstance, authInstance)
   return await this.userRepository.createUserAndAuth(userInstance, authInstance);

  };


  public async SignCreateToken(userData: User) {
      const tokenAndRefreshToken = await this.jwtService.signToken({...userData})
      console.log('THIS IS THE TOKEN AND REFRESH TOKEN-->', tokenAndRefreshToken);
      return tokenAndRefreshToken
  }

  async validateUser(email: string, password: string): Promise<any> {
    console.log('VALIDARRR', password)
    const user = await this.userRepository.findOne({where: {email: email}});
    console.log('USER FOUND-->', user)
    if(user?.id){
      const auth = await this.authRepository.findOne({where:{user_id:user.id}}) 
      console.log('AUTH FOUND-->', auth)
    const areEqual =  await bcrypt.compare(password, auth?.password!)
    console.log('COMPARINGGG', areEqual)
    if(areEqual === true){
      console.log('SI ES IGUAL-->')
       return await this.SignCreateToken(user)
    }
    }else {
        throw new HttpException({
          message: 'Email de usuario no encontrado',
          status: HttpStatus.BAD_REQUEST,
          Error: Error
        }, HttpStatus.BAD_REQUEST) 
      
      }
  }
};

