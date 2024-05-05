import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// create action

export const createUser = createAsyncThunk(
  "createUser",
  async (data, { rejectWithValue }) => {
    console.log("data", data);
    const response = await fetch(
      "https://663342f4f7d50bbd9b48bd66.mockapi.io/crud",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error, "error create");
    }
  }
);

// Read
export const showUser = createAsyncThunk(
  "showUser",
  async (_,{ rejectWithValue }) => {
    const response = await fetch(
      "https://663342f4f7d50bbd9b48bd66.mockapi.io/crud",
   );
    
    try {
      
      const result = await response.json();
      console.log("result", result);
      return result;
    } catch (error) {
      return rejectWithValue(error, "error show");
    }
  }
);

// Delete

export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id,{ rejectWithValue }) => {
    const response = await fetch(
      `https://663342f4f7d50bbd9b48bd66.mockapi.io/crud/${id}`, 
      {method: 'DELETE'}
   );
    
    try {
      
      const result = await response.json();
      console.log("result", result);
      return result;
    } catch (error) {
      return rejectWithValue(error, "error show");
    }
  }
);


// updateUser 
export const updateUser = createAsyncThunk(
  "updateUser",
  async (data, { rejectWithValue }) => {
    console.log("update User", data);
    const response = await fetch(
      `https://663342f4f7d50bbd9b48bd66.mockapi.io/crud/${data.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error, "error create");
    }
  }
);


const userDetail = createSlice({
  name: "userDetail",
  initialState: {
    users: [],
    loading: false,
    error: null,
    searchData : [],
  },
  reducers : {
    searchData : (state, action) =>{
       state.searchData = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
    // create
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
// read
      .addCase(showUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(showUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(showUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // delete
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        // state.users = action.payload;
        const {id} = action.payload;

        if(id){
          state.users = state.users.filter((ele) => ele.id !== id);
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
 
      // Update

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((ele) => 
        ele.id === action.payload.id ? action.payload : ele
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
 

  }
});

export default userDetail.reducer;

export const {searchData} = userDetail.actions;