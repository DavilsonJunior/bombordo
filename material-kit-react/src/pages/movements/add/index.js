import { useState } from 'react';
import Head from 'next/head';
import { Box, Container, Tab, Tabs, Grid } from '@mui/material';

import { DashboardLayout } from '../../../components/dashboard-layout';
import { MovementForm } from './Form';

const Add = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <Head>
      <title>
        Adicionar | Movimentação
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example">
                <Tab label="Adicionar Movimentação"/>
            </Tabs>
          </Box>
        </Box>
        <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <MovementForm />
          </Grid>
        </Grid>
        </Box>
      </Container>
    </Box>
  </>
  );
}

Add.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Add;
