import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { IProject } from "src/app/iproject";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  baseUrl: string = "http://localhost:3000/routes/projects/";
  constructor(private http: HttpClient) { }

  getProjects(): Observable<IProject[]> {
    //const headers = new HttpHeaders({ Authorization: sessionStorage.getItem('token')});
    //return this.http.get<IProject[]>(this.baseUrl, {headers});
    return this.http.get<IProject[]>(this.baseUrl);
  }

  getProjectsIds(): Observable<IProject[]> {
    //const headers = new HttpHeaders({ Authorization: sessionStorage.getItem('token')});
    //return this.http.get<IProject[]>(this.baseUrl, {headers});
    return this.http.get<IProject[]>(this.baseUrl+"Ids");
  }

  addProject(project: IProject) {
    console.log(project)
    //const headers = new HttpHeaders({ Authorization: sessionStorage.getItem('token')});
    //return this.http.post(this.baseUrl+"add", project, {headers});
    return this.http.post(this.baseUrl + "add", project);

  }

  deleteProject(projectId: number) {
    // const headers = new HttpHeaders({ Authorization: sessionStorage.getItem('token')});
    // return this.http.delete(this.baseUrl+"delete/"+projectId, {headers});
    return this.http.delete(this.baseUrl + "delete/" + projectId);
  }

  updateProject(project: IProject) {
    // const headers = new HttpHeaders({ Authorization: sessionStorage.getItem('token')});
    // return this.http.put(this.baseUrl+"update/"+project.id, project, {headers});
    return this.http.put(this.baseUrl + "update/" + project.id, project);
  }

  getProjectsById(id: number) {
    return this.http.get<IProject>(this.baseUrl + id);
  }

  getProjectsByUserId(userId: any) {
    //console.log(userId);
    return this.http.get<IProject[]>(this.baseUrl + "users/" + userId);
  }
}
