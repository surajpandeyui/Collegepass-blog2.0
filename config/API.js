const API_URL = 'https://api.collegepass.org/api/v1/'
const API_URL_V2 = 'https://api.collegepass.org/api/v2/'
// const API_URL_V2 = 'http://localhost:4000/api/v2/'
// const API_URL = 'http://localhost:4000/api/v1/'

export const APIGetUserByPhone = `${API_URL_V2}user/getUserByPhone/`
export const APILoginSendOtp = `${API_URL_V2}User/sendLoginOTP/`
export const APIOTPlogin = `${API_URL}auth/login/otp`
export const APIcaptureContactUsDetails = `${API_URL_V2}contactus/captureContactUsDetails`
export const APIRateEvent = `${API_URL_V2}event/rateEvent`
export const getSeries = `${API_URL_V2}series/getSeries/`
export const getSeriesWithEp = `${API_URL_V2}series/getSeriesWithEpisodes/`
export const APIgetUserDetailByToken = `${API_URL}auth/getUserDetailByToken`
export const APIregister = `${API_URL}auth/register`
export const APIregistercheck = `${API_URL}auth/check` // added
export const APIlogin = `${API_URL}auth/login`
export const APIthirdPartyUserAuthentication = `${API_URL}auth/thirdPartyUserAuthentication`
export const APIgetUserAccessLevel = `${API_URL}User/getUserAccessLevel/`
export const APIgetUserAccessLevelNew = `${API_URL}User/getUserAccessLevelNew/`
export const APIgetVideoByCategoryID = `${API_URL}videos/getVideoByCategoryID/`
export const APIgetUserTrackList = `${API_URL}resource/getUserTrackList/`
export const APIgetVideoCategories = `${API_URL}getVideoCategories`
export const APIgetLimitedLiveSession = `${API_URL}events/getLimitedLiveSession`
export const APIforgotPassword = `${API_URL}forgotPassword/`
export const APIresetUserPassword = `${API_URL}resetUserPassword`
export const APIresetPassword = `${API_URL}resetPassword/`
export const APIstoreUserMoment = `${API_URL}tracking/storeUserMoment/`
export const APIstoreUserMomentVideo = `${API_URL}tracking/storeUserMoment/`
export const APIsendEmailVerification = `${API_URL}verification/sendEmailVerification/`
export const APIverifyUserEmail = `${API_URL}verification/verifyUserEmail/`
export const APIgetEducationSection = `${API_URL}MyProfile/getEducationSection/`
export const APIupdateEducationSection = `${API_URL}MyProfile/updateEducationSection`
export const APIdeleteUserEntries = `${API_URL}MyProfile/deleteUserEntries`
export const APigetExtraSection = `${API_URL}MyProfile/getExtraSection/`
export const APIupdateExtraSection = `${API_URL}MyProfile/updateExtraSection`
export const APIupdatePersonalSection = `${API_URL}MyProfile/updatePersonalSection`
export const APIgetPersonalSection = `${API_URL}MyProfile/getPersonalSection/`
export const APIGetCountry = `${API_URL}profile/GetCountry`
export const APIGetCirriculam = `${API_URL}profile/GetCirriculam`
export const APIGetStateByCountryID = `${API_URL}profile/GetStateByCountryID/`
export const APIGetStateByCountryIDinside = `${API_URL}profile/GetStateByCountryID/`
export const APIGetStateByCountryIDhundret = `${API_URL}profile/GetStateByCountryID/101`
export const APIGetCityByStateID = `${API_URL}profile/GetCityByStateID/`
export const APIGetCityByStateIDseventeen = `${API_URL}profile/GetCityByStateID/17`
export const APIGetCityByStateIDinside = `${API_URL}profile/GetCityByStateID/`
export const APIcancelRazorpaySubscription = `${API_URL}payment/cancelRazorpaySubscription`
export const APIgetSubscrptionById = `${API_URL}payment/getSubscrptionById/`
export const APIstoreVideoViews = `${API_URL}tracking/storeVideoViews`
export const APIgetVideoBySourceId = `${API_URL}videos/getVideoBySourceId/`
export const APIstoreUserFeedback = `${API_URL}events/storeUserFeedback/`
export const APIgetLiveSessionBySourceId = `${API_URL}events/getLiveSessionBySourceId/`
export const APIgetZoomSignature = `${API_URL}events/getZoomSignature/`
export const APIstoreJoinedUser = `${API_URL}events/storeJoinedUser/`
export const APIupdateEventSpentTime = `${API_URL}events/updateEventSpentTime/`
export const APIUserDetails = `${API_URL}MyProfile/getPersonalSection/`
export const APInotify = `${API_URL_V2}auth/notifyMe`
export const APILandingPageInfo = `${API_URL_V2}tutoring/storeLandingPageInfo`
export const APITimeZoneData = `${API_URL_V2}getTimeZoneDetails` // add this : timezone@astitva
export const APIgetMandatoryFields = `${API_URL_V2}User/getMandatoryFieldData/`
export const APIsetMandatoryFields = `${API_URL_V2}User/storeMandatoryFieldData/`
export const APIgetLandingPageInfo = `${API_URL_V2}user/getUserDetailsFromEmail/`
export const createOrderURL = `${API_URL}payment/createRazorpayOrder`
export const paymentSuccessURL = `${API_URL}payment/sendSuccessPaymentResponse`
export const createSubscriptionURL = `${API_URL}payment/createRazorpaySubcription`
export const APISendOTP = `${API_URL_V2}User/sendOTP/`
export const APIVerifyOtp = `${API_URL}verification/otpVerification/`
export const APIgetArchiveClass = `${API_URL_V2}archive/getClassArchive`
export const APIgetArchiveStream = `${API_URL_V2}archive/getStreamArchive`
export const APIstoreUserSource = `${API_URL_V2}tracking/storeUserSource`
export const APIstoreContactUs = `${API_URL_V2}support/storeContactUs`
export const APIgetEventDetails = `${API_URL_V2}events/getEventDetails/`
export const APIgetUpcomingEventDetails = `${API_URL}events/getUpcomingLiveSession/`
export const APIstoreEventregistration = `${API_URL_V2}User/registerUserInEvent/`
export const APIgetUserEventDetails = `${API_URL_V2}User/getUserEventRegistrationDeatils/`
export const APIgetVideoByID = `${API_URL}videos/getVideoByID/`
export const APIstoreEventInfo = `${API_URL_V2}utils/event-registration`

