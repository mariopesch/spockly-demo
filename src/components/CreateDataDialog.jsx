import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Link,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

const CreateDataDialog = ({ open, onClose }) => {
  const [headers, setHeaders] = useState(["column1", "column2"]);
  const [rows, setRows] = useState([["", ""]]);
  const [filename, setFilename] = useState("my_data.csv");

  const handleAddRow = () =>
    setRows([...rows, Array(headers.length).fill("")]);

  const handleDeleteRow = (i) =>
    setRows(rows.filter((_, idx) => idx !== i));

  const handleAddColumn = () => {
    const newHeader = `column${headers.length + 1}`;
    setHeaders([...headers, newHeader]);
    setRows(rows.map((r) => [...r, ""]));
  };

  const handleDeleteColumn = (colIndex) => {
    if (headers.length <= 1) return;
    setHeaders(headers.filter((_, i) => i !== colIndex));
    setRows(rows.map((row) => row.filter((_, i) => i !== colIndex)));
  };

  const handleChange = (i, j, value) => {
    const updated = [...rows];
    updated[i][j] = value;
    setRows(updated);
  };

  const handleHeaderChange = (i, value) => {
    const updated = [...headers];
    updated[i] = value;
    setHeaders(updated);
  };

  const downloadFile = () => {
    const safeFilename = filename.trim();
    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = safeFilename;
    a.click();

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle>Create CSV Data</DialogTitle>
      <DialogContent>
        {/* Info about GeoJSON */}
        <Typography variant="body2" sx={{ mb: 2 }}>
          Need to create GeoJSON instead? You can do so easily at{" "}
          <Link
            href="https://geojson.io"
            target="_blank"
            rel="noopener noreferrer"
          >
            geojson.io
          </Link>
          .
        </Typography>

        {/* Editable Table */}
        <Table size="small">
          <TableHead>
            <TableRow>
              {headers.map((h, j) => (
                <TableCell key={j}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <TextField
                        value={h}
                        onChange={(e) => handleHeaderChange(j, e.target.value)}
                        variant="standard"
                        fullWidth
                      />
                    </Box>
                    {headers.length > 1 && (
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteColumn(j)}
                        sx={{ p: 0.5 }}
                      >
                        <Delete fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={i}>
                {row.map((cell, j) => (
                  <TableCell key={j}>
                    <Box sx={{ flexGrow: 1 }}>
                      <TextField
                        value={cell}
                        onChange={(e) => handleChange(i, j, e.target.value)}
                        variant="standard"
                        fullWidth
                      />
                    </Box>
                  </TableCell>
                ))}
                <TableCell>
                  <IconButton onClick={() => handleDeleteRow(i)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Row/Column Controls */}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <Button startIcon={<Add />} onClick={handleAddRow}>
            Add Row
          </Button>
          <Button startIcon={<Add />} onClick={handleAddColumn}>
            Add Column
          </Button>
        </Box>

        {/* Filename Input */}
        <Box sx={{ mt: 3, maxWidth: 300 }}>
          <TextField
            label="Filename"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            variant="standard"
            fullWidth
            helperText="Example: my_data.csv"
          />
        </Box>
      </DialogContent>

      {/* Footer Buttons */}
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={downloadFile}>
          Download
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateDataDialog;
