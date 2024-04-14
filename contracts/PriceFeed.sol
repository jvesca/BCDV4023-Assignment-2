// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract AvaxLinkFeeds {

    AggregatorV3Interface internal avaxUsdFeed;
    AggregatorV3Interface internal btcUsdFeed;
    AggregatorV3Interface internal ethUsdFeed;
    AggregatorV3Interface internal linkUsdFeed;

    /**
     * Network: Fuji
     * Aggregator: AVAX/USD
     * Address: 0x5498BB86BC934c8D34FDA08E81D444153d0D06aD
     * URL: https://docs.chain.link/docs/avalanche-price-feeds/
     */
    constructor() {
        avaxUsdFeed = AggregatorV3Interface(0x5498BB86BC934c8D34FDA08E81D444153d0D06aD);
        
        // BTC/USD
        btcUsdFeed = AggregatorV3Interface(0x31CF013A08c6Ac228C94551d535d5BAfE19c602a);
        
        // ETH/USD
        ethUsdFeed = AggregatorV3Interface(0x86d67c3D38D2bCeE722E601025C25a575021c6EA);
        
        // LINK/USD
        linkUsdFeed = AggregatorV3Interface(0x34C4c526902d88a3Aa98DB8a9b802603EB1E3470);
    }

    /**
     * Returns the latest price for AVAX/USD
     */
    function getAvaxUsdPrice() public view returns (int) {
        (
            uint80 roundID, 
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = avaxUsdFeed.latestRoundData();
        return price;
    }
    
    /**
     * Returns the latest price for BTC/USD
     */
    function getBtcUsdPrice() public view returns (int) {
        (
            uint80 roundID, 
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = btcUsdFeed.latestRoundData();
        return price;
    }
    
    /**
     * Returns the latest price for ETH/USD
     */
    function getEthUsdPrice() public view returns (int) {
        (
            uint80 roundID, 
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = ethUsdFeed.latestRoundData();
        return price;
    }
    
    /**
     * Returns the latest price for LINK/USD
     */
    function getLinkUsdPrice() public view returns (int) {
        (
            uint80 roundID, 
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = linkUsdFeed.latestRoundData();
        return price;
    }
}
