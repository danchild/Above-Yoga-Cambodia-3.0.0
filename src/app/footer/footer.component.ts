import {Component, OnInit} from '@angular/core';
import {DataService} from '../shared/services/data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  year: number;
  companyName: string;

  constructor(private dataService: DataService) {
    this.year = new Date().getFullYear();
  }

  ngOnInit(): void {
    this.dataService.getGlobalData()
      .subscribe(data => {
        this.companyName = data.fields.footer.mapValue.fields.companyName.stringValue;
      }, error => console.log(error));
  }
}
