import multer from 'multer'

const storage = new multer.memoryStorage()

export const upload = multer({storage})