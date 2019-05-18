import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  productos: Producto[];
  productosFiltrado:Producto[];
  cargado =true;
  constructor(private http: HttpClient) {this.cargarProductos(); }

  private cargarProductos(){
    return new Promise((resolve, reject)=>{
      this.http.get('https://angular-portafolio-e0b15.firebaseio.com/productos_idx.json')
      .subscribe((resp:Producto[])=>{
        this.productos = resp;
        this.cargado = false; 
        resolve();
      });
    });
  
      
  }

  getProducto(id:string){
    return this.http.get(`https://angular-portafolio-e0b15.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto(termino:string){
    this.productos =(typeof this.productos =="undefined") ? []:this.productos;
    if(this.productos.length ==0){
      this.cargarProductos().then(()=>{
        //Despues de tener los productos
        this.filtrarProductos(termino);
      });
    }else{
      this.filtrarProductos(termino);
    }
   
  }

  private filtrarProductos(termino:string){
    termino = termino.toLocaleLowerCase();
    this.productosFiltrado =[];
    this.productos.forEach(prod =>{
      if(prod.categoria.indexOf(termino)>=0 || prod.titulo.toLocaleLowerCase().indexOf(termino)>=0){
        this.productosFiltrado.push(prod);
      }
    });
  } 
}
