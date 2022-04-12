import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { theme } from '../../theme';

export const MovementListResults = ({ movements, ...rest }) => {
  const [selectedMovementIds, setSelectedMovementIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const route = useRouter();

  const handleSelectAll = (event) => {
    let newSelectedMovementIds;

    if (event.target.checked) {
      newSelectedMovementIds = movements.map((movement) => movement.id);
    } else {
      newSelectedMovementIds = [];
    }

    setSelectedMovementIds(newSelectedMovementIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedMovementIds.indexOf(id);
    let newSelectedMovementIds = [];

    if (selectedIndex === -1) {
      newSelectedMovementIds = newSelectedMovementIds.concat(selectedMovementIds, id);
    } else if (selectedIndex === 0) {
      newSelectedMovementIds = newSelectedMovementIds.concat(selectedMovementIds.slice(1));
    } else if (selectedIndex === selectedMovementIds.length - 1) {
      newSelectedMovementIds = newSelectedMovementIds.concat(selectedMovementIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedMovementIds = newSelectedMovementIds.concat(
        selectedMovementIds.slice(0, selectedIndex),
        selectedMovementIds.slice(selectedIndex + 1)
      );
    }

    setSelectedMovementIds(newSelectedMovementIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleEdit = (movements) => {
    route.push({
      pathname: '/movements/edit',
      query: { data: JSON.stringify(movements) },

    });
  }

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedMovementIds.length === movements.length}
                    color="primary"
                    indeterminate={
                      selectedMovementIds.length > 0
                      && selectedMovementIds.length < movements.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Tipo
                </TableCell>
                <TableCell>
                  Cliente
                </TableCell>
                <TableCell>
                  Data de inicio
                </TableCell>
                <TableCell>
                  Data de fim
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  Editar
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movements.slice(0, limit).map((movement) => (
                <TableRow
                  hover
                  key={movement.id}
                  selected={selectedMovementIds.indexOf(movement.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedMovementIds.indexOf(movement.id) !== -1}
                      onChange={(event) => handleSelectOne(event, moviment.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {movement.tipo_de_movimentacao}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                  <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {movement?.container?.cliente}
                      </Typography>
                  </TableCell>
                  <TableCell>
                    {format(parseISO(movement.data_inicio), "dd/MM/yyyy HH:mm", { locale: pt })}
                  </TableCell>
                  <TableCell>
                  {movement?.data_fim ? format(parseISO(movement.data_fim), "dd/MM/yyyy", { locale: pt }) : ''}
                  </TableCell>
                  <TableCell>
                  {movement?.data_fim ? (
                    <span
                      style={{
                        padding: 5,
                        borderRadius: 10,
                        backgroundColor: theme.palette.secondary.light,
                        color: theme.palette.background.paper
                    }}>
                      Concluído
                    </span>
                  ) : (
                    <span
                      style={{
                        padding: 5,
                        borderRadius: 10,
                        backgroundColor: theme.palette.warning.light,
                        color: theme.palette.background.paper
                    }}>
                      Em andamento
                    </span>
                  )}
                  </TableCell>
                  <TableCell
                    onClick={() => handleEdit(movement)}
                    style={{ cursor: 'pointer'}}
                  >
                    <EditIcon fontSize="small" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={movements.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

MovementListResults.propTypes = {
  movements: PropTypes.array.isRequired
};
