import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MainService} from '../services/main.service'
import {ApiService} from '../services/api.service'
@Component({
  selector: 'app-individual-course',
  templateUrl: './individual-course.component.html',
  styleUrls: ['./individual-course.component.css']
})
export class IndividualCourseComponent implements OnInit {

  idCourse;
  userEditing: string;

  form:object = {
    userName:"",
    userEmail:"",
    phone:"",
    profile_image: "https://secure.meetupstatic.com/img/noPhoto_50.png", 
    isAdmin : 0,
    assistance: []
  }


  formEdit:object = {
    userName:"",
    userEmail:"",
    phone:"",
    profile_image: "https://secure.meetupstatic.com/img/noPhoto_50.png", 
    isAdmin : 0,
    assistance: []
  }

  addStudentToCourse(){

    for (let index = 0; index < this._mainService.individualCourse[0]["courseDuration"]; index++) {
      this.form['assistance'].push({
        "day": index,
        "M": false,
        "A": false
      })
    }    

    /* console.log(this.form); */
    

      try{
        this._mainService.addStudent(this.form)



      } catch(error2){
        console.log(error2 + "numero2")
      }
    

  }

  editStudentModal(student){
      let studentDB = this._mainService.allStudents.filter(stdDB =>{
        return stdDB["userEmail"] === student["userEmail"]
      })

    this.userEditing = student;
    this.formEdit["_id"] = studentDB[0]["_id"]
    this.formEdit["userName"] = this.userEditing["userName"];
    this.formEdit["userEmail"] = this.userEditing["userEmail"];
    this.formEdit["phone"] = this.userEditing["phone"];
    this.formEdit["assistance"] = this.userEditing["assistance"];

    // console.log(this.formEdit)
    /* console.log(studentDB) */

  }


  editStudent(){

    this._mainService.editStudentDB(this.formEdit);

    for (let index = 0; index < this._mainService.individualCourse[0]["courseDuration"]; index++) {
      this.formEdit['assistance'].push({
        "day": index,
        "M": false,
        "A": false
      })
    }    

    for(let i=0; i< this._mainService.individualCourse[0]["students"].length; i++){
      if(this.formEdit["userEmail"] == this._mainService.individualCourse[0]["students"][i]["userEmail"] )
      this._mainService.individualCourse[0]["students"][i] = this.formEdit;
    }
    
    this._mainService.editCourse(this.idCourse,this._mainService.individualCourse[0])
    
  }


  deleteFromCourse(email){
     
    for(let i=0; i< this._mainService.individualCourse[0]["students"].length; i++){
      if(email == this._mainService.individualCourse[0]["students"][i]["userEmail"] )
      this._mainService.individualCourse[0]["students"].splice([i], [i + 1])
    }

    try{
      this._mainService.editCourse(this.idCourse,this._mainService.individualCourse[0])
    } catch(error){
      console.log(error)
    }


     
  }


  constructor(public _routeActive : ActivatedRoute, public _apiService : ApiService  ,public _mainService : MainService) { 
    this._mainService.getStudents()
  }


  ngOnInit() {

    this._routeActive.paramMap.subscribe( (params)=> {
      let id = params.get("id");
      this._mainService.getIndividualCourse(id)
      this.idCourse = id
      
    });
  }

}


/* try {
    llamada().subscribe((err, data) => {
        if err throw err;
    })
} catch (err) {
    throw err;
}*/