import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type EthTransactionDocument = HydratedDocument<EthTransaction>

@Schema()
export class EthTransaction {
   @Prop()
   blockHash: string

   @Prop()
   blockNumber: string

   @Prop()
   from: string

   @Prop()
   gas: string

   @Prop()
   gasPrice: string

   @Prop()
   maxFeePerGas: string

   @Prop()
   maxPriorityFeePerGas: string

   @Prop()
   hash: string

   @Prop()
   input: string

   @Prop()
   nonce: string

   @Prop()
   to: string

   @Prop()
   transactionIndex: string

   @Prop()
   value: string

   @Prop()
   type: string

   @Prop()
   accessList: string[]

   @Prop()
   chainId: string

   @Prop()
   v: string

   @Prop()
   r: string

   @Prop()
   s: string

   @Prop()
   blockTimestamp: string

   @Prop()
   blockNumberInt: number

   @Prop()
   transactionFee: number

   @Prop()
   createdAt: Date
}

export const EthTransactionSchema = SchemaFactory.createForClass(EthTransaction)
