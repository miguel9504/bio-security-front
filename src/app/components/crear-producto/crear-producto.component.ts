import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/models/producto';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css'],
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  titulo = 'Crear Producto';
  id: string | null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private _productoService: ProductoService,
    private aRoute: ActivatedRoute
  ) {
    this.productoForm = this.fb.group({
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      descripcion: ['', Validators.required],
      cantidad: ['', Validators.required],
    });
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
  }
  agregarProducto() {
    console.log(this.productoForm);
    console.log(this.productoForm.get('producto')?.value);
    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      descripcion: this.productoForm.get('descripcion')?.value,
      cantidad: this.productoForm.get('cantidad')?.value,
    };
    if (this.id !== null) {
      this._productoService
        .editarProducto(this.id, PRODUCTO)
        .subscribe((res) => {
          this.router.navigate(['/productos']);
          this.toastr.success('Producto actualizado correctamente', 'Producto');
        }, (error) => {
          console.log(error);
          this.toastr.error(
            'Error al agregar producto',
            'El producto no se ha agregado'
          );
          this.productoForm.reset();
        });
    } else {
      console.log(PRODUCTO);
      this._productoService.guardarProducto(PRODUCTO).subscribe(
        (data) => {
          console.log(data);
          this.toastr.success(
            'Producto agregado correctamente',
            'Producto Registrado'
          );
          this.router.navigate(['/']);
        },
        (error) => {
          console.log(error);
          this.toastr.error(
            'Error al agregar producto',
            'El producto no se ha agregado'
          );
          this.productoForm.reset();
        }
      );
    }
  }
  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Producto';
      this._productoService.obtenerProducto(this.id).subscribe(
        (data) => {
          console.log(data);
          this.productoForm.setValue({
            producto: data.nombre,
            categoria: data.categoria,
            descripcion: data.descripcion,
            cantidad: data.cantidad,
          });
        },
        (error) => {
          console.log(error);
          this.toastr.error(
            'Error al obtener producto',
            'El producto no se ha obtenido'
          );
        }
      );
    }
  }
}
