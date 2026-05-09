// This script can be used to deploy the "Ballot" contract using ethers.js library.
// Please make sure to compile "./contracts/3_Ballot.sol" file before running this script.
// And use Right click -> "Run" from context menu of the file to run the script. Shortcut: Ctrl+Shift+S

import { deploy } from './ethers-lib'

(async () => {
  try {
    const proposalNames = [
      '0x63616e6469646174653100000000000000000000000000000000000000000000',
      '0x63616e6469646174653200000000000000000000000000000000000000000000'
    ]

    const result = await deploy('Ballot', [proposalNames])
    console.log(`address: ${result.address}`)
  } catch (e) {
    console.log(e.message || e)
  }
})()
