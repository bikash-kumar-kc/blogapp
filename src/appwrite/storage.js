import config from "../../config/config";
import {Client,Storage,ID,Permission,Role} from "appwrite";


class StorageServices{
    client= new Client();
    bucket;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectid)
        this.bucket = new Storage(this.client)
    }

    creatingFile = async (file)=>{

        try {
            
            return await this.bucket.createFile({
                bucketId:config.appwriteBucketid,
                fileId: ID.unique(),
                file:file,
                permissions: [ Permission.read(Role.any())] 
            })
        } catch (error) {
            console.log("problem in creating file :: "+error)
            throw Error(error)
        }
    }

    deletingFile = async (fileId)=>{

        try {
           return await this.bucket.deleteFile({
                bucketId:config.appwriteBucketid,
                fileId:fileId
            })
        } catch (error) {
            console.log("problem in deleting file :: "+error)
            throw Error(error)
        }
    }

   getFile = async (fileId)=>{
        try{
            console.log(fileId)
            
            const data= await this.bucket.getFileView({
                bucketId: config.appwriteBucketid,
                fileId:fileId
            })
            console.log(data)
            return data
        }catch(error){
            console.log("error in getting file"+error);
            throw Error(error)
        }
    }

}

const storage = new StorageServices();
export default storage;

// https://fra.cloud.appwrite.io/v1/storage/buckets/68f232f1000095b64900/files/68f4bc18003732bc8f7f/view?project=68f231390010b4e9279a&mode=admin