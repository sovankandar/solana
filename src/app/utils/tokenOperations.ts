import { Connection, PublicKey, Transaction, Keypair, SystemProgram, SendOptions } from '@solana/web3.js';
import { 
  getOrCreateAssociatedTokenAccount, 
  createMint, 
  createMintToInstruction, 
  createTransferInstruction, 
  getAccount, 
  TOKEN_PROGRAM_ID,
  Account
} from '@solana/spl-token';

interface TransactionOptions extends SendOptions {
  signers?: Keypair[];
}

export interface TokenOperation {
  connection: Connection;
  publicKey: PublicKey;
  sendTransaction: (transaction: Transaction, connection: Connection, options?: TransactionOptions) => Promise<string>;
}

export interface TokenCreationResult {
  mint: PublicKey;
  tokenAccount: Account;
  signature: string;
}

export async function createNewToken(
  { connection, publicKey, sendTransaction }: TokenOperation,
  decimals: number
): Promise<TokenCreationResult> {
  const lamports = await connection.getMinimumBalanceForRentExemption(82);
  const mintKeypair = Keypair.generate();

  const createAccountTransaction = new Transaction().add(
    SystemProgram.createAccount({
      fromPubkey: publicKey,
      newAccountPubkey: mintKeypair.publicKey,
      space: 82,
      lamports,
      programId: TOKEN_PROGRAM_ID,
    })
  );

  const signature = await sendTransaction(createAccountTransaction, connection, {
    signers: [mintKeypair],
  });

  const mint = await createMint(
    connection,
    { publicKey, secretKey: mintKeypair.secretKey },
    publicKey,
    publicKey,
    decimals
  );

  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    { publicKey, secretKey: mintKeypair.secretKey },
    mint,
    publicKey
  );

  return { mint, tokenAccount, signature };
}

export async function mintTokens(
  { connection, publicKey, sendTransaction }: TokenOperation,
  mintAddress: string,
  amount: number
) {
  const mintPublicKey = new PublicKey(mintAddress);
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    { publicKey, secretKey: new Uint8Array(64) },
    mintPublicKey,
    publicKey
  );

  const transaction = new Transaction().add(
    createMintToInstruction(
      mintPublicKey,
      tokenAccount.address,
      publicKey,
      amount
    )
  );

  return sendTransaction(transaction, connection);
}

export async function sendTokens(
  { connection, publicKey, sendTransaction }: TokenOperation,
  mintAddress: string,
  recipientAddress: string,
  amount: number
) {
  const mintPublicKey = new PublicKey(mintAddress);
  const recipientPublicKey = new PublicKey(recipientAddress);

  const sourceAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    { publicKey, secretKey: new Uint8Array(64) },
    mintPublicKey,
    publicKey
  );

  const tokenAccount = await getAccount(connection, sourceAccount.address);
  if (tokenAccount.amount < BigInt(amount)) {
    throw new Error('Insufficient token balance');
  }

  const destinationAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    { publicKey, secretKey: new Uint8Array(64) },
    mintPublicKey,
    recipientPublicKey
  );

  const transaction = new Transaction().add(
    createTransferInstruction(
      sourceAccount.address,
      destinationAccount.address,
      publicKey,
      amount
    )
  );

  return sendTransaction(transaction, connection);
}