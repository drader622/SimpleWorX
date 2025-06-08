# SimpleWorx

This CRUD app allows an employee to submit a new work order request, which will update on any device that has the app open, and allow a different employee to respond to, close, or delete the request. Users can also edit their profiles and view 
the employee organization for the department they are apart of.

Check it out! <a href="https://simpleworx-4b92af93fce6.herokuapp.com">SimpleWorX App</a>

## How It Works
The employee can see a list of all the previously entered work orders. The user can click on any request to see the details or change the date of the request. The user can choose to respond, complete, or delete the task. The application usses Pusher to automatically update work orders for everyone who is logged in. User's can also edit and update their profile information. They can switch departments, job titles, crew assignments, or pay for their account.

## How To Use It
Once a user visits the site, they are prompted to login, signup, or reset password. User's can setup a new account or log in using one of the already created accounts:</br></br> *Email - Matt.Sharp@simpleworx.com</br>Password - adminadmin* </br></br>
Once logged in, user's are redirected to view the list of workorders in the system. They are sorted by most recent and includes the different statuses. </br></br>
![logIn](https://github.com/user-attachments/assets/eb51f9d0-fa4d-4200-9a25-6317477d41d4)</br></br>
![workOrders](https://github.com/user-attachments/assets/555e606a-f994-4ae2-a86d-8e4c18bb66b7)</br></br>

From here, users can either create a new work order that will be alerted to all other logged in users using Pusher, or view the details of a specific work order by clicking on the row. </br></br>
![createWorkOrder](https://github.com/user-attachments/assets/be5205aa-0a6d-4ab6-a089-11599928d18e)</br></br>
![workOrderDetails](https://github.com/user-attachments/assets/e0f4e265-3867-47da-8f6a-4ce3e026ec1b)</br></br>

From the user account page, the user can edit different details about their account and their work position. </br></br>
![account](https://github.com/user-attachments/assets/8886ec2e-f5ab-4a26-a1e5-02bd752c1de4)</br></br>

If users are wanting to view their work organization and see the head of their department and the details about other employees within their department, they can visit the team page. </br></br>
![team](https://github.com/user-attachments/assets/64804271-cf38-4b13-be24-06774707a5d7)



## How It's Made
Tech Used: HTML, CSS, JavaScript, Node.js, Express, MongoDB, Mongoose, EJS, Pusher

The app features multiple navigation buttons on the left side of the page that can be used to switch between different pages of the app. MongoDB is the database used to collect and store the information that is entered by the user. Pusher is used when a new work order is created, responded to, closed, or deleted and will update every app that is opened on any device.

## Lessons Learned
Developing this app has showed me how the backend of a node server is working and how to structure a server to listen for changes and send instant updates when one is made through pusher. Utilizing models and mongoose has also been pivotal to the efficiency of the program.


