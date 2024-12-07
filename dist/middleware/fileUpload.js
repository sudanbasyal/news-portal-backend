"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const limit = {
    fileSize: 1024 * 1024 * 3, // 3Mb
};
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const staticFolder = "./public";
        cb(null, staticFolder);
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + file.originalname;
        cb(null, fileName);
    },
});
const fileFilter = (req, file, cb) => {
    const validExtensions = [
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
    const originalName = file.originalname;
    const originalExtension = path_1.default.extname(originalName);
    const isValidExtension = validExtensions.includes(originalExtension);
    if (isValidExtension) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: limit,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZVVwbG9hZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWRkbGV3YXJlL2ZpbGVVcGxvYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxvREFBbUU7QUFDbkUsZ0RBQXdCO0FBRXhCLE1BQU0sS0FBSyxHQUFHO0lBQ1osUUFBUSxFQUFFLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxFQUFFLE1BQU07Q0FDbEMsQ0FBQztBQUVGLE1BQU0sT0FBTyxHQUFrQixnQkFBTSxDQUFDLFdBQVcsQ0FBQztJQUNoRCxXQUFXLEVBQUUsQ0FBQyxHQUFZLEVBQUUsSUFBeUIsRUFBRSxFQUFZLEVBQUUsRUFBRTtRQUNyRSxNQUFNLFlBQVksR0FBVyxVQUFVLENBQUM7UUFDeEMsRUFBRSxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQsUUFBUSxFQUFFLENBQUMsR0FBWSxFQUFFLElBQXlCLEVBQUUsRUFBWSxFQUFFLEVBQUU7UUFDbEUsTUFBTSxRQUFRLEdBQVcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7UUFDeEQsRUFBRSxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNyQixDQUFDO0NBQ0YsQ0FBQyxDQUFDO0FBRUgsTUFBTSxVQUFVLEdBQUcsQ0FDakIsR0FBWSxFQUNaLElBQXlCLEVBQ3pCLEVBQXNCLEVBQ2hCLEVBQUU7SUFDUixNQUFNLGVBQWUsR0FBYTtRQUNoQyxPQUFPO1FBQ1AsTUFBTTtRQUNOLE1BQU07UUFDTixPQUFPO1FBQ1AsTUFBTTtRQUNOLE1BQU07UUFDTixNQUFNO1FBQ04sTUFBTTtRQUNOLE1BQU07UUFDTixNQUFNO0tBQ1AsQ0FBQztJQUVGLE1BQU0sWUFBWSxHQUFXLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDL0MsTUFBTSxpQkFBaUIsR0FBVyxjQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzdELE1BQU0sZ0JBQWdCLEdBQVksZUFBZSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBRTlFLElBQUksZ0JBQWdCLEVBQUUsQ0FBQztRQUNyQixFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2pCLENBQUM7U0FBTSxDQUFDO1FBQ04sRUFBRSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNsQixDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBRUYsTUFBTSxNQUFNLEdBQUcsSUFBQSxnQkFBTSxFQUFDO0lBQ3BCLE9BQU87SUFDUCxVQUFVO0lBQ1YsTUFBTSxFQUFFLEtBQUs7Q0FDZCxDQUFDLENBQUM7QUFFSCxrQkFBZSxNQUFNLENBQUM7QUFFdEIscUJBQXFCO0FBQ3JCLDBDQUEwQztBQUMxQyx1R0FBdUc7QUFDdkcsa0lBQWtJO0FBQ2xJLGlFQUFpRTtBQUNqRSwwQ0FBMEM7QUFDMUMsK0NBQStDO0FBRS9DLGdDQUFnQztBQUNoQyx5RUFBeUU7QUFDekUsZ0RBQWdEO0FBRWhELHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlcXVlc3QgfSBmcm9tICdleHByZXNzJztcclxuaW1wb3J0IG11bHRlciwgeyBGaWxlRmlsdGVyQ2FsbGJhY2ssIFN0b3JhZ2VFbmdpbmUgfSBmcm9tIFwibXVsdGVyXCI7XHJcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcblxyXG5jb25zdCBsaW1pdCA9IHtcclxuICBmaWxlU2l6ZTogMTAyNCAqIDEwMjQgKiAzLCAvLyAzTWJcclxufTtcclxuXHJcbmNvbnN0IHN0b3JhZ2U6IFN0b3JhZ2VFbmdpbmUgPSBtdWx0ZXIuZGlza1N0b3JhZ2Uoe1xyXG4gIGRlc3RpbmF0aW9uOiAocmVxOiBSZXF1ZXN0LCBmaWxlOiBFeHByZXNzLk11bHRlci5GaWxlLCBjYjogRnVuY3Rpb24pID0+IHtcclxuICAgIGNvbnN0IHN0YXRpY0ZvbGRlcjogc3RyaW5nID0gXCIuL3B1YmxpY1wiO1xyXG4gICAgY2IobnVsbCwgc3RhdGljRm9sZGVyKTtcclxuICB9LFxyXG5cclxuICBmaWxlbmFtZTogKHJlcTogUmVxdWVzdCwgZmlsZTogRXhwcmVzcy5NdWx0ZXIuRmlsZSwgY2I6IEZ1bmN0aW9uKSA9PiB7XHJcbiAgICBjb25zdCBmaWxlTmFtZTogc3RyaW5nID0gRGF0ZS5ub3coKSArIGZpbGUub3JpZ2luYWxuYW1lO1xyXG4gICAgY2IobnVsbCwgZmlsZU5hbWUpO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuY29uc3QgZmlsZUZpbHRlciA9IChcclxuICByZXE6IFJlcXVlc3QsXHJcbiAgZmlsZTogRXhwcmVzcy5NdWx0ZXIuRmlsZSxcclxuICBjYjogRmlsZUZpbHRlckNhbGxiYWNrXHJcbik6IHZvaWQgPT4ge1xyXG4gIGNvbnN0IHZhbGlkRXh0ZW5zaW9uczogc3RyaW5nW10gPSBbXHJcbiAgICBcIi5qcGVnXCIsXHJcbiAgICBcIi5qcGdcIixcclxuICAgIFwiLkpQR1wiLFxyXG4gICAgXCIuSlBFR1wiLFxyXG4gICAgXCIucG5nXCIsXHJcbiAgICBcIi5zdmdcIixcclxuICAgIFwiLmRvY1wiLFxyXG4gICAgXCIucGRmXCIsXHJcbiAgICBcIi5tcDRcIixcclxuICAgIFwiLlBOR1wiLFxyXG4gIF07XHJcblxyXG4gIGNvbnN0IG9yaWdpbmFsTmFtZTogc3RyaW5nID0gZmlsZS5vcmlnaW5hbG5hbWU7XHJcbiAgY29uc3Qgb3JpZ2luYWxFeHRlbnNpb246IHN0cmluZyA9IHBhdGguZXh0bmFtZShvcmlnaW5hbE5hbWUpO1xyXG4gIGNvbnN0IGlzVmFsaWRFeHRlbnNpb246IGJvb2xlYW4gPSB2YWxpZEV4dGVuc2lvbnMuaW5jbHVkZXMob3JpZ2luYWxFeHRlbnNpb24pO1xyXG5cclxuICBpZiAoaXNWYWxpZEV4dGVuc2lvbikge1xyXG4gICAgY2IobnVsbCwgdHJ1ZSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNiKG51bGwsIGZhbHNlKTtcclxuICB9XHJcbn07XHJcblxyXG5jb25zdCB1cGxvYWQgPSBtdWx0ZXIoe1xyXG4gIHN0b3JhZ2UsXHJcbiAgZmlsZUZpbHRlcixcclxuICBsaW1pdHM6IGxpbWl0LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHVwbG9hZDtcclxuXHJcbi8vIHZ2dnZ2dnZ2dnZ2dnZ2dmltcFxyXG4vL3VwbG9hZCBtaWRkZGxld2FyZSAgZG9lcyBmb2xsb3dpbmcgdGhpbmdcclxuLy8gMSkgdXBsb2FkIHNpbmdsZSBpbWFnZSBpZiB1cGxvYWQuc2luZ2xlIGlzIHVzZWQgIG9yIHVwbG9hZCBtdWx0aXBsZSBpbWFnZSBpZiB1cGxvYWQubXVsdGlwbGUgaXMgdXNlZFxyXG4vLzIpIGFkZCBib2R5KHRvIGdldCByZXEuYm9keSBpbiBmaWxlIGRhdGEgeW91IG11c3QgdXNlIG11bHRlcikgYW5kIGZpbGUob3IgZmlsZXMpIHRvIHJlcXVlc3QgaWUgeW91IGNhbiBnZXQgcmVxLmJvZHkgYW5kIHJlcS5maWxlXHJcbi8vMyBub3RlIHJlcS5maWxlIGZvciB1cGxvYWQuc2luZ2UgYW5kIHJlcS5maWxlcyBmb3IgdXBsb2FkLmFycmF5XHJcbi8vVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZJSUlJSUlNUFxyXG4vL3lvdSBtdXN0IHVzZSB1cGxvYWQgbWlkZGxlciB0byBnZXQgZm9ybSBkYXRhLlxyXG5cclxuLy9pbiBzaW1wbGV3b3JkIHRvIHVzZSBmb3JtIGRhdGFcclxuLy8gIGFkZCBleHByZXNzQXBwLnVzZSh1cmxlbmNvZGVkKHsgZXh0ZW5kZWQ6IHRydWUgfSkpOyAgYXQgaW5kZXguanMgZmlsZVxyXG4vL2FuZCB1c2UgdXBsb2FkICBtaWRkbGV3YXJlICggdG8gZ2V0IGZvcm0gZGF0YSlcclxuXHJcbi8vdG8gdXNlIHRoaXMgbWlkZGxld2FyZSJdfQ==