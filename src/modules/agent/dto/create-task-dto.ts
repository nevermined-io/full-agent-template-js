import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'
import { Artifact } from 'src/common/models/agent-models'

export class CreateTaskDto {
  @ApiProperty({
    example: `What's the weather in NY now?`,
    description: 'Input for the task'
  })
  @IsString()
  query: string

  @ApiProperty({
    example: [{ assistantId: '1234' }],
    description: 'List of additional key-value parameters required for the task'
  })
  @IsOptional()
  additional_params?: { [name: string]: string }[]

  @ApiProperty({
    example: [
      { artifactId: 'art-aabb', url: 'https://nevermined.io/file.txt' }
    ],
    description: 'Artifacts for the task'
  })
  @IsOptional()
  artifacts?: Artifact[]
}
