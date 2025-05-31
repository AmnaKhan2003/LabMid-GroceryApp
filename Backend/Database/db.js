import mongoose from 'mongoose'

const db= async()=>{
    try {
       await mongoose.connect("mongodb+srv://amnakhan3756:AM%402003@grocerystore.wk2r7sc.mongodb.net/", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });

        console.log('✅ MongoDB Connected');
    }
    catch(error){
        console.log("Error in connecting with mongo db", error.message);
        process.exit(1);
    }
}
export default db;
