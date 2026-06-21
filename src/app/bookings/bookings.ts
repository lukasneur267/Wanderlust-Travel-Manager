import { Component } from '@angular/core';
import { IDestination } from '../idestination.interface';
import { BookingsService } from '../bookings-service';
import { RouterLink } from '@angular/router';
import { IPrices } from '../iprices.interface';

@Component({
  selector: 'app-bookings',
  imports: [RouterLink],
  templateUrl: './bookings.html',
  styleUrl: './bookings.css',
})
export class Bookings {
  bookingItems: IDestination[] = [];
  prices: IPrices = {
    subTotal: 0,
    serviceFee: 0,
    total: 0,
    discount: 0,
    finalPrice: 0,
  };

  constructor(private bS: BookingsService) {
    this.loadBookings();
    this.showPrice();
  }

  loadBookings() {
    this.bookingItems = this.bS.getBookingItems();
  }

  deleteBookingItem(item: IDestination) {
    this.bS.removeFromBookings(item);
    this.loadBookings();
    this.showPrice();
  }

  showPrice() {
    // calculate the prices with the bookings service and update the local prices object with the new values
    const prices = this.bS.calculatePrices();
    this.prices.subTotal = prices.subTotal;
    this.prices.serviceFee = prices.serviceFee;
    this.prices.total = prices.total;
    this.prices.discount = prices.discount;
    this.prices.finalPrice = prices.finalPrice;
  }

  formatPrice(value: number): string {
    return this.bS.formatPrice(value);
  }
}
