Directory Guide
===============
This is guide describes the overall layout and framework of the pages and components within the application.

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
![Image of Admin Antimicrobial Navbar](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/admin_antimicrobial_navbar.jpg?alt=media&token=a3e8c78b-34c3-42c8-ac38-4b2ec0bbf9ff)
![Image of Antimicrobial Edit Mode](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/antimicrobial_edit_mode.jpg?alt=media&token=9aaf08da-bd9a-4126-bb35-6cd84bb407b5)
![Image of Add New Antimicrobial Group Button](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/add_new_antimicrobial_group_button.jpg?alt=media&token=42f7451c-90a1-4c70-b2d0-41cabdbf0ef8)
![Image of Add New Antimicrobial Group](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/add_new_antimicrobial_group.jpg?alt=media&token=ee8e4596-27c6-40f0-8bde-4834d87cea6d)

**Steps:**
1. Select **Antimicrobials** from side navigation 
2.	On “Edit” toggle button
3.	Press/Tap plus icon
4.	Enter Antimicrobial Group Name
5.	Press/Tap “Add” button

## 2. Edit Antimicrobial Group
![Image of Admin Antimicrobial Navbar](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/admin_antimicrobial_navbar.jpg?alt=media&token=a3e8c78b-34c3-42c8-ac38-4b2ec0bbf9ff)
![Image of Antimicrobial Edit Mode](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/antimicrobial_edit_mode.jpg?alt=media&token=9aaf08da-bd9a-4126-bb35-6cd84bb407b5)
![Image of Animicrobial Edit Button](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/antimicrobial_delete_button.jpg?alt=media&token=97b847aa-30e2-4cdd-b19c-52bef4470569)
![Image of Edit Antimicrobial Group](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/edit_antimicrobial_group.jpg?alt=media&token=c5518ef5-7def-4868-8aee-471fb0bc1c1f)

**Steps:**
1. Select **Antimicrobials** from side navigation 
2.	Set “Edit” toggle button to "On"
3.	Press/Tap edit icon
4.	Enter New Antimicrobial Group Name
5.	Press/Tap “Save” button

## 3. Delete Antimicrobial Group
![Image of Admin Antimicrobial Navbar](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/admin_antimicrobial_navbar.jpg?alt=media&token=a3e8c78b-34c3-42c8-ac38-4b2ec0bbf9ff)
![Image of Antimicrobial Edit Mode](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/antimicrobial_edit_mode.jpg?alt=media&token=9aaf08da-bd9a-4126-bb35-6cd84bb407b5)
![Image of Animicrobial Delete Button](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/antimicrobial_delete_button.jpg?alt=media&token=97b847aa-30e2-4cdd-b19c-52bef4470569)
![Image of Delete Antimicrobial Group](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/crub65.jpg?alt=media&token=f07c083f-10a9-4d18-aa9d-e73e8363f85d)

**Steps:**
1. Select **Antimicrobials** from side navigation 
2.	Set “Edit” toggle button to "On"
3.	Press/Tap delete icon
4.	Check “Delete related antimicrobials” if necessary
5.	Press/Tap “Delete” button

## 4. Add New Antimicrobial
![Image of Admin Antimicrobial Navbar](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/admin_antimicrobial_navbar.jpg?alt=media&token=a3e8c78b-34c3-42c8-ac38-4b2ec0bbf9ff)
![Image of Antimicrobial Edit Mode](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/antimicrobial_edit_mode.jpg?alt=media&token=9aaf08da-bd9a-4126-bb35-6cd84bb407b5)
![Image of Add New Antimicrobial Button](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/add_new_antimicrobial_button.jpg?alt=media&token=2052de7a-8005-4cfc-a7ac-c3f3ad11e833)
![Image of Add New Antimicrobial](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/add_new_antimicrobial.jpg?alt=media&token=f5723bc0-4db6-4c5d-9169-c7e04c52e018)

**Steps:**
1. Select **Antimicrobials** from side navigation 
2.	Set “Edit” toggle button to "On"
3.	Press/Tap plus icon
4.	Enter Antimicrobial Name
5.	Press/Tap “Add” button

## 5. Edit Antimicrobial Details
![Image of Admin Antimicrobial Navbar](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/admin_antimicrobial_navbar.jpg?alt=media&token=a3e8c78b-34c3-42c8-ac38-4b2ec0bbf9ff)
![Image of Antimicrobial Edit Mode](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/antimicrobial_edit_mode.jpg?alt=media&token=9aaf08da-bd9a-4126-bb35-6cd84bb407b5)
![Image of Select Antimicrobial](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/select_antimicrobial.jpg?alt=media&token=d717c9c9-5128-4c44-bd79-742562c971fa)
![Image of Edit Antimicrobial Details](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/edit_antimicrobial_details.jpg?alt=media&token=a20fa2f5-bf1e-4381-8eb1-914bb579c0bb)

