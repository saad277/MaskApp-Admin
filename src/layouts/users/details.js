// @mui material components
import React from "react";
import { connect } from "react-redux";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import moment from "moment";
import GoogleMapReact from "google-map-react";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { getMediaDetails, statusUpdate } from "../../store/actions";

function Details(props) {
  const { getMediaDetails, statusUpdate } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [media, setMedia] = React.useState(null);
  const [address, setAddress] = React.useState("-");
  const open = Boolean(anchorEl);
  const { id } = useParams();

  React.useEffect(() => {
    getMediaDetails(Number(id)).then((res) => {
      setMedia(res);

      if (res?.Location?.latitude && res?.Location?.longitude) {
        fetch(
          `http://api.positionstack.com/v1/reverse?access_key=b060536a5abca8391d7dbb68ac74ace8&query=${res?.Location?.latitude},${res?.Location?.longitude}`
        )
          .then((res) => res.json())
          .then((res) => {
            setAddress(res.data[0].label);
          });
      }
    });
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (val) => {
    let payload = { UserId: media.UserId, Status: val };

    statusUpdate(id, payload).then((res) => {
      let temp = { ...media };

      temp.Status = val;

      setMedia(temp);

      fetch("https://fcm.googleapis.com/fcm/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "key=AAAAsFijHTk:APA91bHgf77eqC9bQ2B0lbrEjArRa9PF0x5eN-koTE1VQ3witw2Kn9UxZPaILITIBnZP1DSe2RwO7-HFWNGBNVWcXINqEout1XYhqyJRZa3Y37C7qpRED-RDEKXIlpnhr2pH8xxJAx7J",
        },
        body: JSON.stringify({
          to: res.token,
          notification: {
            body: "Message from Mask App",
            title: "Alert Area is unsafe !!!!",
          },
          data: {
            body: "Notification Body",
            title: "Notification Title",
            color: "red",
            icon: "ic_announce",
          },
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        });
    });

    setAnchorEl(null);
  };

  const getStatus = (status) => {
    if (status == 1) {
      return "Low";
    } else if (status == 2) {
      return "Medium";
    } else {
      return "High";
    }
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
                  {moment(media.CreatedAt).format("LL")}
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
                With Mask Hazard Ratio :
                <MDTypography
                  variant="caption"
                  style={{ marginLeft: 20, fontSize: 20, fontWight: 500 }}
                >
                  {(media.WithMask / media.WithMask + media.WithoutMask) * 100}%
                </MDTypography>
              </MDBox>
              <MDBox display="flex" alignItems="center" lineHeight={1}>
                Without Mask Hazard Ratio :
                <MDTypography
                  variant="caption"
                  style={{ marginLeft: 20, fontSize: 20, fontWight: 500 }}
                >
                  {(media.WithoutMask / media.WithMask + media.WithoutMask) * 100}%
                </MDTypography>
              </MDBox>
            </Grid>

            <Grid item xs={12} lg={12}>
              <MDBox display="flex" alignItems="center" lineHeight={1}>
                Status :{" "}
                <MDBadge
                  onClick={handleClick}
                  badgeContent={media.Status ? getStatus(media.Status) : !media.Status && "None"}
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
                  <MenuItem onClick={() => handleClose(3)}>High</MenuItem>
                  <MenuItem onClick={() => handleClose(2)}>Medium</MenuItem>
                  <MenuItem onClick={() => handleClose(1)}>Low</MenuItem>
                </Menu>
              </MDBox>
            </Grid>
          </Grid>

          <Grid item xs={12} lg={12}>
            <MDBox display="flex" alignItems="center" lineHeight={1}>
              Address :
              <MDTypography
                variant="caption"
                style={{ marginLeft: 20, fontSize: 20, fontWight: 500 }}
              >
                {address || "-"}
              </MDTypography>
            </MDBox>
          </Grid>

          <Grid item xs={12} lg={12} style={{ marginTop: 30 }}>
            <MDBox display="flex" alignItems="center" lineHeight={1}>
              Location :
            </MDBox>
            <div style={{ width: "100%", height: 500, marginTop: 20 }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyBchnNWv36OEeOocuLCfRZOn7T8D3rAAQ8" }}
                defaultCenter={{
                  lat: 37.42216,
                  lng: -122.08427,
                }}
                defaultZoom={9}
              ></GoogleMapReact>
            </div>
          </Grid>
        </MDBox>
      )}

      <Footer />
    </DashboardLayout>
  );
}

const mapDispatchToProps = {
  getMediaDetails,
  statusUpdate,
};

export default connect(null, mapDispatchToProps)(Details);
