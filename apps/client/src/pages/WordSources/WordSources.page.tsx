import Button from '@ui/Button';
import Link from '@ui/Link';
import TitleLayout from '@ui/TitleLayout/TitleLayout';
import { useGetAvailableWordSources } from '../../queries/wordSource';
import SourceBoard from './Components/SourceBoard/SourceBoard.component';
import SourceFilters from './Components/SourceFilters/SourceFilters';
import useFilters from './hooks/useFilters';
import { HiOutlineDocumentAdd } from 'react-icons/hi';
import { inferProcedureOutput } from '@trpc/server';
import { wordSourceRouter } from 'server/src/routers/wordSource';

export type TGetAllWordSourcesOutput = inferProcedureOutput<typeof wordSourceRouter.getAllUserAvailableWordSources>;

const WordSources = () => {
  const { data, isLoading } = useGetAvailableWordSources();

  const { filtered, setFilters, filters } = useFilters(data ?? []);

  return (
    <TitleLayout
      headingLeft={<SourceFilters setFilters={setFilters} filters={filters} />}
      buttonPlaceholder={
        <Button as={Link} to="/create-datasource" intent="primary" className="w-max" Icon={<HiOutlineDocumentAdd size={20} />}>
          New wordsource
        </Button>
      }
    >
      <div className="relative flex min-h-[10rem] w-full flex-col gap-10 md:gap-8">
        <SourceBoard filteredSources={filtered} isLoading={isLoading} unfilteredDataExists={data?.length !== 0} />
      </div>
    </TitleLayout>
  );
};

export default WordSources;
