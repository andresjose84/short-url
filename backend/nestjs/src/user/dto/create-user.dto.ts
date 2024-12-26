import {
    IsBoolean,
    IsEmail,
    IsNumber,
    IsOptional,
    IsString,
    Matches,
    MaxLength,
    MinLength
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

    @ApiProperty( {
        description: 'The unique username for the user.',
        minLength: 5,
        maxLength: 100,
        example: 'john_doe'
    } )
    @IsString()
    @MinLength( 5 )
    @MaxLength( 100 )
    user: string;

    @ApiProperty( {
        description: 'URL of the user profile image.',
        example: 'https://example.com/images/user-profile.jpg'
    } )
    @IsString()
    user_image: string;

    @ApiProperty( {
        description: 'The first name of the user.',
        minLength: 3,
        maxLength: 100,
        example: 'John'
    } )
    @IsString()
    @MinLength( 3 )
    @MaxLength( 100 )
    user_name: string;

    @ApiProperty( {
        description: 'The last name of the user.',
        minLength: 1,
        maxLength: 100,
        example: 'Doe'
    } )
    @IsString()
    @MinLength( 1 )
    @MaxLength( 100 )
    user_last_name: string;

    @ApiProperty( {
        description: 'The email address of the user.',
        example: 'johndoe@example.com'
    } )
    @IsString()
    @IsEmail()
    user_email: string;

    @ApiProperty( {
        description: 'The password for the user account. Must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
        minLength: 6,
        maxLength: 50,
        example: 'StrongP@ssw0rd'
    } )
    @IsString()
    @MinLength( 6 )
    @MaxLength( 50 )
    @Matches( /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/, {
        message: 'The password must have an uppercase letter, a lowercase letter, a number, and a special character.',
    } )
    user_password: string;

    @ApiProperty( {
        description: 'Timestamp of when the user was created (optional).',
        example: 1672531200000,
        required: false
    } )
    @IsNumber()
    @IsOptional()
    created?: number;

    @ApiProperty( {
        description: 'Timestamp of when the user was last modified (optional).',
        example: 1672531200000,
        required: false
    } )
    @IsNumber()
    @IsOptional()
    modified?: number;

    @ApiProperty( {
        description: 'The type of user (1 for admin, 2 for regular user).',
        example: 1,
        enum: [ 1, 2 ]
    } )
    @IsNumber()
    user_type: 1 | 2;

    @ApiProperty( {
        description: 'Indicates whether the user account is active.',
        example: true
    } )
    @IsBoolean()
    status: boolean;
}
