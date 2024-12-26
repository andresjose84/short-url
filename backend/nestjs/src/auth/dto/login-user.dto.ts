import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {

    @ApiProperty({
        description: 'User email address',
        example: 'user@example.com',
    })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'User password with at least one uppercase letter, one lowercase letter, one number, and one special character',
        example: 'Password123!',
    })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]{8,}$/, 
        {
            message: 'The password must have an uppercase letter, a lowercase letter, a number, and a special character.'
        }
    )
    password: string;
}
