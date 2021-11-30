import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'cityalert',
  connector: 'mongodb',
  url: 'mongodb://admin:mdp@127.0.0.1/cityalert',
  host: 'localhost',
  port: 27017,
  user: 'admin',
  password: 'mdp',
  database: 'cityalert',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class CityalertDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'cityalert';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.cityalert', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
