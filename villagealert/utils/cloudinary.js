import dotenv from 'dotenv'
import multer from '../utils/multer.js'
import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
dotenv.config()

const uploadImage = (req, res, next) => {
  // upload to cloudinary
  multer(req, res, async (err) => {
    if (err) {
      console.log(err)
      return res.send(err)
    }

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    })

    if (!req.file) {
      return next()
    }

    // SEND FILE TO CLOUDINARY
    const { path } = req.file // file becomes available in req at this point
    try {
      const result = await cloudinary.uploader.upload(path, {
        upload_preset: 'apimairie',
        resource_type: 'image'
      })
      console.log(result)
      req.body.image = result.secure_url // on crée dans l'objet body un champ image qui contient l'url de l'image
      fs.unlinkSync(path) // delete file from server
      next()
    } catch (error) {
      return res.status(409).send(error)
    }
  })
}

export default uploadImage
