import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecipeModule } from './recipe/recipe.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AlertModule } from './alert/alert/alert.module';
import { AlertModule } from './alert/alert.module';

@Module({
  imports: [RecipeModule, MongooseModule.forRoot('mongodb://localhost/townalert'), AlertModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
