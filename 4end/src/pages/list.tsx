/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react'
import {
  useAccount,
  useSignMessage,
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
} from 'wagmi'
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
  FormControl,
  FormLabel,
  Heading,
  Stack,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import Link from "next/link";
import contractABI from '../../../abi.json'
import { CONTRACT_ADDRESS, CONTRACT_OWNER } from '../configuration/Config'

export default function StudentsList() {
  const { address, isConnected } = useAccount()
  console.log(address)

  const { data, isError, isLoading } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: contractABI,
    functionName: 'getStudents',
  })

  console.log(data)

  const [students, setStudents] = useState([])

  useEffect(() => {
    setStudents(data)
  }, [])

  const showHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={'xl'}>Student List</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link ml={2} href={'/create'}>
          <Button colorScheme={'blue'}>Add Student</Button>
        </Link>
      </Box>
    </Flex>
  )

  const showStudents = () => (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Full Name</Th>
            <Th>Major</Th>
            <Th>Degree Type</Th>
            <Th>Score</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {students?.map((item, i) => (
            <Tr key={i}>
              <Td>{i + 1}</Td>
              <Td>{item[1]}</Td>
              <Td>{item[2]}</Td>
              <Td>{item[3]}</Td>
              <Td>{item[4].toString()}</Td>
              <Td>
                <Link href={{ pathname: '/issue', query: { studentAddress: item[0].toString() } }} mr={2}>Issue Degree</Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )

  if (isConnected) {
    return (
      <Box p={4}>
        <Stack spacing={4} as={Container} maxW={'4xl'}>
          {showHeading()}
          {showStudents()}
        </Stack>
      </Box>
    )
  }

  return <div>Connect your wallet first to sign a message.</div>
}
