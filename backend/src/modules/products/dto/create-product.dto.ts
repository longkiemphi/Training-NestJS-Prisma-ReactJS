import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
    MinLength,
    MaxLength,
    IsEmail,
    Matches
} from 'class-validator';

export class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(50)
    @ApiProperty({ default: 'Sample Product' }) // Default value for name
    name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    @ApiProperty({ default: 'Electronics' }) // Default value for type
    type: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    @ApiProperty({ default: '128GB' }) // Default value for storage
    storage: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    @ApiProperty({ default: '8GB' }) // Default value for RAM
    ram: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    @ApiProperty({ default: 'Lightly Used' }) // Default value for condition
    conditon: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    @ApiProperty({ default: 'John Doe' }) // Default value for owner name
    ownerName: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    @IsEmail()
    @ApiProperty({ default: 'johndoe@example.com' }) // Default value for owner email
    ownerEmail: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    @Matches(/^\d{9,10}$/, {
        message: 'ownerPhone must be 9 or 10 digits'
    })
    @ApiProperty({ default: '+84 03452344' }) // Default value for owner phone
    ownerPhone: string;

    @ApiProperty({ default: false }) // Default value for owner phone
    approved: boolean;
}
