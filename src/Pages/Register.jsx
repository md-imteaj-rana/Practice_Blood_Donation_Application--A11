import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import auth from "../firebase/firebase.config";

const Register = () => {
  const { registerWithEmailPassword, setUser, user } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  // fetch districts
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    fetch("/Districts.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data))
      .catch((err) => console.log(err));
  }, []);

  // fetch upazilas
  const [upazilas, setUpazilas] = useState([]);
  const [selectedUpazila, setSelectedUpazia] = useState([]);
  useEffect(() => {
    fetch(`/Upazilas.json`)
      .then((res) => res.json())
      .then((data) => setUpazilas(data))
      .catch((err) => console.log(err));
  }, []);

  const handleDistrict = (e) => {
    e.preventDefault();
    const distId = e.target.value;
    const resultUpa = upazilas.filter(u => u.district_id == distId)
    setSelectedUpazia(resultUpa)
    //console.log(resultUpa)
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const pass = e.target.password.value;
    const confirmPass = e.target.confirm_password.value;
    const name = e.target.name.value;
    const bloodGroup = e.target.bloodGroup.value;
    const district = e.target.district.value;
    const upazila = e.target.upazila.value;
    const imageurl = e.target.imageurl;
    const file = imageurl.files[0];

    if (pass !== confirmPass) {
      return Swal.fire({
        icon: "error",
        title: "Password mismatch",
        text: "Password and Confirm Password must be same",
      });
    }

    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;
    const number = /[0-9]/;
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (pass.length < 6) {
      return alert("Password length can not be less than 6!!!");
    }

    if (!uppercase.test(pass)) {
      return alert("You must use uppercase letters in your password.");
    }

    if (!lowercase.test(pass)) {
      return alert("You must use lowercase letters in your password.");
    }

    if (!number.test(pass)) {
      return alert("You must include at least one number.");
    }

    if (!specialChar.test(pass)) {
      return alert("You must include at least one special character.");
    }

    //imgbb
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=77a36fc81fc847f9b0040be511b7f0f0`,
      { image: file },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const mainPhotourl = res.data.data.display_url;

    const formData = {
      email,
      pass,
      name,
      photoURL: mainPhotourl,
      bloodGroup,
      district,
      upazila,
    };

    if (res.data.success == true) {
      registerWithEmailPassword(email, pass)
        .then((userCredential) => {
          //const user = userCredential.user
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: mainPhotourl,
          })
            .then(() => {
              setUser(userCredential.user);
              axios
                .post("http://localhost:5000/users", formData)
                .then((res) => {
                  console.log(res.data);
                })
                .catch((err) => {
                  console.log(err);
                });
              // alert("Registration successful")
              Swal.fire({
                title: "Registration successful",
                icon: "success",
                draggable: true,
              });
              navigate(location.state ? location.state : "/");
              // Profile updated!
              // ...
            })
            .catch((error) => {
              console.log(error);
              // alert(error)
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
              });
              // An error occurred
              // ...
            });
        })
        .catch((error) => {
          console.log(error);
          //alert(error)
        });
    }
  };

  console.log(user);

  return (
    <div>
      <title>Signup</title>

      <div className="min-h-screen bg-linear-to-br from-red-50 via-white to-red-100 flex items-center justify-center px-4">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Section – Campaign Message */}
          <div className="text-center lg:text-left space-y-5">
            <h1 className="text-4xl lg:text-5xl font-extrabold text-red-600">
              Donate Blood, Save Lives 🩸
            </h1>
            <p className="text-gray-700 text-lg">
              Join our blood donation campaign and become a real-life hero. Your
              one signup can help save multiple lives.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <div className="bg-white shadow-md rounded-xl px-5 py-3 text-sm font-medium">
                ❤️ Every drop matters
              </div>
              <div className="bg-white shadow-md rounded-xl px-5 py-3 text-sm font-medium">
                🏥 Trusted donors network
              </div>
              <div className="bg-white shadow-md rounded-xl px-5 py-3 text-sm font-medium">
                🧑‍🤝‍🧑 Community driven
              </div>
            </div>
          </div>

          {/* Right Section – Signup Card */}
          <div className="card bg-white w-full max-w-md shadow-2xl rounded-2xl my-10">
            <div className="card-body space-y-4">
              <h2 className="text-2xl font-bold text-center text-gray-800">
                Create Your Account
              </h2>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="label font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    className="input input-bordered w-full focus:border-red-500"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div>
                  <label className="label font-medium text-gray-700">
                    Profile Image
                  </label>
                  <input
                    name="imageurl"
                    type="file"
                    className="file-input file-input-bordered w-full"
                  />
                </div>

                <div>
                  <label className="label font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    className="input input-bordered w-full focus:border-red-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label className="label font-medium">Blood Group</label>
                  <select
                    name="bloodGroup"
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="">Select Blood Group</option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                    <option>O+</option>
                    <option>O-</option>
                  </select>
                </div>

                <div>
                  <label className="label font-medium">District</label>
                  <select
                    onChange={handleDistrict}
                    name="district"
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="">Select District</option>
                    {districts.map((district) => (
                      <option value={district?.id}>{district?.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label font-medium">Upazila</label>
                  <select
                    name="upazila"
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="">Select Upazila</option>
                    {selectedUpazila.map((upazila) => (
                      <option value={upazila?.district_id}>
                        {upazila?.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    className="input input-bordered w-full focus:border-red-500"
                    placeholder="Create a strong password"
                    required
                  />
                </div>

                <div>
                  <label className="label font-medium">Confirm Password</label>
                  <input
                    name="confirm_password"
                    type="password"
                    className="input input-bordered w-full"
                    placeholder="Confirm your password"
                    required
                  />
                </div>

                <button className="btn w-full bg-red-600 hover:bg-red-700 text-white rounded-xl mt-2">
                  Sign Up
                </button>

                <div className="text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/Login"
                    className="text-red-600 font-medium hover:underline"
                  >
                    Login here
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
