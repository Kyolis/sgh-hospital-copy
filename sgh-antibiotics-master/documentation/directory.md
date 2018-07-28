Directory Guide
===============
This guide describes the overall layout and framework of the pages and components within the application.

Kindly update and make changes to **this** document where necessary.

# Introduction

This application is made up of several pages and ionic components. 

Ionic apps are made of high-level building blocks called components. Components allow you to quickly construct an interface for your app. Ionic comes with a number of components, including modals, popups, and cards.

**Components** are simply the objects that make up a page of an application and can be either classified as:
1. A sub-page within an entire page
2. Actual components such as buttons, navigation-bar

The files within the application has been pre-structured and pre-defined with each folder serving a different purpose.

![Image of Ma](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/file-folders.JPG?alt=media&token=34c3e752-58c2-42d1-9544-967d56957141)

**Important folders** to note:
1. **documentation:** *contains majority of the application's documentation, guides, aes documents and where images that are being used within the app is being stored.
2. **e2e:** *folder containing typescript files used for running end-to-end automated test cases and a page-object folder along to store references of page components. 
3. **functions:** *contains javascript files mainly handling functions pertaining database releases of the application.
4. **sgh-antibiotics-seeder:** *contains seeder files and documentation that describes how the data from the previous versions of the app. For information on how to use the seeder, please have a look at the [readme](sgh-antibiotics-seeder/README.md) in the [sgh-antibiotics-seeder directory](sgh-antibiotics-seeder).
5. **src:** *Inside of the src directory we find our code. This is where most of the work for an Ionic app will take place. When we run ionic serve, our code inside of src/ is transpiled into the correct Javascript version that the browser understands (currently, ES5)
 
## 1. Login Page

The wizard page which lets users log in and register for an account.

####Directory:

- src>pages>wizard 

(wizard.html, wizard.module.ts, wizard.scss, wizard.ts)

-  src>validators

(PasswordValidation.ts)

This file verifies the passwords that are input into the wizard page.

-----
## 2. Antibiotics Page(s)

This is where users can view antibiotics and details like recommended dosage.

####Directory:

- src>

-----
## 3. Infections page(s)


-----
## 4. Calculator Page


-----
## 5. Guidelines Page


-----
## 6. User Management Page


-----
## 7. Hospital Management Page


-----
## 8. Settings Page

A settings page where users can configure their accounts.

Admins can set edit mode and manage database in this page.

####Directory:

- src>pages>user-settings

(user-settings.moduel.ts, user-settings.html, user-settings.scss, user-settings.ts)


-----
## 9. About Page

Show general project information like about and disclaimer.

####Directory:

- src>pages>about

(about.html, about.module.ts, about.scss, about.ts)

-----
## 10. Admin Guide Page

A written guide on how to perform admin tasks.

####Directory:

- src>pages>user-guide

(user-guide.html, user-guide.module.ts, user-guide.scss, user-guide.ts)

Admin guide and User guide share the same files.


-----
## 11. User Guide Page

A written guide on how to operate the application as a normal user.

####Directory:

- src>pages>user-guide

(user-guide.html, user-guide.module.ts, user-guide.scss, user-guide.ts)

Admin guide and User guide share the same files.




