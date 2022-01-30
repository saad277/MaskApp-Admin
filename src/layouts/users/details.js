// @mui material components
import React from "react";
import { connect } from "react-redux";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import moment from "moment";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { getMediaDetails } from "../../store/actions";

function Details(props) {
  const { getMediaDetails } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [media, setMedia] = React.useState(null);
  const open = Boolean(anchorEl);
  const { id } = useParams();

  React.useEffect(() => {
    getMediaDetails(Number(id)).then((res) => {
      setMedia(res);
    });
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {media && (
        <MDBox pt={6} pb={3}>
          <Grid container spacing={6}>
            <Grid item xs={12} lg={12}>
              <MDBox display="flex" alignItems="center" lineHeight={1}>
                <MDAvatar
                  src={"data:image/png;base64," + media.Img}
                  size="lg"
                  style={{ width: 330, height: 250, borderRadius: 0 }}
                />
                {/* <MDTypography
                  variant="caption"
                  style={{ marginLeft: 20, fontSize: 20, fontWight: 500 }}
                >
                  {"abc"}
                </MDTypography> */}
              </MDBox>
            </Grid>

            <Grid item xs={12} lg={12}>
              <MDBox display="flex" alignItems="center" lineHeight={1}>
                Date :
                <MDTypography
                  variant="caption"
                  style={{ marginLeft: 20, fontSize: 20, fontWight: 500 }}
                >
                  {moment(media.CreatedAT).format("LL")}
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
                  {media.WithMask}
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
                  {media.WithoutMask}
                </MDTypography>
              </MDBox>
            </Grid>

            <Grid item xs={12} lg={12}>
              <MDBox display="flex" alignItems="center" lineHeight={1}>
                Status :{" "}
                <MDBadge
                  onClick={handleClick}
                  badgeContent={!media.Status && "None"}
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
      )}

      <Footer />
    </DashboardLayout>
  );
}

const mapDispatchToProps = {
  getMediaDetails,
};

export default connect(null, mapDispatchToProps)(Details);
