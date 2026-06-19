import { Component } from '@angular/core';
import { IDestination } from '../idestination.interface';
import { DESTINATIONS } from '../destinations';
import { RouterLink } from '@angular/router';
import { BookingsService } from '../bookings-service';

@Component({
  selector: 'app-destinations-list',
  imports: [RouterLink],
  templateUrl: './destinations-list.html',
  styleUrl: './destinations-list.css',
})
export class DestinationsList {
  // access the array and make it available within the class
  destinationsArray: IDestination[] = DESTINATIONS;

  constructor(private bS: BookingsService) {}

  addToBookings(destination: IDestination) {
    this.bS.addToBookings(destination);
    alert(`${destination.name} was added to the cart!`);
  }

  formatPrice(value: number): string {
    return this.bS.formatPrice(value);
  }
}
