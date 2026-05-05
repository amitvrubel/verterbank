import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { FormsService } from './forms.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateSenseDto } from '../senses/dto/update-sense.dto';
import { UpdateFormDto } from './dto/update-form.dto';

@Controller('lexemes/:lexemeId/forms')
export class FormsController {
  constructor(private formService: FormsService) {}

  @Post()
  create(@Param('lexemeId') lexemeId: string, @Body() dto: CreateFormDto) {
    return this.formService.create(lexemeId, dto);
  }

  @Patch(':formId')
  update(@Param('formId') formId: string, @Body() dto: UpdateFormDto) {
    return this.formService.update(formId, dto);
  }

  @Delete(':formId')
  delete(@Param('formId') formId: string) {
    return this.formService.delete(formId);
  }
}
