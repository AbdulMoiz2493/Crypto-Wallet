import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipientAddress: { type: String, required: true },
  amount: { type: String, required: true },
  txHash: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

export const Transaction = mongoose.model('Transaction', transactionSchema);
