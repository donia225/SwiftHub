import { Component } from '@angular/core';
import {  OnInit,ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-quizfront',
  templateUrl: './quizfront.component.html',
  styleUrls: ['./quizfront.component.scss']
})
export class QuizfrontComponent  implements OnInit{

  @ViewChild('name') nameKey!: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }
  //startQuiz(){
    //localStorage.setItem("name",this.nameKey.nativeElement.value);
  //}

}

