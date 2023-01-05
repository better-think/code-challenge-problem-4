import { ethers } from 'ethers'

const BSCRPC = 'https://bsc-dataseed1.binance.org'
const provider = new ethers.providers.JsonRpcProvider(BSCRPC, { name: 'BNB', chainId: 56 });

const SWTH_ADDRESS = "0xc0ecb8499d8da2771abcbf4091db7f65158f1468"
const SWTH_ABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "account",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
]
const holders = [
    '0xb5d4f343412dc8efb6ff599d790074d0f1e8d430',
    '0x0020c5222a24e4a96b720c06b803fb8d34adc0af',
    '0xd1d8b2aae2ebb2acf013b803bc3c24ca1303a392',
]


const swthContract = new ethers.Contract(SWTH_ADDRESS, SWTH_ABI, provider);

holders.forEach(async (holder) => {
    try {
        const balance = await swthContract.balanceOf(holder);
        const b = ethers.utils.formatUnits(balance, 8)
        console.log('%s  %s', holder, b)
    } catch (error: any ) {
        console.error(error)
        console.log('%s Errir %s', holder, error.toString())
    }
})