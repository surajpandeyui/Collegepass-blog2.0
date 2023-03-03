import { Container, Row, Col, Button } from 'react-bootstrap'
import React from 'react'
import styles from './playvideo.module.scss'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import Player from '@vimeo/player';
import axios from 'axios'
import { useRouter } from 'next/router'
import { APIstoreJoinedUser, APIupdateEventSpentTime, getSeriesWithEp } from '../../config/API'
import dynamic from 'next/dynamic'
const LoginModal = dynamic(() => import('../../components/Modal/LoginModal'))

const PlayVideoScreen = ({ title = 'COLLEGEPASS VIDEO', videoID = '', ids = [] }) => {
  const auth = useSelector((state) => state.auth)
  const [showLogin, setShowLogin] = useState(false)
  const handleCloseLogin = () => setShowLogin(false)
  const handleShowLogin = () => setShowLogin(true)
  const [videoStatus, setvideoStatus] = useState(false)
  const [interval, setinterval] = useState(null)
  const [trackingEnabled, settrackingEnabled] = useState(false)
  const [body, setbody] = useState(null)
  const [video, setVideo] = useState(null)
  const [videoEnd, setvideoEnd] = useState(false)
  const [vid, setvid] = useState(null)
  const [iframeLoaded, setiframeLoaded] = useState(false)
  const [nextVid, setnextVid] = useState(null)
  const [videoUrl, setVideoUrl] = useState(null)
  const [buttonText, setbuttonText] = useState('Play Next')
  const [buttonIcon, setbuttonIcon] = useState(<i className="fa fa-step-forward" aria-hidden="true"></i>)
  const [detectVidEnd, setdetectVidEnd] = useState(false)
  const router = useRouter()




  var config = '';
  if (typeof window === "undefined") {
    console.log("server")

  }
  else {
    config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.token}`,
      }
    }
  }






  const iframeOnLoad = () => {
    if (!iframeLoaded) {
      // console.log("frame loaded")
      setiframeLoaded(true)
    }

  }

  const PlayNextVid = () => {
    // console.log("next Vid is", nextVid)
    if (nextVid == null)
      console.log("null found", nextVid)
    // router.push('/')
    else {
      let a = nextVid.VIDEO
      let b = a.split("/")[4].split("?")
      a = b[1].split("=")[b[1].split("=").length - 1]
      showVideo(b[0] + "%3Fh=" + a, nextVid.TITLE, nextVid.IS_PAID, ids[0], nextVid.ID)

    }

  }

  const showVideo = (video, title, paid, series, episode) => {
    let playURL = `/play-series/${video}/${title.replace(/\//g, '%2F')}`
    playURL = playURL.replace(/\?/g, '%3F')
    playURL = `${playURL}?sourcetype=${series}vimeo${episode}`
    // console.log("detail==>", auth.userDetails, paid)
    if (auth.userDetails?.ISPREMIUM === undefined) {
      setShowLogin(true)
    }
    else if (auth.userDetails?.ISPREMIUM >= 2 || (auth.userDetails?.ISPREMIUM == 1 || auth.userDetails?.ISPREMIUM !== undefined) && !paid) {
      // router.push(playURL)
      window.location = playURL
    }
    else {
      router.push('/pricing')
    }


  }


  useEffect(() => {
    if (video) {
      setnextVid(null)
      setbuttonText("Go to Dashboard")
      setbuttonIcon(<i class="fa fa-dashcube" aria-hidden="true"></i>)
      // const currentEpisode = video.filter((episode)=>{return episode.ID === ids[1]})
      // console.log(video)
      let videoPresent = false
      for (let element of video) {
        // video.forEach(element => {
        if (element.ID > ids[1]) {
          setnextVid(element)
          setbuttonText("Play Next")
          setbuttonIcon(<i class="fa fa-forward" aria-hidden="true"></i>)
          videoPresent = true
          break
        }
      };
      if (!videoPresent) {
        setnextVid('dashboard')
      }
    }
  }, [video])

  useEffect(() => {

    axios
      .post(getSeriesWithEp, { series: ids[0] })
      .then((e) => {
        // console.log("data",e)
        if (e.data.statusCode == 200) {

          setVideo(e.data.message.episodes)

        }
      }).catch(() => { })
  }, [ids, videoID])

  useEffect(() => {
    if (ids, length > 0 && config !== '' && videoID != '' && auth.userDetails?.EMAIL !== undefined) {


      const bod = {
        "event_id": ids[0],
        "episode_id": ids[1],
        "user_email": auth.userDetails?.EMAIL,
        "platform": "WEB"
      }
      setbody(bod)
      axios
        .post(APIstoreJoinedUser, bod, config)
        .then((e) => {
          if (e.data.status) {
            settrackingEnabled(true)


          }
        }).catch(() => { })

    }

  }, [ids, videoID])




  useEffect(() => {

    if (videoStatus == true && trackingEnabled) {

      setinterval(setInterval(function () {

        axios
          .post(APIupdateEventSpentTime, body, config)
          .then((e) => {
            console.log("pinged")
          }).catch(() => { })


      }, 50000));
    }
    else if (videoStatus == false) {

      clearInterval(interval)
      setinterval(false)
    }
  }, [videoStatus, trackingEnabled])

  useEffect(() => {

    if (vid) {
      vid.on('play', function (e) {
        console.log("initiated")
        setvideoStatus(true)
      });
      vid.on('pause', function () {
        console.log("paused")
        setvideoStatus(false)
      });
      vid.on('ended', function () {
        console.log('Finished');
        setvideoEnd(true)
        setTimeout(() => {
          // console.log('calling next episode', nextVid)
          setdetectVidEnd(true)
          // if (nextVid != null)
          // PlayNextVid()
        }, 5000);
      });
    }
  }, [vid])


  useEffect(() => {
    if (nextVid != null && nextVid !== 'dashboard')
      PlayNextVid()
    else if (nextVid == 'dashboard' && nextVid != null)
      window.location = '/masterclass'

  }, [detectVidEnd])

  useEffect(() => {

    if (process.browser && vid == null && videoID != '' && videoUrl && iframeLoaded) {
      var iframe = document.querySelector('iframe');
      setvid(new Player(iframe));
      // console.log("player created")
    }

  }, [iframeLoaded, videoUrl])

  // let videoUrl = null
  useEffect(() => {
    if (videoID != '') {
      setVideoUrl(`https://player.vimeo.com/video/${videoID}`)
    }
  }, [videoID])

  // console.log("url",videoUrl)
  return (
    <Container fluid className="bg-black pt-5 pb-5 white-color">
      <Container>
        <Row>
          <Col className={styles.playVideo}>
            <Row>
              <Col>
                <h2 className="text-center pt-4 pb-4">{title}</h2>
              </Col>
            </Row>
            <Row>
              <Col className="m-auto text-center">
                {auth.isAuthenticated ? <iframe
                  onload={iframeOnLoad()}
                  // src="https://player.vimeo.com/video/720245521?h=0ca09aa2d8"
                  src={videoUrl}
                  width="800"
                  height="564"
                  frameBorder="0"
                  id="sing_vd"
                  allow="autoplay;"
                  title="video"
                  allowFullScreen

                /> : auth.isAuthenticated !== null ? <LoginModal show={true} handleClose={handleCloseLogin} />
                  : null}

              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row style={{
          maxWidth: '100%',
          margin: 'auto',
          width: '64%'
        }}>
          <Col className={styles.seriesNextBurron}>
            {videoEnd && <Button onClick={() => { PlayNextVid() }}>{buttonText}  {buttonIcon} </Button>} {/*<i class="fa fa-dashcube" aria-hidden="true"></i>*/}
          </Col>
        </Row>
      </Container>
      <LoginModal show={showLogin} handleClose={handleCloseLogin} />
    </Container>

  )
}

export default PlayVideoScreen
