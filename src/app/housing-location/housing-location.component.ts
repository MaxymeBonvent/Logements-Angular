// Importations
import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HousingLocation} from '../housinglocation';
import {RouterModule} from '@angular/router';
import {RouterLink} from '@angular/router';

// Composant enfant Housing Location, @Component est un "decorator"
@Component({
  selector: 'app-housing-location', // Balise HTML
  imports: [CommonModule, RouterModule, RouterLink],
  template: `<section class="listing">
              <img
                class="listing-photo"
                [src]="housingLocation.photo"
                alt="Exterior photo of {{housingLocation.name}}" crossorigin
              />
              <h2 class="listing-heading">{{housingLocation.name}}</h2>
              <p class="listing-location">{{housingLocation.city}}, {{housingLocation.state}}</p>

              <!-- The value assigned to the routerLink directive is an array with two entries: 
              the static portion of the path and the dynamic data. -->
              <a [routerLink]="['/details', housingLocation.id]">Voir plus</a>
            </section>`,
  styleUrls: ['./housing-location.component.css'],
  styles: ``
})

// Composant enfant
export class HousingLocationComponent {

  // @Input est un "decorator", le ! s'appelle "non-null assertion operator"
  @Input() housingLocation!: HousingLocation;
}