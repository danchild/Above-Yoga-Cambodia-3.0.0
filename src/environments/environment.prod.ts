// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  // Api Keys
  openWeatherApiKey: 'ca93cac18cf8a2c5881e3d96e0cccfcc',
  oneCallApiUrl: 'http://api.openweathermap.org/data/2.5',
  firebaseApiKey: 'AIzaSyAUpLs6YDafaPg5BHY5VsTjLCbyfzmGclo',
  firebaseApiUrl:
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
  firebase: {
    apiKey: 'AIzaSyAUpLs6YDafaPg5BHY5VsTjLCbyfzmGclo',
    authDomain: 'above-yoga.firebaseapp.com',
    databaseURL: 'https://above-yoga-default-rtdb.firebaseio.com',
    projectId: 'above-yoga',
    storageBucket: 'above-yoga.appspot.com',
    messagingSenderId: '993954007378',
    appId: '1:993954007378:web:e7c351c9016f7fd320528b',
    measurementId: 'G-DCQ87LCQK8',
  },
  // Weather Widget Config
  tripStartUnixTimeStamp: 1667620800, // Set to 12:00 am on starting day of trip
  mode: 'multi-category', // 'simple' is the other config name
  // Map Settings
  weatherSettings: [
    {
      city: 'Siem Reap',
      lat: 13.35,
      lng: 103.8485,
    },
  ],
  categories: [
    { value: 'category1', viewValue: 'Restaurants' },
    { value: 'category2', viewValue: 'Points of Interest' },
  ],
  cities: [
    // { value: 'city1', viewValue: 'Ennis' },
    // { value: 'city2', viewValue: 'Liscannor/Lahinch' },
    // { value: 'city3', viewValue: 'Galway' },
  ],
  zoomCarouselMap: 5,
  accommodationsImage: '../assets/icons/star.png',
  starImage: '../assets/icons/star.png',
  // Units Setting for Open Weather API
  units: 'imperial',
  // Auth Service Token Duration Buffer - Number is in milliseconds - Express In Scientific Notation if number is large.
  buffer: 16.64e8, // ~ 20 Days in milliseconds
  translate: true,
  // Asset Paths
  weatherIconsPath: '/assets/icons/weather-icons/',
  aboveYogaImage: 'assets/pictures/aboveyoga-header.png',
  whatsAppIcon: '/assets/icons/whatsapp-icon.ico',
  instagramIcon: '/assets/icons/instagram-icon.ico',
  // Miscellaneous
  whatsAppUrl: 'https://wa.me/1',
  aboveYogaUrl: 'https://www.aboveyoga.com/retreats',
  facebookUrl: 'https://www.facebook.com/aboveyoga/reviews',
  instagramUrl: 'https://www.instagram.com/',
  imagePaths: [
    { path: '/assets/pictures/welcome-1.jpeg' },
    { path: '/assets/pictures/welcome-2.png' },
    { path: '/assets/pictures/welcome-3.png' },
  ],
  // Itinerary Config
  itineraryAsterisk: true,

  // Custom Marker Configs
  myLatLng: { lat: 18.5335, lng: -68.3695 },
  accommodations: 'Hacienda Las Hamacas',
  customUrl:
    "https://www.google.com/maps/place/18%C2%B032'00.9%22N+68%C2%B022'10.5%22W",
  custom: false, // Leave all Custom Marker Configs and toggle feature on with true or false

  heading: 'Retreat Villa',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
