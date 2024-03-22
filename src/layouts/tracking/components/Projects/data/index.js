/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// @mui material components
import Tooltip from "@mui/material/Tooltip";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

export default function data() {
  const avatars = (members) =>
    members.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <MDAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  const Company = ({ image, name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDTypography variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  return {
    columns: [
      { Header: "departament", accessor: "departament", align: "left" },
      { Header: "funtion", accessor: "funtion", align: "left" },
      { Header: "name", accessor: "name", align: "center" },
      { Header: "phone", accessor: "phone", align: "center" },
    ],

    rows: [
      {
        departament: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Logistics Manager
          </MDTypography>
        ),
        funtion: <MDTypography variant="caption" color="text" fontWeight="medium"></MDTypography>,
        name: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <a href="mailto:rsibaja@castrofallas.com">Royner Sibaja</a>
          </MDTypography>
        ),
        phone: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Ofic. +506 2272-6772 Ext. 150
            <br /> WhatsApp. +506 7078-6941
          </MDTypography>
        ),
      },
      {
        departament: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Logistics Operations Manager
          </MDTypography>
        ),
        funtion: <MDTypography variant="caption" color="text" fontWeight="medium"></MDTypography>,
        name: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <a href="mailto:logistica2@castrofallas.com">Josue Alvarado</a>
          </MDTypography>
        ),
        phone: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Ofic. +506 2272-6772 Ext. 134 <br /> WhatsApp. +506 6119-6970
          </MDTypography>
        ),
      },
      {
        departament: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Logistics Finance Manager
          </MDTypography>
        ),
        funtion: <MDTypography variant="caption" color="text" fontWeight="medium"></MDTypography>,
        name: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <a href="mailto:squiros@castrofallas.com">Sonia Quiros</a>
          </MDTypography>
        ),
        phone: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Ofic. +506 2272-6772 Ext. 104
            <br /> WhatsApp. +506 6283-8475
          </MDTypography>
        ),
      },
    ],
  };
}
