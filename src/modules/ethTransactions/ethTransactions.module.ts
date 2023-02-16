import { Module } from "@nestjs/common";
import { EthTransactionsController } from './controllers/ethTransactions.controller'
import { EthTransactionsService } from './services/ethTransactions.service'
import { MongooseModule } from '@nestjs/mongoose'
import { EthTransaction, EthTransactionSchema } from './schemas/ethTransaction.schema'
import { EthTransactionsCron } from './cron/ethTransactions.cron'
import { HttpModule } from '@nestjs/axios'


@Module({
   imports: [
      MongooseModule.forFeature([{name: EthTransaction.name, schema: EthTransactionSchema}]),
      HttpModule
   ],
   controllers: [EthTransactionsController],
   providers: [EthTransactionsService, EthTransactionsCron]
})
export class EthTransactionsModule {}