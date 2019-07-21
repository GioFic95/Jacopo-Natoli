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
        console.log("client:", client);

        const docs = await google.docs({
            version: 'v1',
            auth: client,
        });
        console.log("docs:", docs);

        const response = await docs.documents.get({
            documentId: '1XPbMENiP5bWP_cbqc0bEWbq78vmUf-rWQ6aB6FVZJyc',
            // documentId: '1E6DXvttm54OgaaJjyo5vpeaNbE66izNMaE2tp3O048c',
            suggestionsViewMode: 'PREVIEW_WITHOUT_SUGGESTIONS',
            fields: 'body/content/paragraph/elements/textRun/content'
        });

        data = response.data.body.content;
        console.log("data:", data);

        id = Math.floor(Math.random() * data.length-1);
        console.log("id:", id);

        out = [];
        let d;
        for (d of data) {
            try {
                let par = d.paragraph.elements[0].textRun.content.replace("\n", "<br/>");
                out.push(par);
            } catch (e) {
                console.error(e, d, "SHALLA");
            }
        }

    } catch (error) {
        console.error(error.message);
        return;
    }

    let body = JSON.stringify(out[id]);
    if (body.endsWith("<br/>\"")) {
        body = body.substring(0, body.length-6)+'"';
    }

    return {
        statusCode: 200,
        body: body
    };
};
