import multer from 'multer'

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    const extension = file.originalname.split('.')[1]
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9) + '.' + extension
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const fileFilter = (req, file, cb) => {
  const filetypes = ['image/jpg', 'image/jpeg', 'image/png']
  if (filetypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Veuillez ajouter uniquement une image avec l\'extension jpg, jpeg et png'), false)
  }
}

const upload = multer({ storage, limits: { fileSize: 1024 * 1024 * 50 }, fileFilter })

export default upload.single('photo')
