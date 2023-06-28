const mongoose = require('mongoose');
const mongoURI = 'mongodb://food_delievery:food123g@ac-vslx283-shard-00-00.rtmbcdt.mongodb.net:27017,ac-vslx283-shard-00-01.rtmbcdt.mongodb.net:27017,ac-vslx283-shard-00-02.rtmbcdt.mongodb.net:27017/foodData?ssl=true&replicaSet=atlas-frecvi-shard-0&authSource=admin&retryWrites=true&w=majority'

// const mongoDBConnect = async()=>{

//     await mongoose.connect(mongoURI,{useNewUrlParser : true},async(err,result)=>{
//         if(err) console.log("----",err)
//         else{
//             console.log("connected");
//             const fetchedData = await mongoose.connection.db.collection("foodItems");

//             fetchedData.find({}).toArray(async function (err , data){
//               const foodCategory = await mongoose.connection.db.collection("foodItems");
//                 // if(err)
//                 // {
//                 //     console.log(err);
//                 // }
//                 // // console.log(data);
//                 // console.log("");

//             })
//         }
        
//     });

// }

const mongoDBConnect = async () => {
    try {
      await mongoose.connect(mongoURI, { useNewUrlParser: true });
      console.log("Connected to MongoDB");
      const fetchedData = await mongoose.connection.db.collection("foodItems");
      const data = await fetchedData.find({}).toArray();
      // console.log(data);
      global.food_items = data ;
      // console.log(global.food_items);


      const categoriesCollection = await mongoose.connection.db.collection("foodCategory");
      const categoryData = await categoriesCollection.find({}).toArray();
      global.food_category = categoryData ;
      // console.log(global.food_category);

    } catch (err) {
      console.error("Error connecting to MongoDB:", err);
    }
  };


module.exports = mongoDBConnect ;

