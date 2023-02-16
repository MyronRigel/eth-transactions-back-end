import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { EthTransactionsModule } from './modules/ethTransactions/ethTransactions.module'
import { ScheduleModule } from '@nestjs/schedule'


@Module({
   imports: [
      ConfigModule.forRoot({
         isGlobal: true,
      }),
      MongooseModule.forRootAsync({
         useFactory: async (config: ConfigService) => ({
            uri: config.get<string>('MONGODB_URI'),
         }),
         inject: [ConfigService],
      }),
      EthTransactionsModule,
      ScheduleModule.forRoot(),
   ],
})
export class AppModule {}
