interface Props {
  className?: string;
}

const Divider = ({ className }: Props) => {
  return <div className={`${className} bg-gray-500`} />;
};

export default Divider;
