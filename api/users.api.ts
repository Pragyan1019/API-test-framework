// api/users.api.ts
import { BaseAPI } from "./base.api";

export interface User {
  id: string;
  name: string;
  email?: string;
  password?: string;
  createdAt: string;
}

export class UserAPI extends BaseAPI {

  async create(
    payload: Omit<User, "id" | "createdAt">,
    token?: string
  ): Promise<User> {
    // POST /users/register — no trailing 's' on register
    const body = await this.post<{ data: User }>(
      "/users/register",
      payload as Record<string,string>,
    );
    return body.data;
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
    id: string,
    payload: Partial<User>,
    token: string
  ): Promise<User> {
    // Moved to base.api patch() — was passing string literal 'payload' before
    const body = await this.patch<{ data: User }>(
      `/users/${id}`,
      payload,  // was the string "payload" — now the actual variable
      token
    );
    return body.data;
  }

  async deleteMe(token: string): Promise<void> {
    // This API deletes by token identity — endpoint is /users/me, no ID
    return super.delete("/users/me", token);
  }
}