import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user?: {
      id?: string | null;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      githubUsername?: string | null;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    githubUsername?: string | null;
  }
}

declare global {
  export interface UserInfo {
    id: number;
    email: string;
    profile_pic_url: string;
    plan_id: number;
    github_id: number;
    stripe_id: any;
    pm_type: any;
    pm_last_four: any;
    trial_ends_at: any;
  }

  type APISuccessResponse<T> = {
    success: true;
    data: T;
  };

  type APIErrorResponse = {
    success: false;
    message: string;
  };

  type APIResponse<T> = APISuccessResponse<T> | APIErrorResponse;
}
