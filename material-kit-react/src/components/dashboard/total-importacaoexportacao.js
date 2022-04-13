import { Avatar, Card, CardContent, Grid, Typography, Skeleton } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export const TotalExportacaoImportacao = (props) => (
  <Card {...props}>
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
            TOTAL IMPORTAÇÃO / EXPORTAÇÃO
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
            {props.total ? props.total.toFixed(2) : 0}
          </Typography>
          )}
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'primary.main',
              height: 56,
              width: 56
            }}
          >
            <AttachMoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
