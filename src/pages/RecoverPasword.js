import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { Button, Group, Box, PasswordInput, TextInput } from "@mantine/core";
import axios from "axios";
import Nav from "../../src/components/products/Nav";
import toast from "react-hot-toast";

const RecoverPassword = () => {
  const { token } = useParams();
  const form = useForm({
    initialValues: {
      email: "",
      newPassword: "",
      confirmNewPassword: "",
    },

    validate: {
      email: (value) =>
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value)
          ? null
          : "The email is invalid.",
      confirmNewPassword: (value, values) =>
        value !== values.newPassword ? "Passwords do not match." : null,
    },
  });
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    const { email, newPassword, confirmNewPassword } = form.values;
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_URL_BACK}/users/recovered-password`,
        {
          email: email,
          newPassword: newPassword,
          confirmNewPassword: confirmNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(
        "If your password change was successful, you will receive a confirmation email."
      );
      form.reset();
      if (res.status === 201) {
        nav("/");
      }
    } catch (e) {
      toast.error(
        "Your token has expired or verify the data, the password could not be recovered."
      );
    }
  };

  return (
    <>
      <Nav />
      <Box
        sx={(theme) => ({
          maxWidth: 340,
          padding: theme.spacing.xl,
        })}
        mx="auto"
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Email:"
            placeholder="@ Email"
            {...form.getInputProps("email")}
          />

          <PasswordInput
            mt="sm"
            label="New Password:"
            placeholder="Write your new password..."
            {...form.getInputProps("newPassword")}
          />

          <PasswordInput
            mt="sm"
            label="Confirm new password:"
            placeholder="Write your new password..."
            {...form.getInputProps("confirmNewPassword")}
          />

          <Group position="right" mt="md">
            <Button
              type="submit"
              variant="gradient"
              gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
            >
              Change Password
            </Button>
          </Group>
        </form>
      </Box>
    </>
  );
};

export default RecoverPassword;
