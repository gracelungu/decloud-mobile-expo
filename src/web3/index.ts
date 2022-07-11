import { ethers, providers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { cloudContractAddress, networks } from "../../contract";
import { cloudABI } from "../../contract/abi";

export const getProvider = async (connector: any) => {
  const provider = new WalletConnectProvider({
    ...networks.ropsten,
    connector,
    qrcode: false,
  });

  await provider.enable();
  return new providers.Web3Provider(provider);
};

export const getContract = async (connector: any) => {
  const web3Provider = await getProvider(connector);
  return new ethers.Contract(cloudContractAddress, cloudABI, web3Provider);
};
