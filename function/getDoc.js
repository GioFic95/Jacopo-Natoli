const { text } = process.env.TEXT;

exports.handler = async (event, context) => {
    return {
        statusCode: 200,
        body: text
    };
};