import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form,Button } from "react-bootstrap";
import FormContainer from '../components/FormContainer.jsx';
import { useSelector,useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader.jsx";
import { setCredentials } from "../slices/authSlice.js";
import { useUpdateUserMutation } from "../slices/usersApiSlice.js";


const ProfileScreen = () => {
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [profileImage,setProfileImage] = useState(''); //for sotring selected image

    const PROFILE_IMAGE_DIR_PATH = "http://localhost:5000/uploads/";

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {userInfo} = useSelector((state)=>state.auth);

    const [updateProfile,{isLoading}] = useUpdateUserMutation();

    useEffect(()=>{
        setName(userInfo.name);
        setEmail(userInfo.email);
    },[userInfo.setName,userInfo.setEmail]);


    const submitHandler = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            toast.error("Passwords don't mathch");
        }else{
            const formData = new FormData(); // to handle file and other form data
            formData.append('_id',userInfo._id);
            formData.append('name',name);
            formData.append('email',email);
            if(password) formData.append('password',password); //send only if password is changed
            if(profileImage) formData.append('profileImage',profileImage); //attach the selected image

            try {
                // const res = await updateProfile({
                //     _id: userInfo._id,
                //     name,
                //     email,
                //     password
                // }).unwrap();
                const res = await updateProfile(formData).unwrap();
                dispatch(setCredentials({...res}));
                toast.success("Profile updated successfully");
                navigate('/');
            } catch (err) {
                toast.error(err?.data?.message || err.error)
            }
        }
    }
  return (
    <FormContainer>
        <h1>Update Profile</h1>
        <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e)=>setName(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group className='my-2' controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group className='my-2' controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group className='my-2' controlId="confirmPassword">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="profileImage">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control
                    type="file"
                    onChange={(e) => setProfileImage(e.target.files[0])}
                />
            </Form.Group>
            {isLoading && <Loader/>} 
            <Button type="submit" variant="primary" className="mt-3">
                Save changes
            </Button>
        </Form>
    </FormContainer>
  )
}

export default ProfileScreen

