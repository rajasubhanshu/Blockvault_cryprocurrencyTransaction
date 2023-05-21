import React, { useState } from 'react';

import { ethers } from 'ethers';
import { AiFillPlayCircle } from "react-icons/ai";
const provider = new ethers.providers.Web3Provider(window.ethereum);
const WalletCard = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    const connectwalletHandler = () => {
        if (window.ethereum) {
            provider.send("eth_requestAccounts", []).then(async () => {
                await accountChangedHandler(provider.getSigner());
            })
        } else {
            setErrorMessage("Please Install Metamask!!!");
        }
    }
    const accountChangedHandler = async (newAccount) => {
        const address = await newAccount.getAddress();
        setDefaultAccount(address);
        const balance = await newAccount.getBalance()
        setUserBalance(ethers.utils.formatEther(balance));
        await getuserBalance(address)
    }
    const getuserBalance = async (address) => {
                const balance = await provider.getBalance(address, "latest")
        setUserBalance(ethers.utils.formatEther(balance));
    }
    return (
        <div className="WalletCard   ">
            <button
                type="button"
                className="flex flex-row justify-center items-center bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2952e3]"
                onClick={connectwalletHandler}
                style={{ background: defaultAccount ? "rgba(255, 13, 13, 0.63) " : "rgba(242, 244, 12, 1) " }}
            >
                <AiFillPlayCircle className="text-black mr-2" />
                <p className="text-Black text-base font-semibold">
                    {defaultAccount ? "Connected!!" : "Connect Wallet"}
                </p>
            </button>
            {/* <button
                style={{ background: defaultAccount ? "#A5CC82" : "white" }}
                onClick={connectwalletHandler}>
                {defaultAccount ? "Connected!!" : "Connect Wallet"}
            </button> */}
            <div className="displayAccount  mx-4 my-2">
                <h4 className="walletAddress text-white text-xl "> Address:{defaultAccount}</h4>
                <div className="balanceDisplay text-white text-xl my-auto">
                    <h3>
                        Wallet Amount: {userBalance}
                    </h3>
                </div>
            </div>
            {errorMessage}
        </div>
        
    )
    
}
export default WalletCard;
