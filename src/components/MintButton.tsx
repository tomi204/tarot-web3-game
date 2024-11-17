import { NFT_CONTRACT_ADDRESS, NFT_ABI } from "../constants";
import { ethers } from "ethers";
import { Provider } from "@reown/appkit-adapter-ethers";
import { useToast } from "../hooks/use-toast";

export default function MintButton({
  provider,
  onMint,
  baseURI,
  name,
  symbol,
  price,
}: {
  provider: Provider;
  onMint: () => void;
  baseURI: string;
  name: string;
  symbol: string;
  price: number;
}) {
  const { toast } = useToast();
  async function mint() {
    const ethersProvider = new ethers.BrowserProvider(provider);
    const signer = await ethersProvider.getSigner();
    const contract = new ethers.Contract(NFT_CONTRACT_ADDRESS, NFT_ABI, signer);
    const tx = await contract.createNFTContract(baseURI, 1, name, symbol);
    await tx.wait();
    toast({
      title: "Minted",
      description: "Your NFT has been minted",
      variant: "success",
    });
  }

  return (
    <button onClick={mint} className="bg-blue-500 text-white p-2">
      Mint
    </button>
  );
}
