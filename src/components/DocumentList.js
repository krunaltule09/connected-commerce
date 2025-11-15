import { Box, Grid } from '@mui/material';
import DocumentTile from './DocumentTile';

export default function DocumentList({ documents = [], selectedId, onSelect }) {
  return (
    <Box sx={{ height: '100%', overflowY: 'auto', pr: 1 }}>
      <Grid container spacing={1.25} columns={2}>
        {documents.map((doc) => (
          <Grid item xs={1} key={doc.id}>
            <DocumentTile
              doc={doc}
              selected={String(selectedId) === String(doc.id)}
              onSelect={onSelect}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
