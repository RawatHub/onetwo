import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IOrganization } from '../models/organization.interface';
import { OrganizationService } from '../organization-profile/organization-profile.service';
import { HttpRequestsService } from '../http-requests-service/http-requests.service';

@Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.component.html',
  styleUrls: ['./organization-profile.component.scss']
})
export class OrganizationProfileComponent implements OnInit {

  constructor(private http: HttpClient, private _organizationService: OrganizationService, private http_req: HttpRequestsService) { }

  ngOnInit() {
  }
  organization: IOrganization = {
    id: "",
    email: "",
    name: "",
    organizationID: "",
    contactNumber: 0,
    address: "",
    city: "",
    country: "",
    postalCode: 0
  };

  private url_type: string = 'organization';
  add() {
    this._organizationService.add(this.organization)
      .subscribe(function (response) {
        console.log(response);
      },
        function (error) {
          console.log(error);

        });
  }

  getAll() {
    this.http_req.getAll(this.url_type).subscribe((res) => {
      console.log(res);
    });
  }

  getByID() {
    this.http_req.getById(this.url_type, this.organization.id).subscribe((res) => {
      console.log(res);
    });
  }

  delete() {
    this.http_req.delete(this.url_type, this.organization.id).subscribe((res) => {
      console.log(res);
    })
  }

  update() {
    this.http_req.update(this.url_type, this.organization.id, this.organization).subscribe((res) => {
      console.log(res);
    })
  }
}
