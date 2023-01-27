import { ButtonProps } from '@ui/Button';
import TitleLayout from '@ui/TitleLayout';
import { useState } from 'react';
import NewSessionForm from './components/NewSessionForm/NewSessionForm';
import NewSessionSelectedWords from './components/SelectedWords/NewSessionSelectedWords';
import { SelectedWordsContextProvider } from './context/SelectedWordsContext';

const NewSession = () => {
  const [submitButton, setSubmitButton] = useState<React.ReactElement<ButtonProps>>();

  return (
    <TitleLayout
      headingLeft={<h1 className="flex flex-col gap-1 text-xl font-bold leading-none md:text-2xl">New session</h1>}
      button={submitButton}
    >
      <div className="flex w-full flex-col gap-14 md:gap-14">
        <SelectedWordsContextProvider>
          <NewSessionForm submitFormButton={setSubmitButton} />
          <NewSessionSelectedWords />
        </SelectedWordsContextProvider>
      </div>
    </TitleLayout>
  );
};

export default NewSession;
