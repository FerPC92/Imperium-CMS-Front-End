import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MainService} from '../services/main.service'
import {ApiService} from '../services/api.service'
import {  Router } from '@angular/router';
@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {

  idActive:string;

// explicacion :para que aparezca por defecto (del curso actual a editar asi ademas de ver visualmente como esta ahora no me deja campos vacios por que si no pone nada se envia el que esta ) un valor en el input , traemos del array y lo ponemos directo en el form
  form:object = {
    /* _id :`${this.idActive}` , */
    courseStartDay: this._mainService.individualCourse[0]["courseStartDay"],
    courseEndDay: this._mainService.individualCourse[0]["courseEndDay"],
    courseDuration: this._mainService.individualCourse[0]["courseDuration"],
    courseModality: this._mainService.individualCourse[0]["courseModality"],
    courseTime: this._mainService.individualCourse[0]["courseTime"],
    courseCategory: {name: this._mainService.individualCourse[0]["courseCategory"]["name"],_id: this._mainService.individualCourse[0]["courseCategory"]["_id"]},
    teachers: this._mainService.individualCourse[0]["teachers"],
    place: {place: this._mainService.individualCourse[0]["place"]["place"],
    _id: this._mainService.individualCourse[0]["place"]["_id"]}
  }

  editCourse(){

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

    this.form['place'] = places[0]

    this._mainService.editCourse(this.idActive,this.form)

    setTimeout(()=> { this._router.navigateByUrl('/home') }, 1000)

    console.log(this.form)
    

  }

  constructor(public _routeActive : ActivatedRoute, public _apiService : ApiService  ,public _mainService : MainService, public _router :Router) {
      this._mainService.getTeachers();
      this._mainService.getCategories();
      this._mainService.getPlaces();
   }

  ngOnInit() {
    this._routeActive.paramMap.subscribe( (params)=> {
      let id = params.get("id");
      this._mainService.getIndividualCourse(id)
      this.idActive = id
    });
  }

}
