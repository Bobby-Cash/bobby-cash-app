import { ZkBobClient, deriveSpendingKeyZkBob } from 'zkbob-client-js';
import useStorageFlags from './storageFlags';

const { getSessionIdFlag } = useStorageFlags();

let bobClient;

export default function useZkbobHelpers() {

  function deriveSpendingKey(mnemonic) {
    return deriveSpendingKeyZkBob(mnemonic);
  }

  function getClient() {
    return bobClient;
  }

  async function initClient() {
    let sessionId = window.localStorage.getItem(getSessionIdFlag());

    if (!sessionId) {
      sessionId = crypto.randomUUID();
      window.localStorage.setItem(getSessionIdFlag(), sessionId);
    }

    const clientConfig = {
      "pools": {
        "USDC-polygon": {
          "chainId": 137,
          "poolAddress": "0x72e6B59D4a90ab232e55D4BB7ed2dD17494D62fB",
          "tokenAddress": "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
          "relayerUrls": ["https://relayer-mvp.zkbob.com"],
          "delegatedProverUrls": ["https://remoteprover-mvp.zkbob.com/"],
          "feeDecimals": 2,
          "depositScheme": "usdc-polygon",
          "ddSubgraph": "zkbob-usdc-polygon"
        },
        "USDC-optimism": {
          "chainId": 10,
          "poolAddress": "0x1CA8C2B9B20E18e86d5b9a72370fC6c91814c97C",
          "tokenAddress": "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
          "relayerUrls": ["https://relayer-optimism.zkbob.com"],
          "delegatedProverUrls": ["https://remoteprover-mvp.zkbob.com/"],
          "feeDecimals": 2,
          "depositScheme": "usdc-optimism",
          "ddSubgraph": "zkbob-usdc-optimism"
        }
      },
      "chains": {
        "10": {
          "rpcUrls": ["https://rpc.ankr.com/optimism", "https://mainnet.optimism.io"]
        },
        "137": {
          "rpcUrls": ["https://rpc.ankr.com/polygon"]
        }
      },
      "snarkParams": {
        "transferParamsUrl": "https://r2.zkbob.com/transfer_params_22022023.bin",
        "transferVkUrl": "https://r2.zkbob.com/transfer_verification_key_22022023.json"
      },
      "supportId": sessionId,
      "forcedMultithreading": undefined
    }

    bobClient = await ZkBobClient.create(clientConfig, 'USDC-polygon');

    return bobClient;
  }

  return {
    deriveSpendingKey,
    getClient,
    initClient
  }
}