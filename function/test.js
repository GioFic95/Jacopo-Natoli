const text = process.env.TEXT;

exports.handler = async (event, context) => {
    console.log("text: ", text);
    return {
        statusCode: 200,
        body: text
    };
};
