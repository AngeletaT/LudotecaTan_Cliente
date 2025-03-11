import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatToolbarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  username: string | null = null;

  ngOnInit() {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const token = sessionStorage.getItem('token');
    if (token) {
      const username = sessionStorage.getItem('username');
      this.username = username;
    } else {
      this.username = null;
    }
  }
}
