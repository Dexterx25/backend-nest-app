import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/database/repositories/users";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
 
  public async listAllUsersDB(){
      return await this.userRepository.find()
  };

  public async getUser(id: string){
    console.log('this is the userId-->', id)
    return await this.userRepository.findOne({where:{id}})
};

  public async listAllUsersByRoomId(roomId: string){
    console.log('this is the roomId for list AllUsers ByRoomId-->', roomId)
    return await this.userRepository.find()
  };
};

