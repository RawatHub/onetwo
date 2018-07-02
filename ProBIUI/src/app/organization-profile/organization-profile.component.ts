import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IOrganization } from '../models/organization.interface';
import {OrganizationService} from '../organization-profile/organization-profile.service'

@Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.component.html',
  styleUrls: ['./organization-profile.component.scss']
})
export class OrganizationProfileComponent implements OnInit {

  constructor(private http: HttpClient,private _organizationService: OrganizationService) { }

  ngOnInit() {
  }
  organization : IOrganization = {
    id:"",
    email:"",
    name:"",
    organizationID:"",
    contactNumber:0,
    address:"",
    city:"",
    country:"",
    postalCode:0
  };
  add() {
this._organizationService.add(this.organization)
.subscribe(function(response){
  console.log(response);
},
function(error){
  console.log(error);

});
  }

  getAll() {
    this.http.get("http://localhost:3000/organization/get").subscribe((res) => {
      console.log(res);
    });
  }

  getByID() {
    this.http.get("http://localhost:3000/organization/get/" + this.organization.id).subscribe((res) => {
      console.log(res);
    })
  }

  delete() {
    this.http.delete("http://localhost:3000/organization/delete/" + this.organization.id).subscribe((res) => {
      console.log(res);
    })
  }

  update() {
    this.http.put("http://localhost:3000/organization/update/" + this.organization.organizationID, this.organization).subscribe((res) => {
      console.log(res);
    })
  }
}
