import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-function',
  standalone: true,
  imports: [NgIf, RouterModule, NgFor],
  templateUrl: './function.component.html',
  styleUrl: './function.component.css'
})
export class FunctionComponent {
  functionData: any = null;
  functionId: number | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.functionId = Number(this.route.snapshot.paramMap.get('id'));

    this.http.get<any[]>('functions.json').subscribe((data: any[]) => {
      this.functionData = data.find(f => f.id === this.functionId);
    });
  }
}