**Steps:**
1. Select **Antimicrobials** from side navigation 
2.	Set “Edit” toggle button to "On"
3.	Select Antimicrobial
4.	Amend changes to Antimicrobial information

---

# Infections

---

# Guidelines
## 1. Add New Guideline
![Image of Admin Guidelines Navbar](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/admin_guidelines_navbar.jpg?alt=media&token=f791c1ba-be95-41e5-bf37-c289c9699f41)
![Image of Guidelines Edit Mode](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/guideline_edit_mode.jpg?alt=media&token=db2fd047-cd4f-4da5-899c-62dce5899aee)
![Image of Add New Guideline Button](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/add_new_guideline_button.jpg?alt=media&token=6cef5f98-71ae-459f-8ad4-d87816fec5b3)
![Image of Add New Guideline](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/add_new_guideline.jpg?alt=media&token=c571848e-2d2c-45bb-86a3-a5aa97d5550a)

**Steps:**
1. Select **Guidelines** from side navigation 
2.	Set “Edit” toggle button to "On"
3.	Press/Tap plus icon
4.	Enter Guideline Name
5.	Press/Tap “Add” button

## 2. Edit Guideline Name
![Image of Admin Guidelines Navbar](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/admin_guidelines_navbar.jpg?alt=media&token=f791c1ba-be95-41e5-bf37-c289c9699f41)
![Image of Guidelines Edit Mode](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/guideline_edit_mode.jpg?alt=media&token=db2fd047-cd4f-4da5-899c-62dce5899aee)
![Image of Add Edit Guideline Button](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/edit_guideline_button.jpg?alt=media&token=153e6a78-254e-4a07-a1d7-0f83e09a7ba6)
![Image of Add Edit Guideline Name](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/edit_guideline_name.jpg?alt=media&token=87770de1-a484-4cc3-8e9a-579ba731f0d8)

**Steps:**
1. Select **Guidelines** from side navigation 
2.	Set “Edit” toggle button to "On"
3.	Press/Tap edit icon
4.	Enter New Guideline Name
5.	Press/Tap “Save” button

## 3. Delete Guideline
![Image of Admin Guidelines Navbar](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/admin_guidelines_navbar.jpg?alt=media&token=f791c1ba-be95-41e5-bf37-c289c9699f41)
![Image of Guidelines Edit Mode](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/guideline_edit_mode.jpg?alt=media&token=db2fd047-cd4f-4da5-899c-62dce5899aee)
![Image of Delete Guidelines Button](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/delete_guideline.jpg?alt=media&token=c3c032b8-0dbf-4404-9912-39309df6aba1)
![Image of Delete Guidelines](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/delete_guideline.jpg?alt=media&token=c3c032b8-0dbf-4404-9912-39309df6aba1)

**Steps:**
1. Select **Guidelines** from side navigation 
2.	Set “Edit” toggle button to "On"
3.	Press/Tap delete icon
4.	Press/Tap “Delete” button

## 4. Edit Guideline Information
![Image of Admin Guidelines Navbar](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/admin_guidelines_navbar.jpg?alt=media&token=f791c1ba-be95-41e5-bf37-c289c9699f41)
![Image of Guidelines Edit Mode](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/guideline_edit_mode.jpg?alt=media&token=db2fd047-cd4f-4da5-899c-62dce5899aee)
![Image of Select Guideline](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/select_guideline.jpg?alt=media&token=54519c29-666b-4158-9dd1-19e793d81bfa)
![Image of Edit Guideline Information](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/edit_guideline_information.jpg?alt=media&token=b03ef0d3-8b70-4189-b8f8-d4409baf8c67)

**Steps:**
1. Select **Guidelines** from side navigation 
2.	Set “Edit” toggle button to "On"
3.	Select Guideline
4.	Edit Guideline information accordingly 
5.	Press/Tap “Save” button to save changes
6.	Edit mode turned off to view changes

---

# User Management

*Hint: Only Super-Admins can see this Page and manage user roles.* 

## 1. Search Users
![Image of Admin User Management Navbar](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/admin_user_management_navbar.jpg?alt=media&token=eaeb12b8-fd03-44d2-a755-26da344a5907)
![Image of Select User](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/select_user.jpg?alt=media&token=a76483f4-5f36-4382-b079-a9683cab2d32)
![Image of Search Users](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/search_users.jpg?alt=media&token=ac686aea-bfd5-42fa-af62-0f932edb85fb)

**Steps:**
1. Select **User Management** from side navigation 
2.	Enter search input in search bar
3.	Users will be filtered out with corresponding results

