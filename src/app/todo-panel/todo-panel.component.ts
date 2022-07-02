import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../app.component';

@Component({
  selector: 'todo-panel',
  templateUrl: './todo-panel.component.html',
  styleUrls: ['./todo-panel.component.scss'],
})
export class TodoPanelComponent implements OnInit {
  @Input() todosData: Todo;
  @Output() addedTodoEmitter = new EventEmitter<string>();
  @Output() deletedTodoEmitter = new EventEmitter<string>();
  @Output() markedDoneEmitter = new EventEmitter<string>();

  isInputHidden: boolean;
  constructor() {
    this.todosData = {
      category: 'default',
      isDone: false,
      todos: [],
    };
    this.isInputHidden = true;
  }

  ngOnInit(): void {}

  ngAfterViewInit() {}

  onMarkDone($event: any) {
    this.markedDoneEmitter.emit($event.target.getAttribute('data-name'));
  }

  onTaskDelete($event: any) {
    this.deletedTodoEmitter.emit($event.target.getAttribute('data-name'));
    this.todosData.todos!.splice($event.target.getAttribute('data-index'), 1);
  }

  onTodoSubmit($event: any) {
    $event.preventDefault();
    $event.stopPropagation();
    const inputValue = $event.target.value.trim();
    if (inputValue.length > 0) {
      this.addedTodoEmitter.emit(inputValue);
    }
    $event.target.value = '';
  }
  onAddButtonPress() {
    this.isInputHidden = !this.isInputHidden;
  }
}
