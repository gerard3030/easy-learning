const usersModule = require("../model/users.model")

const addData = ()=>{
  usersModule.Users.insertMany([{
    "firstName": "tal",
    "lastName": "cohen",
    "email": "tal@gamil.com",
    "password": "$2a$10$8SJxDOnGwZhHduTFCSUMTu.gD2xl/dqDu3xlB3oz/Rs.aX6SR8UjK",
    "address": {
      "country": "israel",
      "city": "tel aviv",
      "street": "frishman",
      "houseNumber": "100",
      "zip": "475545"
    },
    "phone": "0528322666",
    "isAdmin": true,
    "accountSecurity": {
      "failedAttempts": 0,
      "isBlocked": false,
      "lastAttempt": {
        "$date": {
          "$numberLong": "1684817746190"
        }
      }
    }
  },{
    "firstName": "pablo",
    "lastName": "alboran",
    "email": "pablo@gamil.com",
    "password": "$2a$10$Y7u5Lhh4mt23yyyoDARQyu8MVZBzjcJ0o68x0SnWc10HL0wEzm7p6",
    "address": {
      "country": "spain",
      "city": "barcelona",
      "street": "la rambla",
      "houseNumber": "102",
      "zip": "4744475"
    },
    "phone": "0528322444",
    "isAdmin": false,
    "accountSecurity": {
      "failedAttempts": 0,
      "isBlocked": false,
      "lastAttempt": {
        "$date": {
          "$numberLong": "1684818000546"
        }
      }
    }
  },{
    "firstName": "pazit",
    "lastName": "levi",
    "email": "pazit@gamil.com",
    "password": "$2a$10$27UoRwr7UpRWtzFkpktQneH2IMUAwPDVvCPAfQjn4oKvuClL1vqs6",
    "address": {
      "country": "israel",
      "city": "tel aviv",
      "street": "ben yehuda",
      "houseNumber": "105",
      "zip": "474454"
    },
    "phone": "0528322999",
    "isAdmin": false,
    "accountSecurity": {
      "failedAttempts": 0,
      "isBlocked": false,
      "lastAttempt": {
        "$date": {
          "$numberLong": "1684818092464"
        }
      }
    }
  },{
    "firstName": "marta",
    "lastName": "lucchi",
    "email": "marta@gamil.com",
    "password": "$2a$10$DsUIYuxqeXj6Axpm02q97.ge5HOT5TJ3bbDwM5NqZ.i9Ot2dXzfL2",
    "address": {
      "country": "spain",
      "city": "madrid",
      "street": "gran via",
      "houseNumber": "108",
      "zip": "47455626"
    },
    "phone": "0528322777",
    "isAdmin": false,
    "accountSecurity": {
      "failedAttempts": 0,
      "isBlocked": false,
      "lastAttempt": {
        "$date": {
          "$numberLong": "1684819024226"
        }
      }
    }
  }])
  
}

module.exports = {addData};

