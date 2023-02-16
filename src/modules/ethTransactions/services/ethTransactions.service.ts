import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { hexToNumber } from '../helpers/hexToNumber'
import { EthTransaction, EthTransactionDocument } from '../schemas/ethTransaction.schema'
import { PreparedTransaction } from '../types/PreparedTransaction'
import { Search } from '../types/Search'


@Injectable()
export class EthTransactionsService {
   constructor(
      @InjectModel(EthTransaction.name) private readonly ethTransactionModel: Model<EthTransactionDocument>
   ) {}

   async findAll(search?: Search): Promise<PreparedTransaction[]> {
      const searchOptions = search ? {[search.search_by]: search.search_value} : {}

      //Limitation for front-end (to load faster). Max 1000 transactions (last)
      const transactions: EthTransaction[] = await this.ethTransactionModel.find(searchOptions).sort({createdAt: -1}).limit(1000)
      const lastBlock: EthTransaction = await this.ethTransactionModel.findOne().sort({createdAt: -1})
      const lastBlockNumber: number = hexToNumber(lastBlock.blockNumber)

      const preparedTransactions: PreparedTransaction[] = transactions.map(transaction => {
         return {
            transaction_id: transaction.hash,
            sender_address: transaction.from,
            recipient_address: transaction.to,
            block_number: transaction.blockNumberInt,
            block_confirmations: lastBlockNumber - transaction.blockNumberInt,
            date: transaction.blockTimestamp,
            value: parseInt(transaction.value, 16) / Math.pow(10, 18),
            transaction_fee: transaction.transactionFee,
         }}
      )

      return preparedTransactions
   }

   async insertMany(transactions: EthTransaction[]): Promise<EthTransaction[]> {
      return await this.ethTransactionModel.insertMany<EthTransaction[]>(transactions)
   }

   async getCollectionSize(): Promise<number> {
      return await this.ethTransactionModel.countDocuments()
   }

   async removeOldTransactions(): Promise<void> {
      await this.ethTransactionModel.deleteMany()
   }
}
