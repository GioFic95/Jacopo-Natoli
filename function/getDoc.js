const KEY = process.env.GOOGLE_DRIVE_KEY;
const HOSTNAME = "docs.googleapis.com";
const PATH = "/v1/documents/1aD2rEARRqD7GOv9yycQZhnYkE2NAKmovBHcUUoKDkZg?suggestionsViewMode=PREVIEW_WITHOUT_SUGGESTIONS&key="+KEY;
const URL = "https://docs.googleapis.com/v1/documents/1aD2rEARRqD7GOv9yycQZhnYkE2NAKmovBHcUUoKDkZg?suggestionsViewMode=PREVIEW_WITHOUT_SUGGESTIONS&key="+KEY;

exports.handler = async (event, context) => {
    let response, data;

    const options = {
        hostname: HOSTNAME,
        path: PATH,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        }
    };

    const req = http.request(options, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
            response = chunk;
        });
        res.on('end', () => {
            console.log('No more data in response.');
        });
    });

    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

    req.end();

    data = await response.json();

    return {
        statusCode: 200,
        body: data
    };
};
