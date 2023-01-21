import React from 'react';
import { useGetParent } from '../../../../../queries/user';

const ParentProfile = () => {
  const { data: parent } = useGetParent();

  return <div>{!parent ? "You don't have a parent yet." : `Parent name: ${parent.name}`}</div>;
};

export default ParentProfile;
