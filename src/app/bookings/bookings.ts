import { Component } from '@angular/core';
import { IDestination } from '../idestination.interface';
import { BookingsService } from '../bookings-service';

@Component({
  selector: 'app-bookings',
  imports: [],
  templateUrl: './bookings.html',
  styleUrl: './bookings.css',
})
export class Bookings {
  bookingItems: IDestination[] = [];
  subTotal: number = 0;
  serviceFee: number = 0.1; // 10 %
  total: number = 0;
  discount: number = 0.15; // 15 %
  finalPrice: number = 0;

  // // format to currency
  // currencyFormatter = new Intl.NumberFormat('de-AT', {
  //   style: 'currency',
  //   currency: 'EUR',
  // });

  constructor(private bS: BookingsService) {
    this.loadBookings();
    this.showPrice();
  }

  loadBookings() {
    this.bookingItems = this.bS.getBookingItems();
  }

  showPrice() {
    this.subTotal = this.bS.calculateSubtotal();
    this.total = this.subTotal + this.subTotal * this.serviceFee;
    this.discount = this.total * this.discount;
    this.finalPrice = this.total - this.discount;
  }

  formatPrice(value: number): string {
    return this.bS.formatPrice(value);
  }
}
