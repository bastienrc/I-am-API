import {Entity, model, property} from '@loopback/repository';

@model()
export class Alert extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',,
    required: true,
  })
  userId?: string;

  @property({
    type: 'string',
    required: true,
  })
  type: string;

  @property({
    type: 'string',
  })
  description?: string;

  @property({
    type: 'date',
    default: 'date.now()',
  })
  createdAt?: string;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'string',
  })
  gps?: string;

  @property({
    type: 'string',
  })
  adresse?: string;

  @property({
    type: 'string',
  })
  photo?: string;


  constructor(data?: Partial<Alert>) {
    super(data);
  }
}

export interface AlertRelations {
  // describe navigational properties here
}

export type AlertWithRelations = Alert & AlertRelations;
