/**
 *
 * @param {Object} reqData has the request data for the API
 * @param {Object} callback Function that will be called after api response
 * @returns {null} calls the Api
 */
export function makeServiceCall(reqData, callback) {
    const options = {
        method: reqData.method,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }

    };
    if (reqData.method === "POST" || reqData.method === "PUT" || reqData.method === "DELETE") {
        options.body = JSON.stringify(reqData.body);
    }
    fetch(`${reqData.url}`, options)
        .then(response => response.json())
        .then(data => {
            callback(data);
        });
}
