export interface Drink {
  id?: string;
  name: string;
  price: number;
  description?: string;
  type: DrinkType;
}

export type DrinkType = 'beer' | 'cocktail' | 'mocktail' | 'wine';
