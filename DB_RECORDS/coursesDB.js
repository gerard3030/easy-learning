const courseModule = require("../model/courses.model")

const addData = ()=>{
     courseModule.insertData(
      [{
        "courseName": "Vegan Food",
        "category": "food",
        "lecturer": "Emma Brown",
        "description": "vegan food can be much more delightful with Emma cooking",
        "courseImg": "food-1684854343648-977423086.jpg",
        "price": {
          "coursePrice": 30,
          "privetPrice": 30,
          "copyPrice": 15
        },
        "totalHours": 30,
        "isPrivetSession": false,
        "printCopy": {
          "copyStockAmount": 100,
          "isPrintAvailable": true
        },
        "addedBy": "646c4752b1bdfbcd72cebc52",
        "lecturerEmail":"Emma@lecturer.com"
      },{
        "courseName": "master cake",
        "category": "food",
        "lecturer": "Mark Jones",
        "description": "bake and cakes decorating",
        "courseImg": "bake1-1684854560704-880881880.jpg",
        "price": {
          "coursePrice": 30,
          "privetPrice": 30,
          "copyPrice": 15
        },
        "totalHours": 30,
        "isPrivetSession": false,
        "printCopy": {
          "copyStockAmount": 100,
          "isPrintAvailable": true
        },
        "addedBy": "646c4752b1bdfbcd72cebc52",
        "lecturerEmail":"Mark@lecturer.com"

      },{
        "courseName": "tasty holiday",
        "category": "food",
        "lecturer": "Ava Smith",
        "description": "worldwide holiday dinners",
        "courseImg": "bake-1684854693049-683286155.jpg",
        "price": {
          "coursePrice": 30,
          "privetPrice": 30,
          "copyPrice": 15
        },
        "totalHours": 30,
        "isPrivetSession": false,
        "printCopy": {
          "copyStockAmount": 100,
          "isPrintAvailable": true
        },
        "addedBy": "646c4752b1bdfbcd72cebc52",
        "lecturerEmail":"Ava@lecturer.com"
      },{
        "courseName": "HTML",
        "category": "Programming",
        "lecturer": "Shmuel Tal",
        "description": "start your coding journey",
        "courseImg": "html-1684854740176-24838720.jpg",
        "price": {
          "coursePrice": 30,
          "privetPrice": 30,
          "copyPrice": 15
        },
        "totalHours": 30,
        "isPrivetSession": false,
        "printCopy": {
          "copyStockAmount": 100,
          "isPrintAvailable": true
        },
        "addedBy": "646c4752b1bdfbcd72cebc52",
        "lecturerEmail":"Shmuel@lecturer.com"

      },{
        "courseName": "PHP",
        "category": "Programming",
        "lecturer": "sharon Maor",
        "description": "coding from scratch for beginners",
        "courseImg": "php-1684854924509-455957277.jpg",
        "price": {
          "coursePrice": 70,
          "privetPrice": 50,
          "copyPrice": 25
        },
        "totalHours": 30,
        "isPrivetSession": false,
        "printCopy": {
          "copyStockAmount": 100,
          "isPrintAvailable": true
        },
        "addedBy": "646c4752b1bdfbcd72cebc52",
        "lecturerEmail":"sharon@lecturer.com"
      },{
        "courseName": "Cyber",
        "category": "Programming",
        "lecturer": "Oleg Koresh",
        "description": "join the next generation for web worriers",
        "courseImg": "darknet-1684855063554-687511773.jpg",
        "price": {
          "coursePrice": 150,
          "privetPrice": 30,
          "copyPrice": 15
        },
        "totalHours": 30,
        "isPrivetSession": false,
        "printCopy": {
          "copyStockAmount": 100,
          "isPrintAvailable": true
        },
        "addedBy": "646c4752b1bdfbcd72cebc52",
        "lecturerEmail":"Oleg@lecturer.com"

      },{
        "courseName": "CSS",
        "category": "Programming",
        "lecturer": "sharon Maor",
        "description": "style like a pro",
        "courseImg": "tag-1684855266583-986086090.jpg",
        "price": {
          "coursePrice": 60,
          "privetPrice": 35,
          "copyPrice": 15
        },
        "totalHours": 150,
        "isPrivetSession": false,
        "printCopy": {
          "copyStockAmount": 100,
          "isPrintAvailable": true
        },
        "addedBy": "646c4752b1bdfbcd72cebc52",
        "lecturerEmail":"sharon@lecturer.com"
      },{
        "courseName": "mens do care",
        "category": "Beauty",
        "lecturer": "tom Cohen",
        "description": "style like a pro",
        "courseImg": "facemaskboy-1684855368799-658428105.jpg",
        "price": {
          "coursePrice": 40,
          "privetPrice": 35,
          "copyPrice": 15
        },
        "totalHours": 70,
        "isPrivetSession": false,
        "printCopy": {
          "copyStockAmount": 100,
          "isPrintAvailable": true
        },
        "addedBy": "646c4752b1bdfbcd72cebc52",
        "lecturerEmail":"tom@lecturer.com"
      },{
        "courseName": "Make Natural Cream making",
        "category": "Beauty",
        "lecturer": "tom Cohen",
        "description": "learn how to make your own natural skin care products",
        "courseImg": "facemaskgirl-1684855431229-974246464.jpg",
        "price": {
          "coursePrice": 40,
          "privetPrice": 35,
          "copyPrice": 15
        },
        "totalHours": 70,
        "isPrivetSession": false,
        "printCopy": {
          "copyStockAmount": 100,
          "isPrintAvailable": true
        },
        "addedBy": "646c4752b1bdfbcd72cebc52",
        "lecturerEmail":"tom@lecturer.com"
      },{
        "courseName": "Yoga for beginners",
        "category": "fitness",
        "lecturer": "mia Sanchez",
        "description": "calm your body and mind with yoga for beginners",
        "courseImg": "yoga-1684855471817-893045271.jpg",
        "price": {
          "coursePrice": 40,
          "privetPrice": 35,
          "copyPrice": 15
        },
        "totalHours": 70,
        "isPrivetSession": false,
        "printCopy": {
          "copyStockAmount": 100,
          "isPrintAvailable": true
        },
        "addedBy": "646c4752b1bdfbcd72cebc52",
        "lecturerEmail":"mia@lecturer.com"
      },{
        "courseName": "gain mass",
        "category": "fitness",
        "lecturer": "Diego Lopez",
        "description": "full guide for the fresh trainer",
        "courseImg": "book-1684855504246-586444324.jpg",
        "price": {
          "coursePrice": 40,
          "privetPrice": 35,
          "copyPrice": 15
        },
        "totalHours": 70,
        "isPrivetSession": false,
        "printCopy": {
          "copyStockAmount": 100,
          "isPrintAvailable": true
        },
        "addedBy": "646c4752b1bdfbcd72cebc52",
        "lecturerEmail":"Diego@lecturer.com"
      },{
        "courseName": "run for your life",
        "category": "fitness",
        "lecturer": "Alona Aviv",
        "description": "aerobic training for experienced trainers",
        "courseImg": "train_girl-1684855539293-980975243.jpg",
        "price": {
          "coursePrice": 40,
          "privetPrice": 35,
          "copyPrice": 15
        },
        "totalHours": 70,
        "isPrivetSession": false,
        "printCopy": {
          "copyStockAmount": 100,
          "isPrintAvailable": true
        },
        "addedBy": "646c4752b1bdfbcd72cebc52",
        "lecturerEmail":"Alona@lecturer.com"
      },{
        "courseName": "mindfulness",
        "category": "mindful",
        "lecturer": "sara sharon",
        "description": "connect to yourself",
        "courseImg": "river-1684855597508-991320095.jpg",
        "price": {
          "coursePrice": 40,
          "privetPrice": 35,
          "copyPrice": 15
        },
        "totalHours": 70,
        "isPrivetSession": false,
        "printCopy": {
          "copyStockAmount": 100,
          "isPrintAvailable": true
        },
        "addedBy": "646c4752b1bdfbcd72cebc52",
        "lecturerEmail":"sara@lecturer.com"

      },{
        "courseName": "Write as you feel",
        "category": "mindful",
        "lecturer": "Eviatar Kalman",
        "description": "from Poetry to spoken word",
        "courseImg": "alvaro-serrano-hjwKMkehBco-unsplash-1684855744880-641379432.jpg",
        "price": {
          "coursePrice": 40,
          "privetPrice": 35,
          "copyPrice": 15
        },
        "totalHours": 70,
        "isPrivetSession": false,
        "printCopy": {
          "copyStockAmount": 100,
          "isPrintAvailable": true
        },
        "addedBy": "646c4752b1bdfbcd72cebc52",
        "lecturerEmail":"Eviatar@lecturer.com"
      },{
        "courseName": "Drawing",
        "category": "Self care",
        "lecturer": "salvador silva",
        "description": "learn how to draw sketch matching colors",
        "courseImg": "color-1684856178126-419977569.jpg",
        "price": {
          "coursePrice": 30,
          "privetPrice": 30,
          "copyPrice": 15
        },
        "totalHours": 30,
        "isPrivetSession": false,
        "printCopy": {
          "copyStockAmount": 100,
          "isPrintAvailable": true
        },
        "addedBy": "646c4752b1bdfbcd72cebc52",
        "lecturerEmail":"salvador@lecturer.com"
      },{
        "courseName": "Kaballa",
        "category": "Self care",
        "lecturer": "Shira Bar Tal",
        "description": "get to know the mystery of the Kaballa with a spicy point of view",
        "courseImg": "hebrew-1684856328782-734611804.jpg",
        "price": {
          "coursePrice": 30,
          "privetPrice": 30,
          "copyPrice": 15
        },
        "totalHours": 30,
        "isPrivetSession": false,
        "printCopy": {
          "copyStockAmount": 100,
          "isPrintAvailable": true
        },
        "addedBy": "646c4752b1bdfbcd72cebc52",
        "lecturerEmail":"Shira@lecturer.com"
      }]
     )
}
module.exports = {addData};

