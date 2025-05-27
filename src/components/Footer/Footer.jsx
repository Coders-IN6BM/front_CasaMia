import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const footerBlue = "#16236a";
const textGray = "#b6c3e2";
const white = "#ffffff";

export const Footer = () => (
  <Box
    sx={{
      backgroundColor: footerBlue,
      color: white,
      width: '100%',
      py: { xs: 1.5, md: 2 },
      px: 0,
      boxShadow: "0px -2px 8px rgba(16,16,16,0.12)",
      fontSize: 15,
      mt: 6, // margen superior opcional para separación
    }}
    component="footer"
  >
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: "space-between",
        gap: 2,
        minHeight: 48
      }}
    >
      {/* Logo y Nombre */}
      <Box sx={{ display: "flex", alignItems: "center", mb: { xs: 1, md: 0 } }}>
        <img
          src="/logo.jpeg"
          alt="Casa Mia Logo"
          style={{ height: 28, marginRight: 10, borderRadius: 6, background: "#fff" }}
        />
        <Typography variant="subtitle1" sx={{ fontWeight: 700, letterSpacing: ".12em" }}>
          Casa Mia
        </Typography>
      </Box>

      <Box sx={{ textAlign: { xs: "left", md: "right" } }}>
        <Typography variant="body2" color={textGray} sx={{ lineHeight: 1.2 }}>
          Contacto: info@casamia.com<br />
          Tel: +502 1234 5678
        </Typography>
      </Box>
    </Container>
    <Typography
      variant="caption"
      color={textGray}
      sx={{ display: "block", mt: 1, textAlign: "center", fontSize: 13, letterSpacing: ".05em" }}
    >
      © {new Date().getFullYear()} Casa Mia. Todos los derechos reservados.
    </Typography>
  </Box>
);