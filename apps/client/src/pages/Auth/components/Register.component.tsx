import Button from '@ui/Button';
import TextField from '@ui/TextField';
import { Formik, Field, Form } from 'formik';
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { toFormikValidationSchema } from '../../../utils/helpers/zodToFormik';
import ErrorModal from './ErrorModal.component';
import Heading from './Heading.component';
import { registerUserSchema } from 'server/src/schemas/auth.schema';
import { useRegister } from '../../../queries/user';

const Register = () => {
  const register = useRegister();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-10">
      <Heading type="register" />
      <Formik
        initialValues={{
          name: '',
          password: '',
          email: '',
        }}
        onSubmit={async ({ email, password, name }) => {
          register.mutate({ email, password, name });
        }}
        validationSchema={toFormikValidationSchema(registerUserSchema)}
      >
        {({ errors, touched, isValid }) => (
          <Form className="flex flex-col gap-6">
            {register.isError && <ErrorModal errorMessage={register.error?.message} />}
            <Field
              as={TextField}
              state={errors.name && touched.name ? 'error' : 'default'}
              helperText={touched.name && errors.name}
              labelText="Name"
              id="name"
              name="name"
              disabled={register.isPending}
            />
            <Field
              as={TextField}
              labelText="Email"
              state={errors.email && touched.email ? 'error' : 'default'}
              helperText={touched.email && errors.email}
              id="email"
              name="email"
              disabled={register.isPending}
            />
            <Field
              as={TextField}
              state={errors.password && touched.password ? 'error' : 'default'}
              helperText={touched.password && errors.password}
              labelText="Password"
              id="password"
              name="password"
              disabled={register.isPending}
              type={showPassword ? 'text' : 'password'}
              Icon={!showPassword ? <FiEye /> : <FiEyeOff />}
              handleIconClick={() => setShowPassword(!showPassword)}
            />
            <Button
              loading={register.isPending}
              disabled={!isValid || (!touched.email && !touched.password && !touched.name) || register.isPending}
              type="submit"
              className="mt-4 w-full"
            >
              Sign Up
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
