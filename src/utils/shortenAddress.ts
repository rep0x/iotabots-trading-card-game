export const shortenAddress = (address: string): string =>
  `${address.substring(0, 8)}...${address.substring(
    // eslint-disable-next-line
    address.length - 3,
    address.length
  )}`;
