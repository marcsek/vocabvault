import Link from '@ui/Link';

interface Props {
  type: 'login' | 'register';
}

const Heading = ({ type }: Props) => {
  const isLogin = type === 'login';

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold leading-none">{isLogin ? 'Sign in' : 'Sign up'}</h1>
      <span className="flex items-center gap-1 text-sm font-medium leading-none text-gray-400">
        {isLogin ? 'Do not have an account?' : 'Already have an account?'}
        <Link className="text-primary-200 hover:text-primary-100 !text-sm !font-medium" to={`../${isLogin ? 'register' : 'login'}`}>
          {isLogin ? 'Sign up' : 'Sign in'}
        </Link>
      </span>
    </div>
  );
};

export default Heading;
