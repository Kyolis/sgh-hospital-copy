# Data Migration

This chapter describes how the data from the previous app was transferred to our new solution.

The old solution some students before us came up with consisted out of an Android App 
and a Webserver Sofware that was written in Java and was served with Apache Tomcat.
 
To change data, an admin could login to the Webserver and do some changes, which would be written to a SQLite database which was stored within a file. This file had a version and was provided on the internal Webserver in the hospital for download with the Android App. The Android App checked the version of the Database and could then download the changed database from the Webserver.

When they added data for a hospital, they provided a new SQLite-Database file for download from the Webserver. Users of the App had to enter a URL that pointed to this File to check for updates. If it was updated, then the App would eventually download the newer version of the Database, if the user were lucky enough to be in a room with internet access. 

For migration, we used a SQLite-DB file and created some **Seeder-Scripts**. These scripts can be found in the *sgh-antibiotics-seeder* folder.
Our scripts use Node.js, Google's **firebase-client** to upload the data to our new db and a library for reading the data from the SQLite-DB called **knex**.

Because *Google Firestore* is a Document-Oriented Database and some relations in the old database didn't really make sense in our new structure, we denormalized the data. 

For information on how to use the seeder, please have a look at the [readme](sgh-antibiotics-seeder/README.md) in the [sgh-antibiotics-seeder directory](sgh-antibiotics-seeder).

