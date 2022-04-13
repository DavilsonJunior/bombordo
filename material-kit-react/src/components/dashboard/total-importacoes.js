import { Avatar, Box, Card, CardContent, Grid, Typography, Skeleton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';

export const TotalImportacoes = (props) => (
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
            TOTAL IMPORTAÇÔES
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
            {props.totalImportacao}
          </Typography>
          )}
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'success.main',
              height: 56,
              width: 56
            }}
          >
            <PeopleIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
