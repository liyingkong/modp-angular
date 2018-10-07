import { Injectable } from '@angular/core';
//import { Headers, Http } from '@angular/http';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Result } from './base/result';
import { MessageService } from 'primeng/components/common/messageservice';
import { CutVideoParam } from './CutVideoParam';
import { Upload } from './upload';

@Injectable()
export class CutVideoParamService {

  //private headers = new Headers();
  protected url = environment.apiUrl + '/api';  // URL to web api
  //protected url = 'http://localhost:8880/api/files';  // URL to web api

  //private token: string;
  protected headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {
  }
  getCutVideoUrl(): string {
    return this.url + '/getCutVideo/';
  }

  getTrackVideoUrl(): string {
    return this.url + '/getTrackVideo/';
  }

  getMaskVideoUrl(): string {
    return this.url + '/getMaskVideo/';
  }

  cutVideo(cutVideoParam: CutVideoParam): Promise<Upload> {
    const url = `${this.url}/cutVideo`;
    return this.http
      .post(url, JSON.stringify(cutVideoParam), {headers: this.headers})
      .toPromise()
      .then(response => {
        console.log(response);
        let ret = response as Result<Upload>;
        if (ret.errorcode == 0) {
          return ret.data;
        }
        throw ret;
      })
      .catch(this.handleError.bind(this));
  }

  trackVideo(filename: string): Promise<Upload> {
    const url = `${this.url}/getTrackVideo?filename=${filename}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => {
        console.log(response);
        let ret = response as Result<Upload>;
        if (ret.errorcode == 0) {
          return ret.data;
        }
        throw ret;
      })
      .catch(this.handleError.bind(this));
  }

  protected handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    if (this.messageService) {
      this.messageService.add({ severity: 'error', detail: error.errmsg || error.message || error });
    }
    return Promise.reject(error.errmsg || error.message || error);
  }
}