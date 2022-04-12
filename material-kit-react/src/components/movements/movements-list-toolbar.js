import { useState } from 'react';
import { useRouter } from 'next/router';
import { format, subDays } from 'date-fns'
import pt from 'date-fns/locale/pt'
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  Select,
  OutlinedInput,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';

import { Search as SearchIcon } from '../../icons/search';
import { Upload as UploadIcon } from '../../icons/upload';
import { Download as DownloadIcon } from '../../icons/download';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  {
    value: 'tipo_de_movimentacao',
    label: 'Tipo de Movimentação'
  },
  {
    value: 'data',
    label: 'Data'
  }
];

export const MovementListToolbar = (props) => {
  const theme = useTheme();
  const route = useRouter();

  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const dateFormatted = format(new Date(), "yyyy-MM-dd'T'HH:mm", { locale: pt });
  const [startDate, setStartDate]= useState(dateFormatted);
  const [endDate, setEndDate]= useState(dateFormatted);

  const handleNextpage = () => {
    route.push('/movements/add');
  }

  const filterPage = () => {
    props.getMovements(filter, search, startDate, endDate);
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
        Movimentações
      </Typography>
      <Box sx={{ m: 1 }}>
        <Button
          onClick={handleNextpage}
          startIcon={<AddIcon />}
          color="primary"
          variant="contained"
        >
          Movimentação
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
                onChange={({ target }) => {
                  setFilter(target.value)
                  setSearch('');
                }
              }
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
           {filter === 'data' ? (
             <>
              <TextField
              style={{marginLeft: 10}}
              fullWidth
              id="start_date"
              label="Data de inicio"
              type="datetime-local"
              onChange={({ target }) => setStartDate(target.value)}
              value={startDate}
              variant="outlined"
              />

            <TextField
              style={{marginLeft: 10}}
              fullWidth
              id="end_date"
              label="Data do fim"
              type="datetime-local"
              onChange={({ target }) => setEndDate(target.value)}
              value={endDate}
              variant="outlined"
             />
            </>
           ) : (
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
           )}
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