## 2. View User Details
![Image of Admin User Management Navbar](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/admin_user_management_navbar.jpg?alt=media&token=eaeb12b8-fd03-44d2-a755-26da344a5907)
![Image of Select User](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/select_user.jpg?alt=media&token=a76483f4-5f36-4382-b079-a9683cab2d32)
![Image of View User Details](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/view_user_details.jpg?alt=media&token=4026160f-c5b1-4248-97c1-65337584d93c)

**Steps:**
1. Select **User Management** from side navigation
2.	Select User
3.	Display User information

## 3. Grant/Remove Superadmin Right
![Image of Admin User Management Navbar](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/admin_user_management_navbar.jpg?alt=media&token=eaeb12b8-fd03-44d2-a755-26da344a5907)
![Image of Select User](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/select_user.jpg?alt=media&token=a76483f4-5f36-4382-b079-a9683cab2d32)
![Image of Superadmin Right](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/superadmin_right.jpg?alt=media&token=b44f9fd2-8253-4375-8758-3c89b861fca7)

**Steps:**
1. Select **User Management** from side navigation
2.	Select User
3.	Use “Superadmin” toggle button

## 4. Grant/Remove Hospital Admin Right
![Image of Admin User Management Navbar](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/admin_user_management_navbar.jpg?alt=media&token=eaeb12b8-fd03-44d2-a755-26da344a5907)
![Image of Select User](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/select_user.jpg?alt=media&token=a76483f4-5f36-4382-b079-a9683cab2d32)
![Image of Hospital Admin Right](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/hospital_admin_right.jpg?alt=media&token=91862200-02dd-4ca8-a34c-0bbb271fcd5d)

**Steps:**
1. Select **User Management** from side navigation
2.	Select User
3.	Use “Hospital Admin” toggle button

---

# Hospital Management

The data which is shown to the users is organized in **releases**.

This means you can only make changes to the **staging db**.

All users will at any time only see the data in the **live db**, to which you 
always can switch in your settings. 

When you are finished with your changes on the *staging db*, you can generate a new *release* from your data in the 
*staging db* (see *Add New Database Release*).
These releases can then be deployed to all users (see *Set Release as Live Database*). 

## 1. Search Hospital
![Image of Admin Hospital Management Navbar](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/admin_hospital_management_navbar.jpg?alt=media&token=99becbd0-8522-4f77-b8b9-63852b4e5cd0)
![Image of Select Hospital](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/hospital_select_hospital.jpg?alt=media&token=6bd89db5-9c9d-42d0-8cee-62aefc97d2c4)
![Image of Search Hospital](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/admin_search_hospital.jpg?alt=media&token=1882bef8-2e6d-4d88-87b3-9d76e9499624)

**Steps:**
1. Select **Hospital Management** from side navigation
2.	Enter search input in search bar
3.	Hospital will be filtered out with corresponding results

## 2. View Hospital Details
![Image of Admin Hospital Management Navbar](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/admin_hospital_management_navbar.jpg?alt=media&token=99becbd0-8522-4f77-b8b9-63852b4e5cd0)
![Image of Select Hospital](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/hospital_select_hospital.jpg?alt=media&token=6bd89db5-9c9d-42d0-8cee-62aefc97d2c4)
![Image of View Hospital Details](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/view_hospital_details.jpg?alt=media&token=425d3278-fcfa-4700-a77a-498d61885daa)

**Steps:**
1. Select **Hospital Management** from side navigation
2.	Select Hospital
3.	Display Hospital information

## 3. Add Hospital
![Image of Admin Hospital Management Navbar](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/admin_hospital_management_navbar.jpg?alt=media&token=99becbd0-8522-4f77-b8b9-63852b4e5cd0)
![Image of Select Hospital](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/hospital_select_hospital.jpg?alt=media&token=6bd89db5-9c9d-42d0-8cee-62aefc97d2c4)
![Image of Edit Mode](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/hospital_editmode.jpg?alt=media&token=862472d5-ff65-450d-a44b-42772a08034b)
![Image of Add Hospital Button](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/add_hospital_button.jpg?alt=media&token=6ebaf5d5-85c6-4214-b8a2-b6f5cf23e064)
![Image of Add Hospital](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/add_hospital.jpg?alt=media&token=8f1d3bda-ffc9-4fbc-a32a-f109baa3364e)

**Steps:**
1. Select **Hospital Management** from side navigation
2.	Set “Edit” toggle button to "On"
3.	Press/Tap plus icon
4.	Enter Hospital Name and Hospital ID
5.	Indicate import preferences
6.	Press/Tap “Add” button

## 4. Edit Hospital Name
![Image of Admin Hospital Management Navbar](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/admin_hospital_management_navbar.jpg?alt=media&token=99becbd0-8522-4f77-b8b9-63852b4e5cd0)
![Image of Edit Mode](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/hospital_editmode.jpg?alt=media&token=862472d5-ff65-450d-a44b-42772a08034b)
![Image of Select Hospital](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/edit_select_hospital.jpg?alt=media&token=09a1b6cf-4cf4-4199-ab99-30b7bb5e1819)
![Image of Edit Hospital Name](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/edit_hospital_name.jpg?alt=media&token=7c2a5bae-4b74-4128-b333-b939a965fa21)

