import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { UsersService } from './users/users.service';
import { User_entity } from './users/entities/user.entity';
dotenv.config();



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host:process.env.HOST_NAME,
      port: Number(process.env.PORT_NAME),
      username: process.env.USERNAME1,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [join(process.cwd(),'dist/**/*.entity.js')],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User_entity]),
    UsersModule],
  controllers: [AppController],
  providers: [AppService,UsersService],
})
export class AppModule {}
