import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MainService} from '../services/main.service'
import {ApiService} from '../services/api.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  uploadedFiles: Array < File >;


  fileChange(element) {
    this.uploadedFiles = element.target.files;
}

upload() {
  let formData = new FormData();
  for (var i = 0; i < this.uploadedFiles.length; i++) {
    console.log(this.uploadedFiles[i])
      formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
  }
  this.http.post('/api/upload', formData)
  .subscribe((response) => {
       console.log('response received is ', response);
  })
}

  userName;

  todo:object = {
    title: "",
    date: "",
    file: "",
    status: false
  }

  
  
  changeCheckedTask(todo,i){

    todo["status"] = !todo["status"];

    this._mainService.individualTeacher[0]["todo"].splice(i, 1, todo)

    this._mainService. editIndividualTeacher(this._mainService.individualTeacher[0])
    
    console.log(this._mainService.individualTeacher[0])

  }

  addtask(){

    if( this.todo["title"] != "" && this.todo["date"] != "" ){

    this._mainService.individualTeacher[0]["todo"].push(this.todo)

    this._mainService. editIndividualTeacher(this._mainService.individualTeacher[0])
    console.log(this._mainService.individualTeacher[0])
    
    this.todo = {}

    
      
    }
    

  }

  deleteTask(task){

    this._mainService.individualTeacher[0]["todo"].splice(task, 1 )

    this._mainService. editIndividualTeacher(this._mainService.individualTeacher[0])
  }


  constructor(public _routeActive : ActivatedRoute, public _apiService : ApiService  ,public _mainService : MainService, private http: HttpClient) {
    this.userName = localStorage.getItem('name')
   }

  ngOnInit() {
    let userID = localStorage.getItem('userID')
    this._mainService.getIndividualTeacher(userID)
    
  }

}
