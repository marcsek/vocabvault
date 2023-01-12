interface SharedSourceProps {
  name: string;
  createdAt: string;
  firstLanguage: { code: string; languageName: string };
  secondLanguage: { code: string; languageName: string };
  documentType: string;
  userAvailableSources?: { user: { profileImage: string } }[];
  wordPairs: TWordPair[];
  creator: { id: string; name: string; profileImage?: string };
}

type SourceProps = SharedSourceProps;
