export interface Alias {
  id: string;
  tag: string;
  alias: string;
}

export interface Session {
  id: string;
  tag: string | null;
  ip: string;
  device: string;
  createdAt: string;
  alias?: string | null;
  totalTime?: string | null;
}
