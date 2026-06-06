import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box
} from "@mui/material";
import { useTranslation } from "react-i18next";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function UserDialog({ open, formData, onChange, onClose, onUpdate, setFormData }) {
  const { t } = useTranslation();

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phoneNo: value }));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t('Edit User')}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label={t("Username")}
          type="text"
          fullWidth
          name="username"
          value={formData.username}
          onChange={onChange}
        />

        <TextField
          margin="dense"
          label={t("Email")}
          type="email"
          fullWidth
          name="email"
          value={formData.email}
          onChange={onChange}
          disabled
        />

        <Box sx={{ position: 'relative', mt: 2 }}>
          <PhoneInput
            country={''}
            placeholder={t('Enter your mobile number')}
            value={formData.phoneNo}
            onChange={handlePhoneChange}
            inputStyle={{
              width: '100%',
              height: '55px',
              paddingLeft: '50px',
            }}
            inputProps={{
              name: 'phoneNo',
              required: true,
            }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t('Cancel')}</Button>
        <Button onClick={onUpdate} variant="contained">{t('Update')}</Button>
      </DialogActions>
    </Dialog>
  );
}
