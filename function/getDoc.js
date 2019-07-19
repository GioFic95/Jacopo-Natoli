const KEY = process.env.GOOGLE_DRIVE_KEY;
const URL = "https://docs.googleapis.com/v1/documents/1aD2rEARRqD7GOv9yycQZhnYkE2NAKmovBHcUUoKDkZg?suggestionsViewMode=PREVIEW_WITHOUT_SUGGESTIONS&key="+KEY;

exports.handler = async (event, context) => {
    let response, data;

    let httpReq = new XMLHttpRequest();
    httpReq.open("GET", URL, false);
    httpReq.send();
    if (httpReq.status === 200) {
        response = httpReq.responseText;
    }

    data = await response.json();

    return {
        statusCode: 200,
        body: data
    };
};
