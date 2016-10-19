firebase-dbfake is a fake library to assist you in unit testing your JavaScript projects that store data in Firebase.

## Quick Overview
When you store data in firebase, you have two basic objects that you interact with:
* **reference** describes the location in your document store you would like to work with
* **dataSnapshot** a representation of the data at a reference

## Don't Mock What You Do Not Own
The book [Growing Object Oriented Software, Guided by Tests](http://www.amazon.com/Growing-Object-Oriented-Software-Guided-Tests/dp/0321503627)
states that you should never mock interfaces that you don't own. firebase-dbfakes is designed to make it simple for
you to obey this principle.
When you call once() on a reference, you get back a promise and if all goes well that resolves to a DataSnapshot.
The core principle that started firebase-dbfake is that you don't own once() and you should have a shim that calls it.
The shim returns you a promise which resolves to a DataSnapshot. Once you have that in place, you can inject a
firebase-dbfake.snapshot and unit test to your hearts content.

## firebase-dbfake
firebase-dbfake exposes four methods to help you in your unit testing:
* **reference** returns you an object with the same api as a real Firebase reference, but it doesn't do much of anything.
It does enable you to supply your own behavior needed for your tests.
* **snapshot** returns you an object with the same api as a real Firebase dataSnapshot, but it won't connect to Firebase.
* **resolveSnapshot** returns a promise that resolves a snapshot. You should use this when you mock your code that would
interact with Firebase.
* **memoizeSnapshot** a short hand for writing a function that returns a promise which resolves a snapshot. Again, used
when mocking your data layer.
