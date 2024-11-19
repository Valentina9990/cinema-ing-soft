import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ComidaService } from '../../services/api/comida.service';
@Component({
  selector: 'app-comida',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbPaginationModule],
  templateUrl: './comida.component.html',
  styleUrls: ['./comida.component.css'],
})
export class ComidaComponent implements OnInit {
  comidas: any[] = []; // Lista de comidas
  nuevaComida = { nombreComida: '', precioComida: 0 }; // Para agregar una nueva comida
  comidaParaActualizar = { idComida: 0, nombreComida: '', precioComida: 0 }; // Para actualizar una comida
  mensajeError = ''; // Para mostrar errores
  mensajeExito = ''; // Para mostrar éxitos

  // Variables de paginación
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;

  constructor(private comidaService: ComidaService) {}

  ngOnInit(): void {
    this.obtenerComidas();
  }

  // Obtener comidas con paginación
  obtenerComidas(): void {
    const offset = (this.currentPage - 1) * this.pageSize;
    this.comidaService.getComidasPaginadas(this.pageSize, offset).subscribe({
      next: (data) => {
        this.comidas = data; // Asigna los datos obtenidos
        this.totalItems = data.length > 0 ? data[0].total_count || 0 : 1; // Ajustar si hay un contador en el backend
      },
      error: (error) => {
        this.mensajeError = 'Error al cargar las comidas';
        console.error(error);
      },
    });
  }

  // Agregar una nueva comida
  agregarComida(): void {
    this.comidaService.addComida(this.nuevaComida).subscribe({
      next: () => {
        this.mensajeExito = 'Comida agregada exitosamente';
        this.obtenerComidas(); // Refrescar lista
        this.nuevaComida = { nombreComida: '', precioComida: 0 }; // Resetear formulario
      },
      error: (error) => {
        this.mensajeError = `Error al agregar comida: ${error.error.respuestaa || error.message}`;
        console.error(error);
      },
    });
  }

  // Preparar comida para actualizar
  prepararActualizacion(comida: any): void {
    this.comidaParaActualizar = { ...comida }; // Clonar el objeto
  }

  // Actualizar una comida
  actualizarComida(): void {
    this.comidaService.updateComida(this.comidaParaActualizar).subscribe({
      next: () => {
        this.mensajeExito = 'Comida actualizada exitosamente';
        this.obtenerComidas(); // Refrescar lista
        this.comidaParaActualizar = { idComida: 0, nombreComida: '', precioComida: 0 }; // Resetear formulario
      },
      error: (error) => {
        this.mensajeError = `Error al actualizar comida: ${error.error.respuesta || error.message}`;
        console.error(error);
      },
    });
  }

  // Eliminar una comida
  eliminarComida(idComida: number): void {
    this.comidaService.deleteComida(idComida).subscribe({
      next: () => {
        this.mensajeExito = 'Comida eliminada exitosamente';
        this.obtenerComidas(); // Refrescar lista
      },
      error: (error) => {
        this.mensajeError = `Error al eliminar comida: ${error.error.respuesta || error.message}`;
        console.error(error);
      },
    });
  }

  // Manejar el cambio de página
  cambiarPagina(page: number): void {
    console.log('Página seleccionada:', page);
    this.currentPage = page;
    this.obtenerComidas();
  }
}
