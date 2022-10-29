import {Component, ViewChild, ElementRef, AfterViewInit, OnChanges, Input} from '@angular/core';
import {Poi} from '../../shared/models/poi.model';
import {MapService} from '../../shared/services/map.service';
import {Request} from '../../shared/models/request.model';
import {DataService} from '../../shared/services/data.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-poi-list',
  templateUrl: './poi-list.component.html',
  styleUrls: ['./poi-list.component.css']
})
export class PoiListComponent implements AfterViewInit, OnChanges {
  @ViewChild('mapContainer', {static: false}) mapContainer: ElementRef<HTMLDivElement>;
  @Input() selectedCity: string;
  poiList: Poi[];
  map: google.maps.Map;
  changes: number;
  accommodationsList: Poi[];
  accommodationsRequest: Request;
  mapOptions: {
    center: google.maps.LatLng,
    zoom: number,
    mapTypeId: string
  };
  custom = environment.custom;

  constructor(private mapService: MapService,
              private dataService: DataService) {
    this.changes = 0;
  }

  ngOnChanges(): void {
    this.dataService.onLoaded.next(true);
    this.dataService.getAccommodationsData()
      .subscribe(data => {
        const accommodationsList = [];
        const arr = data.fields.accommodations.arrayValue.values;
        for (const i of arr) {
          const accommodation = {};
          for (const prop in i.mapValue.fields) {
            if (prop === 'name' || prop === 'placeId') {
              accommodation[prop] = i.mapValue.fields[prop].stringValue;
            } else if (prop === 'city') {
              accommodation[prop] = {
                value: i.mapValue.fields[prop].mapValue.fields.value.stringValue,
                viewValue: i.mapValue.fields[prop].mapValue.fields.viewValue.stringValue
              };
            } else if (prop === 'mapOptions') {
              accommodation[prop] = {
                coordinates: {
                  lat: i.mapValue.fields[prop].mapValue.fields.coordinates.mapValue.fields.lat.doubleValue,
                  lng: i.mapValue.fields[prop].mapValue.fields.coordinates.mapValue.fields.lng.doubleValue
                },
                zoom: +i.mapValue.fields[prop].mapValue.fields.zoom.integerValue,
                mapTypeId: i.mapValue.fields[prop].mapValue.fields.mapTypeId.stringValue
              };
            }
          }
          accommodationsList.push(accommodation);
        }

        this.accommodationsList = accommodationsList.filter(port => port.city.value === this.selectedCity);

        // tslint:disable-next-line:max-line-length
        this.accommodationsList.forEach(item => item.mapOptions.center = new google.maps.LatLng(item.mapOptions.coordinates.lat, item.mapOptions.coordinates.lng));
        this.accommodationsRequest = this.mapService.getAccommodationsRequest(this.accommodationsList[0]);
        this.mapOptions = this.accommodationsList[0].mapOptions;

        // Get POI Data from DB
        this.dataService.getPoiData()
          .subscribe(result => {
            const poiList = [];
            // tslint:disable-next-line:no-shadowed-variable
            const arr = result.fields.poi.arrayValue.values;
            for (const i of arr) {
              const poi = {};
              for (const prop in i.mapValue.fields) {
                if (prop !== 'city') {
                  poi[prop] = i.mapValue.fields[prop].stringValue;
                } else {
                  poi[prop] = {
                    value: i.mapValue.fields[prop].mapValue.fields.value.stringValue,
                    viewValue: i.mapValue.fields[prop].mapValue.fields.viewValue.stringValue
                  };
                }
              }
              poiList.push(poi);
            }

            this.poiList = poiList.filter(poi => poi.city.value === this.selectedCity);
            if (this.changes > 0) {
              // tslint:disable-next-line:max-line-length
              this.map = this.mapService.getMarkedMap(this.mapContainer.nativeElement, this.mapOptions, this.poiList, this.accommodationsRequest, this.custom);
              setTimeout(() => {
                this.dataService.onLoaded.next(false);
              }, 500);
            }
          });
      });

    this.changes++;
  }

  ngAfterViewInit(): void {
    // tslint:disable-next-line:max-line-length
    if (this.poiList && this.accommodationsRequest && this.mapOptions) {
      // tslint:disable-next-line:max-line-length
      this.map = this.mapService.getMarkedMap(this.mapContainer.nativeElement, this.mapOptions, this.poiList, this.accommodationsRequest, this.custom);
    }
  }

}