export const APIgetLiveClass = `${API_URL_V2}event/class/`
export const APIgetLiveSession = `${API_URL_V2}event/events`
export const APIgetMasterClass = `${API_URL_V2}event/masterclass`
export const APIgetIvyLeague = `${API_URL_V2}event/ivy-league`
export const APIgetOxford = `${API_URL_V2}event/oxford`

export const APIgetRegEvents = `${API_URL_V2}event/event-registered/`
export const APIgetAllCities = `${API_URL_V2}utils/cities/`
export const APICaptureWithPromo = `${API_URL_V2}payment/capture/`
export const APIeventRegistration = `${API_URL_V2}event/`
export const APIeventRegistrationNew = `${API_URL_V2}event/new`
export const APIgetRecordedTypes = `${API_URL_V2}event/archive`

export const APITalkToUs = `${API_URL_V2}utils/talk-to-us`
export const APICaptureMandatoryDetails = `${API_URL_V2}user/captureUserDetails`

/////////////////////////////////////////////////////////////////////////////////
export const APIReferFriend = `${API_URL_V2}referral`

export const APIGetBlogs = `${API_URL_V2}blog/getBlogs/`

export const APIGetBlog = `${API_URL_V2}blog/getBlog/`

export const APIGetTotalBlogsCount = `${API_URL_V2}blog/getTotalBlogsCount`

export const APIAddComment = `${API_URL_V2}blog/addComment`

export const APIGetCommentsByPostID = `${API_URL_V2}blog/getCommentsByPostID/`

export const APIGetBlogsByCategory = `${API_URL_V2}blog/getBlogsByCategory/`

export const APIBlogvisited = `${API_URL_V2}blog/blogvisited`

export const APIGetBlogsByOtherCategory = `${API_URL_V2}blog/getBlogsByOtherCategory/`

