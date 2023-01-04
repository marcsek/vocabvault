export type PolymorphicProps<Element extends React.ElementType, K = undefined> = Omit<React.ComponentProps<Element>, 'as'> &
  K & {
    as?: Element;
  };
