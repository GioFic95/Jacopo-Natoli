const { text } = process.env.TEXT;
const text1 = process.env.TEXT;

exports.handler = async (event, context) => {
    console.log("text: ", text, text1);
    return {
        statusCode: 200,
        body: text
    };
};
