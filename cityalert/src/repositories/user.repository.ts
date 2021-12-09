import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {CityalertDataSource} from '../datasources';
import {User, UserRelations} from '../models';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {
  constructor(
    @inject('datasources.cityalert') dataSource: CityalertDataSource,
  ) {
    super(User, dataSource);
  }
}
