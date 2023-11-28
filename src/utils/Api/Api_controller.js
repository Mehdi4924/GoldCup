import { post_request, get_request, put_request } from "./Requests";

const SignInApi = async (body) => {
    const data = await post_request({ target: "Authentication/LoginUserMobile", body: body });
    return data
}
const ForgetPassword = async (body) => {
    const data = await post_request({ target: "Authentication/ForgotPassword", body: body });
    return data
}
const Signout = async () => {
    const data = await get_request({ target: "Authentication/Logout" });
    return data
}
const UserExistence = async (body) => {
    const data = await post_request({ target: "Authentication/EmailExistanceMobile", body: body });
    return data
}
const SignupApi = async (body) => {
    const data = await post_request({ target: "Authentication/register", body: body });
    return data
}
const MakePayment = async (body, navigation) => {
    const data = await post_request({ target: "PaymentApi/AddPayment", body: body, navigation: navigation });
    return data
}
const getProfile = async (Email) => {
    const data = await get_request({ target: "Authentication/FetchUserByEmail?Email=" + Email });
    return data
}
const getJokes = async (id) => {
    const data = await get_request({ target: "Jokes/GetJokesListByCatId?id=" + id });
    return data
}
const EditProfile = async (body, navigation) => {
    const data = await post_request({ target: "User/EditUser", body: body, navigation: navigation });
    return data
}
const getJokesCategories = async () => {
    const data = await get_request({ target: "JokesCategories" });
    return data
}
const getAudioCategories = async () => {
    const data = await get_request({ target: "MusicCategories/MusicCategoriesMobile" });
    return data
}
const getAudioSubCatagories = async (id) => {
    const data = await get_request({ target: "MusicSubCategories/FetchMusicSubCatByCategoryId?id=" + id });
    return data
}
const getAudios = async (id) => {
    const data = await get_request({ target: "MultiSelectSongsMusicSubCategories/GetSongByMusicSubCatId?id=" + id });
    return data
}
const getHomeData = async () => {
    const data = await get_request({ target: "MobileHomeScreen/GetData" });
    return data
}
const getVideosCatagory = async () => {
    const data = await get_request({ target: "mediacategories/mediacategorymobile" });
    return data
}

const MediaSubCategories = async (id, config) => {
    const data = await get_request({ target: "MediaSubCategories/FetchMediaSubCategoryByCategoryId?id=" + id, config: config });
    return data
}
const getVideoSubCatagories = async (id) => {
    const data = await get_request({ target: "AdvertisementApi/NewGetAdvertisementDetails/" + id });
    return data
}
const getVideoSongs = async (id, config) => {
    const data = await get_request({ target: "MultiSelectVideosMediaSubCategories/GetVideosByMediaSubCatId?id=" + id, config: config });
    return data
}
const SocialLogin = async (body) => {
    const data = await post_request({ target: "User/SignInUsingAuth", body: body });
    return data
}
const getFramesData = async () => {
    const data = await get_request({ target: "photoframes/ActivePhotoFramesMobile" });
    return data
}
const GetPopUpVideo = async () => {
    const data = await get_request({ target: "MobileHomeScreen/GetSkipAbleVideo" });
    return data
}
const UpdateProfile = async (id, body) => {
    const data = await post_request({ target: "Authentication/UpdateUser?id=" + id, body: body });
    return data
}
export {
    SignInApi,
    ForgetPassword,
    Signout,
    SignupApi,
    UserExistence,
    getHomeData,
    MediaSubCategories,
    getProfile,
    getJokes,
    EditProfile,
    getJokesCategories,
    getAudioCategories,
    getAudioSubCatagories,
    MakePayment,
    getAudios,
    getVideoSubCatagories,
    getVideoSongs,
    SocialLogin,
    getFramesData,
    UpdateProfile,
    GetPopUpVideo,
    getVideosCatagory
}