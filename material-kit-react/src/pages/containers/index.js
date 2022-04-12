import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Box, Container, Skeleton, Alert } from '@mui/material';
import { ContainerListResults } from '../../components/containers/container-list-results';
import { ContainerListToolbar } from '../../components/containers/container-list-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import { useSnackbar } from 'notistack';

import api from '../../services/api';

const Containers = () => {
const { enqueueSnackbar } = useSnackbar();

const [containers, setContainers] = useState([]);
const [loading, setLoading] = useState([]);

const getContainers = async (filter = '', search = '') => {
  setLoading(true);
  try {
    const response = await api.get(`/containers?filter=${filter}&search=${search}`)
    setContainers(response.data);
  } catch (err) {
    enqueueSnackbar('Falha ao buscar os dados', { variant: 'error' })
  } finally {
    setLoading(false)
  }
}

useEffect(() => {
  getContainers();
}, [])

return (
  <>
    <Head>
      <title>
        Containers
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
        <ContainerListToolbar getContainers={getContainers} />
        <Box sx={{ mt: 3 }}>
        {loading ? (
          <>
              <Skeleton height={40} />
              <Skeleton
                height={40}
                animation="wave" />
              <Skeleton
                height={40}
                animation={false} />
              <Skeleton
                height={40}
                animation="pulse" />
              <Skeleton height={40} />
          </>
          ) : containers.length > 0 ? (
            <ContainerListResults containers={containers} />
          ) : (
            <Box
            display="flex"
            justifyContent="center"
            sx={{ mt: 3 }}
            >
              <Alert
                elevation={15}
                severity="warning"
              >
              Você ainda não possui nenhum container!
            </Alert>
          </Box>
          )}
        </Box>
      </Container>
    </Box>
  </>
);
}

Containers.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Containers;
