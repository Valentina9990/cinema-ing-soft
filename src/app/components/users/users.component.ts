import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/api/user.service';
import { Subscription } from 'rxjs';
import { User } from '../../core/models/User.model';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersResponse } from '../../core/models/UsersResponse.model';
import { FormsModule } from '@angular/forms';
import { Cargo, Cine } from '../../core/enums/enums';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, NgbPaginationModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  users: User[] = [];
  page = 1;
  pageSize = 10;
  totalUsers = 0;
  selectedUser: any = {};
  errorMessage: string = '';
  successMessage: string = '';
  newUser: any = {};
  isUserFormOpen = false;
  cines = Object.entries(Cine).filter(([key]) => isNaN(Number(key)));
  cargos = Object.entries(Cargo).filter(([key]) => isNaN(Number(key)));
  userToDelete: number | null = null; 

  constructor(private userService: UserService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  getUsers(): void {
    const offset = (this.page - 1) * this.pageSize;
    const usersSub = this.userService
      .getUsers(this.pageSize, offset)
      .subscribe({
        next: (response: UsersResponse) => {
          this.users = response.rows;
          this.totalUsers = response.total;
          console.log('Users fetched successfully:', this.users);
          console.log('Total users:', this.totalUsers);
        },
        error: (error) => {
          console.error('Error fetching users:', error);
        },
      });
    this.subscriptions.push(usersSub);
  }

  onPageChange(page: number): void {
    this.page = page;
    this.getUsers();
  }

  addUser(): void {
    this.userService.addUser(this.newUser).subscribe({
      next: (response) => {
        this.handleSuccess('¡Usuario agregado con éxito!');
        this.getUsers();
        this.closeUserForm();
      },
      error: (error) => this.handleError(error, 'Error al crear el usuario'),
    });
  }

  openUserForm(): void {
    this.isUserFormOpen = true;
    this.newUser = {};
  }

  closeUserForm(): void {
    this.isUserFormOpen = false;
  }

  editUser(user: any): void {
    this.selectedUser = { ...user };
  }

  openDeleteModal(content: any, idUsuario: number) {
    this.userToDelete = idUsuario;
    this.modalService.open(content, { centered: true }).result.then(
      (result) => {
        if (result === 'delete') {
          this.confirmDelete();
        }
        this.userToDelete = null;
      },
      (reason) => {
        this.userToDelete = null;
      }
    );
  }

  confirmDelete(): void {
    if (this.userToDelete) {
      this.userService.deleteUser(this.userToDelete).subscribe({
        next: () => {
          this.getUsers();
          this.handleSuccess('¡Usuario eliminado con éxito!');
        },
        error: (error) => this.handleError(error, 'Error al eliminar el usuario'),
      });
    }
  }

  saveChanges(user: any): void {
    const userData = {
      id_usuario: user.idUsuario,
      nombre_usuario: user.nombreUsuario,
      apellido_usuario: user.apellidoUsuario,
      contrasena_usuario: user.contrasenaUsuario,
      email_usuario: user.emailUsuario,
      fecha_creacion: user.fechaCreacion,
      fecha_nacimiento_usuario: user.fechaNacimientoUsuario,
      id_cine: user.idCine,
      id_cargo: user.idCargo,
    };

    this.userService.updateUser(userData).subscribe({
      next: () => {
        this.getUsers();
        this.selectedUser = {};
        this.handleSuccess('¡Usuario modificado con éxito!');
      },
      error: (error) => this.handleError(error, 'Error al modificar el usuario'),
    });
  }

  getCinemaId(name: string): number {
    return Cine[name as keyof typeof Cine];
  }

  getRoleId(name: string): number {
    return Cargo[name as keyof typeof Cargo];
  }
  
  private handleSuccess(message: string): void {
    this.successMessage = message;
    setTimeout(() => (this.successMessage = ''), 2000);
  }
  
  private handleError(error: any, defaultMessage: string): void {
    this.errorMessage = error.error?.respuesta || defaultMessage;
    setTimeout(() => (this.errorMessage = ''), 2000);
  }
}
