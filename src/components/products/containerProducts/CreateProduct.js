import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "@mantine/form";
import { Modal, Button, Group, Box, TextInput } from "@mantine/core";
import {
  getProducts,
  postProducts,
} from "../../../store/reducers/Product.reducer";

const CreateProduct = () => {
  const [opened, setOpened] = useState(false);
  const [image, setImage] = useState(null); //capturamos para mostrar base64
  const [file, setFile] = useState(null); //capturamos archivo para enviar obj
  const dispatch = useDispatch();
  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      category: "",
    },
  });

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const handleSubmit = async (e) => {
    const { name, description, category } = form.values;

    const data = new FormData();
    data.append("name", name);
    data.append("description", description);
    data.append("category", category);
    data.append("image", file);

    dispatch(postProducts(data));
    form.reset();
  };

  const readFile = (file) => {
    const reader = new FileReader();

    //reader.onload = (e) => console.log(e.target.result);
    reader.onload = (e) => setImage(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
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
            <form
              className="form-createProduct"
              onSubmit={form.onSubmit(handleSubmit)}
            >
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
              <TextInput
                required
                label="Category:"
                placeholder="Face, Eyes, or Lips..."
                {...form.getInputProps("category")}
              />
              <div className="createProduct-containerImg">
                {!!image && (
                  <img
                    src={image}
                    alt="Product"
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
