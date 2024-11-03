import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import socket from '../../socket';

export const fetchWorkspaces = createAsyncThunk(
  'workspace/fetchWorkspaces',
  async (_, { rejectWithValue }) => {
    return new Promise((resolve, reject) => {
      socket.emit('fetchAllWorkspaceData');

      socket.on('workspaceDataWithListsAndItems', (data) => {
        resolve(data);
      });

      socket.on('error', (error) => {
        rejectWithValue(error.message);
      });
    });
  }
);

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState: {
    workspaces: [],
    selectedWorkspaceId: null,
    error: null,
  },
  reducers: {
    setSelectedWorkspaceId: (state, action) => {
      state.selectedWorkspaceId = action.payload;
    },
    clearWorkspaceData: (state) => {
      state.workspaces = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkspaces.fulfilled, (state, action) => {
        state.workspaces = action.payload;
        state.error = null;
      })
      .addCase(fetchWorkspaces.rejected, (state, action) => {
        state.error = action.payload || 'Failed to fetch workspaces';
      });
  },
});

export const { setSelectedWorkspaceId, clearWorkspaceData } = workspaceSlice.actions;
export default workspaceSlice.reducer;
