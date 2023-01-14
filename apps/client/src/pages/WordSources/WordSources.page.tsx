import Button from '@ui/Button';
import Link from '@ui/Link';
import TitleLayout from '@ui/TitleLayout';
import { useGetAvailableWordSources } from '../../queries/wordSource';
import SourceBoard from './Components/SourceBoard/SourceBoard.component';
import SourceFilters from './Components/SourceFilters/SourceFilters';
import useFilters from './hooks/useFilters';
import { HiOutlineDocumentAdd } from 'react-icons/hi';

const WordSources = () => {
  const { data } = useGetAvailableWordSources();
  const { filtered, setFilters } = useFilters(data ?? []);

  return (
    <TitleLayout
      headingLeft={<SourceFilters setF={setFilters} />}
      button={
        <Button as={Link} to="/create-datasource" intent="primary" className="w-max" Icon={<HiOutlineDocumentAdd size={20} />}>
          New wordsource
        </Button>
      }
    >
      <div className="flex w-full flex-col gap-10 md:gap-8">
        <SourceBoard filteredSources={filtered} />
      </div>
    </TitleLayout>
  );
};

export default WordSources;
