# LearnNow

### Project Description
LearnNow is a mobile application that features a simple authentication module and enables users to access a list of contents divided into chapters, each containing multiple sections comprising text and images. With LearnNow, users can create an account, log in, and view their progress in completing the sections of each chapter. The app saves user progress locally and displays it through a progress bar. LearnNow is designed to resume from where the user left off the last time they used the app, making it a convenient and efficient tool for learning on the go.

### Features (All Completed)
1) The application is developed with React Native on the frontend and Firebase as the backend and database
2) App has an authentication module that allows users to create account with their email and password and also login. Authentication is done using Firebase Authentication.
3) When user logins, the **home** page will display his learning progress with a list of chapter overviews with the chapter name and their respective progress displayed with a progress bar. When user clicks on a chapter overview, he will navigate to the **chapter** page where it will display multiple sections. Each section will have its own title,description and image, it will also have a **checkbox** for user to mark that he has completed the section. Upon clicking the checkbox, progress will be updated accordingly.
4) **Bonus 1**  When user marks a section completed, the chapter progress will be updated locally using React Native AsyncStorage and it will also update the firebase database. Progress is then reflected on the chapter overview with a progress bar.
5) **Bonus 2** When user leaves the application, he will start from where he previously used the app. This is done so using the onStateChange and initalState props of NavigationContainer from react native to keep track of the navigation of pages. The tracking of the scroll position of that page is done so using the onMomentumScrollEnd and contentOffset props of ScrollView from react native.

### API documentation

Click [here](https://docs.google.com/document/d/1waiBZ7F7olAMtfhZew8ShKMdjZKRMIAEmTmFPtmlHko/edit?usp=sharing) to view the API documentation and Firebase Database Schema.

### Local Setup Instructions

This section introduces how to get LearnNow running on your local environment. 
1) cd LearnNow
2) npm install
3) npm start