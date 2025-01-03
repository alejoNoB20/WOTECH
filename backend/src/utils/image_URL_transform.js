export const imageURLTrasnform = (data) => {
        const b64 = Buffer.from(data.buffer).toString("base64");
        let dataURI = "data:" + data.mimetype + ";base64," + b64;
        return dataURI;
}
