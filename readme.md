# **Cryptocurrency Trading Practice App** 
#### Creator: Ronak Trivedi
#### Website URL: https://the-perfect-trader.herokuapp.com/


<br>
<br>

# **Mission**
**Origin:**

Many people who want to learn how to trade cryptocurrencies, but the risk of losing money is too high. I am hoping that using my cryptocurrency-trading simulator will help people gain the necessary skills in order to make profits in the long run.

**Goals:**
1) Help people learn how to trade cryptocurrencies for free
2) Provide cyrptocurrency information tailored to users' needs
3) Collect user data


<br>
<br>

# **Critical Development Tools**
- #### Node.js
- #### SQLite3
- #### CoinGecko API
- #### Heroku
- #### Passport.js
- #### Jest Testing Framework

<br>
<br>

# **Local Useage**
#### **Launch in browser:**
- #### In a terminal, navigate to the crypto_simulator directory from the root directory of the project.
- #### Run the command:  `npm start` 
- #### In a web browser, visit:  `localhost:4000`


#### **Run test cases:**
- #### In a terminal, navigate to the crypto_simulator directory from the root directory of the project.
- #### Run the command:  `npm test` 
- #### Observe testing results in the console.

<br>
<br>

# **API Interaction**
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20ethereum%2C%20cardano%2C%20ripple%2C%20solana&order=market_cap_desc&per_page=100&page=1&sparkline=false").then(function(response)
    {
        let btcp = response.data[0].current_price;
        let btcm = response.data[0].market_cap;
        let ethp = response.data[1].current_price;
        let ethm = response.data[1].market_cap;
        let solp = response.data[2].current_price;
        let solm = response.data[2].market_cap;
        let adap = response.data[3].current_price;
        let adam = response.data[3].market_cap;
        let xrpp = response.data[4].current_price;
        let xrpm = response.data[4].market_cap;
    }
<br>
<br>

# **Entity-Relation Diagram of Database**
![image info](./design_documents/erd.jpg)

<br>
<br>



