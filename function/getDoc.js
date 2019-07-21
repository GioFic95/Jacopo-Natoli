const fetch = require('node-fetch');
const {google} = require('googleapis');
const {auth} = require('google-auth-library');
const compute = google.compute('v1');
const path = require('path');

const MY_KEYS = process.env.GOOGLE_APPLICATION_CREDENTIALS;
// const MY_URL = process.env.URL;
// const KEY = process.env.GOOGLE_DRIVE_KEY;
// const TOKEN = process.env.ACCESS_TOKEN;
// const URL = "https://docs.googleapis.com/v1/documents/1aD2rEARRqD7GOv9yycQZhnYkE2NAKmovBHcUUoKDkZg?suggestionsViewMode=PREVIEW_WITHOUT_SUGGESTIONS&key=";

const keys = JSON.parse(MY_KEYS);

exports.handler = async (event, context) => {
    let data, out, id;

    try {
        const client = auth.fromJSON(keys);
        client.scopes = ['https://www.googleapis.com/auth/compute', 'https://www.googleapis.com/auth/documents.readonly'];

        const docs = await google.docs({
            version: 'v1',
            auth: client,
        });

        const response = await docs.documents.get({
            documentId: '1XPbMENiP5bWP_cbqc0bEWbq78vmUf-rWQ6aB6FVZJyc',
            suggestionsViewMode: 'PREVIEW_WITHOUT_SUGGESTIONS',
            fields: 'body/content/paragraph/elements/textRun/content'
        });

        // response = await fetch(URL, {
        //     method: "GET",
        //     headers: new fetch.Headers({
        //         "Accept": "application/json",
        //         "Authorization": "Bearer " + TOKEN
        //     })
        // });

        console.log("response data:", response.data);
        data = await JSON.parse(response.data);
        console.log("json data:", data);
        data = data.body.content;

        id = Math.floor(Math.random() * data.length-1);
        console.log("id:", id);

        out = [];
        let d;
        for (d of data) {
            try {
                let par = d.paragraph.elements[0].textRun.content.replace("\n", "<br>");
                out.push(par);
            } catch (e) {
                console.error(e, d);
            }
        }

    } catch (error) {
        console.error(error.message);
        return;
    }

    return {
        statusCode: 200,
        body: JSON.stringify(out[id])
    };
};
