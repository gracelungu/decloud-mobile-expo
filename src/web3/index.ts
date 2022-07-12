import { ethers, providers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { cloudContractAddress, networks } from "../../contract";
import { cloudABI, cloudAddressABI } from "../../contract/abi";

export const getProvider = async (connector: any) => {
  const provider = new WalletConnectProvider({
    ...networks.ropsten,
    connector,
    qrcode: false,
  });

  await provider.enable();
  return new providers.Web3Provider(provider);
};

export const getContract = async (connector: any, cloudAddress?: string) => {
  const web3Provider = await getProvider(connector);

  if (cloudAddress) {
    return new ethers.Contract(cloudAddress, cloudAddressABI, web3Provider);
  }

  return new ethers.Contract(cloudContractAddress, cloudABI, web3Provider);
};

export const loadContract = async (
  connector: any,
  privateCloudAddress?: any
) => {
  const contract = await getContract(connector, privateCloudAddress);
  return contract;
};

export const getContractWithSigner = async (connector: any, contract: any) => {
  const provider = await getProvider(connector);
  const signer = provider.getSigner();
  const contractWithSigner = contract.connect(signer);
  return contractWithSigner;
};
