import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {environment} from '../../../environments/environment';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {WeatherService} from '../../shared/services/weather.service';
import {WeatherData} from '../../shared/models/weather-data.model';
import {FormatService} from '../../shared/services/format.service';
import {MapService} from '../../shared/services/map.service';
import {DataService} from '../../shared/services/data.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-carousel',
  templateUrl: './welcome-carousel.component.html',
  styleUrls: ['./welcome-carousel.component.css'],
  providers: [NgbCarouselConfig]
})

export class WelcomeCarouselComponent implements OnInit, AfterViewInit, OnDestroy {
  // Open Weather API Data
  weatherData: WeatherData;
  minTemperature: number;
  maxTemperature: number;
  feelsLike: number;
  currentTemp: number;
  humidity: number;
  icon: string;
  currentWeatherDescription: string;
  uvi: number;
  sunrise: string;
  sunset: string;

  // Carousel Pictures
  imagesArray = [...environment.imagePaths];
  images: string[];

  // Map Properties
  @ViewChild('mapContainer', {static: false}) mapContainer: ElementRef<HTMLDivElement>;
  map: google.maps.Map;

  // Loading Spinner Config
  oneCallLoading = true;
  mapLayerLoading = true;
  weatherDataSub = new Subscription();

  constructor(private config: NgbCarouselConfig, private weatherService: WeatherService,
              private formatService: FormatService, private mapService: MapService,
              private dataService: DataService) {
    // Carousel Configurations
    this.config.interval = 4000;
    this.config.wrap = true;
    this.config.pauseOnHover = true;
    this.config.showNavigationArrows = true;
    this.config.showNavigationIndicators = true;
    this.config.animation = true;
    this.config.keyboard = true;
    this.images = this.imagesArray.map(element => element.path);
  }

  ngOnInit(): void {
    if (!this.dataService.weatherLastLoad.value || Date.now() > this.dataService.weatherLastLoad.value + 300000) {
      this.weatherService.getWeatherForecast()
        .subscribe(data => {
          this.weatherData = data;
          this.dataService.weatherData.next(JSON.parse(JSON.stringify(data)));
          this.dataService.weatherLastLoad.next(Date.now());
          this.setWeatherData(this.weatherData);

          setTimeout(() => {
            this.oneCallLoading = false;
          }, 750);
        });
    } else {
      this.weatherDataSub = this.dataService.weatherData.subscribe(result => {
        this.weatherData = JSON.parse(JSON.stringify(result));
        this.setWeatherData(this.weatherData);
        this.oneCallLoading = false;
      });
    }
  }

  ngAfterViewInit(): void {
    this.map = this.mapService.getUnmarkedMap(this.mapContainer.nativeElement, this.mapService.mapOptionsCarousel);
  }

  ngOnDestroy(): void {
    this.weatherDataSub.unsubscribe();
  }

  setWeatherData(weatherData): void {
    this.minTemperature = Math.round(weatherData.daily[0].temp.min);
    this.maxTemperature = Math.round(weatherData.daily[0].temp.max);
    this.feelsLike = Math.round(weatherData.current.feels_like);
    this.currentTemp = Math.round(weatherData.current.temp);
    this.humidity = Math.round(weatherData.current.humidity);
    this.currentWeatherDescription = weatherData.current.weather[0].description;
    this.icon = weatherData.current.weather[0].icon;
    this.uvi = Math.round(weatherData.current.uvi);
    this.sunrise = this.formatService.getLongTime(weatherData.current.sunrise);
    this.sunset = this.formatService.getLongTime(weatherData.current.sunset);
  }
}
