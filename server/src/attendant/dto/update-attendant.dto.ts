import { PartialType } from '@nestjs/mapped-types';
import { CreateAttendantDto } from './create-attendant.dto';

export class UpdateAttendantDto extends PartialType(CreateAttendantDto) {}
