import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { format } from 'date-fns';
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
} from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

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

const filter = createFilterOptions();

const schema = yup.object({
  tipo_de_movimentacao: yup.string().required('Campo obrigatório'),
}).required();


export const MovementForm = (props) => {
  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [value, setValue] = useState({});
  const [containers, setContainers] = useState([]);

  const getContainers = async () => {
    try {
      const response = await api.get('/containers');

      setContainers(response.data);
    } catch (err) {
      setContainers([
        {
          cliente: 'Nenhum container encontrado' ,
          id: 0,
          numero_container: '0'
        },
      ]);
    }

  }

  useEffect(() => {
    getContainers();
  }, [])

  const route = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading]= useState(false);
  const dateFormatted = format(new Date(), "yyyy-MM-dd'T'HH:mm", { locale: pt });
  const [data_inicio, setDataInicio]= useState(dateFormatted);

  const onSubmit = async ({ tipo_de_movimentacao }) =>  {
   setLoading(true);
    try {
      await api.post('/movements', {
        tipo_de_movimentacao,
        data_inicio,
        id_container: value?.id || 0,
      });
      enqueueSnackbar('Movimentação cadastrada com sucesso!', { variant: 'success' });
      route.push('/movements');
    } catch(err) {
      let message = 'Falha ao cadastrar a movimentação';
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
          title="Informações da Movimentação"
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
                    helperText={errors.tipo_de_movimentacao ? errors.tipo_de_movimentacao.message : ''}
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
                />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >

           <Autocomplete
            value={value}
            onChange={(event, newValue) => {
              if (typeof newValue === 'string') {
                setValue({
                  cliente: newValue,
                });
              } else if (newValue && newValue.inputValue) {
                // Create a new value from the user input
                setValue({
                  cliente: newValue.inputValue,
                });
              } else {
                setValue(newValue);
              }
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              const { inputValue } = params;
              // Suggest the creation of a new value
              const isExisting = options.some((option) => inputValue === option.cliente);
              if (inputValue !== '' && !isExisting) {
                filtered.push({
                  inputValue,
                  cliente: `Add "${inputValue}"`,
                });
              }

              return filtered;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            id="free-solo-with-text-demo"
            options={containers}
            getOptionLabel={(option) => {
              // Value selected with enter, right from the input
              if (typeof option === 'string') {
                return option;
              }
              // Add "xxx" option created dynamically
              if (option.inputValue) {
                return option.inputValue;
              }
              // Regular option
              return option.cliente;
            }}
            renderOption={(props, option) => <li {...props}>{`${option.cliente} - ${option.numero_container}`}</li>}
            freeSolo
            renderInput={(params) => (
              <TextField {...params}
              label="Container" />
              )}
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
