export class DayDetail {
  city: string;
  image: string;
  description: string;
  restaurantRec: boolean;
  pointsOfInterestRec: boolean;
  map: boolean;
  popUpButton: boolean;
  mapCity?: {
    value: string,
    viewValue: string
  };

  constructor(city: string, image: string, description: string, restaurantRec: boolean, pointsOfInterestRec: boolean, map: boolean,
              popUpButton: boolean, mapCity?: {
      value: string,
      viewValue: string
    }) {
    this.city = city;
    this.image = image;
    this.description = description;
    this.restaurantRec = restaurantRec;
    this.pointsOfInterestRec = pointsOfInterestRec;
    this.map = map;
    this.popUpButton = popUpButton;
    this.mapCity = mapCity;
  }
}
