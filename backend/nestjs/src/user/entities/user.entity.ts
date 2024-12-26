import {
    IsString,
    MaxLength,
    MinLength
} from "class-validator";
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { Shorturl } from "../../shorturl/entities/shorturl.entity";

@Entity( { name: 'users' } )
export class User {

    @ApiProperty( {
        description: 'The unique identifier for the user.',
        example: 1
    } )
    @PrimaryGeneratedColumn( 'increment' )
    _id: number;

    @ApiProperty( {
        description: 'The unique username of the user.',
        example: 'john_doe'
    } )
    @Column( { type: 'varchar', length: 500, unique: true } )
    user: string;

    @ApiProperty( {
        description: 'URL of the user profile image.',
        example: 'https://example.com/images/user-profile.jpg'
    } )
    @Column( { type: 'varchar', length: 500 } )
    user_image: string;

    @ApiProperty( {
        description: 'The first name of the user.',
        example: 'John'
    } )
    @Column( { type: 'varchar', length: 200 } )
    @IsString()
    user_name: string;

    @ApiProperty( {
        description: 'The last name of the user.',
        example: 'Doe'
    } )
    @Column( { type: 'varchar', length: 200 } )
    @IsString()
    user_last_name: string;

    @ApiProperty( {
        description: 'The email address of the user.',
        example: 'johndoe@example.com'
    } )
    @Column( { type: 'varchar', length: 256, unique: true } )
    user_email: string;

    @ApiProperty( {
        description: 'The hashed password for the user account.',
        minLength: 8,
        maxLength: 128,
        example: 'hashedpassword123'
    } )
    @Column( { type: 'text' } )
    @MinLength( 8 )
    @MaxLength( 128 )
    user_password: string;

    @ApiProperty( {
        description: 'Timestamp of when the user was created.',
        example: 1672531200000
    } )
    @Column( { type: 'numeric' } )
    created: number;

    @ApiProperty( {
        description: 'Timestamp of when the user was last modified.',
        example: 1672531200000
    } )
    @Column( { type: 'numeric' } )
    modified: number;

    @ApiProperty( {
        description: 'The type of user. 1 for admin, 2 for regular user.',
        example: 1
    } )
    @Column( { type: 'int', default: 1 } )
    user_type: number;

    @ApiProperty( {
        description: 'Indicates whether the user account is active.',
        example: true
    } )
    @Column( { type: 'bool', default: true } )
    status: boolean;

    @ApiProperty( {
        description: 'List of short URLs associated with the user.',
        type: () => [ Shorturl ]
    } )
    @OneToMany(
        () => Shorturl,
        ( urls ) => urls.user_id
    )
    urls: Shorturl[];

    @BeforeInsert()
    checkFieldsBeforeInsert () {
        this.user_email = this.user_email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate () {
        this.user_email = this.user_email.toLowerCase().trim();
    }
}
