import { Cron } from '@nestjs/schedule'
import { Injectable } from '@nestjs/common'
import { EthTransactionsService } from '../services/ethTransactions.service'
import { HttpService } from '@nestjs/axios'
import { etherScanAPI } from '../helpers/constants'
import { EthTransaction } from '../schemas/ethTransaction.schema'
import { hexToNumber } from '../helpers/hexToNumber'


@Injectable()
export class EthTransactionsCron {
   constructor(
      private readonly ethTransactionsService: EthTransactionsService,
      private readonly httpService: HttpService,
   ) {}

   //Rate limit for free plan on etherScan = 5 calls/second, up to 100,000 calls/day
   @Cron('*/6 * * * * *')
   async fetchEthTransactionsData(): Promise<void> {
      try {
         const transactions: EthTransaction[] = await this.httpService.axiosRef.get(
            `${etherScanAPI}?module=proxy&action=eth_getBlockByNumber&tag=latest&boolean=true`,
         ).then(data => {
            const block = data.data?.result
            return block?.transactions?.map(transaction => ({
               ...transaction,
               blockTimestamp: block.timestamp,
               blockNumberInt: hexToNumber(transaction.blockNumber),
               transactionFee: hexToNumber(transaction.gas) * parseInt(transaction.gasPrice, 16) / Math.pow(10, 18),
               createdAt: new Date(),
            }))
         })

         const documentCount = await this.ethTransactionsService.getCollectionSize()

         // Limitation to avoid DB overflow
         if (documentCount > 30000) {
            await this.ethTransactionsService.removeOldTransactions()
         }

         await this.ethTransactionsService.insertMany(transactions)
      } catch (err) {
         console.log(err.message)
      }
   }
}