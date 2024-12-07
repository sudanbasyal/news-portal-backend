"use strict";
// before working with multer first always make public folder(it is the common error that beginner does)
//(public folder is where the file gets store)
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
let limit = {
    fileSize: 1024 * 1024 * 3, //2Mb
    // the max file size (in bytes)
    // 1kb equal to 1024
};
let storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        let staticFolder = "./public";
        cb(null, staticFolder);
        //vvvimp  ./means root (main) folder
        // note you must make public  folder manually other it will through (error) like no such file or directory
    },
    //destination give the folder location where file is place
    filename: (req, file, cb) => {
        // any file has key and value
        //key is called as fieldName, value is called as originalname
        let fileName = Date.now() + file.originalname;
        cb(null, fileName);
    },
    //filename give the name of file
});
let fileFilter = (req, file, cb) => {
    let validExtensions = [
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
    let originalName = file.originalname;
    let originalExtension = path_1.default.extname(originalName); //note path module is inbuilt module(package) of node js (ie no need to install path package)
    let isValidExtension = validExtensions.includes(originalExtension);
    if (isValidExtension) {
        cb(null, true);
        //true =>it means  pass such type of file
        //note null represent error since there is no error thus error is null
    }
    else {
        cb(new Error("File is not supported"), false);
        //false means don't pass such type of file
    }
};
const upload = (0, multer_1.default)({
    storage: storage, //we define the location in server where the file is store and control the fileName
    fileFilter: fileFilter, //we filter (generally) according to extension
    limits: limit, //we filter file according to its size
});
exports.default = upload;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkRmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWRkbGV3YXJlL3VwbG9hZEZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHdHQUF3RztBQUN4Ryw4Q0FBOEM7Ozs7O0FBRTlDLG9EQUE0QjtBQUM1QixnREFBd0I7QUFFeEIsSUFBSSxLQUFLLEdBQUc7SUFDVixRQUFRLEVBQUUsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLEVBQUUsS0FBSztJQUNoQywrQkFBK0I7SUFDL0Isb0JBQW9CO0NBQ3JCLENBQUM7QUFFRixJQUFJLE9BQU8sR0FBRyxnQkFBTSxDQUFDLFdBQVcsQ0FBQztJQUMvQixXQUFXLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFO1FBQzdCLElBQUksWUFBWSxHQUFHLFVBQVUsQ0FBQztRQUU5QixFQUFFLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBRXZCLG9DQUFvQztRQUNwQywwR0FBMEc7SUFDNUcsQ0FBQztJQUNELDBEQUEwRDtJQUUxRCxRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFO1FBQzFCLDZCQUE2QjtRQUM3Qiw2REFBNkQ7UUFDN0QsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDOUMsRUFBRSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBQ0QsZ0NBQWdDO0NBQ2pDLENBQUMsQ0FBQztBQUVILElBQUksVUFBVSxHQUFHLENBQUMsR0FBWSxFQUFFLElBQVMsRUFBRSxFQUFPLEVBQUUsRUFBRTtJQUNwRCxJQUFJLGVBQWUsR0FBRztRQUNwQixPQUFPO1FBQ1AsTUFBTTtRQUNOLE1BQU07UUFDTixPQUFPO1FBQ1AsTUFBTTtRQUNOLE1BQU07UUFDTixNQUFNO1FBQ04sTUFBTTtRQUNOLE1BQU07UUFDTixNQUFNO0tBQ1AsQ0FBQztJQUVGLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDckMsSUFBSSxpQkFBaUIsR0FBRyxjQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsNkZBQTZGO0lBQ2pKLElBQUksZ0JBQWdCLEdBQUcsZUFBZSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBRW5FLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztRQUNyQixFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2YseUNBQXlDO1FBQ3pDLHNFQUFzRTtJQUN4RSxDQUFDO1NBQU0sQ0FBQztRQUNOLEVBQUUsQ0FBQyxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRTlDLDBDQUEwQztJQUM1QyxDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBRUYsTUFBTSxNQUFNLEdBQUcsSUFBQSxnQkFBTSxFQUFDO0lBQ3BCLE9BQU8sRUFBRSxPQUFPLEVBQUUsbUZBQW1GO0lBQ3JHLFVBQVUsRUFBRSxVQUFVLEVBQUUsOENBQThDO0lBQ3RFLE1BQU0sRUFBRSxLQUFLLEVBQUUsc0NBQXNDO0NBQ3RELENBQUMsQ0FBQztBQUVILGtCQUFlLE1BQU0sQ0FBQztBQUV0QixxQkFBcUI7QUFDckIsMENBQTBDO0FBQzFDLHVHQUF1RztBQUN2RyxrSUFBa0k7QUFDbEksaUVBQWlFO0FBQ2pFLDBDQUEwQztBQUMxQywrQ0FBK0M7QUFFL0MsZ0NBQWdDO0FBQ2hDLHlFQUF5RTtBQUN6RSxnREFBZ0Q7QUFFaEQsd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gYmVmb3JlIHdvcmtpbmcgd2l0aCBtdWx0ZXIgZmlyc3QgYWx3YXlzIG1ha2UgcHVibGljIGZvbGRlcihpdCBpcyB0aGUgY29tbW9uIGVycm9yIHRoYXQgYmVnaW5uZXIgZG9lcylcclxuLy8ocHVibGljIGZvbGRlciBpcyB3aGVyZSB0aGUgZmlsZSBnZXRzIHN0b3JlKVxyXG5cclxuaW1wb3J0IG11bHRlciBmcm9tIFwibXVsdGVyXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB7IFJlcXVlc3QgfSBmcm9tIFwiLi4vaW50ZXJmYWNlL3JlcXVlc3RcIjtcclxubGV0IGxpbWl0ID0ge1xyXG4gIGZpbGVTaXplOiAxMDI0ICogMTAyNCAqIDMsIC8vMk1iXHJcbiAgLy8gdGhlIG1heCBmaWxlIHNpemUgKGluIGJ5dGVzKVxyXG4gIC8vIDFrYiBlcXVhbCB0byAxMDI0XHJcbn07XHJcblxyXG5sZXQgc3RvcmFnZSA9IG11bHRlci5kaXNrU3RvcmFnZSh7XHJcbiAgZGVzdGluYXRpb246IChyZXEsIGZpbGUsIGNiKSA9PiB7XHJcbiAgICBsZXQgc3RhdGljRm9sZGVyID0gXCIuL3B1YmxpY1wiO1xyXG5cclxuICAgIGNiKG51bGwsIHN0YXRpY0ZvbGRlcik7XHJcblxyXG4gICAgLy92dnZpbXAgIC4vbWVhbnMgcm9vdCAobWFpbikgZm9sZGVyXHJcbiAgICAvLyBub3RlIHlvdSBtdXN0IG1ha2UgcHVibGljICBmb2xkZXIgbWFudWFsbHkgb3RoZXIgaXQgd2lsbCB0aHJvdWdoIChlcnJvcikgbGlrZSBubyBzdWNoIGZpbGUgb3IgZGlyZWN0b3J5XHJcbiAgfSxcclxuICAvL2Rlc3RpbmF0aW9uIGdpdmUgdGhlIGZvbGRlciBsb2NhdGlvbiB3aGVyZSBmaWxlIGlzIHBsYWNlXHJcblxyXG4gIGZpbGVuYW1lOiAocmVxLCBmaWxlLCBjYikgPT4ge1xyXG4gICAgLy8gYW55IGZpbGUgaGFzIGtleSBhbmQgdmFsdWVcclxuICAgIC8va2V5IGlzIGNhbGxlZCBhcyBmaWVsZE5hbWUsIHZhbHVlIGlzIGNhbGxlZCBhcyBvcmlnaW5hbG5hbWVcclxuICAgIGxldCBmaWxlTmFtZSA9IERhdGUubm93KCkgKyBmaWxlLm9yaWdpbmFsbmFtZTtcclxuICAgIGNiKG51bGwsIGZpbGVOYW1lKTtcclxuICB9LFxyXG4gIC8vZmlsZW5hbWUgZ2l2ZSB0aGUgbmFtZSBvZiBmaWxlXHJcbn0pO1xyXG5cclxubGV0IGZpbGVGaWx0ZXIgPSAocmVxOiBSZXF1ZXN0LCBmaWxlOiBhbnksIGNiOiBhbnkpID0+IHtcclxuICBsZXQgdmFsaWRFeHRlbnNpb25zID0gW1xyXG4gICAgXCIuanBlZ1wiLFxyXG4gICAgXCIuanBnXCIsXHJcbiAgICBcIi5KUEdcIixcclxuICAgIFwiLkpQRUdcIixcclxuICAgIFwiLnBuZ1wiLFxyXG4gICAgXCIuc3ZnXCIsXHJcbiAgICBcIi5kb2NcIixcclxuICAgIFwiLnBkZlwiLFxyXG4gICAgXCIubXA0XCIsXHJcbiAgICBcIi5QTkdcIixcclxuICBdO1xyXG5cclxuICBsZXQgb3JpZ2luYWxOYW1lID0gZmlsZS5vcmlnaW5hbG5hbWU7XHJcbiAgbGV0IG9yaWdpbmFsRXh0ZW5zaW9uID0gcGF0aC5leHRuYW1lKG9yaWdpbmFsTmFtZSk7IC8vbm90ZSBwYXRoIG1vZHVsZSBpcyBpbmJ1aWx0IG1vZHVsZShwYWNrYWdlKSBvZiBub2RlIGpzIChpZSBubyBuZWVkIHRvIGluc3RhbGwgcGF0aCBwYWNrYWdlKVxyXG4gIGxldCBpc1ZhbGlkRXh0ZW5zaW9uID0gdmFsaWRFeHRlbnNpb25zLmluY2x1ZGVzKG9yaWdpbmFsRXh0ZW5zaW9uKTtcclxuXHJcbiAgaWYgKGlzVmFsaWRFeHRlbnNpb24pIHtcclxuICAgIGNiKG51bGwsIHRydWUpO1xyXG4gICAgLy90cnVlID0+aXQgbWVhbnMgIHBhc3Mgc3VjaCB0eXBlIG9mIGZpbGVcclxuICAgIC8vbm90ZSBudWxsIHJlcHJlc2VudCBlcnJvciBzaW5jZSB0aGVyZSBpcyBubyBlcnJvciB0aHVzIGVycm9yIGlzIG51bGxcclxuICB9IGVsc2Uge1xyXG4gICAgY2IobmV3IEVycm9yKFwiRmlsZSBpcyBub3Qgc3VwcG9ydGVkXCIpLCBmYWxzZSk7XHJcblxyXG4gICAgLy9mYWxzZSBtZWFucyBkb24ndCBwYXNzIHN1Y2ggdHlwZSBvZiBmaWxlXHJcbiAgfVxyXG59O1xyXG5cclxuY29uc3QgdXBsb2FkID0gbXVsdGVyKHtcclxuICBzdG9yYWdlOiBzdG9yYWdlLCAvL3dlIGRlZmluZSB0aGUgbG9jYXRpb24gaW4gc2VydmVyIHdoZXJlIHRoZSBmaWxlIGlzIHN0b3JlIGFuZCBjb250cm9sIHRoZSBmaWxlTmFtZVxyXG4gIGZpbGVGaWx0ZXI6IGZpbGVGaWx0ZXIsIC8vd2UgZmlsdGVyIChnZW5lcmFsbHkpIGFjY29yZGluZyB0byBleHRlbnNpb25cclxuICBsaW1pdHM6IGxpbWl0LCAvL3dlIGZpbHRlciBmaWxlIGFjY29yZGluZyB0byBpdHMgc2l6ZVxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHVwbG9hZDtcclxuXHJcbi8vIHZ2dnZ2dnZ2dnZ2dnZ2dmltcFxyXG4vL3VwbG9hZCBtaWRkZGxld2FyZSAgZG9lcyBmb2xsb3dpbmcgdGhpbmdcclxuLy8gMSkgdXBsb2FkIHNpbmdsZSBpbWFnZSBpZiB1cGxvYWQuc2luZ2xlIGlzIHVzZWQgIG9yIHVwbG9hZCBtdWx0aXBsZSBpbWFnZSBpZiB1cGxvYWQubXVsdGlwbGUgaXMgdXNlZFxyXG4vLzIpIGFkZCBib2R5KHRvIGdldCByZXEuYm9keSBpbiBmaWxlIGRhdGEgeW91IG11c3QgdXNlIG11bHRlcikgYW5kIGZpbGUob3IgZmlsZXMpIHRvIHJlcXVlc3QgaWUgeW91IGNhbiBnZXQgcmVxLmJvZHkgYW5kIHJlcS5maWxlXHJcbi8vMyBub3RlIHJlcS5maWxlIGZvciB1cGxvYWQuc2luZ2UgYW5kIHJlcS5maWxlcyBmb3IgdXBsb2FkLmFycmF5XHJcbi8vVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZJSUlJSUlNUFxyXG4vL3lvdSBtdXN0IHVzZSB1cGxvYWQgbWlkZGxlciB0byBnZXQgZm9ybSBkYXRhLlxyXG5cclxuLy9pbiBzaW1wbGV3b3JkIHRvIHVzZSBmb3JtIGRhdGFcclxuLy8gIGFkZCBleHByZXNzQXBwLnVzZSh1cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IHRydWUgfSkpOyAgYXQgaW5kZXguanMgZmlsZVxyXG4vL2FuZCB1c2UgdXBsb2FkICBtaWRkbGV3YXJlICggdG8gZ2V0IGZvcm0gZGF0YSlcclxuXHJcbi8vdG8gdXNlIHRoaXMgbWlkZGxld2FyZVxyXG4iXX0=