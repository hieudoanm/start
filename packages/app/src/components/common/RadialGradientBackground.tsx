import { FC } from 'react';

export const RadialGradientBackground: FC = () => {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 -z-10 m-auto flex w-screen items-center justify-center bg-white dark:bg-neutral-900">
      <div className="aspect-square w-full max-w-xl bg-[radial-gradient(#ffe4ec_0,_transparent_72%)] dark:bg-[radial-gradient(#510424_0,_transparent_72%)]"></div>
    </div>
  );
};
