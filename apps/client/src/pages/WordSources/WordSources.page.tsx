import Button from '@ui/Button';
import Link from '@ui/Link';
import TextField from '@ui/TextField';
import TitleLayout from '@ui/TitleLayout';
import { useGetAvailableWordSources } from '../../queries/wordSource';
import SourceBoard from './Components/SourceBoard/SourceBoard.component';

const WordSources = () => {
  const create = useGetAvailableWordSources();

  return (
    <TitleLayout
      headingLeft={<TextField labelText="Keyword" className="w-80" />}
      button={
        <Button as={Link} to="/create-datasource" intent="primary" className="w-max">
          New wordsource
        </Button>
      }
    >
      <div className="flex w-full flex-col gap-10 md:gap-8">
        <SourceBoard />
      </div>
    </TitleLayout>
  );
};

export default WordSources;
