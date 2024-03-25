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
      { Header: "name", accessor: "name", align: "center" },
      { Header: "phone", accessor: "phone", align: "center" },
    ],

    rows: [
      {
        departament: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            General Manager
          </MDTypography>
        ),
        name: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <a href="mailto:cjenseng@castrofallas.com">Carl Jesen</a>
          </MDTypography>
        ),
        phone: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Ofic. +506 2272-6772
          </MDTypography>
        ),
      },
      {
        departament: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Operations Manager
          </MDTypography>
        ),
        name: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <a href="mailto:cemesen@castrofallas.com">Cesar Mesen</a>
          </MDTypography>
        ),
        phone: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Ofic. +506 2272-6772
          </MDTypography>
        ),
      },
      {
        departament: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Logistics Manager
          </MDTypography>
        ),
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
      {
        departament: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Logistics Executive Panama
          </MDTypography>
        ),
        name: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <a href="mailto:panama@grupocastrofallas.com">Danna Salas</a>
          </MDTypography>
        ),
        phone: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Ofic. +506 2272-6772 Ext. 122
            <br /> WhatsApp. +506 6354-1392
          </MDTypography>
        ),
      },
      {
        departament: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Logistics Executive Costa Rica
          </MDTypography>
        ),
        name: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <a href="mailto:costarica@grupocastrofallas.com">Gabriel Miranda</a>
          </MDTypography>
        ),
        phone: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Ofic. +506 2272-6772 Ext. 151
            <br /> WhatsApp. +506 7005 1261
          </MDTypography>
        ),
      },
      {
        departament: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Logistics Executive Coordination Origen
          </MDTypography>
        ),
        name: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <a href="mailto:china@grupocastrofallas.com">Genesis Tenorio</a>
          </MDTypography>
        ),
        phone: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Ofic. +506 2272-6772 Ext. 124
            <br /> WhatsApp. +506 7005 1261
          </MDTypography>
        ),
      },
      {
        departament: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Logistics Executive CentroAmerica and Mexico
          </MDTypography>
        ),
        name: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <a href="mailto:guatemala@grupocastrofallas.com">Andrea Monge</a>
          </MDTypography>
        ),
        phone: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Ofic. +506 2272-6772 Ext. 113
            <br /> WhatsApp. +506 6159 5496
          </MDTypography>
        ),
      },
      {
        departament: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Logistics Executive USA and Canada
          </MDTypography>
        ),
        name: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <a href="mailto:usa@grupocastrofallas.com">Hilary Fernandez</a>
          </MDTypography>
        ),
        phone: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Ofic. +506 2272-6772 Ext. 113
            <br /> WhatsApp. +506 6354 3767
          </MDTypography>
        ),
      },
      {
        departament: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Pricing
          </MDTypography>
        ),
        name: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <a href="mailto:pricing@grupocastrofallas.com">Maria Fonseca</a>
          </MDTypography>
        ),
        phone: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Ofic. +506 2272-6772 Ext. 135
            <br /> WhatsApp. +506 7256 5044
          </MDTypography>
        ),
      },
      {
        departament: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Commercial Executive
          </MDTypography>
        ),
        name: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <a href="mailto:comercial1@castrofallas.com">Pablo Miranda</a>
          </MDTypography>
        ),
        phone: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Ofic. +506 2272-6772 Ext. 133
            <br /> WhatsApp. +506 6339 0028
          </MDTypography>
        ),
      },
      {
        departament: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Customer service
          </MDTypography>
        ),
        name: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <a href="mailto:servicioalcliente@castrofallas.com">Customer service</a>
          </MDTypography>
        ),
        phone: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Ofic. +506 2272-6772 Ext. 129 / 143
            <br /> WhatsApp. +506 7006 3878
          </MDTypography>
        ),
      },
      {
        departament: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Billing
          </MDTypography>
        ),
        name: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <a href="mailto:fvillalobos@castrofallas.com">Fabian Villalobos</a>
          </MDTypography>
        ),
        phone: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Ofic. +506 2272-6772 Ext. 141
            <br /> WhatsApp. +506 8354 0875
          </MDTypography>
        ),
      },
      {
        departament: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Fiscal WareHouse
          </MDTypography>
        ),
        name: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <a href="mailto:facturacion1@castrofallas.com">Jaime Pacheco</a>
          </MDTypography>
        ),
        phone: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Ofic. +506 2272-6772 Ext. 103 / 100
          </MDTypography>
        ),
      },
      {
        departament: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Sales Manager
          </MDTypography>
        ),
        name: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <a href="mailto:rsoto@castrofallas.com">Richard Soto</a>
          </MDTypography>
        ),
        phone: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Ofic. +506 2272-6772 Ext. 142
            <br /> WhatsApp. +506 7078 6893
          </MDTypography>
        ),
      },
      {
        departament: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Commercial Executive
          </MDTypography>
        ),
        name: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <a href="mailto:sredondo@castrofallas.com">Stephanie Redondo</a>
          </MDTypography>
        ),
        phone: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Ofic. +506 2272-6772 Ext. 123
            <br /> WhatsApp. +506 6434 6756
          </MDTypography>
        ),
      },
      {
        departament: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Commercial Executive
          </MDTypography>
        ),
        name: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <a href="mailto:dacuna@castrofallas.com">Dennis Acuna</a>
          </MDTypography>
        ),
        phone: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Ofic. +506 2272-6772 Ext. 142
            <br /> WhatsApp. +506 7078 6860
          </MDTypography>
        ),
      },
      {
        departament: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Commercial Executive
          </MDTypography>
        ),
        name: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <a href="mailto:rmontero@castrofallas.com">Rafael Montero</a>
          </MDTypography>
        ),
        phone: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Ofic. +506 2272-6772 Ext. 142
            <br /> WhatsApp. +506 7208 3068
          </MDTypography>
        ),
      },
      {
        departament: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Finance Manager
          </MDTypography>
        ),
        name: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <a href="mailto:ochavarria@castrofallas.com">Oscar Chavarria</a>
          </MDTypography>
        ),
        phone: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Ofic. +506 2272-6772 Ext. 114
          </MDTypography>
        ),
      },
      {
        departament: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Accounts Receivable
          </MDTypography>
        ),
        name: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            <a href="mailto:estados1@castrofallas.com">Tere Perez</a>
          </MDTypography>
        ),
        phone: (
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Ofic. +506 2272-6772 Ext. 114
          </MDTypography>
        ),
      },
    ],
  };
}
