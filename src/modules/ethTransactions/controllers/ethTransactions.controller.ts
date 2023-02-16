import { Query, Controller, Get } from '@nestjs/common'
import { EthTransactionsService } from '../services/ethTransactions.service'
import { PreparedTransaction } from '../types/PreparedTransaction'
import { Search } from '../types/Search'


@Controller('transactions')
export class EthTransactionsController {
   constructor(private readonly ethTransactionService: EthTransactionsService) {}

   @Get()
   async findAll(@Query() search: Search): Promise<PreparedTransaction[]> {
      const transactions = search.search_by ?
         await this.ethTransactionService.findAll(search) :
         await this.ethTransactionService.findAll()

      return transactions
   }
}
