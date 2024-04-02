import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {  User_entity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { find } from 'rxjs';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User_entity)
    private readonly Users: Repository<User_entity>,

    private jwtService: JwtService,
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

  async login(logindto) {
    try{
      const user = await this.Users.findOne({
        where:[{email:logindto.email}]
      })

      if(!user){
        return "User not found! Please Check your Email or Password."
      }
      
      
      else if (user.password !== logindto.password) {
        //throw new UnauthorizedException();
        return "Password does not match";
      }
      const payload = { sub: user.email, username: user.email };
      return {
        id:user.id,
        name:user.name,
        email:user.email,
        mobile_no:user.mobile_no,
        address:user.address,
        access_token: await this.jwtService.signAsync(payload),
      }
    }catch(error){
      return error;
      
    }
    }

  async findAll() {
    try{
    const users=await this.Users.find()
    return users;
    }catch(error){
      return error;
    }
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
