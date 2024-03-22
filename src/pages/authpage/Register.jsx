import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  // Checkbox,
  Button,
} from "@material-tailwind/react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "./Authprovider";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user, createUser, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <span className="loading loading-dots loading-lg flex item-center mx-auto"></span>
      </div>
    );
  }

  if (user) {
    navigate("/");
  }

  const addUserToDatabase = async (email, uid) => {
    const userCollectionRef = collection(db, "ticketer_user");
    const documentData = {
      email: email,
      uid: uid,
    };
    const documnetRef = doc(userCollectionRef, uid);
    await setDoc(documnetRef, documentData);
  };
  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    createUser(email, password).then((user) => {
      console.log('THE USER ID ISSS',user.uid);
      const userCollectionRef = collection(db, "ticketer_user");
      const documentData = {
        email: user.email,
        uid: user.uid,
      };
      const documnetRef = doc(userCollectionRef, user.uid);
      setDoc(documnetRef, documentData);
    });
  };

  if (!user) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Card className="w-96">
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Email"
              size="lg"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              size="lg"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              label=" Confirm Password"
              size="lg"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {/* <div className="-ml-2.5">
          <Checkbox label="Remember Me" />
        </div> */}
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={() => handleSubmit()}>
              Sign Up
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Already have an account?
              <Typography
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Sign In
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    );
  }
};

export default Register;
