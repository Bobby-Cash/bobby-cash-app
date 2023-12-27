export default function useStorageFlags() {
  function getMnemonicFlag() {
    return "BobMnemonic";
  }

  function getSessionIdFlag() {
    return "BobSessionId";
  }

  function getSkipInstallFlag() {
    return "SkipInstall";
  }

  function getSpendingKeyFlag() {
    return "BobSpendingKey";
  }

  return {
    getMnemonicFlag,
    getSessionIdFlag,
    getSkipInstallFlag,
    getSpendingKeyFlag
  }
}