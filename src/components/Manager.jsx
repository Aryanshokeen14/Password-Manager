import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const ref = useRef();
  var a = 1;
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const deletePassword = (id) => {
    console.log("Deleting password with id ", id);
    let c = confirm("Do you really want to delete this password?");
    if (c) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
      toast("Password Deleted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const editPassword = (id) => {
    console.log("Editing password with id ", id);
    setform(passwordArray.filter((i) => i.id === id)[0]);
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const copyText = (text) => {
    toast("Copied to clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };
  const showpassword = () => {
    // passwordRef.current.type = "text"

    if (a % 2 != 0) {
      passwordRef.current.type = "text";
      a++;
    } else {
      passwordRef.current.type = "password";
      a++;
    }
  };
  const savepassword = () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      console.log([...passwordArray, form]);
      setform({ site: "", username: "", password: "" });
      toast("Password saved!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast("Error: Password not saved!");
    }
  };
  const handlechange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="absolute inset-0 -z-10 min-h-screen w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

      <div className="gap-5 text-white md:mycontainer md:p-0 w-[90%] flex flex-col justify-center items-center mx-16 ">
        <div className="pt-5 flex flex-col justify-center items-center">
          <div className="logo font-bold text-white text-2xl">
            <span className="text-green-500"> &lt;</span>
            <span>Pass</span>
            <span className="text-green-500">OP/&gt;</span>
          </div>
          <p className="font-bold text-xl">Your own Password Manager</p>
        </div>
        <div className="text-white md:flex-col flex  items-center flex-col p-4 w-full gap-7">
          <input
            value={form.site}
            onChange={handlechange}
            placeholder="Enter Website URL"
            className="bg-black w-full px-4 py-1 rounded-full border border-purple-700"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex w-full gap-5">
            <input
              value={form.username}
              onChange={handlechange}
              placeholder="Enter Username"
              className="bg-black border px-4 w-1/2 py-1 rounded-full border-purple-700"
              type="text"
              name="username"
              id="username"
            />
            <div className="w-1/2 relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handlechange}
                placeholder="Enter Password"
                className="bg-black border px-4 w-full py-1 rounded-full border-purple-700"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-5 hover:cursor-pointer"
                onClick={showpassword}
              >
                <lord-icon
                  stroke="bold"
                  colors="primary:#16c72e,secondary:#ffffff"
                  src="https://cdn.lordicon.com/hbtheitu.json"
                  trigger="hover"
                ></lord-icon>
              </span>
            </div>
          </div>
          <button
            onClick={savepassword}
            className="mt-3 hover:font-bold hover:bg-green-600 border border-green-500 w-fit flex justify-center items-center rounded-full px-4 py-1 bg-green-800"
          >
            <lord-icon
              colors="primary:#66ee78"
              src="https://cdn.lordicon.com/hqymfzvj.json"
              trigger="hover"
            ></lord-icon>
            Save
          </button>
        </div>
        <div className="passwords w-[80%]">
          <h1 className="font-bold text-2xl py-2">Your Passwords</h1>
          {passwordArray.length === 0 && (
            <div>
              <p>No password to show</p>
            </div>
          )}

          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-t-xl rounded-b-sm overflow-hidden">
              <thead className="bg-purple-800">
                <tr>
                  <th className="p-1">Site</th>
                  <th className="p-1">Username</th>
                  <th className="p-1">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="border border-purple-800 ">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center py-2 ">
                        <div className="flex items-center justify-center gap-2">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="lordiconcopy invert size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2  text-center">
                        <div className="flex items-center justify-center gap-3 ">
                          <span>{item.username}</span>
                          <div
                            className="lordiconcopy size-7 invert cursor-pointer"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2  text-center">
                        <div className="flex items-center justify-center gap-3 ">
                          <span>{"*".repeat(item.password.length)}</span>
                          <div
                            className="lordiconcopy size-7 invert cursor-pointer"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingTop: "3px",
                                paddingLeft: "3px",
                              }}
                              src="https://cdn.lordicon.com/iykgtsbt.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="justify-center py-2 invert text-center">
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/gwlusjdu.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
