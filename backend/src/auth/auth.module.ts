import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserSchema } from 'schemas/User';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from 'src/common/user/user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
        {name: 'User', schema: UserSchema}
    ]),
  ],
  providers: [AuthService, UserService],
  controllers: [AuthController]
})
export class AuthModule {}
