import { TGetAllUserSourcesOutput } from 'server/src/schemas/wordSource.schema';
import SourceCard from '../SourceCard/SourceCard.component';

interface Props {
  filteredSources: TGetAllUserSourcesOutput[];
}

const SourceBoard = ({ filteredSources }: Props) => {
  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-[repeat(auto-fill,minmax(310px,1fr))]">
      {filteredSources?.map((cardData) => (
        <div key={cardData.id}>
          <SourceCard cardData={cardData} />
        </div>
      ))}
    </div>
  );
};

export default SourceBoard;
