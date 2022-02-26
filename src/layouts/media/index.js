import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import OutsideClickHandler from "react-outside-click-handler";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./calendar.css";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Data
import authorsTableData from "layouts/media/data/authorsTableData";

import { getMediaListing, getMediaInRange } from "../../store/actions";
import moment from "moment";

function Tables(props) {
  const { getMediaListing, getMediaInRange } = props;

  const [data, setData] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const { columns, rows } = authorsTableData(data);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    getMediaListing().then((res) => {
      setData(res.Data);
    });
  }, []);

  const handleDateSelect = (item) => {
    const { selection } = item;
    setState([selection]);

    let payload = {
      StartDate: moment(selection.startDate).format("YYYY-MM-DD"),
      EndDate: moment(selection.endDate).format("YYYY-MM-DD"),
    };

    getMediaInRange(payload).then((res) => {
      setData(res.Data);
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div style={{ position: "relative" }}>
        <Icon style={{ marginLeft: 16 }} onClick={() => setShowCalendar(!showCalendar)}>
          event
        </Icon>
        {showCalendar && (
          <div class="calendar">
            <OutsideClickHandler onOutsideClick={() => setShowCalendar(false)}>
              <DateRangePicker
                onChange={handleDateSelect}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                ranges={state}
                direction="horizontal"
                showDateDisplay={false}
              />
            </OutsideClickHandler>
          </div>
        )}
      </div>

      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Scanned Pictures
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

const mapDispatchToProps = {
  getMediaListing,
  getMediaInRange,
};

export default connect(null, mapDispatchToProps)(Tables);
