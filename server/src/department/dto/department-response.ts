// dto/department-response.dto.ts
import { Field, ObjectType } from '@nestjs/graphql';
import { Department } from '../entities/department.entity';

@ObjectType()
export class DepartmentResponse {
  @Field()
  message: string;

  @Field(() => Department)
  department: Department;
}
