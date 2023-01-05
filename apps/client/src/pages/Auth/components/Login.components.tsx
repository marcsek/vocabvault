import Button from '@ui/Button';
import TextField from '@ui/TextField';
import { Formik, Field, Form } from 'formik';
import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { toFormikValidationSchema } from '../../../utils/helpers/zodToFormik';
import ErrorModal from './ErrorModal.component';
import Heading from './Heading.component';
import { loginUserSchema } from 'server/src/schemas/user.schema';
import { useLogin } from '../../../queries/user';

const Login = () => {
  const login = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="z-10 flex flex-col gap-10">
      <Heading type="login" />
      <Formik
        initialValues={{
          password: '',
          email: '',
        }}
        onSubmit={async ({ email, password }) => {
          login.mutate({ email, password });
        }}
        validationSchema={toFormikValidationSchema(loginUserSchema)}
      >
        {({ errors, touched, isValid }) => (
          <Form className="flex flex-col gap-6">
            {login.isError && <ErrorModal errorMessage={login.error?.message} />}

            <Field
              as={TextField}
              labelText="Email"
              state={errors.email && touched.email ? 'error' : 'default'}
              helperText={touched.email && errors.email}
              id="email"
              name="email"
              disabled={login.isLoading}
            />
            <Field
              as={TextField}
              state={errors.password && touched.password ? 'error' : 'default'}
              helperText={touched.password && errors.password}
              labelText="Password"
              id="password"
              name="password"
              disabled={login.isLoading}
              placeholder=""
              type={showPassword ? 'text' : 'password'}
              Icon={!showPassword ? <FiEye /> : <FiEyeOff />}
              handleIconClick={() => setShowPassword(!showPassword)}
            />
            <Button
              loading={login.isLoading}
              disabled={!isValid || (!touched.email && !touched.password) || login.isLoading}
              type="submit"
              className="mt-4 w-full"
            >
              Sign In
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
