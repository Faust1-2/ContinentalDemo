import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Drink } from '@app/types/drink.types';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DrinkService {

  public drinks = new BehaviorSubject<Drink[]>([]);

  constructor(private httpClient: HttpClient) {
  }

  getDrinks() {
    return this.httpClient.get<Drink[]>('drinks', { withCredentials: true }).subscribe((drinks) => {
      this.drinks.next(drinks);
    });
  }

  getDrink(id: string, type?: 'beer' | 'wine' | 'cocktail' | 'soft') {
    return this.httpClient.get<Drink>(`drinks/${id}`, { withCredentials: true, params: { type: type as string } });
  }

  createDrink(drink: Drink) {
    return this.httpClient.post<Drink>('drinks', drink, { withCredentials: true });
  }

  updateDrink(drink: Drink) {
    return this.httpClient.patch<Drink>(`drinks/${drink.id}`, drink, { withCredentials: true });
  }

  deleteDrink(id: string) {
    return this.httpClient.delete<Drink>(`drinks/${id}`, { withCredentials: true });
  }

  uploadTV(fileId = '1') {
    return this.httpClient.post('menu/uploadTv', {
      fileId
    }, { withCredentials: true });
  }
}
