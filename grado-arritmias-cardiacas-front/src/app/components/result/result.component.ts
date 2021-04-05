import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/interfaces/TaskModel';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  @Input() visibleHR: string = '-';
  @Input() visibleSPO2: string = '-';
  tasks: Observable<Task[]>;

  constructor() { }

  ngOnInit(): void {
  }

}
