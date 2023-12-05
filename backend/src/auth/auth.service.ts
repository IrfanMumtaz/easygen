import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/common/user/user.service';
const bcrypt = require('bcrypt');


@Injectable()
export class AuthService {

    constructor(private readonly userService: UserService, private jwtSerivce: JwtService){}

    async registerUser(request) {
        const { name, email, password } = request;
        await this.userService.userExist(email);

        const user = await this.userService.create(name, email, password);
        const payload = { id: user._id, email: user.email}
        return { name: user.name, email: user.email, access_token: this.jwtSerivce.sign(payload) } ;
    }

    async lgoinUser(request) {
        const { email, password } = request;
        const user = await this.userService.getUser(email);
        if (!(await bcrypt.compare(password, user.password))) throw new UnauthorizedException;

        const payload = { id: user._id, email: user.email }
        return { name: user.name, email: user.email, access_token: this.jwtSerivce.sign(payload) } ;
    }
}
