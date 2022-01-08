const {google} = require('googleapis');
const {auth} = require('google-auth-library');

const MY_KEYS = process.env.GOOGLE_APPLICATION_CREDENTIALS;

const keys = JSON.parse(MY_KEYS);

exports.handler = async function(event, context){
    console.log("--- VERSION = 140");

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
            q: "trashed = false and '1lVDpf2Y4FlI3wCTVpVWshQtf-mEpU45g' in parents",
            pageSize: 1000,
            fields: 'nextPageToken, files(id, name, mimeType, webViewLink, webContentLink, thumbnailLink)'
        });
        // console.log("*** response: ", response);

        files = response.data.files;
        console.log("data:", files);

        out = [];
        let file;
        if (files && files.length > 0) {
            for (file of files) {
                // console.log("file: ", file);
                let f_out;
                if (file.mimeType && file.mimeType.includes("image")) {
                    let name = file.name.substring(0, file.name.lastIndexOf("."));
                    let imgLink = file.webContentLink.substring(0, file.webContentLink.indexOf("&export"));
                    f_out = "<img class='w-100 shadow-1-strong rounded mb-4' src='" + imgLink + "' alt='" + name + "'/>"
                    out.push(f_out);
                }
                // } else if (file.mimeType && file.mimeType.includes("video")) {
                //     let videoLink = file.webContentLink.substring(0, file.webContentLink.indexOf("&export"));
                //     f_out = "<video width='100%' controls> <source src='" + videoLink + "'/> </video>";
                //     out.push(f_out);
                // }
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
    console.log("img num:", out.length);

    // id = Math.floor(Math.random() * (out.length - 1));
    // console.log("id:", id);
    // let body = out[id].toString();

    return {
        statusCode: 200,
        body: JSON.stringify(out)  // body
    };
};
