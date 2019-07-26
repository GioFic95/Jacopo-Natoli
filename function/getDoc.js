const {google} = require('googleapis');
const {auth} = require('google-auth-library');

const MY_KEYS = process.env.GOOGLE_APPLICATION_CREDENTIALS;

const keys = JSON.parse(MY_KEYS);

exports.handler = async (event, context) => {
    console.log("--- VERSION = 120");

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
            documentId: '1AyvTkn1teSVBoAWnOsh7nBjGe3sPDfHVMRPStAUYj6A',
            suggestionsViewMode: 'PREVIEW_WITHOUT_SUGGESTIONS',
            fields: 'body/content/paragraph/elements/textRun/content'
        });

        data = response.data.body.content;
        console.log("data:", data);

        id = Math.floor(Math.random() * (data.length-1));
        console.log("id:", id);

        out = [];
        let d;
        for (d of data) {
            try {
                let par = d.paragraph.elements[0].textRun.content.replace("\n", "<br/>");
                if (par === "" || par === "<br/>"){
                    console.log("paragrafo vuoto:", par);
                } else {
                    console.log("paragrafo pieno:", par);
                    out.push(par);
                }
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
