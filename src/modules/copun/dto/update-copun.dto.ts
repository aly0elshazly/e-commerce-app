import { PartialType } from '@nestjs/mapped-types';
import { CreateCopunDto } from './create-copun.dto';

export class UpdateCopunDto extends PartialType(CreateCopunDto) {}
