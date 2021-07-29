import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {
  data: Cliente[];
  current_cliente!: Cliente;
  confirm:boolean;
  crud_operacion = {is_new: false, is_visible: false}
  constructor(private service: ClienteService) { 
    this.data = [];
    this.confirm = false;
  }

  ngOnInit(): void {
    this.service.read().subscribe(res => {
      console.log(res.toString);
      this.data = JSON.parse(JSON.stringify(res));
      this.current_cliente = new Cliente();
    });
  }

  new(){
    this.current_cliente = new Cliente();
    this.crud_operacion.is_visible = true;
    this.crud_operacion.is_new = true;
  }
  save(){
    if(this.crud_operacion.is_new){
      this.service.insert(this.current_cliente).subscribe(res=> {
      this.current_cliente = new Cliente();
      this.crud_operacion.is_visible = false;
      this.ngOnInit();
      });
      return;
    }
    this.service.update(this.current_cliente).subscribe(res=>{
      this.current_cliente = new Cliente();
      this.crud_operacion.is_visible = false;
      this.ngOnInit();
    })
  }
  edit(row: Cliente){
    this.crud_operacion.is_visible = true;
    this.crud_operacion.is_new = false;
    this.current_cliente = row;
  }
  delete(id: string){
    this.service.delete(id).subscribe(res=>{
      this.crud_operacion.is_new = false;
      this.ngOnInit();
      this.confirm = false;
    })
  }
}
