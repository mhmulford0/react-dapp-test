import dotenv from 'dotenv'
dotenv.config()

import { HardhatUserConfig } from "hardhat/types";
import "@nomiclabs/hardhat-waffle";

const { ACCOUNT_ADDRESS } = process.env;

const config: HardhatUserConfig = {
  solidity: {
    compilers: [{ version: "0.8.4", settings: {} }],
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/e5aa55e375464ff6b7bd71d4b31589d5",
      accounts: [`0x${ACCOUNT_ADDRESS}`]
    }
  }
};
export default config;