import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { User } from "../../user/entities/user.entity";
import { Clicks } from "./clicks.entity";

@Entity( { name: 'urls' } )
export class Shorturl {

    @PrimaryGeneratedColumn( 'increment' )
    @ApiProperty( {
        description: 'Unique identifier for the short URL',
        example: 1,
    } )
    id!: number;

    @Column( { type: 'text', name: 'url' } )
    @ApiProperty( {
        description: 'The original URL to be shortened',
        example: 'https://example-long-url.com/long-url',
    } )
    url!: string;

    @Column( { type: 'text', name: 'short_url' } )
    @ApiProperty( {
        description: 'The shortened URL',
        example: 'abc123',
    } )
    short_url: string;

    @Column( { type: 'text', name: 'name_url' } )
    @ApiProperty( {
        description: 'A user-friendly name for the shortened URL',
        example: 'My Short URL',
    } )
    name_url: string;

    @ManyToOne(() => User, (user) => user._id, { eager: true })
    user_id: number;

    @Column( { type: 'numeric' } )
    @ApiProperty( {
        description: 'Timestamp when the short URL was created',
        example: 1700000000,
    } )
    created: number;

    @Column( { type: 'numeric' } )
    @ApiProperty( {
        description: 'Timestamp when the short URL was last modified',
        example: 1700050000,
    } )
    modified: number;

    @Column( { type: 'bool', default: true } )
    @ApiProperty( {
        description: 'Indicates whether the short URL is active or not',
        example: true,
    } )
    status: boolean;

    @OneToMany( () => Clicks, ( click ) => click.shorturl, { eager: true } )
    clicks!: Clicks[];
}
