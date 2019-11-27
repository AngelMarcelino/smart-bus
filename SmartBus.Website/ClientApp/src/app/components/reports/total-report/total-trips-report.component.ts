import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/services/reports.service';
import { TripsByUserRow } from 'src/app/models/trips-by-user';

@Component({
  selector: 'app-tota-trips-report',
  templateUrl: './total-trips-report.component.html'
})
export class TotalTripsReportComponent implements OnInit {
  data: TripsByUserRow[];
  constructor(private reportsService: ReportsService) {
    this.getTotalTripsByUser();
  }

  ngOnInit(): void { }

  private getTotalTripsByUser() {
    this.reportsService.getTripsByUser()
      .subscribe(result => {
        this.data = result;
      });
  }
}
