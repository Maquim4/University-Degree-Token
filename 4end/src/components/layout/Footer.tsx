import React from 'react'
import {
  Box,
  Container,
  Link,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'
import { FaGithub } from 'react-icons/fa'
import { SITE_DESCRIPTION, SOCIAL_GITHUB } from '../../configuration/Config'
import { NetworkStatus } from '../NetworkStatus'
import { Logo, SocialButton } from '../../Reusables/helper'

interface Props {
  className?: string
}

export function Footer(props: Props) {
  const className = props.className ?? ''
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      pos="fixed"
      w="full"
      borderTop="1px"
      borderTopWidth="small"
      borderTopStyle="solid"
      borderTopColor="white"
      bottom={0}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={3}
        direction={{ base: 'column', md: 'row' }}
        spacing={1}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text as="samp">{SITE_DESCRIPTION}</Text>

        <SocialButton
          label={'Github'}
          href={`https://github.com/${SOCIAL_GITHUB}`}
        >
          <FaGithub />
        </SocialButton>
      </Container>
      <Box position="absolute" bottom={2} right={2}>
        <NetworkStatus />
      </Box>
    </Box>
  )
}
