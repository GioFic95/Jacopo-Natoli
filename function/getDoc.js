const fetch = require('node-fetch');
const KEY = process.env.GOOGLE_DRIVE_KEY;
const TOKEN = process.env.ACCESS_TOKEN;
const URL = "https://docs.googleapis.com/v1/documents/1aD2rEARRqD7GOv9yycQZhnYkE2NAKmovBHcUUoKDkZg?suggestionsViewMode=PREVIEW_WITHOUT_SUGGESTIONS&key=";

exports.handler = async (event, context) => {
    let response, data, out;

    try {
        response = await fetch(URL, {
            method: "GET",
            headers: new fetch.Headers({
                "Accept": "application/json",
                "Authorization": "Bearer " + TOKEN
            })
        });

        data = await response.json();
        console.log("1", data);
        data = data.body.content;
        console.log("2", data);
        out = [];
        let d;
        for (d of data) {
            try {
                out.push(d.paragraph.elements[0].textRun.content);
            } catch {
                console.log(d);
            }
        }
    } catch (error) {
        console.error(error.message);
        return;
    }

    return {
        statusCode: 200,
        body: JSON.stringify(out)
    };
};
