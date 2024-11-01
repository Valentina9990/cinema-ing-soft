import { NgFor, SlicePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-functions',
  standalone: true,
  imports: [NgFor, SlicePipe, RouterModule],
  templateUrl: './functions.component.html',
  styleUrl: './functions.component.css',
})
export class FunctionsComponent {
  functions: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadFunctions();
  }

  loadFunctions(): void {
    this.http.get<any[]>('functions.json').subscribe(data => {
      this.functions = data;
    });
  }
}
