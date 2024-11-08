import { Component, OnDestroy, OnInit} from '@angular/core';
import { UserService } from '../../services/api/user.service';
import { Subscription } from 'rxjs';
import { User } from '../../core/models/User';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, NgbPaginationModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit, OnDestroy{
  subscriptions:Subscription[];
  users: User[];
  newUser: Partial<User>;
  page = 1;
  pageSize = 15;
  totalUsers = 0;
  constructor(
    private userService: UserService
  ){
    this.subscriptions = [];
    this.users = [];
    this.newUser = {};
  }

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public getUsers(): void {
    const usersSub = this.userService.getUsers().subscribe({
      next: (response: User[]) => {
        this.users = response;
        this.totalUsers = response.length;
        console.log('Users fetched successfully:', response);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
    this.subscriptions.push(usersSub);
  }

  addUser(): void {
    this.userService.addUser(this.newUser as Omit<User, 'idUsuario' | 'fechaCreacion'>).subscribe({
      next: (createdUser) => {
        this.users.push(createdUser);
        console.log('User added successfully:', createdUser);
      },
      error: (error) => {
        console.error('Error adding user:', error);
      }
    });
  }

  updateUser(userId: number): void {
    const updatedUser = this.newUser as Omit<User, 'idUsuario'>;
    this.userService.updateUserById(userId, updatedUser).subscribe({
      next: (user) => {
        const index = this.users.findIndex(u => u.idUsuario === user.idUsuario);
        if (index !== -1) {
          this.users[index] = user;
        }
        console.log('User updated successfully:', user);
      },
      error: (error) => {
        console.error('Error updating user:', error);
      }
    });
  }

  deleteUser(userId: number): void {
    this.userService.deleteUserById(userId).subscribe({
      next: () => {
        this.users = this.users.filter(u => u.idUsuario !== userId);
        console.log(`User with ID ${userId} deleted successfully`);
      },
      error: (error) => {
        console.error('Error deleting user:', error);
      }
    });
  }

  get paginatedUsers(): User[] {
    const startItem = (this.page - 1) * this.pageSize;
    const endItem = this.page * this.pageSize;
    return this.users.slice(startItem, endItem);
  }

  onPageChange(page: number): void {
    this.page = page;
  }
}
