import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as sharp from 'sharp';
import { createCanvas } from 'canvas';

import {
  BASE_LEFT_POSITIONING,
  BASE_PRICE_GAP,
  BASE_RIGHT_POSITIONING,
  BASE_TEXT_GAP,
  positionFromDrinkType,
} from './menu.constants';
import { DrinksService } from '@/drinks/drinks.service';
import { DrinkType } from '@/drinks/drinks.types';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class MenuService {
  constructor(
    private service: DrinksService,
    private httpService: HttpService,
  ) {}

  formUrlEncoded(x: NonNullable<unknown>) {
    return Object.keys(x).reduce(
      (p, c) => p + `&${c}=${encodeURIComponent(x[c])}`,
      '',
    );
  }

  async addTextOnImage() {
    const textArray = await this.generateTextArray();
    try {
      await sharp(path.join(process.cwd(), 'src/exports/contmenu.png'))
        .composite(textArray)
        .toFile(path.join(process.cwd(), `src/exports/menu.png`));
    } catch (error) {
      console.log(error);
    }
  }

  generateTextBuffer(text: string, fontSize: number, italic: boolean): Buffer {
    const svgImage = italic
      ? `
    <svg width='1500' height='200'>
      <style>
        .title { font-style: italic; font-family: 'ITC Avant Garde Gothic Std', sans-serif; fill: white; font-size: ${fontSize}px; font-weight: bold;}
      </style>
      <text x='0%' y='60%' text-anchor='start' class='title'>${text}</text>
    </svg>
    `
      : `
    <svg width='1600' height='300'>
      <style>
        .title { font-family: 'ITC Avant Garde Gothic Std', sans-serif;  text-align: center; fill: white; font-size: ${fontSize}px; font-weight: bold;}
      </style>
      <text x='0%' y='50%' text-anchor='start' class='title'>${text}</text>
    </svg>
    `;
    return Buffer.from(svgImage);
  }

  async downloadMenu() {
    await this.addTextOnImage();
    return fs.readFileSync(path.join(process.cwd(), `src/exports/menu.png`));
  }

  uploadToTv(fileId = '1'): Observable<AxiosResponse<boolean>> {
    const formData = new FormData();
    formData.append(
      'fileUpload',
      new File(
        [fs.readFileSync(path.join(process.cwd(), 'src/exports/menu.png'))],
        'menu.png',
      ),
    );
    formData.append('fileId', fileId);

    return this.httpService.post<boolean>(
      'https://tv.continental-efrei.fr/upload',
      formData,
    );
  }

  async generateTextArray() {
    const types: DrinkType[] = ['beer', 'cocktail', 'wine', 'mocktail'];
    const translations = {
      beer: 'bières',
      cocktail: 'cocktails',
      wine: 'vins',
      mocktail: 'softs & mocktails',
    };
    const texts = [];

    for (let i = 0; i < types.length; i++) {
      const drinks = await this.service.findByType(types[i]);

      if (drinks.length === 0) {
        texts.push({
          input: this.generateTextBuffer(
            `Pas de ${translations[types[i]]}`,
            160 / 2,
            false,
          ),
          top: positionFromDrinkType(types[i]),
          left: i < 2 ? BASE_LEFT_POSITIONING : BASE_RIGHT_POSITIONING,
        });
      }

      drinks.forEach((drink, index) => {
        texts.push({
          input: this.generateTextBuffer(drink.name, 160 / 2, false),
          top: positionFromDrinkType(types[i]) + index * BASE_TEXT_GAP,
          left: i < 2 ? BASE_LEFT_POSITIONING : BASE_RIGHT_POSITIONING,
        });

        if (drink.description) {
          const canvas = createCanvas(1620, 912);
          const context = canvas.getContext('2d');
          context.font = 'italic 130pt ITC Avant Garde Gothic Std';
          const width = Math.ceil(context.measureText(drink.name).width / 2);

          texts.push({
            input: this.generateTextBuffer(drink.description, 75 / 2, true),
            top: positionFromDrinkType(types[i]) + 20 + index * BASE_TEXT_GAP,
            left:
              i < 2
                ? BASE_LEFT_POSITIONING + width
                : BASE_RIGHT_POSITIONING + width,
          });
        }

        texts.push({
          input: this.generateTextBuffer(
            drink.price.toString() + '€',
            120 / 2,
            false,
          ),
          top: positionFromDrinkType(types[i]) + index * BASE_TEXT_GAP,
          left:
            i < 2
              ? BASE_LEFT_POSITIONING + BASE_PRICE_GAP
              : BASE_RIGHT_POSITIONING + BASE_PRICE_GAP,
        });
      });
    }

    return texts;
  }
}
