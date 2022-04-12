import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Box, Container, Tab, Tabs, Grid } from '@mui/material';

import { DashboardLayout } from '../../../components/dashboard-layout';
import { MovementForm } from './Form';

const Edit = (props) => {
  const [value, setValue] = useState(0);
  const route = useRouter();
  const movement = JSON.parse(route.query.data);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <Head>
      <title>
        Editar | Movimentações
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
                <Tab label="Editar Movimentação"/>
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
            <MovementForm movement={movement} />
          </Grid>
        </Grid>
        </Box>
      </Container>
    </Box>
  </>
  );
}

Edit.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Edit;
