export enum TransactionStatus {
  PENDING = 'PENDING',
  FAILURE = 'FAILURE',
  SUCCESS = 'SUCCESS',
}

export class UpdateTransactionDto {
  transactionStatus: TransactionStatus;
}
