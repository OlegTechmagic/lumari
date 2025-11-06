/* eslint-disable @typescript-eslint/no-explicit-any */

export type Router = (params: {
  method: string;
  headers: Record<string, string | undefined>;
  query: Record<string, string | undefined> | null;
  pathParameters: Record<string, string | undefined> | null;
  body: any;
}) => Promise<{ statusCode: number; body: any }>;
