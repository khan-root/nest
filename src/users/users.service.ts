import { Injectable } from '@nestjs/common';
import { User } from 'src/utils/types';

@Injectable()
export class UsersService {
    private fakeUser = []

    getAllUser(){
        return this.fakeUser
    }

    createNewUser(user: User){
        this.fakeUser.push(user)
        console.log('fake', this.fakeUser)
        return {user}
    }
}
