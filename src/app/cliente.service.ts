import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  data: Cliente[] = [];
  constructor(private http: HttpClient) { }
  read(){
    return this.http.get('http://localhost:8000/api/clientes');
  }
  insert(data: Cliente){
    return this.http.post('http://localhost:8000/api/clientes', data);
  }
  update(data: Cliente){
    return this.http.put('http://localhost:8000/api/clientes/' + data.id, data);
  }
  delete(id: string){
    return this.http.delete('http://localhost:8000/api/clientes/' + id);
  }
}
