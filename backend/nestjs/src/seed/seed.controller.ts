import { Controller, Get} from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('api/v1.0/seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  seeding() {
    return this.seedService.create();
  }
}
