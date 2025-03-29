import Web3 from "web3";
import { User } from "../Models/user.model.js";
import { Transaction } from "../Models/transaction.model.js";
import { ErrorHandler } from "../Utils/ApiErrorHandler.js";
import { asyncHandler } from "../Utils/AsyncHandler.js";
import { ApiResponseHandler } from "../Utils/ApiResponseHandler.js";

const web3 = new Web3(new Web3.providers.HttpProvider(`https://sepolia.infura.io/v3/e5ac44caaec14b85970cf43ffa77b999`));

export const sendETH = asyncHandler(async (req, res) => {
    const { recipientAddress, amountInEther } = req.body;
  
    const user = await User.findById(req.user._id);
    if (!user) throw new ErrorHandler(404, "User not found");
  
    // Get wallet balance and gas price
    const balanceInWei = BigInt(await web3.eth.getBalance(user.walletAddress)); // Ensure BigInt
    const gasPrice = BigInt(await web3.eth.getGasPrice()); // Ensure BigInt
    const gasLimit = BigInt(2000000); // Convert gas limit to BigInt
    const gasFeeInWei = gasLimit * gasPrice; // Calculate total gas fee as BigInt
    const amountInWei = BigInt(web3.utils.toWei(amountInEther, "ether")); // Convert value to BigInt
  
    // Check if wallet has sufficient funds
    if (balanceInWei < amountInWei + gasFeeInWei) {
      const requiredInEther = web3.utils.fromWei((amountInWei + gasFeeInWei).toString(), "ether");
      throw new ErrorHandler(
        402,
        `Insufficient funds. Available: ${web3.utils.fromWei(balanceInWei.toString(), "ether")} ETH, Required: ${requiredInEther} ETH`
      );
    }
  
    const tx = {
      to: recipientAddress,
      value: amountInWei.toString(), // Convert BigInt to string
      gas: Number(gasLimit), // Convert to Number
      gasPrice: gasPrice.toString(), // Convert BigInt to string
      nonce: await web3.eth.getTransactionCount(user.walletAddress, "latest"),
    };
  
    const signedTx = await web3.eth.accounts.signTransaction(tx, user.privateKey);
  
    web3.eth
      .sendSignedTransaction(signedTx.rawTransaction)
      .on("transactionHash", async (hash) => {
        const transaction = new Transaction({
          sender: user._id,
          recipientAddress,
          amount: amountInEther,
          txHash: hash,
        });
  
        await transaction.save();
        user.transactions.push(transaction._id);
        await user.save();
  
        res
          .status(200)
          .json(new ApiResponseHandler(200, { txHash: hash }, "Transaction sent successfully"));
      })
      .on("error", (error) => {
        res
          .status(500)
          .json(new ApiResponseHandler(500, { error: error }, error.message));
      });
  });
  
  



export const getTransactionHistory = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).populate("transactions");
  
    if (!user) throw new ErrorHandler(404, "User not found");
  
    res.status(200).json(new ApiResponseHandler(200, user.transactions, "Transaction history retrieved successfully"));
  });

  
  export const getWalletBalance = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
  
    if (!user) throw new ErrorHandler(404, "User not found");
  
    const balanceInWei = await web3.eth.getBalance(user.walletAddress);
    const balanceInEther = web3.utils.fromWei(balanceInWei, "ether");
  
    res.status(200).json(new ApiResponseHandler(200, { balance: balanceInEther }, "Wallet balance retrieved successfully"));
  });

  

