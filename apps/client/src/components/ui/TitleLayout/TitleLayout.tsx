import Button, { ButtonProps } from '@ui/Button';
import React, { createContext, useState } from 'react';

interface Props {
  children?: React.ReactNode;
  buttonForSubmit?: { title: string; Icon: React.ReactNode };
  buttonPlaceholder?: React.ReactElement<ButtonProps>;
  headingLeft: React.ReactNode;
}

type TButtonProps = {
  disabled: boolean;
  loading: boolean;
  onClick: () => void;
};
export const ButtonPropsContext = createContext<{ setButtonProps: React.Dispatch<React.SetStateAction<TButtonProps>> }>({
  setButtonProps: () => null,
});

const TitleLayout = ({ children, buttonForSubmit, buttonPlaceholder, headingLeft }: Props) => {
  const [buttonProps, setButtonProps] = useState<TButtonProps>({ disabled: true, loading: false, onClick: () => null });

  const SubmitButton = buttonForSubmit ? (
    <Button type="submit" {...buttonProps} Icon={buttonForSubmit.Icon}>
      {buttonForSubmit.title}
    </Button>
  ) : (
    buttonPlaceholder
  );

  return (
    <section className="flex flex-col gap-6 md:gap-11">
      <div className="flex min-h-[36px] justify-between">
        {headingLeft}
        <div className="hidden md:block">{SubmitButton}</div>
      </div>
      <ButtonPropsContext.Provider value={{ setButtonProps }}>{children}</ButtonPropsContext.Provider>
      {SubmitButton && (
        <div className="fixed left-0 bottom-0 z-20 flex h-16 w-full items-center justify-center bg-gray-800/70 py-4 px-9 shadow-[0px_-2px_6px_1px_#00000033] backdrop-blur-sm md:hidden [&>*]:w-full">
          {SubmitButton}
        </div>
      )}
    </section>
  );
};

export default TitleLayout;
