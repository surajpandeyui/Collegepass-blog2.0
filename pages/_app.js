//import Head from 'next/head'
import React, { useEffect } from 'react'
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import SSRProvider from 'react-bootstrap/SSRProvider'
import Header from '../components/Header/'
import Footer from '../components/Footer'
import { Provider } from 'react-redux'
import store from '../store'
import Head from 'next/head'
import Script from 'next/script'

function MyApp({ Component, pageProps }) {
  return (
    <>
    <Head>
      <meta name="google-site-verification" content="j-7YZJFAGTjPgff8WFsMgWgwiaVnjQT14rMJiwPSwfc" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <Script id="facebook-pixel">
      {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '3163539570576161');
        fbq('track', 'PageView');
      `}
    </Script>
    
    <noscript><img height="1" width="1" style={{display: 'none'}}
      src="https://www.facebook.com/tr?id=3163539570576161&ev=PageView&noscript=1"
    /></noscript>

    <Script type="text/javascript">
     { `window.pipedriveLeadboosterConfig = {
    base: 'leadbooster-chat.pipedrive.com',
    companyId: 7478333,
    playbookUuid: '51026293-20ee-4640-86de-03c350df45f6',
    version: 2
};
(function() {
    var w = window;
    if (w.LeadBooster) {
        console.warn('LeadBooster already exists');
    } else {
        w.LeadBooster = {
            q: [],
            on: function(n, h) {
                this.q.push({
                    t: 'o',
                    n: n,
                    h: h
                });
            },
            trigger: function(n) {
                this.q.push({
                    t: 't',
                    n: n
                });
            },
        };
    }
})();`}
      </Script>
      <Script src="https://leadbooster-chat.pipedrive.com/assets/loader.js" async></Script>

      <Script type="text/javascript">
        {`
        _linkedin_partner_id = "925971";
        window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
        window._linkedin_data_partner_ids.push(_linkedin_partner_id);
        `}
      </Script>
      <Script type="text/javascript">
        {`(function(l) {
        if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
        window.lintrk.q=[]}
        var s = document.getElementsByTagName("script")[0];
        var b = document.createElement("script");
        b.type = "text/javascript";b.async = true;
        b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
        s.parentNode.insertBefore(b, s);})(window.lintrk);
        `}
      </Script>
      <noscript>
        <img height="1" width="1" style={{ display: 'none' }} alt="" src="https://px.ads.linkedin.com/collect/?pid=925971&fmt=gif" />
      </noscript>
      <Script type="application/ld+json">
        {{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [{
            "@type": "Question",
            "name": "What is CollegePass?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "CollegePass has been founded to help students and parents access high quality, reliable college/university admissions advice and test preparation at the click of a button."
            }
          }, {
            "@type": "Question",
            "name": "Does CollegePass offer College Admissions Advice?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Students & Parents can learn about applying and getting admitted to the World's Best Colleges via CollegePass Live Sessions and Video Lessons round the year. CollegePass hosts 100+ Live Online sessions with Expert College Advisors. Students applying to highly selective universities can also sign up for Personalised Admissions Advising by Internationally Trained College Admission Experts."
            }
          }]
        }}
      </Script>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=UA-140978374-1"></Script>
      <Script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-140978374-1');
            `,
        }}
      />
      <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-461896372"></Script>
      <Script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'AW-461896372');
            `,
        }}
      />
      <Script>
        {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '708813799995238');
        fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img height="1" width="1" style={{ display: 'none' }} src="https://www.facebook.com/tr?id=708813799995238&ev=PageView&noscript=1" />
      </noscript>
      <Script>
        {`
        (function(w,d,t,r,u){var f,n,i;w[u]=w[u]||[],f=function(){var o={ti:"137036034"};o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad")},n=d.createElement(t),n.src=r,n.async=1,n.onload=n.onreadystatechange=function(){var s=this.readyState;s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null)},i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i)})(window,document,"script","//bat.bing.com/bat.js","uetq");
      `}
      </Script>
      <Script type="text/javascript">
        {`
        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "4i2ajo92yc");
      `}
      </Script>
      <Script>
        {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-WN2GFQ4');
    `}
      </Script>
      <Script >
        {`var EhAPI = EhAPI || {}; EhAPI.after_load = function(){ EhAPI.set_account('c799615vsbmqaujdmeqi53sgeb', 'collegepass'); 
EhAPI.execute('rules');};(function(d,s,f) { var sc=document.createElement(s);sc.type='text/javascript';
 sc.async=true;sc.src=f;var m=document.getElementsByTagName(s)[0]; m.parentNode.insertBefore(sc,m); })
 (document, 'script', '//d2p078bqz5urf7.cloudfront.net/jsapi/ehform.js');
`}</Script>


<Script>
{`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '3163539570576161');
fbq('track', 'PageView');`}
</Script>

<noscript><img height="1" width="1" style={{ display: 'none'}}
src="https://www.facebook.com/tr?id=3163539570576161&ev=PageView&noscript=1"
/></noscript>
      {/* <!-- Start of HubSpot Embed Code --> */}
      <script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/9462818.js"></script>
      {/* <!-- End of HubSpot Embed Code --> */}

      <noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WN2GFQ4" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
      </noscript>

      <Provider store={store}>
        <SSRProvider>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </SSRProvider>
      </Provider>
    </>
  )
}

export default MyApp
