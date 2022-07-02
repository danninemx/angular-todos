import { Component, OnInit } from '@angular/core';

export interface TodoTask {
  task: string;
  isDone?: boolean;
}
export interface Todo {
  category?: string;
  isDone?: boolean;
  todos?: TodoTask[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: { class: 'container' },
})
export class AppComponent {
  public categories: string[];
  public todosData: {
    [key: string]: Todo;
  };
  public selectedCategoryName: string;
  public selectedTodosData: Todo;

  constructor() {
    this.categories = ['Example 1'];
    this.todosData = {
      'Example 1': {
        category: 'Example 1',
        isDone: false,
        todos: [
          {
            task: 'Example task 1',
            isDone: false,
          },
        ],
      },
    };
    this.selectedCategoryName = 'Example 1';
    this.selectedTodosData = this.todosData[this.selectedCategoryName];
  }

  ngOnInit() {}

  updateSelected(selectedCategory: any) {
    this.selectedCategoryName = selectedCategory;
    this.selectedTodosData = this.todosData[this.selectedCategoryName];
  }

  addedCategory(name: string) {
    const tempSet = new Set([...this.categories, name]);
    this.categories = [...tempSet];

    this.todosData[name] = {
      category: name,
      isDone: false,
      todos: [],
    };
  }

  hasDuplicate(arr: TodoTask[], task: string) {
    return arr.some((item: TodoTask) => {
      return item.task === task;
    });
  }

  addedTodo(todo: string) {
    const currentTodos = this.todosData[this.selectedCategoryName].todos!;
    if (!this.hasDuplicate(currentTodos, todo)) {
      this.todosData[this.selectedCategoryName].todos!.push({
        task: todo,
        isDone: false,
      });
    }
    this.selectedTodosData = this.todosData[this.selectedCategoryName];
  }

  getIndexIfFound(arr: TodoTask[], task: string) {
    return arr.findIndex((element) => element.task === task);
  }

  deletedTodo(todo: string) {
    const currentTodos = this.todosData[this.selectedCategoryName].todos!;
    const index = this.getIndexIfFound(currentTodos, todo);
    delete this.todosData[this.selectedCategoryName].todos![index];
    this.selectedTodosData = this.todosData[this.selectedCategoryName];
  }
  markedDone(todo: string) {
    const currentTodos = this.todosData[this.selectedCategoryName].todos!;
    const index = this.getIndexIfFound(currentTodos, todo);

    currentTodos[index] = {
      task: todo,
      isDone: !currentTodos[index].isDone,
    };
    this.selectedTodosData = this.todosData[this.selectedCategoryName];
  }
}
