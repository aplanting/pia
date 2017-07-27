import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'

@Component({
  selector: 'app-knowledge-base',
  templateUrl: './knowledge-base.component.html',
  styleUrls: ['./knowledge-base.component.scss']
})
export class KnowledgeBaseComponent implements OnInit {

  data: any;
  searchForm: FormGroup;
  @Output() newMeasureEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: Http) { }

  ngOnInit() {
    const kb = this.http.request('/assets/files/pia_knowledge-base.json').map(res => res.json()).subscribe(data => {
      this.data = data;
    });
    this.searchForm = new FormGroup({
      q: new FormControl()
    });
  }

  // TODO - This doesn't work
  getEntryContentHeight() {
    // Automatic resize the height of the KnowledgeBase block to improve the navigation with the overflow.
    // const centralElementHeight = <HTMLElement>document.querySelector('.pia-entryContentBlock');
    // if (centralElementHeight) {
    //   const element = <HTMLElement>document.querySelector('.pia-knowledgeBaseBlock-list');
    //   const totalSize = centralElementHeight.offsetHeight - 190;
    //   return (totalSize < 700 ? 700 : totalSize) + 'px';
    // }
  }

  onSubmit() {
    const q = this.searchForm.value.q;
    const items: any = document.querySelectorAll('app-knowledge-base-item');
    items.forEach((element) => {
      if (q != '') {
        element.classList.add('hide');
      } else {
        element.classList.remove('hide');
      }
    });
  }

  addNewMeasure(event) {
    this.newMeasureEvent.emit(event);
  }

}
