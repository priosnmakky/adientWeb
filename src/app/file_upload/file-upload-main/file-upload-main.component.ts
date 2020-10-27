import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-file-upload-main',
  templateUrl: './file-upload-main.component.html',
  styleUrls: ['./file-upload-main.component.less']
})
export class FileUploadMainComponent implements OnInit {

  state : string 
  constructor() { }

  ngOnInit(): void {
    this.state = "upload-mismatch-order"
  }


  public changeState(state: string):void {

    this.state = state
}

}
