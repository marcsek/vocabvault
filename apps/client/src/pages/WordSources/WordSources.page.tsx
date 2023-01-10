import Button from '@ui/Button';
import TitleLayout from '@ui/TitleLayout';
import { trpc } from '../../utils/trpc';

const WordSources = () => {
  const create = trpc.wordSources.getAllUserAvailableWordSources.useMutation({
    onSettled(data) {
      console.log(data);
    },
  });

  return (
    <TitleLayout
      headingLeft={<h1>input</h1>}
      button={
        <Button intent="primary" onClick={() => create.mutate({})}>
          New wordsource
        </Button>
      }
    >
      <div className="flex w-full flex-col gap-10 md:gap-8">
        <p>Word Sources</p>
      </div>
    </TitleLayout>
  );
};

export default WordSources;
