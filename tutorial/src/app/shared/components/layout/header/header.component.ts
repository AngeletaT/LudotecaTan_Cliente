import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  username: string | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const token = sessionStorage.getItem('token');
    if (token) {
      this.authService.validateToken(token).subscribe(
        (response) => {
          this.username = response.data.username;
          sessionStorage.setItem('username', this.username);
        },
        (error) => {
          this.logout();
        }
      );
    } else {
      this.username = null;
    }
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    this.username = null;
    this.router.navigate(['/login']);
  }
}
