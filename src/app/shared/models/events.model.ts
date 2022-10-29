/**
 * Events class is used to define properties of an individual Event
 */

export class Events {
  startTime: string;
  event: string;
  notes: string;

  constructor(startTime: string, event: string, notes: string) {
    this.startTime = startTime;
    this.event =  event;
    this.notes = notes;
  }
}



