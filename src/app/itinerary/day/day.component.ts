import {Component, Input, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {Day} from '../../shared/models/day.model';
import {Events} from '../../shared/models/events.model';
import {environment} from '../../../environments/environment';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {DayDetail} from '../../shared/models/day-details.model';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  @Input() day: Day;
  @Input() events: Events[];
  @Input() minForecast: string;
  @Input() maxForecast: string;
  @Input() icon: string;
  @Input() date: string;
  @Input() description: string;
  weatherIconsPath: string;
  @ViewChild('content', {static: false}) content: TemplateRef<any>;
  closeResult = '';
  @Input() dayDetail: DayDetail;

  private static getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  constructor(private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.weatherIconsPath = environment.weatherIconsPath;
  }

  open(content: any): void {
    // const modalContent = this.(".modal-content");
    // .modal-content div is created at runtime and needs to be manipulated with JS?;
    // https://www.geeksforgeeks.org/how-to-align-modal-content-box-to-center-of-any-screen/
    this.modalService.open(content,
      {
        ariaLabelledBy: 'dayDetailsModal',
        animation: true,
        centered: true,
        windowClass: 'modal'
      }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${DayComponent.getDismissReason(reason)}`;
    });
  }

}
