import { Component, Input } from '@angular/core';
import { Guest } from '../../shared/models/guest.model';
import { environment } from '../../../environments/environment';
import { FormatService } from '../../shared/services/format.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css'],
})
export class GuestComponent {
  @Input() guest: Guest;
  whatsAppUrl = environment.whatsAppUrl;
  whatsAppIcon = environment.whatsAppIcon;
  instagramIcon = environment.instagramIcon;
  instagramUrl = environment.instagramUrl;

  constructor(public formatService: FormatService) {}
}
