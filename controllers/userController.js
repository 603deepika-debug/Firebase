const db=require('../firebase');
const usersRef=db.ref('users');

exports.getUsers=async(req,res)=>{
    try{
        const snapshot=await usersRef.once('value');     //data fetch
        let users=[];
        snapshot.forEach((childSnapshot)=>{
            users.push({
                id:childSnapshot.key,
                ...childSnapshot.val()
            });
        });
        res.render('index',{users});
    }
    catch(error){
        res.send(error.message);
    }
};

exports.addUserForm=(req,res)=>{
    res.render('add-user');
};

exports.createUser=async(req,res)=>{
    try{
        const{name,email,age}=req.body;
        const snapshot=await usersRef.orderByChild('email').equalTo(email).once('value');
        if(snapshot.exists()){
            return res.render('add-user',{errorMessage:'User already exists with this email'});
        }
        await usersRef.push({name,email,age});
        res.redirect('/');
    }
    catch(error){
        res.send(error.message);
    }
};

exports.editUserForm=async(req,res)=>{
    try{
        const snapshot=await usersRef.child(req.params.id).once('value');
        if(!snapshot.exists()){
            return res.send('User not found');
        }
        res.render('edit-user',{
            user:{
                id:snapshot.key,
                ...snapshot.val()
            }
        });
    }
    catch(error){
        res.send(error.message);
    }
};

exports.updateUser=async(req,res)=>{
    try{
        const{name,email,age}=req.body;
        await usersRef.child(req.params.id).update({name,email,age});
        res.redirect('/');
    }
    catch(error){
        res.send(error.message);
    }
};

exports.deleteUser=async(req,res)=>{
    try{
        await usersRef.child(req.params.id).remove();
        res.redirect('/');
    }
    catch(error){
        res.send(error.message);
    }
};