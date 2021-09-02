import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataDTO } from '../../models/data-dto';

@Injectable({
  providedIn: 'root',
})
export class InformationSenderService {
  constructor(public httpClient: HttpClient) {}

  async send(data: DataDTO, url: string) {
    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');

    return new Promise((res, rej) => {
      this.httpClient.post(`${url}/data`, data, { headers }).subscribe(
        (data) => {
          res(data['_body']);
        },
        (error) => {
          rej(error);
        }
      );
    });
  }
}
