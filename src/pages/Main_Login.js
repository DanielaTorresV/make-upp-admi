import logoApp from "../assets/Logo.svg";
import { useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { Box, TextInput, PasswordInput, Button, Group } from "@mantine/core";
import axios from "axios";
import toast from "react-hot-toast";
import ls from "localstorage-slim";
import encUTF8 from "crypto-js/enc-utf8";
import AES from "crypto-js/aes";
import ButtonRecoveredPassword from "../components/Login/ButtonRecoveredPassword";

const MainLogin = () => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) =>
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value)
          ? null
          : "The email is invalid",
      password: (value) =>
        /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(value)
          ? null
          : "Password should have minimum 8 characters and at least a capital letter, a loweracase letter and a number",
    },
  });
  const nav = useNavigate();

  ls.config.encrypt = true;
  ls.config.secret = "secret-string";

  ls.config.encrypter = (data, secret) =>
    AES.encrypt(JSON.stringify(data), secret).toString();

  ls.config.decrypter = (data, secret) => {
    try {
      return JSON.parse(AES.decrypt(data, secret).toString(encUTF8));
    } catch (e) {
      return data;
    }
  };

  /*const handleSubmit = async (e) => {
    const { email, password } = form.values;
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_URL_BACK}/users/login`,
        {
          email: email,
          password: password,
        }
      );
      localStorage.setItem("token", res.data.data.token);
      ls.set("name", res.data.data.name);
      ls.set("email", res.data.data.email);
      ls.set("isManager", res.data.data.isManager);
      const token = await localStorage.getItem("token");
      if (token) {
        nav("/products");
      }
    } catch (e) {
      toast.error(
        "Verifique su contraseña o email, o si el usuario no es administrador."
      );
    }
  };*/

  return (
    <div className="loginContainer">
      <div className="loginMain">
        <img width="200px" height="100px" src={logoApp} alt="logo" />
        <div className="loginContainerRegister">
          <p className="loginTextCreateAccount">Login as Manager in MakeUpp</p>
          <Box>
            <form className="loginForm">
              {" "}
              {/*onSubmit={form.onSubmit(handleSubmit)}/>*/}
              <TextInput
                required
                className="inputForm"
                placeholder="Put your email"
                {...form.getInputProps("email")}
                data-cy="textInput-login"
              />
              <PasswordInput
                required
                className="inputForm"
                placeholder="Put your password"
                {...form.getInputProps("password")}
              />
              <Group mt="md">
                <Button
                  type="submit"
                  variant="gradient"
                  gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
                  className="loginFormButton"
                >
                  Send
                </Button>
              </Group>
            </form>
          </Box>
          <ButtonRecoveredPassword />
        </div>
      </div>
    </div>
  );
};

export default MainLogin;
