import { useState, useEffect } from "react";
import { ethers } from "ethers";

import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";

const greeterAddress = "0xe1dA78c984E567f934D54d7fE5f335352F494370";

function App() {
  const [greeting, setGreetingValue] = useState("");
  const [initialGreeting, setInitialGreeting] = useState("")
  const [address, setAddress] = useState("");
  const [pending, setPending] = useState(false);
  const [txInfo, setTxInfo] = useState({
    transactionHash: null,
  });

  useEffect(() => {
    fetchGreeting();
  }, []);

  const requestAccount = async () => {
    try {
      setAddress(
        await window.ethereum.request({ method: "eth_requestAccounts" })
      );
    } catch (error) {
      console.log(error)
    }

  };

  const fetchGreeting = async () => {
    if (typeof window.ethereum === undefined) return;

    // provider for ethers is metamask
    
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // contract to interact with, requires: contract address, ABI, and provider
    const contract = new ethers.Contract(greeterAddress, Greeter.abi, provider);

    try {
      const data = await contract.greet();
      setGreetingValue(data)
      setInitialGreeting(data)
      console.log("Contract Returned: ", data);
    } catch (error) {
      console.log(error);
    }
  };

  const setGreeting = async () => {
    if (!greeting) return;
    if (typeof window.ethereum === undefined) return;
    try {
      await requestAccount();
      setPending(true);
      setTxInfo({transactionHash: null})
       // get metamask wallet address
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(greeting);
      setTxInfo(await transaction.wait());
      fetchGreeting();
      setPending(false);
    } catch (error) {
      console.log(error)
    }
   

  };

  return (
    <div
      className="App"
      style={{
        display: "flex",
        flexFlow: "column wrap",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "5rem"
      }}
    >
      <header className="App-header"><h2 style={{marginBottom: "40px"}}>BIG DApp</h2></header>
      <h2>Current Greeting: {initialGreeting} </h2>
      <p>
     
      </p>
      <p>
        <input
          type="text"
          name="greeting"
          onChange={(e) => setGreetingValue(e.target.value)}
          placeholder="Enter Greeting"
        />
        <button onClick={setGreeting}>Set Greeting</button>
        
      </p>
      <p>Your Address: {address} </p>
      {pending ? <p>Transaction Pending...</p> : ""}
      {txInfo.transactionHash !== null ? (
        <p>
          View your transaction here:{" "}
          <a href={`https://ropsten.etherscan.io/tx/${txInfo.transactionHash}`}>
            Transaction Info
          </a>
        </p>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
