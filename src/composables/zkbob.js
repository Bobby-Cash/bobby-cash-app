export default function useZkbobHelpers() {
  function getProductionPools() {
    return {
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
        }
      },
      "chains": {
        "137": {
          "rpcUrls": ["https://rpc.ankr.com/polygon"]
        },
        "10": {
          "rpcUrls": ["https://rpc.ankr.com/optimism", "https://mainnet.optimism.io"]
        }
      },
      "snarkParams": {
        "transferParamsUrl": "https://r2.zkbob.com/transfer_params_22022023.bin",
        "transferVkUrl": "https://r2.zkbob.com/transfer_verification_key_22022023.json"
      }
    }
  }

  return {
    getProductionPools
  }
}