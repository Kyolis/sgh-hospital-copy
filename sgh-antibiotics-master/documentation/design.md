# Design
This document describes the software architecture behind the app. 

## The Database
*Google Firestore* is used as the database. 
It is a flexible, scalable database for mobile, web, and 
server development from Firebase and Google Cloud Platform. 
This is a Realtime Document-Oriented Database that has also 
support for offline persistence of data, called 
*Realtime Database* as you can subscribe to 
value changes using *Reactive Programming*.


## Reactive programming
*Reactive programming* is an asynchronous programming paradigm 
concerned with data streams and the propagation of change. It is not 
only able to express static or dynamic datas, it is able to infer 
dependency within the associated execution model exists, which 
facilitates the atomic propagation of the change involved with the 
data flow. 

Or in other words: [The Observer pattern done right](http://reactivex.io/)

*Example (from [this page](https://ipfs.io/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/wiki/Reactive_programming.html))*:

For example, in an imperative programming setting, ***a:=b+c***
would mean that ***a*** is being assigned the result of 
***b+c*** in the instant the expression is 
evaluated, and later, the values of ***b*** and/or 
***c*** can be changed with no effect on the value of 
***a***. However, in reactive programming, the value of 
***a*** is automatically updated whenever the values of 
***b*** and/or ***c*** change; without the 
program having to re-execute the sentence ***a:=b+c*** to determine the 
presently assigned value of ***a***.
  
## Session Service
To keep track of the user's state (e.g. login status, roles and the selected hospital) 
a *SessionService* is used on the client side.

This *SessionService* makes use of *Reactive Programming*. 
This means that changes in the state can be published via the *Publisher/Subscriber* or 
*Observer-Pattern* to all components that need to know the current state.

Every time a user logs in or out, is assigned a new role or selects a different hospital,
these changes are sent to the observers through a data stream called *Observable*. 
In this particular case it's a specialized Subclass of an Observable called *ReplaySubject*. 
This *ReplaySubject* allows new Subscribers to always get the last emitted (most recent) state of the session.

Depending on this session information, the UI can change Pages and show or hide specialized controls (i.e. for administrative functions).

## HospitalProvider
The *HospitalProvider* is responsible for managing hospital documents. He depends on the 
SessionService to get information about the user's choice of the hospital he would like to see/edit.

A lot of data is contained within a hospital, most other providers use the *HospitalProvider*
to get the *basePath*. The basePath reflects the selected hospital, selected db and release.
 
