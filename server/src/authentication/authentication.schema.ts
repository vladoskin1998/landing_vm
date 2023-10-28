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


// .insertOne({login: 'Veronika',password: '$2a$12$6EgNB/y5sqPvsDjRav79zezQaAEQgSO.2Xfmxu6eSq9.XG9rMZivK',token: '',lastEntered: new Date(), })