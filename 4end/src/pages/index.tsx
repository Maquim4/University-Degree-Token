import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { ReactElement } from 'react'
import { Box, SimpleGrid, Icon, Text, Stack, Flex, Container, Heading } from '@chakra-ui/react'
import { FcAssistant, FcDonate, FcInTransit, FcGenealogy, FcGlobe, FcDiploma1   } from 'react-icons/fc'

interface FeatureProps {
  title: string
  text: string
  icon: ReactElement
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <Stack align={'center'}>
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'gray.100'}
        mb={1}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={'gray.600'}>{text}</Text>
    </Stack>
  )
}

const Home: NextPage = () => {
  return (
    <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 20 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Verifying your degree <br />
            <Text as={'span'} color={'green.400'}>
              is easier now
            </Text>
          </Heading>
          <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature
          icon={<Icon as={FcGenealogy} w={10} h={10} />}
          title={'Reliability'}
          text={
            'By tokenizing the degrees, the university created a secure, verifiable, and easily shareable record of graduates’ achievements'
          }
        />
        <Feature
          icon={<Icon as={FcGlobe} w={10} h={10} />}
          title={'Worldwide access'}
          text={
            'Your documents will be easy to store and take with you anywhere, and it will be faster for agencies to verify their authenticity'
          }
        />
        <Feature
          icon={<Icon as={FcDiploma1} w={10} h={10} />}
          title={'Decentralization'}
          text={
            'Once it is on the blockchain it becomes a decentralized digital asset. No centralized authority can amend or take ownership of the token'
          }
        />
      </SimpleGrid>
    </Box>
          </Stack>
          </Container>
  );
};

export default Home;
