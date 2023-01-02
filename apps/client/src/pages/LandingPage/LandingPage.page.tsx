import { Button } from '@ui/Button';
import TextField from '@ui/TextField';
import React, { useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { FiAperture } from 'react-icons/fi';

const LandingPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex h-[4000px] gap-3">
      {/* <Button size="medium" Icon={<FiAperture />} intent="primary" /> */}
      {/* <Button size="medium" Icon={FiAperture} intent="primary" /> */}
      {/* <Button size="medium" Icon={FiAperture} intent="secondary" /> */}
      {/* <Button size="small" Icon={FiAperture} intent="outlined" /> */}
      {/* <Button size="small" Icon={FiAperture} intent="primary" /> */}
      {/* <Button size="small" Icon={FiAperture} intent="secondary" /> */}
      {/* <TextField placeholder="Example" type="email" labelText="Email" helperText="Nieco pekne" state="error" />
      <TextField
        Icon={showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
        type={showPassword ? 'text' : 'password'}
        handleIconClick={() => setShowPassword(!showPassword)}
        placeholder="you@example.com"
        labelText="Email"
        helperText="Nieco pekne"
      />
      <TextField labelText="Email" helperText="Nieco pekne" /> */}
      ddddddd
    </div>
  );
};

export default LandingPage;
