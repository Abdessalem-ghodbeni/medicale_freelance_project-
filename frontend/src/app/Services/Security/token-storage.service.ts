import { Injectable } from '@angular/core';

const TOKEN_KEY = 'access_token';
const USER_KEY = 'auth-user';
const ROLE_KEY = 'role-user';
@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}
  signOut(): void {
    window.localStorage.clear();
  }

  public savedata(data: any): void {
    localStorage.setItem(TOKEN_KEY, data.access_token);
  }

  handle(data: any) {
    this.savedata(data);
  }

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  getId(): number {
    return Number(localStorage.getItem(USER_KEY));
  }
  getRole() {
    return localStorage.getItem(ROLE_KEY);
  }
  remove() {
    localStorage.removeItem(TOKEN_KEY);
  }

  decode(payload: any) {
    return JSON.parse(atob(payload));
  }

  payload(token: any) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  isValid() {
    const token = this.getToken();
    const id = this.getId();

    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return id === payload.id;
      }
    }
    return false;
  }

  getInfos() {
    const token = this.getToken();

    if (token) {
      const payload = this.payload(token);
      return payload ? payload : null;
    }

    return null;
  }

  loggedIn() {
    return this.isValid();
  }
}
