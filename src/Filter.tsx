import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Popover,
  TextField,
  Typography,
} from '@mui/material';
import { FilterList } from '@mui/icons-material';

interface CheckboxFilters {
  option1: boolean;
  option2: boolean;
  option3: boolean;
}

function FilterFormMenu() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const filterButtonRef = useRef<HTMLButtonElement | null>(null);
  const [textFilter, setTextFilter] = useState<string>('');
  const [checkboxFilters, setCheckboxFilters] = useState<CheckboxFilters>({
    option1: false,
    option2: false,
    option3: false,
  });

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextFilter(event.target.value);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxFilters({
      ...checkboxFilters,
      [event.target.name]: event.target.checked,
    });
  };

  const handleApplyFilters = () => {
    console.log('Text Filter:', textFilter);
    console.log('Checkbox Filters:', checkboxFilters);
    handleClose();
    // Add your filter application logic here
  };

  return (
    <div>
      <Button
        ref={filterButtonRef}
        variant="outlined"
        startIcon={<FilterList />}
        onClick={handleClick}
      >
        Filter
      </Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        slotProps={{
          paper: {
            style: {
              boxShadow: '0px 3px 5px rgba(255, 255, 255, 0.2)',
              maxHeight: '600px',
              overflowY: 'auto',
              padding: '16px',
              width: '300px',
            },
            variant: 'outlined',
          },
        }}
      >
        <Box>
          <Typography variant="subtitle1">Text Filter</Typography>

          <TextField
            label="Search"
            value={textFilter}
            onChange={handleTextChange}
            fullWidth
            margin="normal"
          />
        </Box>

        <Divider style={{ margin: '16px 0' }} />

        <Box>
          <FormControl component="fieldset">
            <FormLabel component="legend">Checkbox Filters</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkboxFilters.option1}
                    onChange={handleCheckboxChange}
                    name="option1"
                  />
                }
                label="Option 1"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkboxFilters.option2}
                    onChange={handleCheckboxChange}
                    name="option2"
                  />
                }
                label="Option 2"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkboxFilters.option3}
                    onChange={handleCheckboxChange}
                    name="option3"
                  />
                }
                label="Option 3"
              />
            </FormGroup>
          </FormControl>
        </Box>

        <Divider style={{ margin: '16px 0' }} />

        <Box>
          <Typography variant="subtitle1">Text Filter 2</Typography>

          <TextField
            placeholder="Search 2 "
            value={textFilter}
            onChange={handleTextChange}
            fullWidth
            margin="normal"
          />
        </Box>

        <Divider style={{ margin: '16px 0' }} />

        <Box>
          <Typography variant="subtitle1">Text Filter 3</Typography>

          <TextField
            placeholder="Search 3"
            value={textFilter}
            onChange={handleTextChange}
            fullWidth
            margin="normal"
          />
        </Box>

        <Divider style={{ margin: '16px 0' }} />

        <Box
          sx={{
            marginTop: '16px',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button variant="contained" onClick={handleApplyFilters}>
            Apply
          </Button>
        </Box>
      </Popover>
    </div>
  );
}

export default FilterFormMenu;
