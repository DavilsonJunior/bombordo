import { useState, useEffect } from 'react';
import { formatDistanceToNow, subHours, parseISO } from 'date-fns';
import { v4 as uuid } from 'uuid';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import api from '../../services/api';

const products = [
  {
    id: uuid(),
    name: 'Dropbox',
    imageUrl: '/static/images/products/product_1.png',
    updatedAt: subHours(Date.now(), 2)
  },
  {
    id: uuid(),
    name: 'Medium Corporation',
    imageUrl: '/static/images/products/product_2.png',
    updatedAt: subHours(Date.now(), 2)
  },
  {
    id: uuid(),
    name: 'Slack',
    imageUrl: '/static/images/products/product_3.png',
    updatedAt: subHours(Date.now(), 3)
  },
  {
    id: uuid(),
    name: 'Lyft',
    imageUrl: '/static/images/products/product_4.png',
    updatedAt: subHours(Date.now(), 5)
  },
  {
    id: uuid(),
    name: 'GitHub',
    imageUrl: '/static/images/products/product_5.png',
    updatedAt: subHours(Date.now(), 9)
  }
];

export const LatestContainers = (props) => {
  const [lastContainers, setLastContainers] = useState([]);

  const getLastContainers = async () => {
    try {
      const response = await api.get('/containers/current');

      setLastContainers(response.data)
    } catch (err) {

    } finally {

    }


  }

  useEffect(() => {
    getLastContainers();
  }, [])

  return (
    <Card {...props}>
      <CardHeader
        subtitle={`${products.length} in total`}
        title="Últimos Containers"
      />
      <Divider />
      <List>
        {lastContainers.map((container, i) => (
          <ListItem
            divider={i < container.length - 1}
            key={container.id}
          >
            <ListItemAvatar>
              <img
                alt="Docker icon"
                src="https://avatars.githubusercontent.com/u/5429470?s=280&v=4"
                style={{
                  height: 48,
                  width: 48
                }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={container.cliente}
              secondary={`Updated ${formatDistanceToNow(parseISO(container.updatedAt))}`}
            />
            <IconButton
              edge="end"
              size="small"
            >
              <MoreVertIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          Visualizar todos
        </Button>
      </Box>
    </Card>
  );
}
