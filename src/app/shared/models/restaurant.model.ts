/**
 * Restaurant class is used to define the properties of an individual restaurant
 */

export class Restaurant {
  image: string;
  name: string;
  description: string;
  tripAdvisorUrl: string;
  placeId: string;
  websiteUrl: string;
  city: { value: string, viewValue: string };
  type: string;

  constructor(image: string,
              name: string,
              description: string,
              tripAdvisorUrl: string,
              placeId: string,
              websiteUrl: string,
              city: { value: string, viewValue: string },
              type: string) {
    this.image = image;
    this.name = name;
    this.description = description;
    this.tripAdvisorUrl = tripAdvisorUrl;
    this.placeId = placeId;
    this.websiteUrl = websiteUrl;
    this.city = city;
    this.type = type;
  }
}
