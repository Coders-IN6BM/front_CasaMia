import * as React from "react";

export const HomePage = () => (
  <div style={{ width: "100vw", minHeight: "100vh", background: "#181C29" }}>
    <section
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        minHeight: "600px",
        maxHeight: "1200px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          left: 0,
          top: 0,
          zIndex: 0,
        }}
        src="https://res.cloudinary.com/dsy7q8jga/video/upload/v1748308283/dmlnq9cgnm72qj7fljti.mp4"
      />
      <div
        style={{
          position: "absolute",
          width: "100vw",
          height: "100vh",
          left: 0,
          top: 0,
          background: "rgba(14, 18, 42, 0.62)",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100vw",
          maxWidth: 1100,
          margin: "0 auto",
          padding: "40px 16px 64px 16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <h1
          style={{
            fontSize: "4vw",
            fontWeight: "bold",
            letterSpacing: ".06em",
            color: "#fff",
            marginBottom: 24,
            textAlign: "center",
            textShadow: "0 3px 20px #000a",
          }}
        >
          Bienvenido a Casa Mia
        </h1>
        <p
          style={{
            fontSize: "2rem",
            color: "#fff",
            textAlign: "center",
            marginBottom: 36,
            fontWeight: 400,
            textShadow: "0 2px 16px #000b",
            maxWidth: 700
          }}
        >
          Vive la experiencia de hospedarte en los mejores hoteles de Guatemala.
        </p>
        <a
          href="http://localhost:5173/auth"
          style={{
            display: "inline-block",
            padding: "0.9em 2.7em",
            background: "#2563eb",
            color: "#fff",
            fontWeight: 700,
            fontSize: "1.3rem",
            letterSpacing: ".05em",
            border: "none",
            borderRadius: "30px",
            boxShadow: "0 4px 18px rgba(0,0,0,0.09)",
            textDecoration: "none",
            transition: "background 0.2s, transform 0.15s",
            cursor: "pointer",
          }}
          onMouseOver={e => (e.currentTarget.style.background = "#1745a2")}
          onMouseOut={e => (e.currentTarget.style.background = "#2563eb")}
        >
          Registrarme
        </a>
      </div>
    </section>

    {/* Sección informativa de la plataforma tipo Trivago */}
    <section
      style={{
        background: "#181C29",
        color: "#fff",
        padding: "0px 0 0 0",
        maxWidth: "100vw",
        margin: "0 auto",
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        justifyContent: "center",
        minHeight: 480,
        flexWrap: "wrap",
        gap: 0
      }}
    >
      {/* Texto */}
      <div
        style={{
          flex: "1 1 420px",
          minWidth: 340,
          maxWidth: 540,
          padding: "56px 36px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          zIndex: 1
        }}
      >
        <h2 style={{ fontSize: "2.2rem", fontWeight: 700, marginBottom: 22, letterSpacing: ".03em" }}>
          Descubre y ofrece hospedaje en toda Guatemala
        </h2>
        <p style={{ fontSize: "1.16rem", marginBottom: 18, lineHeight: 1.7 }}>
          Casa Mia es la plataforma que conecta a viajeros con los mejores hoteles de Guatemala. Explora una amplia variedad de alojamientos, compara precios, servicios y ubicaciones, y encuentra el lugar perfecto para tu próxima estadía, ya sea en la ciudad, la playa, la montaña o pueblos llenos de historia.
        </p>
        <p style={{ fontSize: "1.16rem", marginBottom: 18, lineHeight: 1.7 }}>
          ¿Eres propietario o administrador de un hotel? Registra tu hospedaje fácilmente y llega a miles de usuarios que buscan una experiencia única. Gestiona tu perfil, actualiza disponibilidad, responde a reseñas y destaca lo mejor de tu hotel para aumentar tus reservas.
        </p>
        <ul style={{ fontSize: "1.13rem", marginTop: 10, lineHeight: 1.7, paddingLeft: 20 }}>
          <li>✔️ Búsqueda avanzada por destino, precio, servicios y tipo de alojamiento.</li>
          <li>✔️ Reseñas y valoraciones de huéspedes reales.</li>
          <li>✔️ Reservas rápidas y seguras.</li>
          <li>✔️ Espacio exclusivo para hoteleros: administra, promociona y haz crecer tu negocio.</li>
          <li>✔️ Asistencia y soporte para viajeros y hoteles en todo momento.</li>
        </ul>
        <p style={{ fontSize: "1.16rem", marginTop: 18, lineHeight: 1.7 }}>
          ¡Casa Mia, la forma más sencilla y confiable de descubrir y ofrecer hospedaje en Guatemala!
        </p>
      </div>
      <div
        style={{
          flex: "1 1 440px",
          minWidth: 340,
          maxWidth: 650,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "18px",
          padding: "46px 24px 46px 0",
        }}
      >
        <img
          src="https://www.caminorealantigua.com.gt/wp-content/uploads/2024/03/guatemala-7699582_1920.jpg"
          alt="Calle de Antigua Guatemala"
          style={{
            width: "100%",
            height: "320px",
            objectFit: "cover",
            borderRadius: "22px 22px 0 0",
            marginBottom: 0,
            boxShadow: "0 4px 22px #0005"
          }}
        />
        <img
          src="https://travelgrafia.co/wp-content/uploads/2023/06/Lugares-para-visitar-en-Antigua-Guatemala.jpg"
          alt="Arco de Santa Catalina Antigua"
          style={{
            width: "100%",
            height: "320px",
            objectFit: "cover",
            borderRadius: "0 0 22px 22px",
            marginTop: 0,
            boxShadow: "0 4px 22px #0005"
          }}
        />
      </div>
    </section>
  </div>
);