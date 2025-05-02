import { Resolver, Mutation, Args, Int, Query } from '@nestjs/graphql';
import { DepartmentService } from './department.service';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { Department } from './entities/department.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver(() => Department)
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Department)
  async createDepartment(
    @Args('createDepartmentInput') createDepartmentInput: CreateDepartmentInput,
  ) {
    return this.departmentService.createDepartment(createDepartmentInput);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Department], { name: 'getAllDepartments' })
  async departments(
    @Args('skip', { type: () => Int, nullable: true }) skip = 0,
    @Args('take', { type: () => Int, nullable: true }) take = 10,
  ) {
    return this.departmentService.findAll(skip, take);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Department, { name: 'getDepartment' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.departmentService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Department)
  updateDepartment(
    @Args('updateDepartmentInput') updateDepartmentInput: UpdateDepartmentInput,
  ) {
    return this.departmentService.update(
      updateDepartmentInput.id,
      updateDepartmentInput,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Department)
  removeDepartment(@Args('id', { type: () => Int }) id: number) {
    return this.departmentService.remove(id);
  }
}
