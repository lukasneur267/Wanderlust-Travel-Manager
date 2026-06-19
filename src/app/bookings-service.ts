import { Service } from '@angular/core';
import { IDestination } from './idestination.interface';

@Service()
export class BookingsService {
  private bookings: IDestination[] = [];

  // format to currency
  currencyFormatter = new Intl.NumberFormat('de-AT', {
    style: 'currency',
    currency: 'EUR',
  });

  addToBookings(destination: IDestination) {
    let existingBooking = this.bookings.find((item) => item.id === destination.id);
    if (existingBooking) {
      existingBooking.quantity++;
    } else {
      // add new booking entry
      this.bookings.push({ ...destination });
    }
  }

  getBookingItems(): IDestination[] {
    return this.bookings;
  }

  calculateSubtotal() {
    let subTotal = 0;
    for (let booking of this.bookings) {
      subTotal += booking.price * booking.quantity;
    }
    return subTotal;
  }

  formatPrice(value: number): string {
    return this.currencyFormatter.format(value);
  }
}
