import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Department } from './department.entity';

@ObjectType()
export class SubDepartment {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Int)
  departmentId: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => Department)
  department: Department;
}
