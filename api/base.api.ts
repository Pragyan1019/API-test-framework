// api/base.api.ts
import { APIRequestContext } from "@playwright/test";
import { User } from "./users.api";

export class BaseAPI {
  constructor(
    protected request: APIRequestContext,
    protected baseURL: string,
  ) {}

  // Single helper — all auth in this API uses x-auth-token
 private authHeader(token?: string): Record<string, string> {
    return token ? { "x-auth-token": token } : {};
  }

  async get<T>(path: string, token?: string): Promise<T> {
    const res = await this.request.get(`https://practice.expandtesting.com/notes/api/users/profile`, {
      headers: {
          "accept": "application/json",
          ...this.authHeader(token),
        },
    });
    if (!res.ok()) {
      const err = await res.json().catch(() => ({}));
      throw new Error(
        `POST ${path} failed [${res.status()}]: ${JSON.stringify(err)}`,
      );
    }    return res.json();
  }
  

  async post<T>(path: string,body:Record<string,string> , token?: string): Promise<T> {
    const res = await this.request.post(`https://practice.expandtesting.com/notes/api${path}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "accept": "application/json",
      },
      form: 
        body
      ,
    });
    if (!res.ok()) {
      const err = await res.json().catch(() => ({}));
      throw new Error(
        `POST ${path} failed [${res.status()}]: ${JSON.stringify(err)}`,
      );
    }
    return res.json();
  }

  async patch<T>(path: string, body: Record<string,string>, token: string): Promise<T> {
    const res = await this.request.patch(`${this.baseURL}${path}`, {
      form: body,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "accept": "application/json",
        ...this.authHeader(token),
      },
    });
    if (!res.ok()) {
      const err = await res.json().catch(() => ({}));
      throw new Error(
        `PATCH ${path} failed [${res.status()}]: ${JSON.stringify(err)}`,
      );
    }
    return res.json();
  }

  async delete(path: string, token?: string): Promise<void> {
    const res = await this.request.delete(`${this.baseURL}${path}`, {
      headers: {
        "accept": "application/json",
        ...this.authHeader(token),
      }    });
    if (!res.ok()) throw new Error(`DELETE ${path} failed [${res.status()}]`);
  }
}
