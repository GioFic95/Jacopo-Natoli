const fetch = require('node-fetch');
const KEY = process.env.GOOGLE_DRIVE_KEY;
const URL = "https://docs.googleapis.com/v1/documents/1aD2rEARRqD7GOv9yycQZhnYkE2NAKmovBHcUUoKDkZg?suggestionsViewMode=PREVIEW_WITHOUT_SUGGESTIONS&key="+KEY;

exports.handler = async (event, context) => {
    let response, data;

    try {
        response = await fetch(URL, {
            method: "GET",
            headers: new fetch.Headers({
                "Accept": "application/json"
            })
        });

        data = await response.json();
    } catch (error) {
        console.error(error.message);
        return;
    }

    return {
        statusCode: 200,
        body: JSON.stringify(data)
    };
};
