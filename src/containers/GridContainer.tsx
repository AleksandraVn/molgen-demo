import {Grid} from "@material-ui/core";
import React from 'react';

export const GridContainer: React.FC = ({ children }) => {
    return <Grid container spacing={3} alignItems="baseline">{children}</Grid>;
};

export default GridContainer;