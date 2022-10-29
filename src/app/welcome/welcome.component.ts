import {Component, OnDestroy, OnInit} from '@angular/core';
import {environment} from '../../environments/environment';
import {DataService} from '../shared/services/data.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent implements OnInit, OnDestroy {
  translate: boolean;
  aboveYogaUrl = environment.aboveYogaUrl;
  facebookUrl = environment.facebookUrl;
  welcomeData: {
    dataRange: string, paragraph1: string,
    paragraph2: string, paragraph3: string,
    tagline: string, taglineTranslate: string
  } | any;
  loading: boolean;
  welcomeSubscription = new Subscription();

  constructor(private dataService: DataService) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.translate = environment.translate;
    if (!this.dataService.welcomeLastLoad.value || Date.now() > this.dataService.welcomeLastLoad.value + 300000) {
      this.dataService.getWelcomeData()
        .subscribe(data => {
          const obj = data.fields.body.mapValue.fields;
          this.welcomeData = {};
          // tslint:disable-next-line:forin
          for (const prop in obj) {
            this.welcomeData[prop] = obj[prop].stringValue;
          }

          this.dataService.welcomeLastLoad.next(Date.now());
          this.dataService.welcomeData.next(this.welcomeData);
          setTimeout(() => {
            this.loading = false;
          }, 500);
        });
    } else {
      this.welcomeSubscription = this.dataService.welcomeData.subscribe(result => {
        this.welcomeData = result;
        this.loading = false;
      });
    }
  }

  ngOnDestroy(): void {
    this.welcomeSubscription.unsubscribe();
  }

}
