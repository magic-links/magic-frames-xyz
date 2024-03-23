
export const daoProposalABI = [
    {
        "name": "Empty",
        "type": "error",
        "inputs":
        []
    },
    {
        "name": "castVote",
        "type": "function",
        "inputs":
        [
            {
                "name": "proposalId",
                "type": "uint256",
                "internalType": "uint256"
            },
            {
                "name": "support",
                "type": "uint8",
                "internalType": "uint8"
            }
        ],
        "outputs":
        [
            {
                "name": "",
                "type": "uint256",
                "internalType": "uint256"
            }
        ],
        "stateMutability": "nonpayable"
    }
]