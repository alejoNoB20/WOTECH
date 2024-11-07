import 'dotenv/config';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});

export const uploadImage = async (file, folder = 'Wotech Assets') =>{
    try{
        switch (folder) {
            case 'Herramientas':
                folder = 'Wotech Assets/Herramientas';
                break;
            case 'Productos':
                folder = 'Wotech Assets/Productos';
                break;
            case 'Planos_Productos':
                folder = 'Wotech Assets/Planos_Productos';
                break;
            case 'Facturas':
                folder = 'Wotech Assets/Facturas';
                break;    
            };

        const result = await cloudinary.uploader.upload(file, {
            auto_tagging: 0.75,
            resource_type: 'image', 
            use_filename: true, 
            unique_filename: false,
            folder
        });

        return {success: true, msg: result.secure_url};

    }catch(err) {
        console.log(err)
        return {success: false, msg:`Error al momento de subir la imagen`};
    };
};

export const destroyImage = async (file) => {
    try{
        const public_id = getPublicIdFromUrl(file);
        await cloudinary.uploader.destroy(public_id);

        return {success: true, msg: 'destroyed'}; 

    }catch(err) {
        console.log(err);
        return {success: false, msg:`Error al momento de borrar la imagen`};
    };
}

function getPublicIdFromUrl(url) {
    const regex = /\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z]+$/;
    const matches = url.match(regex);
    if (matches) {
      return decodeURIComponent(matches[1]); // Decodificar espacios y caracteres especiales
    }
    return null;
};