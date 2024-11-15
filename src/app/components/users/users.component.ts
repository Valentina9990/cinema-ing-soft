import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/api/user.service';
import { Subscription } from 'rxjs';
import { User } from '../../core/models/User.model';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersResponse } from '../../core/models/UsersResponse.model';
import { FormsModule } from '@angular/forms';

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
  pageSize = 30;
  totalUsers = 0;
  selectedUser: any = {};
  errorMessage: string = '';
  successMessage: string = '';
  newUser: any = {};
  isUserFormOpen = false;
  constructor(private userService: UserService) { }

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
        this.successMessage = '¡Usuario agregado con éxito!';
        setTimeout(() => {
          this.successMessage = '';
        }, 2000);
        this.getUsers();
        this.closeUserForm();
      },
      error: (error) => {
        this.errorMessage = error.error.respuesta || 'Error al crear el usuario';
        setTimeout(() => {
          this.errorMessage = '';
        }, 2000);
      },
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

  deleteUser(idUsuario: number): void {
    if (confirm('¿Está seguro que desea eliminar este usuario?')) {
      this.userService.deleteUser(idUsuario).subscribe({
        next: () => {
          this.getUsers();
          this.errorMessage = '';
          this.successMessage = '¡Usuario eliminado con éxito!';
          setTimeout(() => {
            this.successMessage = '';
          }, 2000);
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          this.errorMessage =
            error.error.respuesta || 'Error al actualizar el usuario';
          setTimeout(() => {
            this.errorMessage = '';
          }, 2000);
        },
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
        this.errorMessage = '';
        this.successMessage = '¡Usuario modificado con éxito!';
          setTimeout(() => {
            this.successMessage = '';
          }, 2000);
      },
      error: (error) => {
        console.error('Error updating user:', error);
        this.errorMessage =
          error.error.respuesta || 'Error al actualizar el usuario';
          setTimeout(() => {
            this.errorMessage = '';
          }, 2000);
      },
    });
  }
  
}
