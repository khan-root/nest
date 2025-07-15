import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUser.dto';
import { UsersService } from './users.service';
// import { Request, Response } from 'express';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}
    @Get('/')
    getUser(){
        return this.userService.getAllUser()
    }


    // this is express way of handling body
    // @Post('create')
    // createUser(@Req() request: Request, @Res() response: Response){
    //     console.log(request.body)
    //     response.send('testing')
    // }
    @Post('create')
    @UsePipes(new ValidationPipe())
    createUser(@Body() userData: CreateUserDto){
       this.userService.createNewUser(userData)
       return userData
    }


    @Get(':id')
    getSingleUser(@Param('id', ParseIntPipe) id:number){
        console.log(id)
        return {id}
    }
}
