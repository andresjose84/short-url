import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { 
    IsBoolean, 
    IsNumber, 
    IsOptional, 
    IsString, 
    MaxLength, 
    MinLength 
} from "class-validator";

export class CreateShorturlDto {

    @ApiProperty({
        description: 'The original URL to be shortened',
        example: 'https://example.com/long-url',
        minLength: 5,
        maxLength: 100,
    })
    @IsString()
    @MinLength(5)
    @MaxLength(100)
    url: string;

    @ApiPropertyOptional({
        description: 'The custom short URL identifier (optional)',
        example: 'short123',
    })
    @IsString()
    @IsOptional()
    short_url?: string;

    @ApiProperty({
        description: 'A descriptive name for the short URL',
        example: 'Example URL',
        minLength: 4,
        maxLength: 100,
    })
    @IsString()
    @MinLength(4)
    @MaxLength(100)
    name_url: string;

    @ApiPropertyOptional({
        description: 'The creation timestamp (optional, managed by the system)',
        example: 1700000000,
    })
    @IsNumber()
    @IsOptional()
    created?: number;

    @ApiPropertyOptional({
        description: 'The last modified timestamp (optional, managed by the system)',
        example: 1700050000,
    })
    @IsNumber()
    @IsOptional()
    modified?: number;

    @ApiProperty({
        description: 'Indicates whether the short URL is active',
        example: true,
    })
    @IsBoolean()
    status: boolean;
}
