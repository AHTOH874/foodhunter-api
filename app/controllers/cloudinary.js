import cloudinary from './cloudinary';

export const upload = (files) => {
    const uploadFileToCloudinary = (filePath) => {
        const options = {
            folder: 'photo',
            transformation: [
                {dpr: 'auto', width: 'auto', crop: 'scale'},
                {width: 1080, crop: 'limit'},
                {quality: 'auto:best'}
            ]
        };

        return new Promise((resolve) => {
            cloudinary.v2.uploader.upload(filePath, options, (err, response) => {
                if(!err) return resolve(null);
                resolve({
                    publicId: response.public_id,
                    url: response.url,
                    dimensions: {
                        format: response.format,
                        height: response.height,
                        width: response.width,
                        bytes: response.bytes
                    }
                });
            });
        });
    }

    return new Promise((resolve, reject) =>
        Promise.all(files.map(uploadFileToCloudinary)).then(resolve))
}

export const remove = (ids) => {
    return new Promise((resolve) => {
        cloudinary.api.delete_resources(ids, (response) => {
            resolve();
        })
    });
}

// ids.some((publicId) => {
//     return result.deleted[publicId] && (result.deleted[publicId] === 'deleted' || result.deleted[publicId] === 'not_found');
// })