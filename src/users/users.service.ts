import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {  User_entity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { forgetPasswordDto } from './dto/forget-password.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User_entity)
    private readonly Users: Repository<User_entity>,

    private jwtService: JwtService,
  ) { }
  
  async sign_up(createUserDto: CreateUserDto) {
    try {
      let existing_email = await this.Users.find({ where: { email: createUserDto.email } });
      let mobile_no=await this.Users.findOne({ where: { mobile_no: createUserDto.mobile_no } });
      let password= await hashPassword(createUserDto.password);
      createUserDto.password=password;
      
      if(createUserDto.email){
        function isValidEmail(email: string): boolean {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email);
        }
        if (!isValidEmail(createUserDto.email)) {
          return ('Please enter a valid email');
        }
      }
      
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

  

     

    //Email doesn't exist, proceed with user creation
    const newUser = await this.Users.save(createUserDto);
    return newUser;

    async function hashPassword(password: string): Promise<string> {
      const saltRounds = 10; // You can adjust this value according to your security needs
      return await bcrypt.hash(password, saltRounds);
    }

    // async function comparePasswords(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
    //   return await bcrypt.compare(plainTextPassword, hashedPassword);
    // }

    } catch (error) {
      return error;
    }
  }

  async login(logindto) {
    try{
      async function comparePasswords(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainTextPassword, hashedPassword);
      }
      
      const user = await this.Users.findOne({
        where:[{email:logindto.email}]
      })

      if(!user){
        return "User not found! Please Check your Email or Password."
      }
      
      
      let result=await comparePasswords(logindto.password,user.password);
       if(result===false){
        return 'Password does not match'
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

  async forgetPassword(forgetPasswordDto:forgetPasswordDto) {

    async function comparePasswords(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainTextPassword, hashedPassword);
      } 

      async function hashPassword(password: string): Promise<string> {
        const saltRounds = 10; // You can adjust this value according to your security needs
        return await bcrypt.hash(password, saltRounds);
      }
      let newpassword=await hashPassword(forgetPasswordDto.newpassword);

      const user = await this.Users.findOne({
        where:[{email:forgetPasswordDto.email}]
      })

      if(!user){
        return 'account with this email does not exist.'
      }

    let result=await comparePasswords(forgetPasswordDto.oldpassword,user.password);
       if(result===false){
        return 'Old Password does not match'
      }
      if(result===true){
        
        await this.Users.save({
          id:user.id,
          name:user.name,
          email:user.email,
          password:newpassword,
          mobile_no:user.mobile_no,
          address:user.address
        })
        return 'Password updated successfully.'
      }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
