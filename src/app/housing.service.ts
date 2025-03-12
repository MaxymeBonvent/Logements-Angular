// HOUSING SERVICE
import {Injectable} from '@angular/core';
import {HousingLocation} from './housinglocation';

@Injectable({
  providedIn: 'root'
})

export class HousingService {
  readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common';

  // URL du fichier de données sur les logements
  url = "http://localhost:3000/locations";

  // Fonctions
  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url);
    return(await data.json()) ?? [];
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? {};
  }

  // Constructeur
  constructor() {}

  // Méthode pour envoyer un formulaire
  submitApplication(prénom: string, nom: string, mail: string) {
    console.log(
      `Formulaire de logement reçu: prénom: ${prénom}, nom: ${nom}, mail: ${mail}.`,
    );
  }
}