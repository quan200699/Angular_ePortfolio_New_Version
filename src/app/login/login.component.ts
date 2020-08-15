import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../service/authentication/authentication.service';
import {first} from 'rxjs/operators';
import {User} from '../interface/user';
import {NotificationService} from '../service/notification/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginRequest: User = {
    email: '',
    password: ''
  };
  returnUrl: string;
  loading = false;
  submitted = false;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/';
  }

  login() {
    this.submitted = true;
    this.loading = true;
    this.authenticationService.login(this.loginRequest.email, this.loginRequest.password)
      .pipe(first())
      .subscribe(
        data => {
          localStorage.setItem('ACCESS_TOKEN', data.accessToken);
          this.router.navigate([this.returnUrl]).finally(() => {
          });
          this.notificationService.showSuccessMessage('Đăng nhập thành công');
        },
        () => {
          this.loading = false;
          this.notificationService.showErrorMessage('Đăng nhập thất bại');
        });
  }
}
