export class Producto {
    _id?: string;
    nombre: string;
    categoria: string;
    descripcion: string;
    cantidad: number;

    constructor(nombre: string, categoria: string, descripcion: string, cantidad: number) {
        this.nombre = nombre;
        this.categoria = categoria;
        this.descripcion = descripcion;
        this.cantidad = cantidad;
    }
}
