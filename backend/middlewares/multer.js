// import multer from 'multer';

// const storage = multer.diskStorage({
//     filename: function(req, file, callback) {
//         callback(null, file.originalname);
//     }
// });

// const upload =multer({storage})

// export default upload;

// ////////////////////////////////////////
import multer from 'multer';

// Use memoryStorage for Vercel serverless (disk storage doesn't work)
const storage = process.env.VERCEL
  ? multer.memoryStorage()
  : multer.diskStorage({
      destination: (req, file, cb) => cb(null, 'uploads'),
      filename: (req, file, cb) => cb(null, file.originalname),
    });

const upload = multer({ storage });

export default upload;
