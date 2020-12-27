import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home/home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data={};

  constructor(
    private todoService:TodoService
  ) { }

  ngOnInit(): void {
   // this.setItem();
   this.getAllTodos();
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
                        this.updateTodo();
    }  
    // Object.keys(this.data).forEach(( key)=>{  
    //     localStorage.setItem(key,JSON.stringify(this.data[key])); 
    // });
  }

  addTodo(todo){
    const obj={ todo: todo.value};
    this.todoService.addTodo(obj)
    .subscribe((res)=>{
      console.log(res);
      this.getAllTodos();
    }, (err)=>{
      console.log(err);
    });
  }
    getAllTodos(){
      this.todoService.getAllTodos()
      .subscribe((res)=>{
        console.log(res);
        Object.keys(res).forEach((key)=>{
        //this.data[key]=res[key]; 
         console.log(key);
        })
      }, (err)=> {
        console.log(err);
      })
    }
    updateTodo(){
      this.todoService.updateTodo(this.data)
      .subscribe((res)=>{
       console.log(res);
      }, (err)=> {
        console.log(err);
      })
    }





  // addTodo(todo){
  //   //console.log(todo.value);
  //   this.data.todo.push(todo.value);
  //   todo.value="";
  //   localStorage.setItem('todo',JSON.stringify(this.data.todo));
  // }

  // setItem(){

  //   Object.keys(this.data).forEach(( key)=>{
  //     if(!localStorage.getItem(key)){
  //       localStorage.setItem(key,JSON.stringify(this.data[key]));
  //     }
  //     else{
  //       this.data[key]=JSON.parse(localStorage.getItem(key));
  //     }
  //   });
   

    
  // }
}
