import { User, UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    addUser(user: User): Promise<any>;
    addUsers(users: User[]): Promise<any>;
    getUsers(): Promise<User[]>;
}
