import { ThemingProps } from '@chakra-ui/react'
import { mainnet, goerli, sepolia } from '@wagmi/chains'

export const SITE_NAME = 'University Degree Token'
export const SITE_DESCRIPTION = 'University Degree Soulbound Token'
export const SITE_URL = 'https://university-degree-token.vercel.app/'

export const THEME_INITIAL_COLOR = 'system'
export const THEME_COLOR_SCHEME: ThemingProps['colorScheme'] = 'gray'
export const THEME_CONFIG = { initialColorMode: THEME_INITIAL_COLOR }


export const SOCIAL_GITHUB = 'Maquim4'

export const INFURA_KEY = 'e6266a15cef44ba390bf89af03602e4e'
export const NETWORKS = [mainnet, goerli, sepolia]

export const CONTRACT_ADDRESS = '0x3283e92cC8CED984811FCaC30F47DdA77a92B8Cd'
export const CONTRACT_OWNER = '0x2C9B7E72376D2d01faBd9df8cb613e4b23BC13A6'