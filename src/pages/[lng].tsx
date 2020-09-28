import React from 'react'
import Head from 'next/head'
import {
  AspectRatioBox,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Heading,
  Image,
  List,
  ListItem,
  Stack,
  Text
} from '@chakra-ui/core'
import { TopTemplate } from '~/components/templates/TopTemplate'
import { Strong } from '~/components/atoms/Strong'
import NextLink from 'next/link'
import { FaGithub } from 'react-icons/fa'
import { ExternalLink } from '~/components/molecules/ExternalLink'
import { languages, defaultLanguage, useI18n } from '~/hooks/i18n'
import { GetStaticPaths, GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: { lng: params?.lng }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: languages
      .filter((l) => l !== defaultLanguage)
      .map((l) => ({ params: { lng: l } })),
    fallback: false
  }
}

const Home: React.FC = () => {
  const { t } = useI18n()

  return (
    <div>
      <Head>
        <title>Serverless Headless CMS powered by Firebase</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <TopTemplate>
        <Box py={[0, '80px']}>
          <Stack alignItems="center">
            <Flex
              flexDirection={['column', 'row']}
              alignItems="center"
              justifyContent="center"
              w="100%"
            >
              <Text fontSize={['3xl', '3xl', '40px']} fontWeight="bold">
                <Strong>Less</Strong> is more.
                <br />
                {t('topLead0', (t: string) => (
                  <Strong>{t}</Strong>
                ))}
                <br />
                {t('topLead1', (t: string) => (
                  <Strong>{t}</Strong>
                ))}
              </Text>
              <AspectRatioBox
                ml={[0, 8]}
                mt={[6, 0]}
                maxW={480}
                ratio={480 / 290}
                flex={1}
                borderRadius={4}
              >
                <Image
                  boxShadow="sm"
                  borderWidth={1}
                  objectFit="cover"
                  src="https://user-images.githubusercontent.com/623449/94364347-87372580-0103-11eb-80fd-341231ebe19c.gif"
                />
              </AspectRatioBox>
            </Flex>
            <Flex direction="row" marginTop={10}>
              <NextLink href="/admin" passHref>
                <Button size="lg" variantColor="cyan" as="a">
                  {t('demo')}
                </Button>
              </NextLink>
              <Button
                ml={6}
                as="a"
                size="lg"
                {...{
                  href: 'https://github.com/yamitzky/serverless-headless-cms',
                  target: '_blank'
                }}
              >
                <Box as={FaGithub} mr={2} />
                GitHub
              </Button>
            </Flex>
          </Stack>
          <Divider my={[10, 20]} />
          <Stack alignItems="center" spacing={8}>
            <Heading color="cyan.600">Concept</Heading>
            <Grid
              templateColumns={['repeat(1, 1fr)', 'repeat(3, 1fr)']}
              gap={10}
              maxW={960}
            >
              <Stack minW="280px">
                <Heading as="h3" size="lg" color="cyan.800">
                  Serverless
                </Heading>
                <Text>{t('topConceptServerlessMessage')}</Text>
              </Stack>
              <Stack minW="280px">
                <Heading as="h3" size="lg" color="cyan.800">
                  Customizable
                </Heading>
                <Text>{t('topConceptCustomizableMessage')}</Text>
              </Stack>
              <Stack minW="280px">
                <Heading as="h3" size="lg" color="cyan.800">
                  i18n
                </Heading>
                <Text>{t('topConceptI18nMessage')}</Text>
              </Stack>
            </Grid>
          </Stack>
          <Divider my={[10, 20]} />
          <Stack alignItems="center" spacing={8}>
            <Heading color="cyan.600">Roadmap</Heading>
            <Text>
              {t(
                'topRoadmapMessage',
                <ExternalLink href="https://github.com/yamitzky/serverless-headless-cms/projects/2">
                  GitHub
                </ExternalLink>
              )}
            </Text>
            <List fontWeight="bold" styleType="disc">
              <ListItem>Plugin system(In progress)</ListItem>
              <ListItem>AWS support(Cognito, DynamoDB, S3)</ListItem>
              <ListItem>More field types(date, datetime, file)</ListItem>
              <ListItem>Flexible permissions</ListItem>
              <ListItem>Docs to integrate with Gatsby and Next.js</ListItem>
            </List>
          </Stack>
        </Box>
      </TopTemplate>
    </div>
  )
}

export default Home
