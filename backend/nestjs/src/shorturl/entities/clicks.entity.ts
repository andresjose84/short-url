import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Shorturl } from "./shorturl.entity";

@Entity( { name: 'clicks' } )
export class Clicks {

    @PrimaryGeneratedColumn( 'increment' )
    @ApiProperty( {
        description: 'Unique identifier for the click event',
        example: 1,
    } )
    id!: number;

    @ManyToOne( () => Shorturl, ( shorturl ) => shorturl.clicks )
    shorturl!: Shorturl;

    @Column( { type: 'text', name: 'ip' } )
    @ApiProperty( {
        description: 'IP address of the user who clicked the short URL',
        example: '192.168.0.1',
    } )
    ip!: string;

    @Column( { type: 'text', name: 'browser' } )
    @ApiProperty( {
        description: 'Browser used by the user who clicked the short URL',
        example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    } )
    browser!: string;

    @Column( { type: 'numeric', name: 'created' } )
    @ApiProperty( {
        description: 'Timestamp when the click occurred',
        example: 1700000000,
    } )
    created!: number;
}
