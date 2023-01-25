import React, { useEffect } from "react";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { Box, Button, TextField } from "@mui/material";

const loginInitialValue = {
  name: "",
};
export const loginValidationSchema = yup.object({
  name: yup.string().required("Name is required"),
});

interface ILoginPageProps {
  name: string;
  setName: (name: string) => void;
}

export default function LoginPage({ name, setName }: ILoginPageProps) {
  const { gameId } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    if (name) {
      if (gameId) {
        navigate(`/game/${gameId}`);
      } else {
        navigate("/");
      }
    }
  }, [name]);

  const formik = useFormik({
    initialValues: loginInitialValue,
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      const { name } = values;
      setName(name);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          sx={{ mb: 2 }}
          name="name"
          label={formik.touched.name ? formik.touched.name && formik.errors.name : "Name"}
          value={formik.values.name}
          error={formik.touched.name && !!formik.errors.name}
          onChange={formik.handleChange}
          autoComplete="off"
        />
        <Box>
          <Button variant="outlined" type="submit">
            Login
          </Button>
        </Box>
      </form>
    </div>
  );
}
