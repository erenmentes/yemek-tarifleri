import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService : AuthService) {};

    @Post('signup')
    @ApiOperation({ summary: 'Kullanıcı kaydı' })
    @ApiBody({ type: UserDto })
    async Signup(@Body() userDto : UserDto) {
        return this.authService.Signup(userDto);
    };

    @Post('login')
    @ApiOperation({ summary: 'Kullanıcı girişi' })
    @ApiBody({ type: UserDto })
    async Login(@Body() userDto : UserDto) {
        return this.authService.Login(userDto);
    };
};
