// department.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';

@Injectable()
export class DepartmentService {
  constructor(private readonly prisma: PrismaService) {}

  async createDepartment(createDepartmentInput: CreateDepartmentInput) {
    const { name, subDepartments } = createDepartmentInput;

    const createdDepartment = await this.prisma.department.create({
      data: {
        name,
        subDepartments: {
          create: subDepartments?.map((sub) => ({
            name: sub.name,
          })),
        },
      },
      include: {
        subDepartments: true,
      },
    });

    return createdDepartment;
  }

  async findAll() {
    return this.prisma.department.findMany({
      include: { subDepartments: true },
    });
  }

  async findOne(id: number) {
    return this.prisma.department.findUnique({
      where: { id },
      include: { subDepartments: true },
    });
  }

  async update(id: number, updateDepartmentInput: UpdateDepartmentInput) {
    const { name, subDepartments } = updateDepartmentInput;

    return this.prisma.department.update({
      where: { id },
      data: {
        name,
        subDepartments: {
          upsert: subDepartments?.map((sub) => ({
            where: { id: sub.id },
            update: {
              name: sub.name,
            },
            create: {
              name: sub.name,
            },
          })),
        },
      },
      include: {
        subDepartments: true,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.department.delete({
      where: { id },
    });
  }
}
