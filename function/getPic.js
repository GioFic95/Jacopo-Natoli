const {google} = require('googleapis');
const {auth} = require('google-auth-library');

const MY_KEYS = process.env.GOOGLE_APPLICATION_CREDENTIALS;

const keys = JSON.parse(MY_KEYS);

exports.handler = async (event, context) => {
    console.log("--- VERSION = 120");

    let files, out, id;

    try {
        const client = auth.fromJSON(keys);
        client.scopes = ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.metadata.readonly'];
        // console.log("client:", client);

        const drive = google.drive({
            version: 'v3',
            auth: client,
        });
        // console.log("drive:", drive);

        const response = await drive.files.list({
            q: "trashed = false and '1p7ZePtk51ZhHIvyXrLVZ4_2qFOPSf0FD' in parents",
            pageSize: 1000,
            fields: 'nextPageToken, files(id, name, mimeType, webViewLink, webContentLink, thumbnailLink)'
        });
        console.log("*** response: ", response);

        files = response.data.files;
        // console.log("data:", files);

        let len = files.length;
        console.log("len:", len);

        id = Math.floor(Math.random() * len-1);
        console.log("id:", id);

        out = [];
        let file;
        if (files && len > 0) {
            for (file of files) {
                // console.log("file: ", file);
                let f_out;
                if (file.mimeType && file.mimeType.includes("image")) {
                    let name = file.name.substring(0, file.name.lastIndexOf("."));
                    let imgLink = file.webContentLink.substring(0, file.webContentLink.indexOf("&export"));
                    f_out = "<img alt='" + name + "' src='" + imgLink + "'/>";
                } else if (file.mimeType && file.mimeType.includes("video")) {
                    let videoLink = file.webContentLink.substring(0, file.webContentLink.indexOf("&export"));
                    f_out = "<video controls> <source src='" + videoLink + "'/> </video>";
                }
                out.push(f_out);
                // console.log("file out:", f_out);
            }
        } else {
            console.log("cartella foto vuota")
        }

    } catch (error) {
        console.error("ERROR: " + error.message);
        return;
    }

    console.log("out:", out);
    
    let body = out[id].toString();

    return {
        statusCode: 200,
        body: body
    };
};
