/**
 * LocalArea class is used to define the properties for an important place of interest such as the nearest hospital
 *
 */
import LatLngLiteral = google.maps.LatLngLiteral;

export class Poi {
    image: string;
    name: string;
    address: string;
    googleMapsUrl: string;
    placeId: string;
    city: {
        value: string,
        viewValue: string
    };
    mapOptions: {
        center: google.maps.LatLng,
        zoom: number,
        mapTypeId: string,
        coordinates: {
            lat: number,
            lng: number
        }
    };
    description?: string;

    constructor(image: string, name: string, address: string, googleMapsUrl: string, placeId: string,
                city: {
                    value: string,
                    viewValue: string
                },
                mapOptions: {
                    center: google.maps.LatLng,
                    zoom: number,
                    mapTypeId: string,
                    coordinates: {
                        lat: number,
                        lng: number
                    }
                },
                description?: string) {
        this.image = image;
        this.name = name;
        this.address = address;
        this.googleMapsUrl = googleMapsUrl;
        this.placeId = placeId;
        this.city = city;
        this.mapOptions = mapOptions;
        this.description = description;
    }
}
