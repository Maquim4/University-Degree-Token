/* eslint-disable react-hooks/rules-of-hooks */
import * as React from 'react'
import {
  useAccount,
  useContractRead
} from 'wagmi'
import { ethers } from 'ethers'
import { Warning, Info } from '../Reusables/helper'
import {
  Box,
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
  Heading,
  Stack
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
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
    setStudents(data as Array<never>)
  }, [data])

  const showHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={'xl'}>Student List</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link href={'/create'}>
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
              <Td>{(item[4] as any).toString()}</Td>
              <Td>
                <Link
                  href={{
                    pathname: '/issue',
                    query: { studentAddress: (item[0] as any).toString() },
                  }}
                >
                  Issue Degree
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
  if (isConnected && address != CONTRACT_OWNER) {
    return <Info />
  }

  if (isConnected && address == CONTRACT_OWNER) {
    return (
      <Box p={4}>
        <Stack spacing={4} as={Container} maxW={'4xl'}>
          {showHeading()}
          {showStudents()}
        </Stack>
      </Box>
    )
  }

  return <Warning />
}
