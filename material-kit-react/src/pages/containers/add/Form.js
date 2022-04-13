import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import * as yup from "yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Paper,
  CircularProgress
} from '@mui/material';

import { validaNumeroContainer } from '../../../utils/validaNumeroContainer';
import api from '../../../services/api';

const tipos = [
  {
    value: '20',
    label: '20'
  },
  {
    value: '40',
    label: '40'
  }
];

const status = [
  {
    value: 'Cheio',
    label: 'Cheio'
  },
  {
    value: 'Vazio',
    label: 'Vazio'
  }
];

const categorias = [
  {
    value: 'Importação',
    label: 'Importação'
  },
  {
    value: 'Exportação',
    label: 'Exportação'
  }
];

const schema = yup.object({
  cliente: yup.string().required('Campo obrigatório'),
  numero_container: yup.string()
  .test('numero_container', 'Formato incorreto! Exemplo: TEST1234567', (numberContainer) => validaNumeroContainer(numberContainer))
  .required('Campo obrigatório'),
  tipo: yup.string().required('Campo obrigatório'),
  status: yup.string().required('Campo obrigatório'),
  categoria: yup.string().required('Campo obrigatório'),
}).required();

export const ContainerForm = (props) => {
  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const { enqueueSnackbar } = useSnackbar();
  const route = useRouter();
  const [loading, setLoading]= useState(false);

  const onSubmit = async (data) =>  {
   setLoading(true);
    try {
      await api.post('/containers', data);
      enqueueSnackbar('Container cadastrado com sucesso!', { variant: 'success' });
      route.push('/containers');
    } catch(err) {
      let message = 'Falha ao cadastrar o container';
      if (err.response?.data) {
        message = err.response?.data.error
      }
      enqueueSnackbar(message,  { variant: 'error' });
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
      noValidate
      {...props}
    >
      <Paper
      variant="elevation"
      elevation={10}>
      <Card>
        <CardHeader
          title="Informações do container"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <Controller
                render={({ field: { name, onBlur, onChange, value } }) => (
                  <TextField
                    fullWidth
                    label="Nome do cliente"
                    helperText={errors.cliente ? errors.cliente.message : ''}
                    name={name}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    error={errors.cliente}
                    variant="outlined"
                />
                )}
                name="cliente"
                control={control}
                defaultValue=""
              />

            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
                <Controller
                  render={({ field: { name, onBlur, onChange, value } }) => (
                  <TextField
                    fullWidth
                    label="Numero do container"
                    helperText={errors.numero_container ? errors.numero_container.message : ''}
                    name={name}
                    onBlur={onBlur}
                    onChange={onChange}
                    required
                    value={value}
                    error={errors.numero_container}
                    variant="outlined"
                  />
                  )}
                  name="numero_container"
                  control={control}
                  defaultValue=""
                />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
               <Controller
                  render={({ field: { name, onBlur, onChange, value } }) => (
                  <TextField
                    fullWidth
                    label="Tipo"
                    helperText={errors.tipo ? errors.tipo.message : ''}
                    name={name}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    error={errors.tipo}
                    select
                    SelectProps={{ native: true }}
                    variant="outlined"
                  >
                    <option value=""></option>
                  {tipos.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
                  )}
                  name="tipo"
                  control={control}
                  defaultValue=""
                />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
               <Controller
                  render={({ field: { name, onBlur, onChange, value } }) => (
                  <TextField
                    fullWidth
                    label="Status"
                    helperText={errors.status ? errors.status.message : ''}
                    name={name}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={errors.status}
                    value={value}
                    select
                    SelectProps={{ native: true }}
                    variant="outlined"
                  >
                     <option value=""></option>
                  {status.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
                  )}
                  name="status"
                  control={control}
                  defaultValue=""
                />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <Controller
                  render={({ field: { name, onBlur, onChange, value } }) => (
                  <TextField
                    fullWidth
                    label="Categoria"
                    helperText={errors.categoria ? errors.categoria.message : ''}
                    name={name}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={errors.categoria}
                    value={value}
                    select
                    SelectProps={{ native: true }}
                    variant="outlined"
                  >
                     <option value=""></option>
                  {categorias.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
                  )}
                  name="categoria"
                  control={control}
                  defaultValue=""
                />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            p: 2
          }}
        >
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={loading}
          >
            Adicionar
          </Button>
        </Box>
      </Card>
      </Paper>
    </form>
  );
};
