// api/users.api.ts
import { BaseAPI } from "./base.api";

export interface User {
  id: string;
  name: string;
  email?: string;
  password?: string;
  createdAt: string;
  companyName?:string;
  phoneNumber?:string;
}

export class UserAPI extends BaseAPI {

  async create(
    payload: Omit<User, "id" | "createdAt">,
  ) {
    // POST /users/register — no trailing 's' on register
    const body = await this.post<{ data: any }>(
      "/users/register",
      payload as Record<string,string>,
    );
    return body.data;
  }
  async login(payload: Omit<User,"id"|"createdAt"|"name"|"companyName"|"phoneNumber">){
    const body = await this.post<{data:any}>(
      "/users/login",
      payload as Record<string,string>
    )
    return body.data
  }

  async getById( token: string): Promise<User> {
    const body = await this.get<{ data: User }>(`/users/profile`, token);
    return body.data;
  }

  async getAll(token: string): Promise<User[]> {
    const body = await this.get<{ data: User[] }>("/users", token);
    return body.data;
  }

  async update(
    payload: Partial<User>,
    token: string
  ): Promise<User> {
    // Moved to base.api patch() — was passing string literal 'payload' before
    const body = await this.patch<{ data: User }>(
      `/users/profile`,
      payload,  // was the string "payload" — now the actual variable
      token
    );
    return body.data;
  }

  async deleteMe(token: string): Promise<void> {
    // This API deletes by token identity — endpoint is /users/me, no ID
    return super.delete("/users/delete-account", token);
  }
}