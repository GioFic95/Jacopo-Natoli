const { text } = process.env.TEXT;
console.log("text: ", text);

exports.handler = async (event, context) => {
    return {
        statusCode: 200,
        body: text
    };
};
