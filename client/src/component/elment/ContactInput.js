import React from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const ContactInput = (props) => {
    const {setMessage} = props
    
    return(
        <div>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    >
                    <TextField id="outlined-basic" label="Contact Address" variant="outlined" />
                </Box>
        </div>
    )
}

export default ContactInput;
