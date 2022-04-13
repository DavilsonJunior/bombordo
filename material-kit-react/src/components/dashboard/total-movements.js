import { Avatar, Box, Card, CardContent, Grid, Typography, Skeleton } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoneyIcon from '@mui/icons-material/Money';

export const TotalMovements = (props) => (
  <Card
    sx={{ height: '100%' }}
    {...props}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            Total Movimentação
          </Typography>
          {props.loading ? (
              <Skeleton
              variant="rectangular"
              style={{borderRadius: 6}}
              width={100}
              height={50} />
            ): (
              <Typography
              color="textPrimary"
              variant="h4"
            >
             {props.totalMovimentacao}
            </Typography>
            )
            }

        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56
            }}
          >
            <MoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
