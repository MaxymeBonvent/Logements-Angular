// Importations
import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {HousingService} from '../housing.service';
import {HousingLocation} from '../housinglocation';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

// Composant Détails
// The ? is called an "optional chaining operator"
@Component({
  selector: 'app-details',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
              <article>

                <img
                  class="listing-photo"
                  [src]="housingLocation?.photo"
                  alt="Photo de l'extérieur de {{housingLocation?.name}}"
                  crossorigin
                />

                <section class="listing-description">

                  <h2 class="listing-heading">{{housingLocation?.name}}</h2>
                  <p class="listing-location">{{housingLocation?.city}}, {{housingLocation?.state}}</p>

                </section>

                <section class="listing-features">

                  <h2 class="section-heading">

                    <ul>

                      <li>Quantité disponible : {{housingLocation?.availableUnits}}</li>
                      <li>Wi-fi disponible : {{housingLocation?.wifi}}</li>
                      <li>Lessive disponible : {{housingLocation?.laundry}}</li>

                    </ul>

                  </h2>

                </section>

                <section class="listing-apply">

                  <h2 class="section-heading">Veuillez remplir ce formulaire pour habiter ici</h2>

                  <form [formGroup]="applyForm" (submit)="submitApplication()">

                    <label for="prénom">Prénom</label>
                    <input id="prénom" type="text" formControlName="prénom" placeholder="prénom" maxlength="30"/>

                    <label for="nom">Nom</label>
                    <input id="nom" type="text" formControlName="nom" placeholder="nom" maxlength="30"/>

                    <label for="mail">Mail</label>
                    <input id="mail" type="email" formControlName="mail" placeholder="adresse.exemple@hotmail.com" maxlength="30"/>

                    <button type="submit" class="primary">Envoyer</button>

                  </form>

                </section>

              </article>
            `,
  styleUrls: ['details.component.css'],
  styles: ``
})

export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  applyForm = new FormGroup({
    prénom: new FormControl(""),
    nom: new FormControl(""),
    mail: new FormControl(""),
  })

  constructor()
  {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    
    this.housingService.getHousingLocationById(housingLocationId).then((housingLocation) => {
      this.housingLocation = housingLocation;
    });
  }

  // Méthode pour envoyer un formulaire
  submitApplication(){
    this.housingService.submitApplication(
      this.applyForm.value.prénom ?? "",      
      this.applyForm.value.nom ?? "",
      this.applyForm.value.mail ?? ""
    );
  }
}