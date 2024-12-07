import { Request } from 'express';
import multer, { FileFilterCallback, StorageEngine } from "multer";
import path from "path";

const limit = {
  fileSize: 1024 * 1024 * 3, // 3Mb
};

const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: Function) => {
    const staticFolder: string = "./public";
    cb(null, staticFolder);
  },

  filename: (req: Request, file: Express.Multer.File, cb: Function) => {
    const fileName: string = Date.now() + file.originalname;
    cb(null, fileName);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  const validExtensions: string[] = [
    ".jpeg",
    ".jpg",
    ".JPG",
    ".JPEG",
    ".png",
    ".svg",
    ".doc",
    ".pdf",
    ".mp4",
    ".PNG",
  ];

  const originalName: string = file.originalname;
  const originalExtension: string = path.extname(originalName);
  const isValidExtension: boolean = validExtensions.includes(originalExtension);

  if (isValidExtension) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: limit,
});

export default upload;

// vvvvvvvvvvvvvvvimp
//upload midddleware  does following thing
// 1) upload single image if upload.single is used  or upload multiple image if upload.multiple is used
//2) add body(to get req.body in file data you must use multer) and file(or files) to request ie you can get req.body and req.file
//3 note req.file for upload.singe and req.files for upload.array
//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVIIIIIIMP
//you must use upload middler to get form data.

//in simpleword to use form data
//  add expressApp.use(urlencoded({ extended: true }));  at index.js file
//and use upload  middleware ( to get form data)

//to use this middleware