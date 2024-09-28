import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { User, UserService } from './user.service';
import { ErrorsInterceptor } from 'src/middleware/errors.interceptor';
@UseInterceptors(ErrorsInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('addUser')
  async addUser(@Body() user: User): Promise<any> {
    return await this.userService.createUser(user);
  }
  @Post('addUsers')
  async addUsers(@Body() users: User[]): Promise<any> {
    return await this.userService.createUsers(users);
  }
  @Get('getUsers')
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }
}
