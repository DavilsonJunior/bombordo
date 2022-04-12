import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  FormControl
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { Search as SearchIcon } from '../../icons/search';
import { Upload as UploadIcon } from '../../icons/upload';
import { Download as DownloadIcon } from '../../icons/download';


const names = [
  {
    value: 'cliente',
    label: 'Cliente'
  },
  {
    value: 'numero_container',
    label: 'Numero do container'
  },
  {
    value: 'tipo',
    label: 'Tipo'
  },
  {
    value: 'status',
    label: 'Status'
  },
  {
    value: 'categoria',
    label: 'Categoria'
  }
];

export const ContainerListToolbar = (props) => {
  const route = useRouter();

  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');

  const handleNextPage = async () => {
    route.push('/containers/add');
  }

  const filterPage = () => {
    props.getContainers(filter, search)
  }

  return (
  <Box {...props}>
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        m: -1
      }}
    >
      <Typography
        sx={{ m: 1 }}
        variant="h4"
      >
        Container
      </Typography>
      <Box sx={{ m: 1 }}>
        <Button
          onClick={handleNextPage}
          startIcon={<AddIcon />}
          color="primary"
          variant="contained"
        >
          Container
        </Button>
      </Box>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box
            display="flex"
            alignItems="center"
          >
            <FormControl sx={{ m: 1, width: 320 }}>
              <TextField
                fullWidth
                label="Filtro"
                onChange={({ target }) => setFilter(target.value)}
                value={filter}
                select
                SelectProps={{ native: true }}
                variant="outlined"
              >
                <option value=""></option>
                {names.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
                ))}
              </TextField>
            </FormControl>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon
                      color="action"
                      fontSize="small"
                    >
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                )
              }}
              onChange={({ target }) => setSearch(target.value)}
              placeholder="Buscar container"
              variant="outlined"
            />
            <Box>
              <Button
                style={{marginLeft: 10}}
                onClick={filterPage}
                startIcon={<SearchIcon />}
                color="primary"
                variant="contained"
              >

                Buscar
              </Button>
            </Box>

          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
  )
}
