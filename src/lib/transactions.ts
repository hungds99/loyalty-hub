export const addTransaction = async (transaction: any) => {
  // In a real application, this function would interact with a database
  // to add the transaction. For this example, we'll just log the transaction.
  console.log("Adding transaction:", transaction)
  return transaction
}

