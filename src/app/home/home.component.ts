// Importations
import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HousingLocationComponent} from '../housing-location/housing-location.component';
import {HousingLocation} from '../housinglocation';
import {HousingService} from '../housing.service';

// Composant parent Home, @Component est un "decorator"
@Component({
  selector: 'app-home', // Balise HTML
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>

      <form>
        <!-- #filter is a "template reference variable" -->
        <input id="ville" type="text" placeholder="Filtrer les logements par ville" #filter maxlength="20"/>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Chercher</button>
      </form>

    </section>

    <section class="results">

      <!-- AFFICHAGE DES LOGEMENTS -->
      <!-- [attribute] = "value" -->
      <!-- *ngFor signifie "Angular For Loop" -->
      <app-housing-location
          *ngFor="let housingLocation of filteredLocationList"
          [housingLocation]="housingLocation">
      </app-housing-location>

    </section>`,
  
  styleUrls: ['./home.component.css'],
})

// Composant parent Home
export class HomeComponent {
  readonly baseUrl = 'https://angular.dev/assets/images/tutorials/common';

  // Liste de logements
  housingLocationList: HousingLocation[] = [];

  // Propriété de type HousingService, nécessaire au fonctionnement du constructeur ci-dessous
  housingService: HousingService = inject(HousingService);

  filteredLocationList: HousingLocation[] = [];

  // Constructeur
  constructor() {
    // La fonction getAllHousingLocations() vient de housing.service.ts
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList = housingLocationList;
      this.filteredLocationList = housingLocationList;
    });

    console.log("Constructeur appelé depuis home.component.ts.");
  }

  filterResults(text: string)
  {
    // Message test
    console.log(`filterResults(${text}) appelée.`);
    
    // Mettre le texte entré en minuscule et l'afficher dans la console
    let textMin = text.toLowerCase();
    console.log(`Texte minuscule == ${textMin}.`);

    // Si la valeur entrée n'est pas du texte
    if(!text)
    {
      // Le dire dans la console
      console.log("La valeur entrée n'est pas du texte.");

      // Afficher la liste complète de logements
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    // Assigner à la liste filtrée tous les logements dont la ville est la même que celle 
    // entrée
    this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>
    housingLocation?.city.toLowerCase().includes(textMin));
  };
}