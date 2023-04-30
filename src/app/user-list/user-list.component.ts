import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/api/user/user.service';
import { IUserModel } from 'src/model/IUserModel';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  pageTitle: string = 'Users List';
  users: IUserModel[] = [];
  sub!: Subscription;
  errorMessage: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.sub = this.userService.getAllUsers().subscribe({
      next: (usr) => {
        this.users = usr;
        // console.log(usr);
      },
      error: (err) => {
        // console.log(err, 'the errorrr');
        this.errorMessage = err;
        //alert('An unexpected error occurred');
        //I would have used toastr alert if I had time. or redirect to an error page
      },
    });
  }
}
