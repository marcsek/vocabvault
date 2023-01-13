import { TGetAllUserSourcesOutput } from 'server/src/schemas/wordSource.schema';
import SourceCard from '../SourceCard/SourceCard.component';

interface Props {
  filteredSources: TGetAllUserSourcesOutput[];
}

const SourceBoard = ({ filteredSources }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-[repeat(auto-fill,minmax(310px,1fr))]">
      {filteredSources?.map((e) => (
        <div key={e.id}>
          <SourceCard cardData={{ ...e, createdAt: new Date(e.createdAt) }} />
        </div>
      ))}
    </div>
  );
};

export default SourceBoard;
