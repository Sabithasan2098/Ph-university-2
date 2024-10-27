export type IUser ={
    id:string;
    password:string;
    changePassword:boolean;
    role:"admin"| "student"|"user",
    status: "in-progress" | "blocked";
    isDeleted:boolean;
    // createdAt and updatedAt mongoose will give us
}