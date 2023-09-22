import { Module, Logger } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get('MONGO_URI'); // Получение значения uri
        console.log(`MongoDB URI-------->: ${uri}`);
        try {
          return {
            uri:
              'mongodb://vlados:Vlados1998@127.0.0.1:27017/bd_vm' 
              || configService.get('MONGO_URI'),
            dbName: 'bd_vm',
          };
        } catch (error) {
          console.log(error);
        }
     
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      serveRoot: '/',
    }),
    AuthenticationModule,
    PostsModule,
    CommentsModule,
  ],
})
export class AppModule {
  private logger = new Logger(AppModule.name);
}
