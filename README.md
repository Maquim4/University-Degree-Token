# University Degree Token 

To run it locally copy example.env to .env and set all variables.
After that open terminal and try running some of the following tasks:

```shell
npx hardhat compile
npx hardhat run scripts/deploy.js --network sepolia
```

Go to `artifacts\contracts\UniversityDegreeToken.sol\UniversityDegree.json` and copy abi to abi.json, save it in project directory.


```shell
cd 4end
```
Open `4end\src\configuration\Config.ts` and put into *CONTRACT_ADDRESS* and *CONTRACT_OWNER* addresses from deploy command.

Finally 

```shell
npm i
npm run dev
```
