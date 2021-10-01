import { HardhatUserConfig } from "hardhat/types";
import "@nomiclabs/hardhat-waffle";
const config: HardhatUserConfig = {
  solidity: {
    compilers: [{ version: "0.8.4", settings: {} }],
  },
};
export default config;