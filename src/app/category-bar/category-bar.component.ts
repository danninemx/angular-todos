import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../app.component';

@Component({
  selector: 'category-bar',
  templateUrl: './category-bar.component.html',
  styleUrls: ['./category-bar.component.scss'],
})
export class CategoryBarComponent implements OnInit {
  @Input() categories: string[];
  @Input() selectedCategory: string;
  @Output() selectedCategoryEmitter = new EventEmitter<Todo>();
  @Output() addedCategoryEmitter = new EventEmitter<string>();

  categoryNameEntered: string;
  isInputHidden: boolean;

  constructor() {
    this.categories = ['Example 0'];
    this.selectedCategory = '';

    this.categoryNameEntered = '';
    this.isInputHidden = true;
  }

  ngOnInit(): void {}

  onCategoryClick($event: any) {
    if ($event.target.classList.contains('selected')) {
      return;
    }
    this.selectedCategoryEmitter.emit($event.target.getAttribute('data-name'));
    $event.target.classList.toggle('selected');
  }

  onCategorySubmit($event: any) {
    $event.preventDefault();
    $event.stopPropagation();
    const inputValue = $event.target.value.trim();
    if (inputValue.length > 0) {
      this.addedCategoryEmitter.emit(inputValue);
    }
    $event.target.value = '';
  }

  onPlusButtonPress($event: any) {
    this.isInputHidden = !this.isInputHidden;
  }
}
