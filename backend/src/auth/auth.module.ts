import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/entities/Users';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
    imports : [
        TypeOrmModule.forFeature([Users]),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: Number(process.env.JWT_EXPIRES_IN ?? 3600) },
        }), 
    ],
    providers : [AuthService],
    controllers : [AuthController],
    exports : [AuthService,JwtModule]
})
export class AuthModule {  
}
