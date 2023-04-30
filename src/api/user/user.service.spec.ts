import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { MockData } from 'src/model/MockData';
import { of } from 'rxjs';
import { IUserModel } from 'src/model/IUserModel';

describe('UserService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let userService: UserService;

  beforeEach(() => {
    let httpClientSpyObj = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      providers: [
        UserService,
        {
          provide: HttpClient,
          useValue: httpClientSpyObj,
        },
      ],
    });
    userService = TestBed.inject(UserService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  describe('getPosts()', () => {
    it('The service api has been called', (done: DoneFn) => {
      httpClientSpy.get.and.returnValue(of(MockData));
      userService.getAllUsers().subscribe({
        next: (posts) => {
          expect(posts).toEqual(MockData);
          done();
        },
        error: () => {
          done.fail;
        },
      });
      expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    });
  });
});
