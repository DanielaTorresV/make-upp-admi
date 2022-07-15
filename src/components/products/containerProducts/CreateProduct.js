import { useState } from "react";
import { useForm } from "@mantine/form";
import { Modal, Button, Group, Box, TextInput } from "@mantine/core";

const CreateProduct = () => {
  const [opened, setOpened] = useState(false);
  const [image, setImage] = useState(null); //capturamos para mostrar base64
  const [file, setFile] = useState(null); //capturamos archivo para enviar obj
  const form = useForm({
    initialValues: {
      name: "",
      description: "",
    },
  });

  /*const handleSubmit = async (e) => {
    const { name, description } = form.values;
    const image = file;
  };*/

  const readFile = (file) => {
    const reader = new FileReader();

    //reader.onload = (e) => console.log(e.target.result);
    reader.onload = (e) => setImage(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    console.dir(e.target.files);
    readFile(e.target.files[0]);
    setFile(e.target.files[0]);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Create a product..."
      >
        {
          <Box sx={{ maxWidth: 240 }} mx="auto">
            <form className="form-createProduct">
              {/*onSubmit={form.onSubmit(handleSubmit)}>*/}
              <TextInput
                required
                label="Product Name:"
                placeholder="Write the product name..."
                {...form.getInputProps("name")}
              />
              <TextInput
                required
                label="Product Description:"
                placeholder="Write the product description..."
                {...form.getInputProps("description")}
              />
              <div className="createProduct-containerImg">
                {!!image && (
                  <img
                    src={image}
                    alt="Foto perfil"
                    loading="lazy"
                    className="createProduct-imgChoose"
                  />
                )}
                <input
                  type="file"
                  id="img"
                  name="img"
                  accept="image/*"
                  onChange={handleChange}
                  className="createProduct-imgInputChoose"
                />
              </div>
              <Group position="right" mt="md">
                <Button type="submit" color="pink">
                  Create
                </Button>
              </Group>
            </form>
          </Box>
        }
      </Modal>

      <Group position="left">
        <Button
          onClick={() => setOpened(true)}
          variant="gradient"
          gradient={{ from: "#ed6ea0", to: "#ec8c69", deg: 35 }}
        >
          Create Product
        </Button>
      </Group>
    </>
  );
};

export default CreateProduct;
