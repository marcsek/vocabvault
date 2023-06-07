import Divider from '@ui/Divider';
import { TGetAllWordSourcesOutput } from '../../WordSources.page';

export type SourceHeadingProps = Pick<TGetAllWordSourcesOutput[number], 'creator' | 'name' | 'firstLanguage' | 'secondLanguage'>;

const countryFlagURL = (code: string) => {
  let codeToUrl = code;
  if (code === 'en') codeToUrl = 'gb';

  return `https://flagcdn.com/w80/${codeToUrl}.png`;
};

const SourceHeading = ({ name, firstLanguage, secondLanguage, creator }: SourceHeadingProps) => {
  return (
    <div className="flex flex-col gap-4 leading-none">
      <h3 className="font-semibold">{name}</h3>
      <div className="flex items-center gap-6 text-xl font-bold leading-none">
        <div className="flex items-center gap-2">
          <img className="box-border h-5 w-8 rounded-sm" src={countryFlagURL(firstLanguage.code)} alt={firstLanguage.code}></img>
          <p className="uppercase">{firstLanguage.code}</p>
        </div>
        <Divider className="h-1 w-6 rounded-full" />
        <div className="flex items-center gap-2">
          <img className="box-border h-5 w-8 rounded-sm" src={countryFlagURL(secondLanguage.code)} alt={secondLanguage.code}></img>
          <p className="uppercase">{secondLanguage.code}</p>
        </div>
      </div>
      <p className="text-xs font-semibold text-gray-400">{`Creator: ${creator.name}`}</p>
    </div>
  );
};

export default SourceHeading;
