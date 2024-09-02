import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  standalone: true,
})
export class UserDetailsComponent implements OnInit {
  user: any;
  isLoading = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    
  ) {}

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.isLoading = true; // Start loading
      this.http.get<{ data: any }>(`https://reqres.in/api/users/${userId}`)
        .subscribe(response => {
          this.user = response.data;
          this.isLoading = false; // Stop loading
        }, () => {
          this.isLoading = false; // Stop loading on error
        });
    }
  }


  goBack() {
    this.router.navigate(['/users']);
  }
}
