firebase-dbfake is a fake library to assist you in unit testing your JavaScript projects that store data in Firebase.

When you store data in firebase, you have two basic objects that you interact with:
* *reference* describes the location in your document store you would like to work with
* *dataSnapshot* a representation of the data at a reference

firebase-dbfake exposes four method to help you in your unit testing:
* *reference* returns you an object with the same api as a real Firebase reference, but it doesn't do much of anything. It does enable you to supply your own behavior needed for your tests.
* *snapshot* returns you an object with the same api as a real Firebase dataSnapshot, but it won't connect to Firebase.
* *resolveSnapshot* returns a promise that resolves a snapshot. You should use this when you mock your code that would interact with Firebase.
* *memoizeSnapshot* a short hand for writing a function that returns a promise which resolves a snapshot. Again, used when mocking your data layer.
The examples will show each of these in action.

The "Don't mock what you do not own" is a good policy. It makes it much easier to test your code. To make this
happen you provide a shim object around the real api. There are many ways to do this, but the In JavaScript is not difficult