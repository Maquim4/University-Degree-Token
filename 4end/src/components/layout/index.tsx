import React, { ReactNode } from 'react'
import { Box, Container, useColorModeValue } from '@chakra-ui/react'
import { Header } from './Header'
import { Footer } from './Footer'
import { Head } from './Head'
interface Props {
  children: ReactNode
}

export function Layout(props: Props) {
  return (
    <>
      <Head />
      <Box margin="0 auto" minH="100vh">
        <Header />
        <Container maxW="4xl" width="100%">
          {props.children}
        </Container>
        <Footer />
      </Box>
    </>
  )
}
