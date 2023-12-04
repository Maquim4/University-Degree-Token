/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react'
import {
  useAccount,
  useContractRead,
  usePrepareContractWrite,
  useWaitForTransaction,
  useContractWrite,
} from 'wagmi'
import {
  Box,
  Input,
  Button,
  Container,
  Flex,
  Text,
  Heading,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import contractABI from '../../../abi.json'
import { CONTRACT_ADDRESS, CONTRACT_OWNER } from '../configuration/Config'
import { Warning } from '../Reusables/helper'

interface Props {
  studentAddress: string;
}

function Issue(props: Props) {
  const { data: issueData} = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: contractABI,
    functionName: 'isStudentDegreeIssued',
    args: [props.studentAddress],
  })

  // Prepare the transaction
  const { config, error: contractWriteError } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: contractABI,
    functionName: 'claimDegree',
  })

  // Get the write function
  const {
    data: writeData,
    write
  } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: writeData?.hash,
  })

  if (issueData) {
    return (
      <Container>
        <Stack spacing={10} pt={2}>
          <Text as="kbd">Your degree is issued!</Text>
          <Button
            disabled={!write}
            onClick={() => write?.()}
            loadingText="Submitting"
            size="lg"
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
          >
            {isLoading ? 'Minting...' : 'Claim'}
          </Button>
          {isSuccess && (
            <div>
              Successfully minted your NFT!
              <div>
                <a href={`https://sepolia.etherscan.io/tx/${writeData?.hash}`}>Etherscan</a>
              </div>
            </div>
          )}
        </Stack>
      </Container>
    )
  }
  return (
    <>
      <Text as="kbd">Your degree is not issued!</Text>
    </>
  )
}

export default function ClaimDegree() {
  const { address, isConnected } = useAccount()
  const [studentAddress, setStudentAddress] = useState('')
  const [check, setCheck] = useState(false)

  if (isConnected) {
    return (
      <Container>
        <Flex
          align="center"
          justify="center"
          bg={useColorModeValue('white', 'gray.700')}
          borderRadius="md"
          color={useColorModeValue('gray.700', 'whiteAlpha.900')}
          shadow="base"
        >
          <Box
            textAlign="center"
            alignContent={'center'}
            borderRadius="lg"
            p={{ base: 5, lg: 16 }}
            bgSize={'lg'}
            maxH={'80vh'}
          >
            <Container
              maxW={'3xl'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Stack as={Box} textAlign={'center'}>
                <div>
                  <Heading as="h2" fontSize="2xl" my={4}>
                    Find out if your degree is issued
                  </Heading>
                  <Input
                    type="text"
                    value={studentAddress}
                    onChange={(e) => setStudentAddress(e.target.value)}
                    placeholder="0x..."
                  />
                  <Stack spacing={10} pt={2}>
                    <Button onClick={() => setCheck(!check)}>
                      {check ? 'Try again' : 'Check'}
                    </Button>
                    {check && <Issue studentAddress={studentAddress} />}
                  </Stack>
                </div>
              </Stack>
            </Container>
          </Box>
        </Flex>
      </Container>
    )
  }

  return <Warning/>
}
