import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User_entity } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant';


@Module({
  imports:[TypeOrmModule.forFeature([User_entity]),
  JwtModule.register({
    global: true,
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '900s' },
  }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
