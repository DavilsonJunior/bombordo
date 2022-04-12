import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
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

import api from '../../../services/api';

const tipos = [
  {
    value: 'Embarque',
    label: 'Embarque'
  },
  {
    value: 'Descarga',
    label: 'Descarga'
  },
  {
    value: 'Gate in',
    label: 'Gate in'
  },
  {
    value: 'Gate out',
    label: 'Gate out'
  },
  {
    value: 'Reposicionamento',
    label: 'Reposicionamento'
  },
  {
    value: 'Pesagem',
    label: 'Pesagem'
  },
  {
    value: 'Scanner',
    label: 'Scanner'
  },
];

const schema = yup.object({
  tipo_de_movimentacao: yup.string().required('Campo obrigatório'),
}).required();

export const MovementForm = (props) => {
  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      tipo_de_movimentacao: props.movimentacao?.tipo_de_movimentacao,
    }
  });

  const { enqueueSnackbar } = useSnackbar();
  const route = useRouter();
  const [loading, setLoading]= useState(false);

  const date = props.movement?.data_fim ? parseISO(props.movement?.data_fim) : new Date();

  const inicial = format(parseISO(props.movement?.data_inicio), "yyyy-MM-dd'T'HH:mm", { locale: pt })
  const final = format(date, "yyyy-MM-dd'T'HH:mm", { locale: pt });

  const [data_inicio, setDataInicio] = useState(inicial);
  const [data_fim, setDataFim] = useState(final);

  const onSubmit = async ({ tipo_de_movimentacao }) =>  {
   setLoading(true);
    try {
      await api.put(`/movements/${props.movement.id}`, {
        tipo_de_movimentacao,
        data_inicio,
        data_fim
      });
      enqueueSnackbar('movimentação atualizada com sucesso!', { variant: 'success' });
      route.push('/movements');
    } catch(err) {
      enqueueSnackbar('Falha ao atualizar a movimentação',  { variant: 'error' });
    } finally {
      setLoading(false)
    }
  }

  const deleteItem = async () => {
    try {
      await api.delete(`/movements/${props.movement.id}`);
      enqueueSnackbar('movimentação deletada com sucesso!', { variant: 'success' });
      route.push('/movements');
    } catch(err) {
      enqueueSnackbar('Falha ao deletar a movimentação',  { variant: 'error' });
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
          title="Informações da movimentação"
          subheader={props.moviment?.data_fim ? 'Finalizada' : 'Em andamento'}
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
                    label="Tipo de movimentação"
                    helperText={errors.tipo_de_movimentacao ? errors.tipo_de_movimentacao : ''}
                    name={name}
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    error={errors.tipo_de_movimentacao}
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
                  name="tipo_de_movimentacao"
                  control={control}
                  defaultValue=""
                />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
                <TextField
                  fullWidth
                  id="start_date"
                  label="Data de inicio"
                  type="datetime-local"
                  onChange={({ target }) => setDataInicio(target.value)}
                  value={data_inicio}
                  variant="outlined"
                  disabled
                  />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
                <TextField
                  fullWidth
                  id="end_date"
                  label="Data do fim"
                  type="datetime-local"
                  onChange={({ target }) => setDataFim(target.value)}
                  value={data_fim}
                  variant="outlined"
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
            Atualizar
          </Button>

          <Button
            onClick={deleteItem}
            style={{ marginLeft: 10}}
            type="submit"
            color="error"
            variant="contained"
            disabled={loading}
          >
            Deletar
          </Button>
        </Box>
      </Card>
      </Paper>
    </form>
  );
};
