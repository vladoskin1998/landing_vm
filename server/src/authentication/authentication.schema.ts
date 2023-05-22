import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthenticationType = HydratedDocument<Authentication>;

@Schema()
export class Authentication {
  @Prop()
  login: string;

  @Prop()
  password: string;

  @Prop()
  token: string;

  @Prop()
  lastEntered: Date;
}

export const AuthenticationSchema = SchemaFactory.createForClass(Authentication);
