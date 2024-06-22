import { Box, Typography } from '@mui/material';

interface ResultProps {
    text: string;
}

function Result({ text }: ResultProps) {
    return (
        <Box>
            <Typography>
                {text}
            </Typography>
        </Box>
    );
}

export default Result;
