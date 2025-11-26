import { BadRequestException, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { existsSync, mkdirSync } from "fs";
import { diskStorage, memoryStorage } from "multer";
import { extname } from "path";

export function imageUpload(fileName:string='file',foldername : string='',toCloud:boolean = false){
    return UseInterceptors(
        FileInterceptor(fileName,{

            storage:toCloud?memoryStorage():diskStorage({
                destination(req, file, callback) {
                    const uploadPath = `./uploads/${foldername}`;

                         if (!existsSync(uploadPath)) {
                       mkdirSync(uploadPath, { recursive: true });
                        }

                        callback(null, uploadPath);
                },
                filename(req, file, callback) {
                    const id = req.params?.id || "no-id"
                    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                    const ext = extname(file.originalname);
                    
                    callback(null,`${id}${uniqueName}${ext}`);
                },
            }),
            fileFilter(req, file, callback) {
                if(!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)){
                    return callback(new BadRequestException("onlu image files are allowed"),false)
                }
                callback(null,true)
            },
            limits:{
                fileSize: 5 * 1024 * 1024
            }
        })
    );
};