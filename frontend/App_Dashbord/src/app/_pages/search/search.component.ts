import { NgFor } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MastheadComponent } from 'src/app/_components/masthead/masthead.component';
import { FilterSeach } from 'src/app/_type/filters/filter';
import { MaterialModule } from 'travel-and-trek-app-core/dist/app-core';
import { PersonComponent } from "../../_components/person/person.component";
import { GroupComponent } from "../../_components/group/group.component";
import { PlaceComponent } from "../../_components/place/place.component";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MaterialModule, MastheadComponent, NgFor, PersonComponent, GroupComponent, PlaceComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SearchComponent {
  filters: FilterSeach[] = [
    {
      value: '1',
      icon: 'today',
      name: 'Today', // Filter for today's date
    },
    {
      value: '7',
      icon: 'calendar_today',
      name: 'Last 7 Days', // Filter for the last 7 days
    },
    {
      value: '30',
      icon: 'date_range',
      name: 'Last 30 Days', // Filter for the last 30 days
    },
    {
      value: 'this_month',
      icon: 'event',
      name: 'This Month', // Filter for the current month
    },
    {
      value: 'last_month',
      icon: 'history',
      name: 'Last Month', // Filter for the previous month
    },
    {
      value: 'custom',
      icon: 'calendar_view_month',
      name: 'Custom Range', // Filter for a custom date range
    },
  ];

  items= Array(100);
}
