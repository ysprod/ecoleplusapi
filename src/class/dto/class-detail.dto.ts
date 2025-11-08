import { ApiProperty } from '@nestjs/swagger';

export class ClassDetail {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  level: string;

  @ApiProperty({
    type: 'object',
    properties: {
      _id: { type: 'string' },
      name: { type: 'string' },
      nom: { type: 'string' },
    },
  })
  school: {
    _id: string;
    name: string;
    nom: string;
  };
}