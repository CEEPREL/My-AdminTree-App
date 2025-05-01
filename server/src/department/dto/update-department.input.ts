import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateDepartmentInput } from './create-department.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateSubDepartmentInput } from './create-sub-department.input';
import { Type } from 'class-transformer';

@InputType()
export class UpdateDepartmentInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => [CreateSubDepartmentInput], { nullable: true })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSubDepartmentInput)
  subDepartments?: CreateSubDepartmentInput[];

  @Field(() => Int)
  id: number;
}
