# Magic Frames

A frame that creates frames that executes onchain actions.

- 36h hackathon
- pause ethical dilemas, lol

Partners: https://ethglobal.com/events/frameworks/prizes


Ideas dump:

3 ways to mint
1. frame txns
2. proxy contract outside warpcast
3. proxy contract inside warpcast, paying with warps


🧙‍♂️ wizards create spells that people casts 🪄


# example.com/wizard/
1. enter url to prop
2. ???


# example.com/spell/123
this is a Frame to vote + reason on DAO X

- text input for reason
- 3 buttons: yes, no, abstain


# Partners we're aiming for
- Base
- Pinata (use analytics, use Frame API)
- frames.js 
- Bountycaster - Build something cool with Scaffoldeth.io this week. Tudor used it to build the onchain contract.

# Scaffold ETH

## Getting Started

1. `cd scaffold-eth-2`
2. `nvm use 20` (optional if your default version of node is >18)
3. in one terminal: `yarn chain` to open the local blockchain
4. in another terminal `yarn start --port=3999` to not clash with frames.js
5. in a 3rd terminal: `yarn deploy` to deploy the contract
6. open `localhost:3999` in your browser


# FAQ

## 1. What if storing on the blockchain takes more than the Frame timeout (5s)?
Although Base should have a 2s block time (source: https://base.blockscout.com/stats), it might take longer depending on congestion and gas. If that is the case, ask the user to wait and refresh the Frame later. Some state for the pending txn needs to be stored somewhere though. Exact details TBD.

# TODO:
what is left:
-[x] pass state of the summary
-[x] store Spell to onchain
-[x] read Spell from onchain
-[] record demo video
-[] complete submission form

