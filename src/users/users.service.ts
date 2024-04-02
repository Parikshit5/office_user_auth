import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {  User_entity } from './entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User_entity)
    private readonly Users: Repository<User_entity>
  ) { }
  async sign_up(createUserDto: CreateUserDto) {
    try {
      const name=createUserDto.name;
      const email=createUserDto.email;
      const password=createUserDto.password;
      const mobile_no=createUserDto.mobile_no;
      const address=createUserDto.address;

      
    } catch (error) {
      
    }
     return await this.Users.save(createUserDto);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
