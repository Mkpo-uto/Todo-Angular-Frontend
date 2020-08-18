import { Component, OnInit } from '@angular/core';
import { TodoDataService } from './../service/data/todo-data.service';
import { Router } from '@angular/router';


export class Todo {

  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ){

  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {


   todos : Todo[]
   message : string
    //[new Todo(1,'Get a job',false,new Date()), new Todo(2,'Become an expert in Angular and React and Node',false,new Date()),
  //          new Todo(3,'Become an expert in fullstack java development using spring boot',false,new Date())]
//             {
//     id : 1,
//     description : 'Get a job'
// }, {
//   id : 2,
//   description : 'Become an expert in Angular and React and Node'
// }, {
//   id : 3,
//   description : 'Become an expert in fullstack java development using spring boot'
// }]
  // todo = {
  //      id : 1,
  //      description : 'Learn to dance'
  // }

  constructor(
    private todoService : TodoDataService,
    private router : Router
  ) { }

  ngOnInit( ): void {
     this.refreshTodos();
  }

  refreshTodos(){
    this.todoService.retrieveAllTodos('mkpoutoe').subscribe(
      response => {
        console.log(response);
        this.todos = response;
      }
    )
  }

  deleteTodo(id){
    console.log(`delete todo ${id}`);
    this.todoService.deleteTodo('mkpoutoe',id).subscribe(
      response => {
        console.log(response);
        this.message = `Delete of Todo ${id} successful`;
        this.refreshTodos();
      }
    )
  }

  updateTodo(id){
    console.log(`Update ${id}`);
    this.router.navigate(['todos',id])
  }

  addTodo(){
    console.log(`Add`)
    this.router.navigate(['todos',-1])
  }

}
