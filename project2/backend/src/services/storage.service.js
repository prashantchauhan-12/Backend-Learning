const { ImageKit } = require('@imagekit/nodejs');


const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

const uploadFile = async (buffer) => {
    try {
        const result = await imagekit.files.upload({
            file: buffer.toString('base64'),
            fileName: "image.jpg",
        });
        return result;

    } catch (error) {
        console.error("ImageKit Upload Error:", error);
        throw error;
    }
};

module.exports = uploadFile;