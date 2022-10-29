import {Injectable} from '@angular/core';
import {Restaurant} from '../models/restaurant.model';
import {Poi} from '../models/poi.model';
import {Request} from '../models/request.model';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class MapService {
  // Center of Map
  lat: number;
  lng: number;
  centerCoordinates: google.maps.LatLng;
  mapOptionsCarousel: google.maps.MapOptions;
  accommodationsImage = environment.accommodationsImage;
  starImage = environment.starImage;
  myLatLng = environment.myLatLng;
  accommodations = environment.accommodations;
  customUrl = environment.customUrl;
  heading = environment.heading;

  constructor() {
    // Dynamically set Latitude and Longitude based on day of trip.
    const now = Date.now();
    const days = (now - environment.tripStartUnixTimeStamp * 1000) / 8.64e+7;
    if (days < 0) {
      this.lat = environment.weatherSettings[0].lat;
      this.lng = environment.weatherSettings[0].lng;
    } else if (days >= environment.weatherSettings.length) {
      this.lat = environment.weatherSettings[environment.weatherSettings.length - 1].lat;
      this.lng = environment.weatherSettings[environment.weatherSettings.length - 1].lng;
    } else {
      for (let i = 0; i < environment.weatherSettings.length; i++) {
        if (days >= i && days < i + 1) {
          this.lat = environment.weatherSettings[i].lat;
          this.lng = environment.weatherSettings[i].lng;
          break;
        }
      }
    }

    this.centerCoordinates = new google.maps.LatLng(this.lat, this.lng);
    this.mapOptionsCarousel = {
      center: this.centerCoordinates,
      zoom: environment.zoomCarouselMap,
      mapTypeId: 'terrain',
      disableDefaultUI: true
    };
  }

  /**
   * Method returns an array of Google Maps Request Objects to query places API.
   * Request Objects hold data which renders in the infoWindow of each Google Maps pin
   * @param arrayArg: List of recommendations or poi-detail poi-detail
   */
  getRequests(arrayArg: Restaurant[] | Poi[]): Request[] {
    const requests: Request[] = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < arrayArg.length; i++) {
      const request = new Request(arrayArg[i].placeId);
      requests.push(request);
    }
    return requests;
  }

  getAccommodationsRequest(poi: Poi): Request {
    return new Request(poi.placeId);
  }

  initCustomMarker(googleMap: google.maps.Map,
                   myLatLng: { lat: number, lng: number }, heading: string, name: string, url: string,
                   infoWindows: google.maps.InfoWindow[], star: boolean): google.maps.InfoWindow {
    const infoWindow = new google.maps.InfoWindow({
      maxWidth: 200,
      disableAutoPan: true
    });
    const marker = new google.maps.Marker({
      map: googleMap,
      position: myLatLng
    });
    if (star) {
      marker.setIcon(this.starImage);
    } else {
      marker.setIcon(this.accommodationsImage);
    }
    google.maps.event.addListener(marker, 'click', function(): void {
      infoWindow.setContent(
        `<div>
           <strong>
             ${heading}
           </strong>
           <br>
           <span>
             ${name}
           </span>
           <br>
           <a href="${url}" target="_blank" style="color: blue"> View on Google Maps </a>
         </div>`
      );
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < infoWindows.length; i++) {
        infoWindows[i].close();
      }
      // @ts-ignore
      infoWindow.open(googleMap, this);
    });
    return infoWindow;
  }

// tslint:disable-next-line:max-line-length
  initAccommodationsMarker(googleMap: google.maps.Map, accommodationsRequest: Request, infoWindows: google.maps.InfoWindow[], star: boolean): google.maps.InfoWindow {
    const infoWindow = new google.maps.InfoWindow({
      maxWidth: 200,
      disableAutoPan: true
    });
    const service = new google.maps.places.PlacesService(googleMap);
    service.getDetails(accommodationsRequest, (place, status) => {
      if (
        status === google.maps.places.PlacesServiceStatus.OK &&
        place &&
        place.geometry &&
        place.geometry.location
      ) {
        const marker = new google.maps.Marker({
            map: googleMap,
            position: place.geometry.location
          }
        );
        if (star) {
          marker.setIcon(this.starImage);
        } else {
          marker.setIcon(this.accommodationsImage);
        }
        google.maps.event.addListener(marker, 'click', function(): void {
          infoWindow.setContent(
            `<div>
               <strong>
                 ${place.name}
               </strong>
               <br>
               <span>
                 ${place.formatted_address}
               </span>
               <br>
               <a href="${place.url}" target="_blank" style="color: blue"> View on Google Maps </a>
              </div>`
          );
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < infoWindows.length; i++) {
            infoWindows[i].close();
          }
          // @ts-ignore
          infoWindow.open(googleMap, this);
        });
      }
    });
    return infoWindow;
  }

  // tslint:disable-next-line:max-line-length
  initMarkedMap(elementRef: HTMLDivElement, mapOptions: google.maps.MapOptions, arrayArg: Poi[] | Restaurant[], accommodationsRequest: Request, custom: boolean): google.maps.Map {
    const googleMap = new google.maps.Map(elementRef, mapOptions);
    const requests = this.getRequests(arrayArg);
    const infoWindows = [];
    let accommodationsMarker;
    if (custom) {
      accommodationsMarker = this.initCustomMarker(googleMap, this.myLatLng, this.heading, this.accommodations, this.customUrl, infoWindows, false);
    } else {
      accommodationsMarker = this.initAccommodationsMarker(googleMap, accommodationsRequest, infoWindows, true);
    }
    infoWindows.push(accommodationsMarker);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < requests.length; i++) {
      const infoWindow = new google.maps.InfoWindow({
        maxWidth: 200,
        disableAutoPan: true
      });
      const service = new google.maps.places.PlacesService(googleMap);
      service.getDetails(requests[i], (place, status) => {
        if (
          status === google.maps.places.PlacesServiceStatus.OK &&
          place &&
          place.geometry &&
          place.geometry.location
        ) {
          const marker = new google.maps.Marker({
              map: googleMap,
              position: place.geometry.location
            }
          );
          google.maps.event.addListener(marker, 'click', function(): void {
            infoWindow.setContent(
              `<div>
               <strong>
                 ${place.name}
               </strong>
               <br>
               <span>
                 ${place.formatted_address}
               </span>
               <br>
               <a href="${place.url}" target="_blank" style="color: blue"> View on Google Maps </a>
               </div>`
            );
            infoWindows.push(infoWindow);
            // tslint:disable-next-line:no-shadowed-variable prefer-for-of
            for (let i = 0; i < infoWindows.length; i++) {
              infoWindows[i].close();
            }
            // @ts-ignore
            infoWindow.open(googleMap, this);
          });
        }
      });
    }
    return googleMap;
  }

  // tslint:disable-next-line:max-line-length
  getMarkedMap(elementRef: HTMLDivElement, mapOptions: google.maps.MapOptions, arrayArg: Poi[] | Restaurant[], accommodationsRequest: Request, custom: boolean): google.maps.Map {
    return this.initMarkedMap(elementRef, mapOptions, arrayArg, accommodationsRequest, custom);
  }

  getUnmarkedMap(elementRef: HTMLDivElement, mapOptions: google.maps.MapOptions): google.maps.Map {
    const googleMap = new google.maps.Map(elementRef, mapOptions);
    const marker = new google.maps.Marker({
      position: this.centerCoordinates,
      icon: this.starImage,
      map: googleMap
    });
    return googleMap;
  }
}
