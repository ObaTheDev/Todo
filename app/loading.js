import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function Loading() {
  return (
    <div className ="flex justify-center items-center text-center h-screen">
        <div className= "w-screen justify-center items-center flex h-screen py-4 m-auto text-center bg-[#C4D7F2] ">
            <Box sx={{ width: 300 }}>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
            </Box>
        </div>

    </div>

  );
}
