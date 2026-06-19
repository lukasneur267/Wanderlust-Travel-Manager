import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Bookings } from './bookings/bookings';
import { DestinationsList } from './destinations-list/destinations-list';
import { About } from './about/about';
import { Details } from './details/details';

export const routes: Routes = [
  // navbar components
  { path: '', component: Home },
  { path: 'destinations', component: DestinationsList },
  { path: 'bookings', component: Bookings },
  { path: 'about', component: About },
  // destination list
  { path: 'details/:id', component: Details },
];
