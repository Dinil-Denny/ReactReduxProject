import multer from "multer";
import path, { extname } from 'path';

//multer configuration
//setting storage engine for multer
const storage = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null,'backend/public/uploads'); //directory to save files
    },
    filename:(req,file,cb) => {
        cb(null, `${Date.now()}_${path.extname(file.originalname)}`);
    }
});

//checking file type for images 
const checkFileType = (file,cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if(extname && mimetype){
        return cb(null,true);
    }else{
        cb(new Error("Only images are allowed"));
    }
};

//initializing upload middleware
const upload = multer({
    storage,
    fileFilter: (req,file,cb) => {
        checkFileType(file,cb);
    }
});

export default upload;