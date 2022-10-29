/**
 * Request class is used to define properties needed to call the Google Places API.
 * placeId property is a unique string that identifies a place in the world.
 * fields property defines the data requested when calling the Google Places API for a given place.
 */

export class Request {
  placeId: string;
  fields: string[];

  constructor(placeId: string) {
    this.placeId = placeId;
    this.fields = ['name', 'formatted_address', 'place_id', 'geometry', 'url'];
  }
}
