import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Container, Grid, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { TotalMovements } from '../components/dashboard/total-movements';
import { LatestMovements } from '../components/dashboard/latest-movements';
import { LatestContainers } from '../components/dashboard/latest-containers';
import { TotalExportacoes } from '../components/dashboard/total-exportacoes';
import { TotalImportacoes } from '../components/dashboard/total-importacoes';
import { TotalExportacaoImportacao } from '../components/dashboard/total-importacaoexportacao';
import { DashboardLayout } from '../components/dashboard-layout';

import api from '../services/api';

const Dashboard = () => {
const route = useRouter();
const [totalMovimentacao, setTotalMovimentacao] = useState([]);
const [totalExportacao, setTotalExportacao] = useState([]);
const [totalImportacao, setTotalImportacao] = useState([]);
const [total, setTotal] = useState(0);
const [loading, setLoading] = useState(true);

const handleGenerateReport = async () => {
  route.push('report');
}

const getReport = async () => {
  try {
    const response = await api.get('/report');

    setTotalMovimentacao(response.data.totalMovimentacao);
    setTotalExportacao(response.data.totalExportacao);
    setTotalImportacao(response.data.totalImportacao);
    setTotal(response.data.totalImportacao / response.data.totalExportacao);

    console.log(response.data.totalImportacao)
    console.log(response.data.totalExportacao)
  } catch (err) {

  } finally {
    setLoading(false);
  }
}

useEffect(() => {
  getReport();
}, [])

return (
  <>
    <Head>
      <title>
        Dashboard
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

      <Box sx={{ m: 1 }}>
        <Button
          onClick={handleGenerateReport}
          startIcon={<AddIcon />}
          color="primary"
          variant="contained"
        >
          Gerar arquivo
         </Button>
      </Box>
     <Grid
      container
      spacing={3}
     >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalMovements
              totalMovimentacao={totalMovimentacao}
             />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalImportacoes
              totalImportacao={totalImportacao}
            />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalExportacoes
              totalExportacao={totalExportacao}
            />
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <TotalExportacaoImportacao
              total={total}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <LatestContainers sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestMovements />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
  );
}

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;
