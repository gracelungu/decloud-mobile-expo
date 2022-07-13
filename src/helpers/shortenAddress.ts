// a function to shorten an eth address
export const shortenAddress = (address: string): string => {
  if (!address) return "";
  return address.slice(0, 6) + "..." + address.slice(-4);
};

export default shortenAddress;
