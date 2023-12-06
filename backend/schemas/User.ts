import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { now } from "mongoose";

@Schema()
export class User {

    @Prop({ required: true })
    name: string;

    @Prop({ required: true, index: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({default: now()})
    createdAt: Date;

    @Prop({default: now()})
    updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);