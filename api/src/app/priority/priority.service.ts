import { PrismaClient, Priority, Prisma } from '@prisma/client';

export class PriorityService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getPriorities(): Promise<Priority[]> {
    return this.prisma.priority.findMany();
  }

  async getPriority(id: number): Promise<Priority | null> {
    return this.prisma.priority.findUnique({ where: { id } });
  }

  async createPriority(data: Priority): Promise<Priority> {
    return this.prisma.priority.create({ data });
  }

  async createPriorityMany(data: Priority[]): Promise<Prisma.BatchPayload> {
    return this.prisma.priority.createMany({ data });
  }

  async updatePriority(id: number, data: Priority): Promise<Priority> {
    return this.prisma.priority.update({ where: { id }, data });
  }

  async deletePriority(id: number): Promise<Priority> {
    return this.prisma.priority.delete({ where: { id } });
  }
}
