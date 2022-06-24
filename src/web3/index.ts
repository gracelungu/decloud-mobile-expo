import { ethers, providers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { cloudContractAddress, networks } from "../../contract";
import { cloudABI } from "../../contract/abi";

export const getContract = async (connector: any) => {
  const provider = new WalletConnectProvider({
    ...networks.ropsten,
    connector,
    qrcode: false,
  });

  await provider.enable();
  const web3Provider = new providers.Web3Provider(provider);
  return new ethers.Contract(cloudContractAddress, cloudABI, web3Provider);
};
