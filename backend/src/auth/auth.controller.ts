import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';


@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post('register')
    @HttpCode(201)
    async signupUser(@Body() registerDto: RegisterDto) {
        return this.authService.registerUser(registerDto);
    }

    @Post('login')
    @HttpCode(200)
    signinUser(@Body() loginDto: LoginDto) {
        return this.authService.lgoinUser(loginDto);
    }

}
