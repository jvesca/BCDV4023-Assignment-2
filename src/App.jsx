import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import AvaxLinkFeeds from './artifacts/contracts/PriceFeed.sol/AvaxLinkFeeds.json'
import './App.css'; 

const contractAddress = "0xDb847532476a0b33e63cADE462d99C207AB1a95B";

function App() {
  const [priceFeed, setPriceFeed] = useState();
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [transactionPending, setTransactionPending] = useState(false);
  const [transactionConfirmed, setTransactionConfirmed] = useState(false);

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' })
  }

  async function fetchPriceFeed() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, AvaxLinkFeeds.abi, signer)
      try {
        let data;
        let functionName;
        if (selectedCurrency === "AVAX/USD") {
          data = await contract.getAvaxUsdPrice();
          functionName = "getAvaxUsdPrice";
        } else if (selectedCurrency === "BTC/USD") {
          data = await contract.getBtcUsdPrice();
          functionName = "getBtcUsdPrice";
        } else if (selectedCurrency === "ETH/USD") {
          data = await contract.getEthUsdPrice();
          functionName = "getEthUsdPrice";
        } else if (selectedCurrency === "LINK/USD") {
          data = await contract.getLinkUsdPrice();
          functionName = "getLinkUsdPrice";
        }
        setTransactionPending(true); // Set transaction pending
        setPriceFeed(data);
        console.log('Price Feed: ', data)
        console.log('Contract Address: ', contract.address)

        // Request confirmation from MetaMask
        const transactionResponse = await signer.sendTransaction({
          to: contract.address,
          data: contract.interface.encodeFunctionData(functionName),
        });

        // Listen for confirmation event
        const receipt = await transactionResponse.wait();
        console.log('Transaction receipt:', receipt);

        // Set transactionConfirmed to true after confirmation
        setTransactionConfirmed(true);
        setTransactionPending(false); // Reset transaction pending
      } catch (err) {
        console.log("Error: ", err)
        setTransactionPending(false); 
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await fetchPriceFeed();
  }

  // Reset transactionConfirmed when currency changes
  useEffect(() => {
    setTransactionConfirmed(false);
  }, [selectedCurrency]);

  return (
    <div id="root">
      <div className="card">
        <div className="logo">
        <img src={"https://cryptologos.cc/logos/chainlink-link-logo.png"} alt="Chainlink Logo" className="chainlink-logo1" /> 
          <h1>Avalanche Price Feeds</h1>
        </div>
        <div className="main">
        <div className="straight-line"></div>
          <h3>Conversion Pair</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <input 
                type="radio" 
                id="avaxusd" 
                name="currency" 
                value="AVAX/USD" 
                checked={selectedCurrency === "AVAX/USD"} 
                onChange={() => setSelectedCurrency("AVAX/USD")} 
              />
              <label htmlFor="avaxusd">AVAX/USD</label>
            </div>
            <div>
              <input 
                type="radio" 
                id="btcusd" 
                name="currency" 
                value="BTC/USD" 
                checked={selectedCurrency === "BTC/USD"} 
                onChange={() => setSelectedCurrency("BTC/USD")} 
              />
              <label htmlFor="btcusd">BTC/USD</label>
            </div>
            <div>
              <input 
                type="radio" 
                id="ethusd" 
                name="currency" 
                value="ETH/USD" 
                checked={selectedCurrency === "ETH/USD"} 
                onChange={() => setSelectedCurrency("ETH/USD")} 
              />
              <label htmlFor="ethusd">ETH/USD</label>
            </div>
            <div>
              <input 
                type="radio" 
                id="linkusd" 
                name="currency" 
                value="LINK/USD" 
                checked={selectedCurrency === "LINK/USD"} 
                onChange={() => setSelectedCurrency("LINK/USD")} 
              />
              <label htmlFor="linkusd">LINK/USD</label>
            </div>
            <button type="submit" disabled={!selectedCurrency || transactionPending}>
              {transactionPending ? 'Waiting for Confirmation...' : 'Get Price Feed'}
            </button>
          </form>
          {transactionConfirmed && (
            <div>
              <h4>Price Feed</h4>
              <p>{selectedCurrency} Price -&gt; ${priceFeed && (parseFloat(priceFeed.toString()) / 100000000)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App;
