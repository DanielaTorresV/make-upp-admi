import { useState } from "react";
import { useForm } from "@mantine/form";
import { Modal, Button, Group, Box, TextInput } from "@mantine/core";
import axios from "axios";
import toast from "react-hot-toast";

const ButtonRecoveredPassword = () => {
  const [opened, setOpened] = useState(false);
  const form = useForm({
    initialValues: {
      email: "",
    },

    validate: {
      email: (value) =>
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value)
          ? null
          : "El email es inválido",
    },
  });

  /*const handleSubmit = async (e) => {
    const { email } = form.values;
    try {
      console.log(email);
      const res = await axios.post(
        `${process.env.REACT_APP_URL_BACK}/users/getemail`,
        {
          email: email,
        }
      );
      toast.success(
        "Si el email está registrado, se enviará un link al correo para la recuperación de la contraseña"
      );
      form.reset();
    } catch (e) {
      toast.error("Verifique los datos, no se pudo enviar correo.");
    }
  };*/

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Recover your password!"
      >
        {
          <Box sx={{ maxWidth: 340 }} mx="auto">
            <form>
              {" "}
              {/*onSubmit={form.onSubmit(handleSubmit)}>*/}
              <TextInput
                required
                label="Write the email with which you are registered"
                className="inputForm"
                placeholder="Put your email"
                {...form.getInputProps("email")}
              />
              <Group position="right" mt="md">
                <Button type="submit" color="pink">
                  Send
                </Button>
              </Group>
            </form>
          </Box>
        }
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)} variant="subtle" color="pink">
          Forgot your password?
        </Button>
      </Group>
    </>
  );
};

export default ButtonRecoveredPassword;
