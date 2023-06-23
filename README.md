Project technology: NODE JS, Express, Mongoose – REST API Promises based.

easyLearning provides online courses and lectures for all aspects from programming to fitness from beauty to teaching, 
what make us special is that we are not only online shop, our clients enjoy the benefit of having hard copy of the course with 
exercises as well as 1 on 1 sessions with our team if needed, regardless Q&A section.

To Run the application please don’t forget:
-npm i
-npm run dev for development environment 
-npm start for production

after login you will need to pass the Token provided into headers under the name: token



Server functionality 
users: can register, login, reset password and view Courses available.
registered users: can submit new order(1 order per user and 1 product per order),
add courses to Wishlist (1 list per user and as many as u want per list ),
set new password,
admins: same abilities as users in addition to unblock user, reset password for any user, add edit delete courses


folder structure:
config - all files responsible for Token
middleware - files responsible for users token validation
model -  files responsible for all DB connection and creation
module - helpers function that will be used throw all over the routs
validation - contain additional validation for passed data throw request
env file - create global variables needed
app file - starter file that will run our server
routes - routs folder contain api file that manage all routing and navigation and 2 additional folders:
1 - no token needed : contain files that are accessible for all users.
2- token needed: contain files that only registered users can use, in there you will find addition 2 folders.
- adminApi: contain files and action that can be used for admins only such as adding product editing unlock users and more.
userApi - contain files that are only registers users can preform, such as, submit ore, adding to wish list and more.




 
routs in our server:
file location: API/noTokenNeeded
auth file: 
"/number" -GET request:  will show you all Courses in our DB - 3 products per page.  
courses file: 
"/register" - POST request – will register new user to DB
required fields: " firstName "  + "lastName" +"email" + "password" - as a STRING - optional: "phone" -STR, OBJ: address.country.city.street.houseNumber.zip -STR
"/login" - POST request – will login and create Token to user. A user has 3 login attempt before blocked.
 required filed: "email" + "password".
"/forgotPass" – POST request – will reset password for user (before login)
required filed: "email" + "newPassword" + "phone"  as STR

file location: API/TokenNeeded/adminApi   (only admin can preform)
clients file: 
"api/admin/unblock" - PATH request – will unblock blocked users
required fields: "email" (admin email)+ "password" (admin password) + "userUnblockEmail" (the email you want to unblock)

courses file: 
"api/admin/addCourse" - POST request – will add new course to DB,
By default new course will be created with coursePrice:15 , privetPrice(privetLesson):15, 
totalHours:15 printCopy.isPrintAvailable - True printCopy.copyStockAmount:15.
as well the admin ID that added course for additional record.

required fields: crouseName,
optional: "category","lecturer","description" as STR,  
OBJ: price.coursePrice.privetPrice (number), "totalHours":number, 
"isPrivetSession": true, false. 
"printCopy.isPrintAvailable" – true, false + "printCopy.copyStockAmount": number.

"api/admin/editCourse" - PATCH request – edit course
required fields: "productID"+ "filedToUpdate" + "dataUpdated" - as a STRING.

"api/admin/deleteCourse" -DELETE request – delete course
required fields: "productID".

file location: API/TokenNeeded/userApi

general file:
"api/users/reset" - PATCH request – available for admin / account owner.
required fields: "email" (admin/user email)+ "newPassword" + "phone".
wish file: 
"api/users/wish" - POST request - create / add course to wish list.
required fields: "productID".
By default a user can have only 1 wishlist with as many courses that he wishes, every course can be added one to avoid duplication.

order file:
"api/users/order" - POST request – create new order: available for admin / account owner.
required fields: "courseID"+ "userID".
By default every user can submit only one order with 1 course only per order.
the will be submitted without privet lessons / printed copy and will show order sum.
optional: "copiesNeeded" + "privetLesson" - as numbers - will show order sum, update printed copies in stock, 
will not give option to order print version if not available.


if you want to play around:

DB contain  MORE records
users.
  admins:
email: tal@gamil.co
password:  tal8987!C
phone:  0528322666

Standard users:
email: pazit@gamil.com 
password:  pazit887!L
phone:  052832299


Courses: without stock
courseID: 63fef8f73ebcd308ad8ed44d / 63fef91e3ebcd308ad8ed450
crouseName: anti aging / anti aging
category: beauty / beauty



hope you will find our server useful.
for any feedback / collaborations contact me at:  gerardtrigalo@gmail.com.
