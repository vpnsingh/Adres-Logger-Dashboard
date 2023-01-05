import { LOGGER_DATA_URL } from "../urls";

// get logger data
// Login API Method
export const getLoggerData = () => {
    return fetch(LOGGER_DATA_URL, {
        method: "GET",
        headers: {
            'Content-Type':'application/json'
        }
    })
    .then(res => {
        return res.json();
    })
    .catch(err => console.log(err))
}
