import { ObjectType, Field, Int } from '@nestjs/graphql';
import { SubDepartment } from './sub-department.entity';

@ObjectType()
export class Department {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [SubDepartment], { nullable: 'items' })
  subDepartments?: SubDepartment[]; // List of sub-departments if any

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
