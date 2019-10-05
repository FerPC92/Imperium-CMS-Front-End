import { Injectable } from '@angular/core';
import{ApiService} from '../services/api.service'
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  isLogged:boolean = false;

  isAdmin:boolean = false;

  registerMsg:object;

  loginCorrect:object;

  loginIncorrect:object;

  allCourses:object[] = [];

  individualCourse:object[] = [];

  allTeachers:object[] =[];

  individualTeacher:object[] = [];

  allPlaces:object[] = [];

  allCategories:object[]= [];

  allStudents:object[] = [];

  editMsg:object ={}

  studentCreated:object = {}

  courseNumDays:object[] = []

  constructor(public _apiService : ApiService, public _router :Router) { 
    
    if(localStorage.getItem('admin') === "1"){
      this.isAdmin = true
    } 
    /* this.getTeachers();
    this.getIndividualTeacher('5d7a2ec95810e84d9847c6a6') */
    this.getCourses(); 
    /* this.getIndividualCourse('5d7a5e660c29f21f50e1a8bf') */
  }


  register(nameReg:string,userNameReg:string,passwordReg:string){
    this._apiService.post(`http://localhost:3000/register`,{"userName":nameReg,"userEmail": userNameReg, "userPassword": passwordReg}).subscribe((response)=>{
      //console.log(response) 
      this.registerMsg = response["message"]
      //console.log(this.registerMsg)
    })
  }

  checkLogin(){
    if(localStorage.getItem('token') === null){
      return (this.isLogged = false)
    } else {
      return (this.isLogged = true)
    }
  }


  login(userLog:string,passLog:string){
    this._apiService.post(`http://localhost:3000/login`,{"userEmail": userLog, "userPassword": passLog}).subscribe((response)=>{
      //console.log(response)

      if(localStorage.getItem('token') === null && response["message"] === "Login correct"){
        this.isLogged = true
        this.loginIncorrect = {};
        localStorage.setItem('token',response["token"]);
        localStorage.setItem('userID',response["userID"]);
        localStorage.setItem('name',response["name"]);
        localStorage.setItem('admin',response["admin"]);
        localStorage.setItem('profile_image',response["profile_image"]);
        localStorage.setItem('userEmail',response["userEmail"]);
        this.loginCorrect = response;
        //console.log(this.loginCorrect)
        this._router.navigateByUrl('/home');
        setTimeout(()=> { window.location.reload()}, 300)
      } else {
        this.loginIncorrect = response["message"]
      }
      //console.log(this.isLogged)


    })
  }
  getCourses(){
    this._apiService.get(`http://localhost:3000/courses`).subscribe(response => { 

      /* console.log(response) */ 
  
        for(let i=0 ; i < response.length ; i++){
        
           this.allCourses.push(response[i])
        }
           /* console.log(this.allCourses)  */ 
      })
      
      
  }

  getIndividualCourse(id){
    
      
    this.individualCourse = []
    this.courseNumDays = []

    this._apiService.get(`http://localhost:3000/courses/${id}`).subscribe(response => { 

      /* console.log(response) */ 
  
        for(let i=0 ; i < response.length ; i++){
        
           this.individualCourse.push(response[i])
        }

         var days = ['Lunes','Martes','Miercoles','Jueves','Viernes'];

        let startDate = this.individualCourse[0]["courseDuration"];
        let weekDay = 0;
         
        
        for(let diaCurso=1 ; diaCurso <= this.individualCourse[0]["courseDuration"] ; diaCurso++){
          
           if (weekDay == 5)
              weekDay = 0;

          this.courseNumDays.push({numero:diaCurso, diaSemana:days[weekDay], diaMes: "", presencia: true})
          
          weekDay++;
        }

           this.getNumAssistance()

           console.log(this.individualCourse)

      })
      
      
  }

  deleteCourse(id){
    this._apiService.delete(`http://localhost:3000/deleteCourse/${id}`).subscribe(response => { 

       console.log(response)
       setTimeout(()=> { this._router.navigateByUrl('/home') }, 3000);
       setTimeout(()=> { window.location.reload()}, 4000); 
  
       
      })
      
      
  }
  

                    // TEACHERS FUNCTIONS

  getTeachers(){
    this._apiService.get(`http://localhost:3000/teachers`).subscribe(response => { 

      /* console.log(response) */ 
  
        for(let i=0 ; i < response.length ; i++){
        
           this.allTeachers.push(response[i])
        }
           console.log(this.allTeachers)  
      })
      
      this.allTeachers = []
  }

  getIndividualTeacher(id){
    this._apiService.get(`http://localhost:3000/teachers/${id}`).subscribe(response => { 

      /* console.log(response) */ 
  
        for(let i=0 ; i < response.length ; i++){
        
           this.individualTeacher.push(response[i])
        }
           console.log(this.individualTeacher)  
      })
      this.individualTeacher = []
      
  }

  editIndividualTeacher(body){

    /* body._id = this.individualTeacher[0]["_id"] */

    this._apiService.put(`http://localhost:3000/modTeacher`,body).subscribe(response => {
      console.log(response)
    })
  }

  
  formatDate(date){

    let dateArr = date.split("-");

    

    return dateArr[2] + "/" + dateArr[1] + "/" + dateArr[0];

  }

  getPlaces(){
    this._apiService.get(`http://localhost:3000/places`).subscribe(response => { 

      /* console.log(response) */ 
  
        for(let i=0 ; i < response.length ; i++){
        
           this.allPlaces.push(response[i])
        }
           console.log(this.allPlaces)  
      })
      this.allPlaces = []
      
  }


  getCategories(){
    this._apiService.get(`http://localhost:3000/courseCategory`).subscribe(response => { 

      /* console.log(response) */ 
      this.allCategories = []
  
        for(let i=0 ; i < response.length ; i++){
        
           this.allCategories.push(response[i])
        }
           console.log(this.allCategories)  
      })
      
      
  }

  addCourse(body){
    this._apiService.post(`http://localhost:3000/createCourse`,body).subscribe((response)=>{
      console.log(response)
       setTimeout(()=> { this._router.navigateByUrl('/home') }, 2000); 
      setTimeout(()=> { window.location.reload()}, 2500);  
    })
  }

  editCourse(_id,body){

    body._id = _id
    this._apiService.put(`http://localhost:3000/modCourse`,body).subscribe(response => {
          
        this.editMsg = response
        console.log(this.editMsg) 
        })
        /* setTimeout(()=> { this._router.navigateByUrl('/home') }, 3000); */
       setTimeout(()=> { window.location.reload()}, 2000);  
  }

  getStudents(){
    this._apiService.get(`http://localhost:3000/students`).subscribe(response => { 

      /* console.log(response) */ 
      this.allStudents = []
  
        for(let i=0 ; i < response.length ; i++){
        
           this.allStudents.push(response[i])
        }
           console.log(this.allStudents)  
      })
  }

  addStudent(body){
    this._apiService.post(`http://localhost:3000/createStudent`,body).subscribe((response)=>{
      console.log(response);
      this.studentCreated = response.student
      

      this.individualCourse[0]["students"].push(this.studentCreated)

      try{
        this.editCourse(this.individualCourse[0]["_id"],this.individualCourse[0])
      } catch(error3){
        console.log(error3 + "numero2")
      }

    })
  }

  deleteStudentFromDB(id){
    this._apiService.delete(`http://localhost:3000/deleteStudent/${id}`).subscribe(response => { 

      console.log(response)
      
     })
  }

  editStudentDB(body){

    /* body._id = _id */
    this._apiService.put(`http://localhost:3000/modStudent`,body).subscribe(response => {
          
        /* this.editMsg = response */
        console.log(response) 
        })
       
  }

  getNumAssistance(){


      for (let i = 0; i < this.individualCourse[0]["students"].length; i++) {

        let totalAsist = 0;

        for (let j = 0; j < this.individualCourse[0]["students"][i]["assistance"].length; j++) {

          if(this.individualCourse[0]["students"][i]["assistance"][j]["M"] == true){
            totalAsist++
          }
          if(this.individualCourse[0]["students"][i]["assistance"][j]["A"] == true){
            totalAsist++
          }

        }

        let porcentaje; // num asistencias / total dias * turnos

        porcentaje = Math.round(totalAsist / (this.individualCourse[0]["courseDuration"] * 2) *100)
         
          this.individualCourse[0]["students"][i]["porcentaje"] = porcentaje

          console.log(this.individualCourse)

        
      }
  }


}
