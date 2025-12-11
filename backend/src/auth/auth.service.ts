import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/entities/Users';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(Users) private repo : Repository<Users>, private jwtService : JwtService) {};

    async Signup (userDto : UserDto) {
        try {
            if (userDto.username == null || userDto.password == null) return "Do not leave anything empty.";
            const IsUserExist = await this.repo.findOne({where : {username : userDto.username}})
            if (IsUserExist) return "This user already exists.";

            const newUser = this.repo.create({
                username : userDto.username,
                password : userDto.password,
                role : "User"
            });
            await this.repo.save(newUser);
        } catch (error) {
            throw error;
        };
    };

    async Login (userDto : UserDto) {
        try {
            if (userDto.username == null || userDto.password == null) return "Do not leave anything empty.";
            const User = await this.repo.findOne({where : {username : userDto.username}})
            if (!User) return "User not found";
            if (userDto.username == User.username && userDto.password == User.password) {
                const payload = {sub : User.user_id, username : User.username, role : User.role}
                return {
                    access_token : await this.jwtService.signAsync(payload)
                };
            };
        } catch (error) {
            throw error;
        };
    };
};
