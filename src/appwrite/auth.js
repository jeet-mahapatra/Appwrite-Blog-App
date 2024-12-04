import conf from "../conf/conf";

import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({email,password,name}){
       try {
        const userAccount = await this.account.create(ID.unique(), email,password,name)

        if(userAccount){
            //call another method
            return this.login({email,password})
        }
        else{
            return userAccount
        }
       } catch (error) {
        throw error
       }
    }

    async login({email,password}){
        try {
           return await this.account.createEmailPasswordSession(
                email, 
                password
            );
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
           const user = await this.account.get();

           if(user){
            return user;
           }
           else{
            return null
           }
        } catch (error) {
            console.log("Appwrite service getcurrnetUser Error::" , error);
  
        }
    }

    async logout(){
        try {
           return await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }
}



const authService = new AuthService();

export default authService