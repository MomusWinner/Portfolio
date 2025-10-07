import type { SessionRepository, Session } from "@/repository/session";

export class MockSessionRepository implements SessionRepository {
  sql: any;
  private sessions: Session[] = [];

  constructor() {
    this.sql = null;
  }

  async createSession(ip: string, device: string, tag: string | null): Promise<Session> {
    const newSession: Session = {
      id: (Math.random() * 1e9).toFixed(0),
      ip,
      device,
      tag,
      alias: null,
      createdAt: new Date(),
      totalTime: null,
    };

    this.sessions.push(newSession);
    return newSession;
  }

  async getSessionByID(id: string): Promise<Session | null> {
    return this.sessions.find((s) => s.id === id) || null;
  }

  async getAllSession(): Promise<Session[]> {
    return [...this.sessions];
  }

  async deleteSession(id: string): Promise<void> {
    this.sessions = this.sessions.filter((s) => s.id !== id);
  }

  seed(sessions: Session[]) {
    this.sessions = [...sessions];
  }

  clear() {
    this.sessions = [];
  }
}
