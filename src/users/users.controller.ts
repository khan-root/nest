import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/CreateUser.dto';
// import { Request, Response } from 'express';

@Controller('users')
export class UsersController {
    @Get('/')
    getUser(){
        return {name:'Sarmad', email:'sarmadfaizan@outlook.com'}
    }


    // this is express way of handling body
    // @Post('create')
    // createUser(@Req() request: Request, @Res() response: Response){
    //     console.log(request.body)
    //     response.send('testing')
    // }
    @Post('create')
    createUser(@Body() userData: CreateUserDto){
       console.log(userData)
       return {}
    }
}
