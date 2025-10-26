
import config from "../../config/config";
import { Client, ID, Query, TablesDB } from "appwrite";

class DatabaseServices {
  client = new Client();
  database;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectid);
    this.database = new TablesDB(this.client);
  }

  creatingPost = async ({
    title,
    slug,
    content,
    featuredImage,
    status,
    userId,
  }) => {
    try {
      return this.database.createRow({
        databaseId: config.appwriteDatabaseid,
        tableId: config.appwriteTableid,
        rowId: slug,
        data: {
          title,
          content,
          featuredImage,
          status,
          userId,
        },
      });
    } catch (error) {
      console.log("we got error in creating post :: " + error);
      throw Error(error);
    }
  };

  updatingPost = async (slug,{ title, content, featuredImage, status }) => {
    try {
      return await this.database.updateRow(
        config.appwriteDatabaseid,
        config.appwriteTableid,
        slug,
        {
          title,
          content,
          status,
          featuredImage,
        }
      );
    } catch (error) {
      console.log("we got error in updating post :: " + error);
      throw Error(error);
    }
  };

  deletingPost = async (slug) => {
    try {
      await this.database.deleteRow(
    {databaseId:config.appwriteDatabaseid,
    tableId:config.appwriteTableid,
    rowId:slug}
      );
      return true
    } catch (error) {
      console.log("we got error in deleting post :: " + error);
      throw Error(error);
      return false;
      
    }
  };

  gettingaPost = async (slug)=>{

    try {
        return await this.database.getRow({
            databaseId:config.appwriteDatabaseid,
            tableId:config.appwriteTableid,
            rowId:slug,
        })
    } catch (error) {
        console.log("we got error in getting post :: " + error);
      throw Error(error);
    }
  }

  gettingPosts = async ()=>{

    
    try {
        return await this.database.listRows({
            databaseId:config.appwriteDatabaseid,
            tableId:config.appwriteTableid,
            queries :[Query.equal("status","active")]
        });
    } catch (error) {
         console.log("we got error in getting posts :: " + error);
      throw Error(error);
    }
  }

}


const databaseservices = new DatabaseServices();
export default databaseservices