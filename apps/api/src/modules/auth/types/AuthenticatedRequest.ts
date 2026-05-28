export type AuthenticatedRequest = Request & {
  user?: {
    userId: string;
    email: string;
    role: string;
    status?: string;
  };
};
