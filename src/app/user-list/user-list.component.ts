import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, HeaderComponent, HttpClientModule, RouterModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: true,
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  allUsers: any[] = [];
  currentPage = 1;
  noResults = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.http.get<{ data: any[] }>(`https://reqres.in/api/users?page=${this.currentPage}`)
      .subscribe(data => {
        this.allUsers = [...this.allUsers, ...data.data];
        this.users = this.allUsers;
        this.noResults = this.users.length === 0;
      });
  }

  filterUsersById(term: string): void {
    if (term.trim() === '') {
      this.users = this.allUsers;
      this.noResults = false;
    } else {
      const id = parseInt(term, 10);
      if (!isNaN(id)) {
        this.users = this.allUsers.filter(user => user.id === id);
        if (this.users.length > 0) {
          this.router.navigate(['/users', id]);  // Navigate to user details page if a match is found
        }
      } else {
        this.users = [];
      }
      this.noResults = this.users.length === 0;
    }
  }

  onSearch(term: string): void {
    this.filterUsersById(term);
  }

  loadMore() {
    this.currentPage++;
    this.loadUsers();
  }

  viewUserDetails(userId: number) {
    this.router.navigate(['/users', userId]);
  }
}
