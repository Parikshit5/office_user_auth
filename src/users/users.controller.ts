import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards ,Request} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, LoginUserDto, ResetPasswordDto, forgetPasswordDto } from './dto/create-user.dto';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from './users.guard';
import { UpdateUserDto } from './dto/update-user.dto';


@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Post('Signup')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.sign_up(createUserDto);
  }
  
  @Post('Login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }
  
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post('forget_password')
  forgetPassword(@Body() forgetPasswordDto: forgetPasswordDto) {
    return this.usersService.forgetPassword(forgetPasswordDto)
  }


  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Post('reset_password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto, @Request() req) {
    const userEmail=req.user.username
    // console.log(userEmail);
    
    return this.usersService.resetPassword(resetPasswordDto,userEmail)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
