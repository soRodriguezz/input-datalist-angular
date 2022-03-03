import { Component, ViewChild } from '@angular/core';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, filter, map, merge, Observable, OperatorFunction, Subject } from 'rxjs';

const states = [
  'Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming', 'a213', 'asdasd', 'adhashd32', 'AHJSDHJSD', 'asjhdkwi'
];



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: [`
  .form-control { width: 300px; }
  `]
})
export class MainComponent{
   sta = [
    {nombre: 'Alabama'}, 
    {nombre: 'Alaska'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'American Samoa'}, 
    {nombre: 'Arizona'}
  ];

  public model: any;

  @ViewChild('instance', {static: true}) instance!: NgbTypeahead;
  
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$
      .pipe(
        debounceTime(200), 
        distinctUntilChanged()
      ); // debounce->cantidad tiempo distinct->devuelve los que no se repiten
    
    const clicksWithClosedPopup$ = this.click$ // solo los resultador que encuentra con la busqueda
      .pipe(
        filter(() => !this.instance.isPopupOpen())
      );
    
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? states
        : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }
}
