import instance from "../Api/instance";
const post_request = async ({ target, body }) => {
    try {
        const response = await instance.post(target, body)
        return response
    } catch (error) {
        const err = error ;
        if (err.response) {
        //    console.log(err.response.status)
        //    console.log(err.response.data)
           return err.response.data;
        }
        // return error
    }
}
const get_request = async ({ target }) => {
    try {
        const response = await instance.get(target)
        return response
    } catch (error) {
        return error
    }
}
const put_request = async ({ target, body }) => {
    try {
        const response = await instance.put(target, body)
        return response
    } catch (error) {
        return "Error"
    }
}

export { post_request, get_request, put_request }
