import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MainService} from '../services/main.service'
import {ApiService} from '../services/api.service'
@Component({
  selector: 'app-assistance',
  templateUrl: './assistance.component.html',
  styleUrls: ['./assistance.component.css']
})
export class AssistanceComponent implements OnInit {



  controlAssistance(){
    this._mainService.editCourse(this._mainService.individualCourse[0]["_id"],this._mainService.individualCourse[0])
  }

  constructor(public _routeActive : ActivatedRoute, public _apiService : ApiService  ,public _mainService : MainService) { 
    
  }

  ngOnInit() {

    this._routeActive.paramMap.subscribe( (params)=> {
      let id = params.get("id");
      this._mainService.getIndividualCourse(id);
     
    });
  }



}
