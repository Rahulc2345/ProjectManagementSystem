import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IBacklog } from "src/app/ibacklog";

@Injectable({
  providedIn: 'root'
})
export class BacklogService {

  constructor(private http: HttpClient) { }

  baseUrl = "http://localhost:3000/routes/backlogs/";

  getBacklogs() {
    return this.http.get<IBacklog[]>(this.baseUrl);
  }

  getBacklogsByProjectId(projectId) {
    return this.http.get<IBacklog[]>(this.baseUrl + "project/" + projectId);
  }

  addBacklog(backlog, projectId) {
    console.log("Before " + backlog)
    backlog.projectId = projectId
    console.log("Before " + backlog)
    return this.http.post(this.baseUrl + "add", backlog);
  }

  updateBacklog(backlog) {
    return this.http.put(this.baseUrl + "update/" + backlog.backlogId, backlog);
  }

  deleteBacklog(backlogId: number) {
    return this.http.delete(this.baseUrl + "delete/" + backlogId);
  }

}
