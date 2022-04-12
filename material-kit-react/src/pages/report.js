import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Container, Skeleton, Alert } from '@mui/material';
import { useSnackbar } from 'notistack';

import { DashboardLayout } from '../components/dashboard-layout';

const Report = () => {
  return (
    <>
    <Head>
    <title>
      Relatorio
    </title>
  </Head>
  <Box
    component="main"
    sx={{
      height: '100%',
    }}
  >
    <object
      width="100%"
      height="100%"
      data="http://192.168.0.104:3333/report/pdf"
      type="application/pdf"
    >
    </object>
</Box>
</>
  );
}

Report.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Report;
