import React, { ReactNode } from 'react'
import {
  Image,
  chakra,
  Box,
  Heading,
  Stack,
  HStack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react'
import { WarningTwoIcon, InfoIcon } from '@chakra-ui/icons'

export const Logo = (props: any) => {
  return (
    <HStack>
      <>
        <Image
          width={8}
          height={8}
          alt={'Login Image'}
          objectFit={'cover'}
          src={'/logo2.png'}
        />
        <Text as="abbr">UDSBT</Text>
      </>
    </HStack>
  )
}

export const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode
  label: string
  href: string
}) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      target={'_blank'}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

export function Warning() {
  return (
    <Box textAlign="center" py={10} px={6}>
      <WarningTwoIcon boxSize={'50px'} color={'orange.300'} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Connect your wallet first
      </Heading>
    </Box>
  )
}

export function Info() {
  return (
    <Stack spacing={4} align={'center'} maxW={'4xl'}>
      <Box textAlign="center" py={10} px={6}>
        <InfoIcon boxSize={'50px'} color={'blue.500'} />
        <Heading as="h2" size="xl" mt={6} mb={2}>
          This page only for contract owner
        </Heading>
        <Text color={'gray.500'}>Go to Home Or Claim Degree!</Text>
      </Box>
    </Stack>
  )
}
