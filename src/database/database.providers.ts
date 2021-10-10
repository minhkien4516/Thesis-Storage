import { Sequelize } from 'sequelize-typescript';
import { File } from 'src/entities/file.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE_DEVELOPMENT',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mssql',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      });
      sequelize.authenticate();
      sequelize.addModels([File]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
