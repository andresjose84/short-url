import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { Clicks, Shorturl } from '../shorturl/entities';

@Injectable()
export class RedirectService {

  private readonly logger = new Logger( RedirectService.name );

  constructor(
    @InjectRepository( Shorturl )
    private readonly shorturlRepository: Repository<Shorturl>,
    @InjectRepository( Clicks )
    private readonly clicksRepository: Repository<Clicks>,
    private readonly dataSource: DataSource
  ) { }


  async findShortUrl(id: string, headers: Headers): Promise<string | boolean> {
    try {
      const queryBuilder = this.shorturlRepository
        .createQueryBuilder('shorturl');

      const shortUrls = await queryBuilder
        .select([
          'shorturl.url', 'shorturl.id'
        ])
        .where('shorturl.short_url = :short_url', { short_url: id })
        .getOne();

      console.log({
        shortUrls
      });

      if (!shortUrls) {
        return false;
      }

      const forwardedIp = headers['x-forwarded-for'] as string;

      const ip = forwardedIp ? forwardedIp.split(',')[0].trim() : headers['ip'];

      console.log(`User IP: ${ip}`);

      const click = this.clicksRepository.create({
        shorturl: { id: shortUrls.id },
        ip: ip,
        browser: headers['user-agent'],
        created: new Date().getTime()
      });

      await this.clicksRepository.save(click);
      return shortUrls.url;
    } catch (error) {
      this.logger.log('Service redirect error: ', error);
      return false;
    }
  }

}
