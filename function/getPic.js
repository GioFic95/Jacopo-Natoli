// 1p7ZePtk51ZhHIvyXrLVZ4_2qFOPSf0FD

const {google} = require('googleapis');
const {auth} = require('google-auth-library');

const MY_KEYS = process.env.GOOGLE_APPLICATION_CREDENTIALS;

const keys = JSON.parse(MY_KEYS);

exports.handler = async (event, context) => {
    let files, out, id;

    try {
        const client = auth.fromJSON(keys);
        client.scopes = ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.metadata.readonly'];
        console.log("client:", client);

        const drive = google.drive({
            version: 'v3',
            auth: client,
        });
        console.log("drive:", drive);

        const response = await drive.files.list({
            q: "trashed = false and '1p7ZePtk51ZhHIvyXrLVZ4_2qFOPSf0FD' in parents",
            pageSize: 1000,
            fields: 'nextPageToken, files(id, name, mimeType, webViewLink, webContentLink, thumbnailLink)'
        });
        console.log("response", response.data);

        files = response.data.files;
        console.log("data:", files);

        id = Math.floor(Math.random() * data.length-1);
        console.log("id:", id);

        out = [];
        let file;
        if (files && files.length > 0) {
            for (file of files) {
                console.log(file);
                if (file.mimeType && file.mimeType.includes("image")) {
                    let name = file.name.substring(0, file.name.lastIndexOf("."));
                    let imgLink = file.webContentLink.substring(0, file.webContentLink.indexOf("&export"));
                    out += "<img alt='" + name + "' src='" + imgLink + "'/>";
                } else if (file.mimeType && file.mimeType.includes("video")) {
                    let videoLink = file.webContentLink.substring(0, file.webContentLink.indexOf("&export"));
                    out += "<video controls> <source src='" + videoLink + "'/> </video> <br/>";
                }
            }
        } else {
            console.log("cartella foto vuota")
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
