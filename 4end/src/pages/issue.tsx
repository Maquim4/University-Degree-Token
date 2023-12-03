/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react'
import {
  useAccount,
  useSignMessage,
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
} from 'wagmi'
import { useClipboard } from '@chakra-ui/react'
import { LinkComponent } from '../components/LinkComponent'
import axios from 'axios'
import { ethers } from 'ethers'
import {
  Box,
  HStack,
  Input,
  InputGroup,
  Button,
  Container,
  Flex,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Link,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import contractABI from '../../../abi.json'
import { CONTRACT_ADDRESS, CONTRACT_OWNER } from '../configuration/Config'

interface Props {
  className?: string
}

export default function IssueDegree(props: Props) {
  const router = useRouter()
  const { address, isConnected } = useAccount()
  const { studentAddress } = router.query

  const [fileImg, setFileImg] = useState(null)
  const { onCopy, value, setValue, hasCopied } = useClipboard('')
  const sendFileToIPFS = async (e) => {
    e.preventDefault()
    if (fileImg) {
      try {
        const formData = new FormData()
        formData.append('file', fileImg)

        const resFile = await axios({
          method: 'post',
          url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
          data: formData,
          headers: {
            pinata_api_key: '63540acb2f8baa67d949',
            pinata_secret_api_key:
              '9aebd0b625690935a2cf6c6ab4eb4617f35941f4e10595008d775e2ecdd083d1',
            'Content-Type': 'multipart/form-data',
          },
        })

        const ImgHash = `https://indigo-acceptable-smelt-520.mypinata.cloud/ipfs/${resFile.data.IpfsHash}`
        setValue(ImgHash)
        console.log(ImgHash)
      } catch (error) {
        console.log('Error sending File to IPFS: ')
        console.log(error)
      }
    }
  }

  // Prepare the transaction
  const { config, error: contractWriteError } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: contractABI,
    functionName: 'issueDegree',
    args: [studentAddress, value],
  })

  // Get the write function
  const {
    data: writeData,
    isLoading: writeLoading,
    write,
  } = useContractWrite(config)

  if (isConnected) {
    return (
      <Container>
        {studentAddress}
        <form onSubmit={sendFileToIPFS}>
          <input
            type="file"
            onChange={(e) => setFileImg(e.target.files[0])}
            required
          />
          <Button type="submit">Send to IPFS</Button>
          <LinkComponent href={value}>
            {value}
          </LinkComponent>
          <Button onClick={onCopy}>{hasCopied ? 'Copied!' : 'Copy'}</Button>
        </form>
        <Stack spacing={10} pt={2}>
                <Button
                  disabled={!write}
                  onClick={() => write()}
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Issue Degree
                </Button>
              </Stack>
      </Container>
    )
  }

  return <div>Connect your wallet first to sign a message.</div>
}
