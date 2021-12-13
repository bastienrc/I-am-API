import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Alert} from '../models';
import {AlertRepository} from '../repositories';

export class AlertController {
  constructor(
    @repository(AlertRepository)
    public alertRepository : AlertRepository,
  ) {}

  @post('/alerts')
  @response(200, {
    description: 'Alert model instance',
    content: {'application/json': {schema: getModelSchemaRef(Alert)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Alert, {
            title: 'NewAlert',
            exclude: ['id'],
          }),
        },
      },
    })
    alert: Omit<Alert, 'id'>,
  ): Promise<Alert> {
    return this.alertRepository.create(alert);
  }

  @get('/alerts/count')
  @response(200, {
    description: 'Alert model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Alert) where?: Where<Alert>,
  ): Promise<Count> {
    return this.alertRepository.count(where);
  }

  @get('/alerts')
  @response(200, {
    description: 'Array of Alert model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Alert, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Alert) filter?: Filter<Alert>,
  ): Promise<Alert[]> {
    return this.alertRepository.find(filter);
  }

  @patch('/alerts')
  @response(200, {
    description: 'Alert PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Alert, {partial: true}),
        },
      },
    })
    alert: Alert,
    @param.where(Alert) where?: Where<Alert>,
  ): Promise<Count> {
    return this.alertRepository.updateAll(alert, where);
  }

  @get('/alerts/{id}')
  @response(200, {
    description: 'Alert model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Alert, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Alert, {exclude: 'where'}) filter?: FilterExcludingWhere<Alert>
  ): Promise<Alert> {
    return this.alertRepository.findById(id, filter);
  }

  @patch('/alerts/{id}')
  @response(204, {
    description: 'Alert PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Alert, {partial: true}),
        },
      },
    })
    alert: Alert,
  ): Promise<void> {
    await this.alertRepository.updateById(id, alert);
  }

  @put('/alerts/{id}')
  @response(204, {
    description: 'Alert PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() alert: Alert,
  ): Promise<void> {
    await this.alertRepository.replaceById(id, alert);
  }

  @del('/alerts/{id}')
  @response(204, {
    description: 'Alert DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.alertRepository.deleteById(id);
  }
}
