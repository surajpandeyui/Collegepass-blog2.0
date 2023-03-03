import Head from 'next/head'
import WhCheckoutScreen from '../../screens/WhCheckoutScreenCustom'
import { useRouter } from 'next/router'

export default function whCheckout() {
  const router = useRouter()
  const planType = router.query.planType
  return (
    <>
      <Head><script src="https://checkout.razorpay.com/v1/checkout.js"></script></Head>
      <main>
        <WhCheckoutScreen planType={planType}></WhCheckoutScreen>
      </main>
      <footer>
      </footer>
    </>
  )
}
