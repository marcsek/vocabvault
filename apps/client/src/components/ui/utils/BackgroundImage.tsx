import BakckgroundImageFile from '../../../assets/SvgBackground.png';

const BackgroundImage = () => {
  return <div className="fixed inset-0 bg-repeat opacity-10" style={{ backgroundImage: `url(${BakckgroundImageFile})` }}></div>;
};

export default BackgroundImage;
