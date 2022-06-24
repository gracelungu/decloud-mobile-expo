import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import authAtom from "../store/atoms/auth";

const useLogin = () => {
  const [, setAuth] = useAtom(authAtom);
  const [accounts, setAccounts] = useState<any[]>();
  const connector = useWalletConnect();

  useEffect(() => {
    const value = connector.chainId;
    console.log({ value });
  }, [connector]);

  const connectWallet = useCallback(() => {
    return connector.connect();
  }, [connector]);

  const killSession = useCallback(() => {
    setAuth({
      connected: false,
      accounts: [],
    });
    return connector.killSession();
  }, [connector]);

  useEffect(() => {
    setAccounts(connector.accounts || []);
    console.log(" === Connected wallets ==== ", connector.accounts);
  }, [connector]);

  useEffect(() => {
    if (accounts && accounts.length > 0) {
      setAuth({
        connected: true,
        accounts,
      });
    }
  }, [connector]);

  return { accounts, connectWallet, killSession };
};

export default useLogin;
