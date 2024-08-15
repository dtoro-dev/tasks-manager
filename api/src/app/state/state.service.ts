import { PrismaClient, State, Prisma } from '@prisma/client';

export class StateService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getStates(): Promise<State[]> {
    return this.prisma.state.findMany();
  }

  async getState(id: number): Promise<State | null> {
    return this.prisma.state.findUnique({ where: { id } });
  }

  async createState(data: State): Promise<State> {
    return this.prisma.state.create({ data });
  }

  async createStateMany(data: State[]): Promise<Prisma.BatchPayload> {
    return this.prisma.state.createMany({ data });
  }

  async updateState(id: number, data: State): Promise<State> {
    return this.prisma.state.update({ where: { id }, data });
  }

  async deleteState(id: number): Promise<State> {
    return this.prisma.state.delete({ where: { id } });
  }
}
