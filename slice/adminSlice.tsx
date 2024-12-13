import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminState {
    adminMode: boolean;
    selectedBarangay: string | null;
}

const initialState: AdminState = {
    adminMode: false,
    selectedBarangay: null,
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setAdminMode: (state, action: PayloadAction<boolean>) => {
            state.adminMode = action.payload;
        },
        setSelectedBarangay: (state, action: PayloadAction<string | null>) => {
            state.selectedBarangay = action.payload;
        },
        resetAdminState: (state) => {
            state.adminMode = false;
            state.selectedBarangay = null;
        },
    },
});

export const { setAdminMode, setSelectedBarangay, resetAdminState } =
    adminSlice.actions;
export default adminSlice.reducer;
