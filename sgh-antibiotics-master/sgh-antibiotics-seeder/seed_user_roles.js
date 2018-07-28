const Firestore = require('@google-cloud/firestore');

const firestore = new Firestore({
  projectId: 'sgh-antibiotics',
  keyFilename: './sgh-antibiotics-49a1d9f9be27.json',
});

const setRoleByEmail = (email, role = "superadmin") => firestore.collection('/users').where('email', '==', email).limit(1).get().then((snapshot) => {
  snapshot.forEach(user => {
    firestore.collection(`/users/${user.data().uid}/roles`).doc(role).set({name: role}).then(() => {
      console.log(`Role ${role} successfully added to ${email}`);
    }).catch((error) => console.error(`Error adding role ${role} to ${email}: ${error}`));
  });
});

setRoleByEmail('super@admin.sg');
