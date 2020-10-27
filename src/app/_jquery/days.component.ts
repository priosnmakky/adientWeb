import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

declare var $: any;  // Declaring $ as a variable so that we can use it to access jQuery

@Component({
    selector: 'count-days',
    templateUrl: './days.component.html'
})
export class DaysComponent implements OnInit {
    message : string;
    days : number;
    
    @ViewChild('sd') sdate : ElementRef;
    @ViewChild('ed') edate : ElementRef;
    
    constructor() { }

    ngOnInit(): void {
        $(
            function() {
                $("#startDate").datepicker( {dateFormat : "yy-mm-dd"});
                $("#endDate").datepicker( {dateFormat : "yy-mm-dd"});
            }
        );         
     }

    getNoDays() {
         this.message = "";
         this.days = 0;
         
         let startDate = this.sdate.nativeElement.value;
         let endDate = this.edate.nativeElement.value;
          
         if (startDate && endDate) {
            var start  = new Date(startDate)
            var end = new Date(endDate)
            let ms = (end.getTime() - start.getTime()); // get no. of milliseconds between dates
            // find out no. of days
            this.days = ms / (1000 * 60 * 60 * 24); // divide total milliseconds by no. of milliseconds per day
        }
        else{
            this.message = "Please select dates first!"
        }
    }
}