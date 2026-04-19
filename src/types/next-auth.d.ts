import type { TravelerRole } from './domain';

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: TravelerRole;
      citySlug?: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: TravelerRole;
    citySlug?: string;
  }
}
