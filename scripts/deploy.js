require('dotenv').config()

const { MAX_SCORE, INITIAL_DEGREE_IMAGE } = process.env

async function main() {
  const UniversityDegreeToken = await ethers.getContractFactory(
    'UniversityDegree'
  )
  const udt_contract = await UniversityDegreeToken.deploy(
    MAX_SCORE,
    INITIAL_DEGREE_IMAGE
  )
  console.log('Contract Deployed to Address:', udt_contract.target)
  const [deployer] = await ethers.getSigners()
  console.log('Deploying contracts with the account:', deployer.address)
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
