export const REOWN_PROJECT_ID = import.meta.env.VITE_REOWN_PROJECT_ID;
export const NFT_CONTRACT_ADDRESS =
  "0x7F231F4ED10Dcb125177eAb6fd768231c0896cAB";

export const NFT_ABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "initialBaseURI",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "initialPrice",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
    ],
    name: "createNFTContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

if (!REOWN_PROJECT_ID) {
  throw new Error("REOWN_PROJECT_ID is not set");
}
