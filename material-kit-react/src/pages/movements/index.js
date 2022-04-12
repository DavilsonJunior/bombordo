import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Container, Skeleton, Alert } from '@mui/material';
import { useSnackbar } from 'notistack';

import { MovementListResults } from '../../components/movements/movements-list-results';
import { MovementListToolbar } from '../../components/movements/movements-list-toolbar';
import { DashboardLayout } from '../../components/dashboard-layout';
import api from '../../services/api';

const Movements = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState([]);

  async function getMovements(filter = '', search = '', startDate = '', endDate = '') {
    setLoading(true);
    try {
      const response = await api.get(`/movements?filter=${filter}&search=${search}&startDate=${startDate}&endDate=${endDate}`);
      setMovements(response.data);
    } catch(err) {
    } finally {
      setLoading(false)
    }
}

  useEffect(() => {
    getMovements();
  }, []);

  return (
  <>
    <Head>
      <title>
        Movimentações
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
        <MovementListToolbar getMovements={getMovements} />
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
          ) : movements.length > 0 ? (
            <MovementListResults movements={movements} />
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
                Você ainda não possui nenhuma movimentação!
              </Alert>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  </>
);
}

Movements.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Movements;
