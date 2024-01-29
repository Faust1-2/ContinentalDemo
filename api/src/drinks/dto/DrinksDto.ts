import { DrinkType } from '../drinks.types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class DrinksDto {
  @ApiProperty({
    description: 'Not implemented',
    type: Boolean,
  })
  public inMenu = false;

  @ApiProperty({
    description: 'The name of the drink',
  })
  public name: string;

  @ApiProperty({
    description: 'The price of the drink in euros',
  })
  public price: number;

  @ApiPropertyOptional({
    description:
      'The description of the drink. ' +
      'Often used to describe the ingredients ' +
      'if the drink is not wine, beer or soft',
  })
  public description: string;

  @ApiProperty({
    description:
      'The type of the drink. Can be either a beer, wine, cocktail, mocktail, or a soft',
  })
  public type: DrinkType;
}
