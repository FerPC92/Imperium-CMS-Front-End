import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MainService} from '../services/main.service'
import {ApiService} from '../services/api.service'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  


  form:object = {
    courseStartDay: "",
    courseEndDay: "",
    courseDuration: "",
    courseModality: "",
    courseTime: "",
    courseCategory: {},
    teachers: [],
    place: {}
  }

  /* getDuration(){
    if(this.form["courseStartDay"] != undefined && this.form["courseStartDay"] != undefined ){

    
    this.form["courseDuration"] = this.form["courseStartDay"] - this.form["courseEndDay"]
    }
    console.log(this.form["courseDuration"])
  } */

  addCourse(){

    let headTeacher = this._mainService.allTeachers.filter(prof => {
      return prof['userName'] === this.form['teachers'][0]
    })

    this.form["teachers"][0] = headTeacher[0]

    let suppTeacher = this._mainService.allTeachers.filter(prof => {
      return prof['userName'] === this.form['teachers'][1]
    })
    this.form["teachers"][1] = suppTeacher[0]

    let category = this._mainService.allCategories.filter(cat => {
      return cat['name'] === this.form['courseCategory']
    })

    this.form['courseCategory'] = category[0]

    let places = this._mainService.allPlaces.filter(place => {
      return place['place'] === this.form['place']
    })

    this.form['place'] = places[0];

    

    this._mainService.addCourse(this.form)

  }

  constructor(public _routeActive : ActivatedRoute, public _apiService : ApiService  ,public _mainService : MainService) {
      this._mainService.getTeachers();
      this._mainService.getCategories();
      this._mainService.getPlaces();

     


   }

  ngOnInit() {
  }

}
