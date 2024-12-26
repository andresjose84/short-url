import { PartialType } from '@nestjs/mapped-types';
import { CreateShorturlDto } from './create-shorturl.dto';

export class UpdateShorturlDto extends PartialType(CreateShorturlDto) {}
