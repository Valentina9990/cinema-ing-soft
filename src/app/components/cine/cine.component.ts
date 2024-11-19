import { Component, OnDestroy, OnInit } from '@angular/core';
import { CineService } from '../../services/api/cine.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cines',
  standalone: true,
  imports: [CommonModule, NgbPaginationModule, FormsModule],
  templateUrl: './cine.component.html',
  styleUrls: ['./cine.component.css'],
})
export class CineComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  cines: any[] = [];
  page = 1;
  pageSize = 30;
  totalCines = 0;
  selectedCine: any = {};
  errorMessage: string = '';
  successMessage: string = '';
  newCine: any = {};
  isCineFormOpen = false;

  constructor(private cineService: CineService) {}

  ngOnInit(): void {
    this.getCines();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  getCines(): void {
    const offset = (this.page - 1) * this.pageSize;
    const cineSub = this.cineService.getCines(this.pageSize, offset).subscribe({
      next: (response: any) => {
        this.cines = response.rows;
        this.totalCines = response.total;
        console.log('Cines fetched successfully:', this.cines);
        console.log('Total cines:', this.totalCines);
      },
      error: (error) => {
        console.error('Error fetching cines:', error);
      },
    });
    this.subscriptions.push(cineSub);
  }

  onPageChange(page: number): void {
    this.page = page;
    this.getCines();
  }

  addCine(): void {
    this.cineService.addCine(this.newCine).subscribe({
      next: () => {
        this.successMessage = '¡Cine agregado con éxito!';
        setTimeout(() => {
          this.successMessage = '';
        }, 2000);
        this.getCines();
        this.closeCineForm();
      },
      error: (error) => {
        this.errorMessage = error.error.respuesta || 'Error al crear el cine';
        setTimeout(() => {
          this.errorMessage = '';
        }, 2000);
      },
    });
  }

  openCineForm(): void {
    this.isCineFormOpen = true;
    this.newCine = {};
  }

  closeCineForm(): void {
    this.isCineFormOpen = false;
  }

  editCine(cine: any): void {
    this.selectedCine = { ...cine };
  }

  deleteCine(idCine: number): void {
    if (confirm('¿Está seguro que desea eliminar este cine?')) {
      this.cineService.deleteCine(idCine).subscribe({
        next: () => {
          this.getCines();
          this.errorMessage = '';
          this.successMessage = '¡Cine eliminado con éxito!';
          setTimeout(() => {
            this.successMessage = '';
          }, 2000);
        },
        error: (error) => {
          console.error('Error deleting cine:', error);
          this.errorMessage =
            error.error.respuesta || 'Error al eliminar el cine';
          setTimeout(() => {
            this.errorMessage = '';
          }, 2000);
        },
      });
    }
  }

  saveChanges(cine: any): void {
    const cineData = {
      id_cine: cine.idCine,
      nombre_cine: cine.nombreCine,
      telefono_cine: cine.telefonoCine,
      id_ubicacion: cine.idUbicacion,
    };

    this.cineService.updateCine(cineData).subscribe({
      next: () => {
        this.getCines();
        this.selectedCine = {};
        this.errorMessage = '';
        this.successMessage = '¡Cine modificado con éxito!';
        setTimeout(() => {
          this.successMessage = '';
        }, 2000);
      },
      error: (error) => {
        console.error('Error updating cine:', error);
        this.errorMessage =
          error.error.respuesta || 'Error al actualizar el cine';
        setTimeout(() => {
          this.errorMessage = '';
        }, 2000);
      },
    });
  }
}
