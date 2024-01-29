import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { MenuService } from './menu.service';
import { Response } from 'express';
import JwtAuthGuard from '@/authentication/jwt-auth.guard';
import { ApiBody } from '@nestjs/swagger';

@Controller('menu')
export class MenuController {
  constructor(private service: MenuService) {}

  @Get('/')
  async downloadMenu(@Res() response: Response) {
    const file = await this.service.downloadMenu();
    response.contentType('png');
    response.attachment('continental_menu_export.png');
    response.send(file);
  }

  @Post('/uploadTv')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        fileId: {
          type: 'string',
        },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  async uploadToTv(@Res() response: Response, @Body('fileId') fileId?: string) {
    if (!['1', '2'].includes(fileId)) {
      return response.status(400).send({
        message: 'Invalid fileId (can only be 1, 2 or video)',
      });
    }

    this.service.uploadToTv(fileId).subscribe((r) => {
      response.status(200).send(r.data);
    });
  }
}
