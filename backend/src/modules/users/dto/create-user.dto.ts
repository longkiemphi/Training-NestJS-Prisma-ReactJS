import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, IsEmail, IsNumberString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ default: 'John Doe' }) // Default value for name
    name: string;

    @IsNumberString()
    @ApiProperty({ default: '1234567890' }) // Default value for phone
    phone: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ default: 'johndoe@example.com' }) // Default value for email
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty({ default: 'password123' }) // Default value for password
    password: string;
}