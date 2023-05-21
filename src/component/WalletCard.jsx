import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { AiFillPlayCircle } from "react-icons/ai";

const WalletCard = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);

    useEffect(() => {
        const checkMetaMask = async () => {
            if (window.ethereum) {
                try {
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    await accountChangedHandler(provider.getSigner());
                } catch (err) {
                    setErrorMessage(err.message);
                }
            } else {
                setErrorMessage("Please Install Metamask!!!");
            }
        };

        checkMetaMask();
    }, []);

    const connectWalletHandler = async () => {
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await accountChangedHandler(provider.getSigner());
        } catch (err) {
            setErrorMessage(err.message);
        }
    };

    const accountChangedHandler = async (newAccount) => {
        try {
            const address = await newAccount.getAddress();
            setDefaultAccount(address);
            const balance = await newAccount.getBalance();
            setUserBalance(ethers.utils.formatEther(balance));
        } catch (err) {
            setErrorMessage(err.message);
        }
    };

    return (
        <div className="WalletCard">
            <button
            
                type="button"
                className={`flex flex-row justify-center items-center bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2952e3] ${defaultAccount ? 'bg-red-400' : 'bg-yellow-400'}`}
                onClick={connectWalletHandler}
            >
                <AiFillPlayCircle className="text-black mr-2" />
                <p className="text-black text-base font-semibold">
                    {defaultAccount ? "Connected!!" : "Connect Wallet"}
                </p>
            </button>

            <div className="displayAccount mx-4 my-2">
                <h4 className="walletAddress text-white text-xl">Address: {defaultAccount}</h4>
                <div className="balanceDisplay text-white text-xl my-auto">
                    <h3>
                        Wallet Amount: {userBalance}
                    </h3>
                </div>
            </div>
            {errorMessage && <div className="text-blue">{errorMessage}</div>}
        </div>
    );
};

export default WalletCard;
