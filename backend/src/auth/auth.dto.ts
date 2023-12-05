import { IsEmail, Length } from "class-validator";

export class RegisterDto {

    @Length(3, 50)
    readonly name: string;

    @IsEmail()
    @Length(3, 100)
    readonly email: string;

    @Length(8, 100)
    readonly password: string;
}

export class LoginDto {
    @IsEmail()
    @Length(3, 100)
    readonly email: string;

    @Length(8, 100)
    readonly password: string;
}