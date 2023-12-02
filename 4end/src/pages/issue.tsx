/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import { useAccount, useSignMessage, useContractRead, usePrepareContractWrite,useContractWrite } from "wagmi";
import {ethers} from 'ethers';
import {
  Box,
  HStack,
  Input,
  InputGroup,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  Textarea,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { verifyMessage } from "ethers/lib/utils";
import { SignMessageArgs } from "@wagmi/core";
import { NextSeo } from "next-seo";
import contractABI from '../../../abi.json';
import {CONTRACT_ADDRESS, CONTRACT_OWNER} from "../configuration/Config";



export default function SignExample() {
  const { address, isConnected } = useAccount();
  console.log(address)

  const { data, isError, isLoading } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: contractABI,
    functionName: 'studentsCount',
  })
  console.log(data.toString())


  const [studentAddress, setStudentAddress] = useState('')
  const [major, setMajor] = useState('')
  const [degreeType, setDegreeType] = useState('')
  const [score, setScore] = useState('')

  // Prepare the transaction
  const { config, error: contractWriteError } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: contractABI,
    functionName: 'createStudent',
    args: [studentAddress, major, degreeType, score ]
  });

  // Get the write function
  const { data: writeData, isLoading: writeLoading, write } = useContractWrite(config);



  if (isConnected) {
    return <div>
      {writeLoading && <p>Please confirm the transaction on your wallet</p>}
      {writeData && <p>The transaction was sent! Here is the hash: {writeData.hash}</p>}
      {!writeLoading && (
        <Box
        rounded={'lg'}
        maxW="450px"
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={3}>
        <Stack spacing={2}>
          <Stack>
            <Box>
              <FormControl id="address" isRequired>
                <FormLabel>Student wallet address</FormLabel>
                <Input type="text" value={studentAddress} onChange={(e) => setStudentAddress(e.target.value)} placeholder='0x...'/>
              </FormControl>
            </Box>
            <Box>
              <FormControl id="major" isRequired>
                <FormLabel>Major</FormLabel>
                <Input type="text" value={major} onChange={(e) => setMajor(e.target.value)} placeholder='Computer Science'/>
              </FormControl>
            </Box>
            <Box>
              <FormControl id="degreeType" isRequired>
                <FormLabel>Degree Type</FormLabel>
                <Input type="text" value={degreeType} onChange={(e) => setDegreeType(e.target.value)} placeholder='Bachelor'/>
              </FormControl>
            </Box>
            <Box>
              <FormControl id="score" isRequired>
                <FormLabel>Score</FormLabel>
                <Input type="number" value={score} onChange={(e) => setScore(e.target.value)}/>
              </FormControl>
            </Box>
          </Stack>
        
        
          <Stack spacing={10} pt={2}>
            <Button
              disabled={!write} onClick={() => write()}
              loadingText="Submitting"
              size="lg"
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}>
              Create Student
            </Button>
          </Stack>
          
        </Stack>
      </Box>
    
      )}
      {contractWriteError && (
        <p>
          Calling that contract function will fail for this reason:
          {contractWriteError.reason ?? contractWriteError.message}
        </p>
      )}
      
    </div>
     
  }

  return <div>Connect your wallet first to sign a message.</div>;
}
