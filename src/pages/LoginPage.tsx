import { TextField } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

export default function LoginPage() {
  const { gameId } = useParams();

  const formik = useFormik({
    initialValues: loginInitialValue,
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      const { name } = values;
      setName(name);
      setIsAuth(true);
    },
  });

  return (
    <div>
      LoginPage // input с именем // submit кнопка ( после входа
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
      {gameId ? "редирект на игру" : "создание новой игры"} )
    </div>
  );
}
