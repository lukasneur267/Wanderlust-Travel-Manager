import { Service } from '@angular/core';
import { IDestination } from './idestination.interface';
import { IPrices } from './iprices.interface';

@Service()
export class BookingsService {
  private bookings: IDestination[] = [];
  // all the price related properties are stored in a single object for better organization
  private prices: IPrices = {
    subTotal: 0,
    serviceFee: 0,
    total: 0,
    discount: 0,
    finalPrice: 0,
  };

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

  removeFromBookings(destination: IDestination) {
    let existingBooking = this.bookings.find((item) => item.id === destination.id);
    // if the booking exists, decrease the quantity or remove it from the bookings
    if (existingBooking) {
      if (existingBooking.quantity > 1) {
        existingBooking.quantity--;
      } else {
        // remove the booking from the bookings array
        this.bookings.splice(this.bookings.indexOf(existingBooking), 1);
      }
    }
  }

  getBookingItems(): IDestination[] {
    return this.bookings;
  }

  calculatePrices() {
    let subTotal = 0;
    for (let booking of this.bookings) {
      subTotal += booking.price * booking.quantity;
    }
    let serviceFee = subTotal * 0.1; // adding 10% service fee
    let total = subTotal + serviceFee;
    let discount = total * 0.15; // applying 15% discount
    let finalPrice = total - discount;

    this.prices = { subTotal, serviceFee, total, discount, finalPrice };

    return this.prices;
  }

  formatPrice(value: number): string {
    return this.currencyFormatter.format(value);
  }
}
