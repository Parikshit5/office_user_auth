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
      let existing_email = await this.Users.find({ where: { email: createUserDto.email } });
      let mobile_no=await this.Users.findOne({ where: { mobile_no: createUserDto.mobile_no } });

      
    if (existing_email.length) {
      let msg='Email already exists';
      return(msg);
    }
    if(mobile_no){
      let msg='Mobile number already exist';
      return(msg);
    }
    if(createUserDto.password.length<8){
      let msg="Password must be of 8 or more characters";
      return msg;
    }

    if(createUserDto.email){
      function isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }
      if (!isValidEmail(createUserDto.email)) {
        return ('Please enter a valid email');
      }
    }

     

    //Email doesn't exist, proceed with user creation
    const newUser = await this.Users.save(createUserDto);
    return newUser;

    } catch (error) {
      return error;
    }
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
