// @mui material components
import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";

function Details() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12} lg={12}>
            <MDBox display="flex" alignItems="center" lineHeight={1}>
              <MDAvatar
                name={"ASdas"}
                src={
                  "https://images.unsplash.com/photo-1642796208527-e492cc61e64f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                }
                size="lg"
                style={{ width: 200, height: 150 }}
              />
              <MDTypography
                variant="caption"
                style={{ marginLeft: 20, fontSize: 20, fontWight: 500 }}
              >
                {"abc"}
              </MDTypography>
            </MDBox>
          </Grid>

          <Grid item xs={12} lg={12}>
            <MDBox display="flex" alignItems="center" lineHeight={1}>
              Date :
              <MDTypography
                variant="caption"
                style={{ marginLeft: 20, fontSize: 20, fontWight: 500 }}
              >
                {"2012-12-11"}
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} lg={12}>
            <MDBox display="flex" alignItems="center" lineHeight={1}>
              With Mask :
              <MDTypography
                variant="caption"
                style={{ marginLeft: 20, fontSize: 20, fontWight: 500 }}
              >
                {2}
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid item xs={12} lg={12}>
            <MDBox display="flex" alignItems="center" lineHeight={1}>
              Without Mask :
              <MDTypography
                variant="caption"
                style={{ marginLeft: 20, fontSize: 20, fontWight: 500 }}
              >
                {2}
              </MDTypography>
            </MDBox>
          </Grid>

          <Grid item xs={12} lg={12}>
            <MDBox display="flex" alignItems="center" lineHeight={1}>
              Without Mask :
              <MDTypography
                variant="caption"
                style={{ marginLeft: 20, fontSize: 20, fontWight: 500 }}
              >
                {2}
              </MDTypography>
            </MDBox>
          </Grid>

          <Grid item xs={12} lg={12}>
            <MDBox display="flex" alignItems="center" lineHeight={1}>
              Status :{" "}
              <MDBadge
                onClick={handleClick}
                badgeContent="safe"
                color="success"
                variant="gradient"
                size="sm"
              />
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>High</MenuItem>
                <MenuItem onClick={handleClose}>Medium</MenuItem>
                <MenuItem onClick={handleClose}>Low</MenuItem>
              </Menu>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Details;