**Steps:**
1. Select **Hospital Management** from side navigation
2. Set “Edit” toggle button to "On"
3. Select Hospital
4. Press/Tap edit icon

## 5. Delete Hospital
At the moment, deleting an hospital with cloud firestore (the database this App is using) is only possible
with the [Firebase Console](https://console.firebase.google.com/project/sgh-antibiotics/database/firestore).

To do so, you need to open [this link](https://console.firebase.google.com/project/sgh-antibiotics/database/firestore) 
and follow these steps:

**Steps:**

1. Open the Firebase Console by clicking on the [this link](https://console.firebase.google.com/project/sgh-antibiotics/database/firestore)
2. Click on **hospitals**
3. Select the **hospital**-Document you want to delete. Because the names might be auto-generated,
you can have a look at the **name**-Field of the selected hospital to be shure you have selected the right one.
4. Above the window that shows the Information of the selected hospital, click on the **menu**-Button
and select **Delete document** (as shown in the image below).

![Image of Delete Hospital](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/Firebase_Console_Delete_Hospital.png?alt=media&token=9ef61cd1-11ea-4b1a-9119-707054fe7a27)

## 6. Add New Database Release
![Image of Admin Hospital Management Navbar](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/admin_hospital_management_navbar.jpg?alt=media&token=99becbd0-8522-4f77-b8b9-63852b4e5cd0)
![Image of Edit Mode](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/hospital_editmode.jpg?alt=media&token=862472d5-ff65-450d-a44b-42772a08034b)
![Image of Select Hospital](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/edit_select_hospital.jpg?alt=media&token=09a1b6cf-4cf4-4199-ab99-30b7bb5e1819)
![Image of Add Release Button](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/add_release_button.jpg?alt=media&token=10a1e0c7-263f-462e-8165-16d713f6e2f5)
![Image of Add Comments](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/abw.jpg?alt=media&token=a6a6af78-289c-48c6-957e-b8f44b8ead09)

**Steps:**
1. Select **Hospital Management** from side navigation
2. Set “Edit” toggle button to "On"
3. Select Hospital
4. Press/Tap plus icon
5. Add comments to new release

## 7. Set Release as Live Database
![Image of Admin Hospital Management Navbar](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/admin_hospital_management_navbar.jpg?alt=media&token=99becbd0-8522-4f77-b8b9-63852b4e5cd0)
![Image of Edit Mode](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/hospital_editmode.jpg?alt=media&token=862472d5-ff65-450d-a44b-42772a08034b)
![Image of Select Hospital](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/edit_select_hospital.jpg?alt=media&token=09a1b6cf-4cf4-4199-ab99-30b7bb5e1819)
![Image of Deploy Button](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/deploy_button.jpg?alt=media&token=b62c412d-3abe-4583-a9e8-a9aa7461155e)

**Steps:**
1. Select **Hospital Management** from side navigation
2.	Set “Edit” toggle button to "On"
3.	Select Hospital
4.	Press/Tap “Deploy” button

---

# Settings
## 1. Change Database
![Image of Admin Settings Navbar](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/admin_settings_navbar.jpg?alt=media&token=987ea91c-c3f2-4bb4-b736-7bf5ce4e7066)
![Image of Change Database](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/cge.jpg?alt=media&token=cd8ccfa0-ce06-43f4-aa5c-161d2076ca4c)

**Steps:**
1. Select **Settings** from side navigation
2.	Select Database type (staging/live)

## 2. Enable Edit Mode for all Pages
![Image of Admin Settings Navbar](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/admin_settings_navbar.jpg?alt=media&token=987ea91c-c3f2-4bb4-b736-7bf5ce4e7066)
![Image of Master Edit Mode](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/master_edit_mode.jpg?alt=media&token=fe528eb4-913b-4a33-8f29-f74e62eccd70)

**Steps:**
1. Select **Settings** from side navigation
2.	Set “Edit” toggle button to "On"

## 3. Manage Releases
![Image of Admin Settings Navbar](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/admin_settings_navbar.jpg?alt=media&token=987ea91c-c3f2-4bb4-b736-7bf5ce4e7066)
![Image of Manage Release](https://firebasestorage.googleapis.com/v0/b/sgh-antibiotics.appspot.com/o/manage_release.jpg?alt=media&token=97257915-46bc-438a-9c16-2d1349f87ce1)

**Steps:**
1. Select **Settings** from side navigation
2.	Press/Tap “Manage Releases” button

Here you can deploy a release to all users. A click on **deploy** will set the release as the 
**live db** which is then shown to all users.

---
