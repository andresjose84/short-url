import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';

import { UserService } from './user.service';
import { User } from './entities/user.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Auth } from '../auth/decorators/auth.decorator';
import { ValidRoles } from '../auth/interfaces/valid-roles.interface';
import { GetUser } from '../auth/decorators/get-user.decorator';

@ApiTags('Users')
@Controller('api/v1.0/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Auth(ValidRoles.admin) // Only admin can create users
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User successfully created.', type: User })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 403, description: 'Forbidden. Only admins can create users.' })
  create(
    @Body() createUserDto: CreateUserDto,
    @GetUser() user: User,
  ) {
    return this.userService.create(createUserDto, user);
  }

  @Get()
  @Auth(ValidRoles.admin)
  @ApiOperation({ summary: 'Get a list of all users' })
  @ApiResponse({ status: 200, description: 'List of users retrieved successfully.', type: [User] })
  @ApiResponse({ status: 403, description: 'Forbidden. Only admins can retrieve users.' })
  findAll(
    @GetUser() user: User,
  ) {
    return this.userService.findAll(user);
  }

  @Get(':id')
  @Auth()
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiResponse({ status: 200, description: 'User retrieved successfully.', type: User })
  @ApiResponse({ status: 404, description: 'User not found.' })
  findOne(
    @Param('id') id: string,
    @GetUser() user: User,
  ) {
    return this.userService.findOne(+id, user);
  }

  @Patch(':id')
  @Auth()
  @ApiOperation({ summary: 'Update a user by ID' })
  @ApiResponse({ status: 200, description: 'User updated successfully.', type: User })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: User,
  ) {
    return this.userService.update(+id, updateUserDto, user);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiResponse({ status: 200, description: 'User deleted successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden. Only admins can delete users.' })
  remove(
    @Param('id') id: string,
    @GetUser() user: User,
  ) {
    return this.userService.remove(+id, user);
  }
}
