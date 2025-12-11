import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiProperty({ example: 'user1', description: 'Kullanıcı adı' })
    username : string;

    @ApiProperty({ example: '123456', description: 'Kullanıcı şifresi' })
    password : string;
};
