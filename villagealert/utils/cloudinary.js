import dotenv from 'dotenv'
import multer from '../utils/multer.js'
import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

dotenv.config()

const uploadImage = (req, res, next) => {
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

    const { path } = req.file
    try {
      const result = await cloudinary.uploader.upload(path, {
        upload_preset: 'alert',
        resource_type: 'image'
      })
      console.log(result)
      req.body.photo = result.secure_url
      fs.unlinkSync(path)
      next()
    } catch (error) {
      return res.status(409).send(error)
    }
  })
}

export default uploadImage
