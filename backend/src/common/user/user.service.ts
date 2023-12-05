import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose'
import { Model } from 'mongoose';
const bcrypt = require('bcrypt');

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly userModel: Model<any>) { }

    async create(name: string, email: string, password: string) {
        
        const user = new this.userModel;
        user.name = name
        user.email = email;
        user.password = await bcrypt.hash(password, 10)

        return await user.save();
    }

    async getUser(email: string) {
        const user = await this.userModel.findOne({ email });
        
        if (!user) throw new NotFoundException();
        return user;
    }

    async userExist(email: string) {
        const user = await this.userModel.findOne({ email });
        if (user) throw new BadRequestException("User already exist");
    }
}