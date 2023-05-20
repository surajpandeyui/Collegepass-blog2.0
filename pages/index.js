import Head from 'next/head'
import BlogScreen from '../screens/BlogScreen'
import {
  APIGetBlogs,
  APIGetBlogsByCategory,
  APIGetBlogsByOtherCategory,
} from '../config/API'
import axios from 'axios'

export default function AboutUs({
  popular = [],
  // latest = [],
  // ivyLeague = [],
  // essays = [],
  // uk = [],
  // canada = [],
  // extracurricular = [],
  // blogPosts = [],
}) {
  return (
    <>
      <Head>
        <title>CollegePass - Blog</title>
        <title>Blog | CollegePass</title>
        <meta
          name="description"
          content="CollegePass is a global college preparation platform helping high schoolers apply to their dream colleges worldwide! "
        />
        <meta itemprop="name" content="About Us | CollegePass" />
        <meta
          itemprop="description"
          content="CollegePass is a global college preparation platform helping high schoolers apply to their dream colleges worldwide!"
        />
        <meta itemprop="image" content="" />
        <meta property="og:url" content="https://www.collegepass.org/terms" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="About Us | CollegePass" />
        <meta
          property="og:description"
          content="CollegePass is a global college preparation platform helping high schoolers apply to their dream colleges worldwide!"
        />
        <meta property="og:image" content="" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us | CollegePass" />
        <meta
          name="twitter:description"
          content="CollegePass is a global college preparation platform helping high schoolers apply to their dream colleges worldwide!"
        />
        <meta name="twitter:image" content="" />
        <link rel="canonical" href="https://www.collegepass.org/about" />
      </Head>

      <main className="bg-black">
        <BlogScreen
          popular={popular}
          // latest={latest}
          // ivyLeague={ivyLeague}
          // essays={essays}
          // uk={uk}
          // canada={canada}
          // extracurricular={extracurricular}
          // blogPosts={blogPosts}
        ></BlogScreen>
      </main>
    </>
  )
}

const getPostsByCategory = async (c) => {
  const result = []

  const limit = 4
  const blogs = await axios.get(`${APIGetBlogsByCategory}${limit}/${c}/0`)
  if (blogs.data.data.length) {
    result.push(...blogs.data.data)
  }

  if (result.length < 4) {
    const additionalBlogs = await axios.get(`${APIGetBlogs}1`)
    result.push(
      ...additionalBlogs.data.data
        .filter((item) => {
          if (result.length) {
            for (let i of result) {
              if (i.POST_ID === item.POST_ID) {
                return false
              }
            }
            return true
          } else {
            return true
          }
        })
        .slice(0, 4 - result.length)
    )
  }
  return result
}
const getPostsByOtherCategory = async () => {
  const result = []

  const limit = 4
  const blogs = await axios.get(`${APIGetBlogsByOtherCategory}0`)
  if (blogs.data.data.length) {
    result.push(...blogs.data.data)
    console.log('Data ------------>', blogs.data.data)
  }

  if (result.length < 4) {
    const additionalBlogs = await axios.get(`${APIGetBlogs}1`)
    result.push(
      ...additionalBlogs.data.data
        .filter((item) => {
          if (result.length) {
            for (let i of result) {
              if (i.POST_ID === item.POST_ID) {
                return false
              }
            }
            return true
          } else {
            return true
          }
        })
        .slice(0, 4 - result.length)
    )
  }
  return result
}

const fetchPosts = async () => {
  try {
    const response = await axios.get(`${APIGetBlogs}1`)
    console.log('Response ------->', response.data.data)
    return response.data.data
  } catch (err) {
    console.log('Error -------------->', err)
  }
}
export async function getStaticProps() {
  // const [popular, ivyLeague, essays, uk, canada, extracurricular, blogPosts] =
  //   await Promise.all([
  //     getPostsByCategory('Popular'),
  //     getPostsByCategory('Ivy League'),
  //     getPostsByCategory('Essay'),
  //     getPostsByCategory('UK'),
  //     getPostsByCategory('Canada'),
  //     getPostsByOtherCategory(),
  //     fetchPosts(),
  //   ])
  const [popular] = await Promise.all([getPostsByCategory('Popular')])

  // console.log('Data', popular)
  // console.log('Data', latest)
  // console.log('Data', ivyLeague)
  // console.log('Data', essays)
  // console.log('Data', canada)
  // console.log('Data', uk)
  // console.log('Data', extracurricular)

  return {
    props: {
      popular,
      // propBlogs: popular,
      // latest: blogPosts.slice(0, 4),
      // ivyLeague,
      // essays,
      // uk,
      // canada,
      // extracurricular,
      // blogPosts,
    },
    revalidate: 10, // Regenerate the page data every 10 seconds
  }
}
