import Button from '@ui/Button';
import TitleLayout from '@ui/TitleLayout';
import { HiOutlineDocumentAdd } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import NewSessionForm from './components/NewSessionForm/NewSessionForm';

const NewSession = () => {
  return (
    <TitleLayout
      headingLeft={<h1 className="flex flex-col gap-1 text-xl font-bold leading-none md:text-2xl">New session</h1>}
      button={
        <Button as={Link} to="/create-datasource" intent="primary" className="w-max" Icon={<HiOutlineDocumentAdd size={20} />}>
          Start session
        </Button>
      }
    >
      <div className="flex w-full flex-col gap-10 md:gap-8">
        <NewSessionForm />
      </div>
    </TitleLayout>
  );
};

export default NewSession;
