import {
  ComponentFixture,
  TestBed,
  async,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UserService } from 'src/api/user/user.service';
import { of } from 'rxjs';
import { IUserModel } from 'src/model/IUserModel';
import { MockData } from 'src/model/MockData';
import { HttpClient } from '@angular/common/http';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let httpTesttoControl: HttpTestingController;
  let userService: UserService;
  let httpclient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    userService = TestBed.inject(UserService);
    httpclient = TestBed.inject(HttpClient);
    httpTesttoControl = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Unit test for the api subscription', fakeAsync(() => {
    let spy = spyOn(userService, 'getAllUsers').and.returnValue(of([]));
    let subSpy = spyOn(userService.getAllUsers(), 'subscribe');
    component.ngOnInit();
    tick();
    expect(spy).toHaveBeenCalledBefore(subSpy);
    expect(subSpy).toHaveBeenCalled();
  }));

  it('should handle API errors', fakeAsync(() => {
    userService.getAllUsers().subscribe(
      (data) => fail('Expected to fail with an error'),
      (error) => expect(component.errorMessage).toBe(component.errorMessage)
    );
    const req = httpTesttoControl.expectOne(userService.getUsersUrl);
    expect(req.request.method).toBe('GET');
    req.flush('Internal server error', {
      status: 500,
      statusText: component.errorMessage,
    });
    tick();
  }));

  it('should display data in the table', fakeAsync(() => {
    const mockData = [
      {
        id: 1,
        name: 'name 1',
        username: 'username 1',
        email: 'email 1',
        address: 'address 1',
        phone: 'phone 1',
        website: 'website 1',
        company: 'company 1',
      },
      {
        id: 2,
        name: 'name 2',
        username: 'username 2',
        email: 'email 2',
        address: 'address 2',
        phone: 'phone 2',
        website: 'website 2',
        company: 'company 2',
      },
    ];
    userService.getAllUsers().subscribe((data) => {
      component.users = data;
      fixture.detectChanges();
      const tableRows = fixture.nativeElement.querySelectorAll('tr');
      expect(tableRows.length).toBe(mockData.length + 1);
      for (let i = 0; i < mockData.length; i++) {
        const row = tableRows[i + 1];
        expect(row.cells[0].textContent).toBe(mockData[i].id.toString());
        expect(row.cells[1].textContent).toBe(
          mockData[i].name + ' ' + '(' + mockData[i].username + ')'
        );
        expect(row.cells[2].textContent).toBe(mockData[i].email);
      }
    });
    const req = httpTesttoControl.expectOne(userService.getUsersUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
    tick();
  }));

  it('Unit test for the table data value', fakeAsync(() => {
    const testPost: IUserModel[] = [
      {
        id: 1,
        name: 'name 1',
        username: 'username 1',
        email: 'email 1',
        address: 'address 1',
        phone: 'phone 1',
        website: 'website 1',
        company: 'company 1',
      },
      {
        id: 2,
        name: 'name 2',
        username: 'username 2',
        email: 'email 2',
        address: 'address 2',
        phone: 'phone 2',
        website: 'website 2',
        company: 'company 2',
      },
    ];

    let spy = spyOn(userService, 'getAllUsers').and.returnValues(of(testPost));

    component.ngOnInit();
    tick();
    expect(component.users).toBeDefined();
    expect(component.users.length).toBeGreaterThan(0);
  }));
});
