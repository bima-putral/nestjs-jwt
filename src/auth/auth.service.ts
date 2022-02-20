import {BadRequestException, Injectable} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private userService : UserService,
        private jwtService : JwtService
    ) {

    }

    async cekUser(username, password){
        let user = await this.userService.findUsername(username)
        if(user){
            const valid = this.userService.compare(password, user.password)
            if (valid){
                return user
            } else {
                throw new BadRequestException({message : 'Password salah'})
            }
        } else {
            throw new BadRequestException({message: 'Username tidak ditemukan'})
        }
    }

    generateToken(user:any){
        let dataToken = {id:user.id}
        let token = this.jwtService.sign(dataToken)
        return {token:token}
    }
}
