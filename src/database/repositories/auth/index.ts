import { Auth } from "src/database/entities/auth/index";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Auth)
export class AuthRepository extends Repository<Auth> {

}
