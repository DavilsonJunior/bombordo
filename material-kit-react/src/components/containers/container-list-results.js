import { useState } from 'react';
import { useRouter } from 'next/router';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
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
import EditIcon from '@mui/icons-material/Edit'

import { getInitials } from '../../utils/get-initials';

export const ContainerListResults = ({ containers, ...rest }) => {
  const [selectedContainerIds, setSelectedContainerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const route = useRouter();

  const handleSelectAll = (event) => {
    let newSelectedContainerIds;

    if (event.target.checked) {
      newSelectedContainerIds = containers.map((container) => container.id);
    } else {
      newSelectedContainerIds = [];
    }

    setSelectedContainerIds(newSelectedContainerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedContainerIds.indexOf(id);
    let newSelectedContainerIds = [];

    if (selectedIndex === -1) {
      newSelectedContainerIds = newSelectedContainerIds.concat(selectedContainerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedContainerIds = newSelectedContainerIds.concat(selectedContainerIds.slice(1));
    } else if (selectedIndex === selectedContainerIds.length - 1) {
      newSelectedContainerIds = newSelectedContainerIds.concat(selectedContainerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedContainerIds = newSelectedContainerIds.concat(
        selectedContainerIds.slice(0, selectedIndex),
        selectedContainerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedContainerIds(newSelectedContainerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleEdit = (container) => {
    route.push({
      pathname: '/containers/edit',
      query: { data: JSON.stringify(container) }
    })
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
                    checked={selectedContainerIds.length === containers.length}
                    color="primary"
                    indeterminate={
                      selectedContainerIds.length > 0
                      && selectedContainerIds.length < containers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  Cliente
                </TableCell>
                <TableCell>
                  Número do Container
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  Categoria
                </TableCell>
                <TableCell>
                  Editar
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {containers.slice(0, limit).map((container) => (
                <TableRow
                  hover
                  key={container.id}
                  selected={selectedContainerIds.indexOf(container.id) !== -1}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedContainerIds.indexOf(container.id) !== -1}
                      onChange={(event) => handleSelectOne(event, container.id)}
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
                      <Avatar
                        // src={container.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(container.cliente)}
                      </Avatar>
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {container.cliente}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {container.numero_container}
                  </TableCell>
                  <TableCell>
                    {container.status}
                  </TableCell>
                  <TableCell>
                  {container.categoria}
                  </TableCell>
                  <TableCell
                    onClick={() => handleEdit(container)}
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
        count={containers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ContainerListResults.propTypes = {
  customers: PropTypes.array.isRequired
};
