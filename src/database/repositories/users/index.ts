import { InternalServerErrorException } from "@nestjs/common";
import { Auth } from "src/database/entities/auth/index";
import { User } from "src/database/entities/users/index";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    public async createUserAndAuth(userInstance: User, authInstance: Auth){
       const queryRunner = this.manager.connection.createQueryRunner();
       let err;
       try {
           let respon = {}
        await queryRunner.startTransaction();
         const userCreated = await queryRunner.manager.save(User, userInstance);
         const authCreated = await queryRunner.manager.insert(Auth, {
             access_token:'',
             refresh_token: '', 
             password:authInstance.password,
             user_id:userCreated
         })
         console.log('User Created-->', userCreated);
         console.log('auth created-->', authCreated)
         respon = {authCreated, userCreated}
         await queryRunner.commitTransaction();
           
        return respon;

    } catch (error) {
        console.log('Error tratando de crear orden de solidos-->', error)
        err = error;
        await queryRunner.rollbackTransaction();
    } finally {
        await queryRunner.release();
    }
    if (err) throw new InternalServerErrorException(err);

}
    

}
