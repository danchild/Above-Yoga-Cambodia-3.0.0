/**
 * Guest class defines properties that define an individual Guest
 */

export class Guest {
  name: string;
  city: string;
  state: string;
  cell: string;
  image: string;
  instagramHandle: string;
  american: boolean;
  pronouns: string;

  constructor(
    name: string,
    city: string,
    state: string,
    cell: string,
    instagramHandle: string,
    image: string,
    american: boolean,
    pronouns: string
  ) {
    this.name = name;
    this.city = city;
    this.state = state;
    this.cell = cell;
    this.image = image;
    this.instagramHandle = instagramHandle;
    this.american = american;
    this.pronouns = pronouns;
  }
}
