export type PreparedTransaction = {
   transaction_id: string
   sender_address: string
   recipient_address: string
   block_number: number
   block_confirmations: number
   date: string
   value: number
   transaction_fee: number
}