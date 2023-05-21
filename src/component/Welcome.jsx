import { useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { ethers } from "ethers";
import ErrorMessage from "./ErrorMessage";
import TxList from "./TxList";
import { Loader } from ".";
import WalletCard from "./WalletCard";

const commonStyle = '';

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const startPayment = async ({ setError, setTxs, ether, addr }) => {
  try {
    if (!window.ethereum)
      throw new Error("No crypto wallet found. Please install it.");

    await window.ethereum.send("eth_requestAccounts");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    ethers.utils.getAddress(addr);
    const tx = await signer.sendTransaction({
      to: addr,
      value: ethers.utils.parseEther(ether)
    });
    console.log({ ether, addr });
    console.log("tx", tx);
    setTxs([tx]);
  } catch (err) {
    setError(err.message);
  }
};
// const startPayment = async ({ setError, setTxs, ether, addr }) => {
//   try {
//     if (!window.ethereum)
//       throw new Error("No crypto wallet found. Please install it.");

//     await window.ethereum.sendAsync({ method: "eth_requestAccounts" });
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const signer = provider.getSigner();
//     ethers.utils.getAddress(addr);
//     const tx = await signer.sendTransaction({
//       to: addr,
//       value: ethers.utils.parseEther(ether)
//     });
//     console.log({ ether, addr });
//     console.log("tx", tx);
//     setTxs([tx]);
//   } catch (err) {
//     setError(err.message);
//   }
// };


function Welcome() {
  const [error, setError] = useState('');
  const [txs, setTxs] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    setError();
    await startPayment({
      setError,
      setTxs,
      ether: data.get("ether"),
      addr: data.get("addr")
    });
  };
  return (
    <div className="welcomeScreen1  flex    justify-center items-center">
      <div className=" welcomeScreen2 flex flex-wrap flex-1 mf:flex-row  items-start justify-around md:p-20 py-12 px-4 mx-10 ">
        
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">  
          <h1 className=" headingScreen text-3xl sm:text-5xl text-start text-white  py-2">
              Send Crypto <br /> <span>across the world</span>  
          </h1>
        </div>

        <div>

        <WalletCard/>
        
        <div className="  form1 p-5  w-full min-h-40 flex flex-col   justify-start items-center blue-glassmorphism">
      
          <form  className=" " onSubmit={handleSubmit}>
            <input placeholder="Address To" name="addr" type="text" className=" my-2 text-white " handleChange={() => { }} />
            <input placeholder="Amount (ETH)" name="ether" type="number"  className="text-white "  handleChange={() => { }} />
            {/* {error && <div className="text-red-500 my-2">{error}</div>} */}
            <button
              type="submit"
              className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
            >
              Pay
            </button>
            <ErrorMessage message={error}  />
            <TxList txs={txs} />
          </form>
        </div>
        </div>
      </div>
    </div>
  );
}
export default Welcome;