import React, { Fragment, useState, useEffect } from 'react'
import { Container, Row, Col, Button, Form, NavItem } from 'react-bootstrap'

import dynamic from 'next/dynamic'

import {
  APIstoreUserMoment,
  APIgetLiveSessionBySourceId,
  APIgetZoomSignature,
  APIstoreJoinedUser,
  APIupdateEventSpentTime,
} from '../../config/API'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

const LiveScreen = ({ eventID }) => {
  // console.log('eventID', eventID)
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    // console.log("auth",auth)
    setUserName(
      auth.userDetails ? auth.userDetails.EMAIL : ''
    )
    setFormData({...formData,userEmail: auth.userDetails.EMAIL})
    setUserName(
      auth.userDetails.EMAIL
    )
    
  }, [auth])
  useEffect(() => {
    setFormData({...formData,meetingNumber: eventID})
  }, [eventID])
  //get session details
  useEffect(() => {
    const getSessionDetails = async () => {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      }
      try {
        let result = await axios.get(
          `${APIgetLiveSessionBySourceId}${eventID}`,
          config
        )

        // console.log(result.data.data[0].EVENT_TYPE);

        setSessionTitle(result.data.data[0].NAME)

        setEventID(result.data.data[0].ID)
        setSessionTime(result.data.data[0].DATE_TIME)

        let Zoom_Pass = result.data.data[0].ZOOM_PASS
          ? result.data.data[0].ZOOM_PASS
          : ''

        setZoomPass(Zoom_Pass)

        seteventPremiumlevel(result.data.data[0].PREMIUM_LEVEL) //Setting up the event premium Level

        setsessionType(result.data.data[0].EVENT_TYPE)
      } catch (error) {}
    }
    const fetchData = async () => {
      try {
        let result = await axios.post(APIgetZoomSignature, {
          apiKey: 'mMpcnXwPTW6TTVIk-QnOZQ',
          apiSecret: '2HO57d9C3au8GytOlb1VJvFhmjU1Kgs6WQTn',
          meetingNumber: eventID,
          role: 0,
        })

        setSignature(result.data.signature)
      } catch (error) {}
    }

    if (eventID && eventID !== undefined) {
      fetchData()
      getSessionDetails()
    }
  }, [eventID])

  // To check users access level
  //   useEffect(() => {
  //     if (eventPremiumlevel) {
  //       var allowed = false // By Default access is not allowed

  //       //If the user is in free trial he can access the event
  //       if (accountTrial === true && sessionType === 'EVENT') {
  //         allowed = true
  //       } else if (accountTrial === true && sessionType === 'AP') {
  //         allowed = true
  //       } else {
  //         //If the Trial is over:

  //         //if the  event type is Class then checking that user has that add-on or not
  //         if (sessionType === 'CLASS') {
  //           if (prime_add_ons !== false && prime_add_ons) {
  //             if (prime_add_ons.indexOf(eventPremiumlevel) >= 0) {
  //               allowed = true
  //             }
  //           }
  //         } //if the  event type is AP  then checking that user has that add-on or not
  //         else if (sessionType === 'AP') {
  //           if (prime_add_ons !== false && prime_add_ons) {
  //             if (prime_add_ons.indexOf(eventPremiumlevel) >= 0) {
  //               allowed = true
  //             }
  //           }
  //         } else {
  //           //If the event type is live stream

  //           //if the event is premium then we will check user is prime or not
  //           if (eventPremiumlevel === 2) {
  //             if (premiumLevel === 'Prime') {
  //               allowed = true
  //             }
  //           } else if (eventPremiumlevel === 1) {
  //             //If the event is free then you allow all user to attend

  //             allowed = true
  //           }
  //         }
  //       }

  //       if (allowed === false && sessionType === 'CLASS') {
  //         //setting up redirection Based on class type

  //         if (eventPremiumlevel === 1) {
  //           setRedirctTo('/sat-master-class-pro')
  //         } else if (eventPremiumlevel === 2) {
  //           setRedirctTo('/ib-tutoring')
  //         } else if (eventPremiumlevel === 3 || eventPremiumlevel === 4) {
  //           setRedirctTo('/college-admission')
  //         } else {
  //           setRedirctTo('/')
  //         }
  //       } else if (allowed === false && sessionType === 'AP') {
  //         setRedirctTo('/ap-calculus-masterclass')
  //       } else if (allowed === false && sessionType === 'EVENT') {
  //         setRedirctTo('/plan/payment')
  //       }
  //     }
  //   }, [
  //     accountTrial,
  //     premiumLevel,
  //     eventPremiumlevel,
  //     sessionType,
  //     prime_add_ons,
  //   ])

  // store user movement
  useEffect(() => {
    const storeUserMovement = async () => {
      let body = {
        user_email: auth.userDetails.EMAIL,
        page: [
          { page: window.location.href },
          { date: new Date().toLocaleString() },
        ],
      }
      try {
        await axios.post(APIstoreUserMoment, body)
      } catch (error) {}
    }
    storeUserMovement()
  }, [])

  // form to join the class
  const [formData, setFormData] = useState({
    meetingLaunched: false,
    meetingNumber: eventID,
    leaveUrl: `/pricing`,
    userEmail: auth.userDetails.EMAIL,
    passWord: '',
    role: 0,
    signature: null,
    EventID: 0,
  })
  

  const { meetingLaunched, meetingNumber, leaveUrl, userEmail, role } = formData

  const [signature, setSignature] = useState('')
  const [EventID, setEventID] = useState()
  const [ZoomPass, setZoomPass] = useState(null)
  const [eventPremiumlevel, seteventPremiumlevel] = useState()
  const [userName, setUserName] = useState(
    auth.userDetails ? auth.userDetails.EMAIL : ''
  )
  const [sessionTitle, setSessionTitle] = useState('Zoom Session')
  const [sessionTime, setSessionTime] = useState()
  const [redirctTo, setRedirctTo] = useState(false)
  const [sessionType, setsessionType] = useState()

  //get started with zoom initialisation
  useEffect(() => {
    import('@zoomus/websdk').then((module) => {
      const { ZoomMtg } = module
      ZoomMtg.setZoomJSLib('https://source.zoom.us/2.1.1/lib', '/av')
      ZoomMtg.preLoadWasm()
      ZoomMtg.prepareWebSDK()

      const storeEventUser = async () => {
        try {
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.token}`,
            },
          }

          const bodySuccess = {
            user_email: localStorage.user,
            event_id: EventID,
          }

          const res = await axios.post(APIstoreJoinedUser, bodySuccess, config)

          if (res.status !== 200) {
            return
          } else {
          }
        } catch (error) {}
      }

      const updateSpendTime = async () => {
        try {
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.token}`,
            },
          }

          const bodySuccess = {
            user_email: localStorage.user,
            event_id: EventID,
          }
          const res = await axios.post(
            APIupdateEventSpentTime,
            bodySuccess,
            config
          )

          if (res.status !== 200) {
            return
          } else {
          }
        } catch (error) {}
      }

      const launchMeeting = () => {
        // console.log("in launch meeting")
        const apiKey = 'mMpcnXwPTW6TTVIk-QnOZQ'
        const meetConfig = {
          meetingNumber: meetingNumber,
          leaveUrl: leaveUrl,
          userName: userName,
          userEmail: userEmail,
          passWord: ZoomPass,
          role: role,
        }
        setFormData({ ...formData, meetingLaunched: true })
        getSignature(meetConfig, apiKey, signature, EventID)
      }
      const getSignature = (meetConfig, apiKey, signature) => {
        // console.log("meeting config",meetConfig)
        ZoomMtg.init({
          leaveUrl: meetConfig.leaveUrl,
          isSupportAV: true,
          success: function () {
            ZoomMtg.join({
              signature: signature,
              apiKey: apiKey,
              meetingNumber: meetConfig.meetingNumber, // required
              userName: meetConfig.userName, // required
              userEmail: meetConfig.userEmail, // Not used, required for Webinars
              passWord: meetConfig.passWord, // If required; set by host
              success() {
                storeEventUser()
                setInterval(function () {
                  updateSpendTime()
                }, 50000)
              },
              error(res) {
                // console.log(res)
                null
              },
            })
          },
          error(res) {
            // console.log(res)
            null
          },
        })
      }
      // console.log(userName , user Email , ZoomPass)
      if (userName && userEmail && ZoomPass) {
        launchMeeting()
      }
    })
  }, [userName, userEmail, ZoomPass])

  return (
    <Fragment>
      <Container>
        <Row>
          <Col>
            <div style={{ height: 700 }}></div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  )
}

export default LiveScreen
