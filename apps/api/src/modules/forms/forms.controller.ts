import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { FormsService } from './forms.service';
import { CreateFormDto } from './dto/create-form.dto';

@Controller('lexemes/:lexemeId/forms')
export class FormsController {
  constructor(private formService: FormsService) {}

  @Post()
  create(@Param('lexemeId') lexemeId: string, @Body() dto: CreateFormDto) {
    return this.formService.create(lexemeId, dto);
  }

  @Delete(':formId')
  delete(@Param('formId') formId: string) {
    return this.formService.delete(formId);
  }
}
