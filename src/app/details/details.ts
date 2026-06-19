import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDestination } from '../idestination.interface';
import { DESTINATIONS } from '../destinations';
import { BookingsService } from '../bookings-service';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details implements OnInit {
  destination: IDestination | undefined;

  constructor(
    // inject route into constructor
    private route: ActivatedRoute,
    private bS: BookingsService,
  ) {}

  ngOnInit() {
    // read info from URL (details id)
    let destinationId: number = Number(this.route.snapshot.params['id']);
    // check if id exists in the array
    this.destination = DESTINATIONS.find((item) => item.id === destinationId);
    console.log(this.destination);
  }

  addToBookings(destination: IDestination) {
    this.bS.addToBookings(destination);
    alert(`${destination.name} was added to the cart!`);
  }

  formatPrice(value: number): string {
    return this.bS.formatPrice(value);
  }
}
