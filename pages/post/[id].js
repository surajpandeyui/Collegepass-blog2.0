import Head from 'next/head'
// import PostScreen from '../screens/PostScreen';
import PostScreen from './../../screens/PostScreen'
import { useRouter } from 'next/router'
import axios from 'axios'
import { APIGetBlog } from '../../config/API'

export default function AboutUs({ blog }) {
  // const router = useRouter()

  return (
    <>
      <Head>
        <title>CollegePass - Blog</title>
        <title>Blog | CollegePass</title>
        <meta
          name="description"
          content="CollegePass is a global college preparation platform helping high schoolers apply to their dream colleges worldwide! "
        />
        <meta itemprop="name" content={`Blog | ${blog.TITLE || ''}`} />
        <meta
          itemprop="description"
          content="CollegePass is a global college preparation platform helping high schoolers apply to their dream colleges worldwide!"
        />
        <meta itemprop="image" content="" />
        <meta property="og:url" content="https://www.collegepass.org/terms" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Blog | ${blog.TITLE || ''}`} />
        <meta
          property="og:description"
          content="CollegePass is a global college preparation platform helping high schoolers apply to their dream colleges worldwide!"
        />
        <meta property="og:image" content="" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Blog | ${blog.TITLE || ''}`} />
        <meta
          name="twitter:description"
          content="CollegePass is a global college preparation platform helping high schoolers apply to their dream colleges worldwide!"
        />
        <meta name="twitter:image" content="" />
        <link rel="canonical" href="https://www.collegepass.org/about" />
      </Head>

      <main className="bg-black">
        <PostScreen blog={blog}></PostScreen>
      </main>
    </>
  )
}

const getPost = async (id) => {
  try {
    const response = await axios.get(`${APIGetBlog}${id}`)
    console.log('Data --------->', response.data.data)
    return response.data.data
  } catch (err) {
    console.log('Error', err)
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const postId = params.id
  const blog = await getPost(postId)

  return {
    props: {
      blog,
    },
    revalidate: 1,
  }
}
