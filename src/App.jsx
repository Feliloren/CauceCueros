import React, { useState, useEffect } from 'react'; 
import { Instagram, Mail, MapPin, ShoppingBag, X, Star } from 'lucide-react';
import Catalogo from './Catalogo';

function App() {
  const [verCatalogo, setVerCatalogo] = useState(false);
  const [verColeccion, setVerColeccion] = useState(false); 
  const [carrito, setCarrito] = useState([]);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [contactoAbierto, setContactoAbierto] = useState(false);

  // Sincronizar scroll al cambiar de vista principal
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [verCatalogo]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => [...prev, producto]);
  };

  const eliminarDelCarrito = (index) => {
    setCarrito(prev => prev.filter((_, i) => i !== index));
  };

  const colores = {
    marronOscuro: '#41251c',
    marronCrema: '#724734',
    blancoCrema: '#a88464',
    fondoClaro: '#c6a584',
    plataletra: '#bcc1c3',
    blanco: '#ffffff',
  };

  const reseñas = [
    { id: 1, usuario: "Martín G.", texto: "La calidad del cuero es superior a todo lo que vi.", img: "/resena1.jpg" },
    { id: 2, usuario: "Elena F.", texto: "El brazalete personalizado quedó increíble.", img: "/resena2.jpg" },
    { id: 3, usuario: "Pedro S.", texto: "Un pedazo de Corrientes en mis manos.", img: "/resena3.jpg" },
  ];

  if (verCatalogo) {
    return <Catalogo 
      volver={() => setVerCatalogo(false)} 
      onAgregar={agregarAlCarrito} 
    />;
  }
  
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'transparent', fontFamily: 'serif' }}>
      
      {/* NAVBAR / BANNER OPTIMIZADO PARA MÓVIL */}
      <nav style={estiloNavbar(colores)}>
        {/* Contenedor Logo - Ahora centrado en móviles */}
        <div style={estiloContenedorLogo}>
          <img src="/logo1.png" alt="Cauce" style={estiloImagenLogo} />
        </div>
        
        {/* Contenedor Menú - Flex Wrap para que no se corte */}
        <div style={estiloMenuNav}>
          <span onClick={() => setVerColeccion(true)} style={{ cursor: 'pointer' }}>COLECCIÓN</span>
          <span 
            onClick={() => document.getElementById('seccion-materiales').scrollIntoView({ behavior: 'smooth' })} 
            style={{ cursor: 'pointer' }}
          >
            MATERIALES
          </span>
          <span onClick={() => setContactoAbierto(true)} style={{ cursor: 'pointer' }}>CONTACTO</span>
        </div>
        
        {/* Contenedor Carrito */}
        <div style={estiloContenedorCarrito}>
          <div onClick={() => setCarritoAbierto(true)} style={{ position: 'relative', cursor: 'pointer' }}>
            <ShoppingBag size={28} />
            {carrito.length > 0 && <span style={estiloContador}>{carrito.length}</span>}
          </div>
        </div>
      </nav>

      {/* MODAL DE COLECCIÓN / RESEÑAS */}
      {verColeccion && (
        <div style={estiloOverlayGeneral} onClick={() => setVerColeccion(false)}>
          <div style={estiloModalColeccion} onClick={(e) => e.stopPropagation()}>
            <X onClick={() => setVerColeccion(false)} style={estiloBotonCerrarModal} size={30} />
            <h2 style={{ letterSpacing: '6px', color: 'white', marginBottom: '50px' }}>COLECCIÓN & RESEÑAS</h2>
            <div style={estiloGrillaResenas}>
              {reseñas.map(r => (
                <div key={r.id} style={estiloTarjetaResena}>
                  <div style={{ ...estiloFotoResena, backgroundImage: `url(${r.img})` }}></div>
                  <div style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', gap: '5px', marginBottom: '10px' }}>
                      {[1,2,3,4,5].map(s => <Star key={s} size={12} fill={colores.blancoCrema} color={colores.blancoCrema} />)}
                    </div>
                    <p style={{ fontStyle: 'italic', fontSize: '0.9rem', marginBottom: '10px' }}>"{r.texto}"</p>
                    <p style={{ fontWeight: 'bold', fontSize: '0.7rem', letterSpacing: '1px' }}>— {r.usuario}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE CONTACTO */}
      {contactoAbierto && (
        <div style={estiloOverlayGeneral} onClick={() => setContactoAbierto(false)}>
          <div style={estiloModalContacto} onClick={(e) => e.stopPropagation()}>
            <X onClick={() => setContactoAbierto(false)} style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer', color: colores.marronOscuro }} size={24} />
            <h2 style={{ letterSpacing: '4px', color: colores.marronOscuro, marginBottom: '40px' }}>CONTACTO</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', textAlign: 'center' }}>
              <div>
                <h4 style={estiloEtiquetaContacto(colores)}>INSTAGRAM</h4>
                <p style={{ margin: 0, fontWeight: 'bold' }}>@cauce_cueros</p>
              </div>
              <div>
                <h4 style={estiloEtiquetaContacto(colores)}>WHATSAPP</h4>
                <p style={{ margin: 0, fontWeight: 'bold' }}>+54 379 4000000</p>
              </div>
              <div>
                <h4 style={estiloEtiquetaContacto(colores)}>CORREO ELECTRÓNICO</h4>
                <p style={{ margin: 0, fontWeight: 'bold' }}>contacto@cauce.com.ar</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TRANSICIÓN DEGRADADA */}
      <div style={estiloDegradadoTransicion} />

      {/* HERO SECTION */}
      <header style={estiloHero(colores)}>
        <p style={{ fontSize: '1rem', letterSpacing: '5px', color: colores.blanco, marginBottom: '20px', fontWeight: 'bold' }}>HECHO A MANO</p>
        <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', lineHeight: '1', marginBottom: '30px', color: colores.blanco }}>Piezas que cuentan una historia.</h2>
        <div style={{ width: '80px', height: '2px', backgroundColor: colores.blanco, margin: '0 auto 30px' }}></div>
        <p style={{ fontFamily: 'sans-serif', color: colores.blanco, lineHeight: '1.8', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
          Trabajamos el cuero con la paciencia del artesano y la precisión del diseño contemporáneo en Corrientes, Argentina.
        </p>
        <button onClick={() => setVerCatalogo(true)} style={estiloBotonHero(colores)}>
          VER CATÁLOGO
        </button>
      </header>

      {/* PANEL CARRITO */}
      {carritoAbierto && (
        <div style={estiloOverlayCarrito} onClick={() => setCarritoAbierto(false)}>
          <div style={estiloPanelCarrito} onClick={(e) => e.stopPropagation()}>
            <div style={estiloHeaderCarrito}>
              <h2 style={{ margin: 0, letterSpacing: '2px', fontSize: '1.2rem' }}>MI BOLSA</h2>
              <X onClick={() => setCarritoAbierto(false)} style={{ cursor: 'pointer' }} size={24} />
            </div>
            {carrito.length === 0 ? (
              <p style={{ textAlign: 'center', marginTop: '100px', opacity: 0.5 }}>Tu bolsa está vacía.</p>
            ) : (
              <div style={estiloContenedorItemsCarrito}>
                {carrito.map((item, index) => (
                  <div key={index} style={estiloItemCarrito}>
                    <img src={item.img} alt={item.nombre} style={estiloImagenCarrito} />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 5px 0', fontSize: '0.9rem', textTransform: 'uppercase' }}>{item.nombre}</h4>
                      <p style={{ margin: 0, fontSize: '0.7rem', color: colores.plataletra }}>{item.material} / {item.color}</p>
                    </div>
                    <button onClick={() => eliminarDelCarrito(index)} style={estiloBotonEliminar}> ELIMINAR </button>
                  </div>
                ))}
                <button style={estiloBotonFinalizar}> FINALIZAR PEDIDO (WHATSAPP) </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SECCIÓN MATERIALES */}
      <section id="seccion-materiales" style={{ padding: '100px 20px', backgroundColor: '#F4F1EE' }}>
        <div style={{ maxWidth: '1500px', margin: '0 auto' }}>
          <h3 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '20px', letterSpacing: '3px', color: colores.marronOscuro }}>MATERIA PRIMA</h3>
          <p style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 60px', color: colores.marronCrema, fontFamily: 'sans-serif', opacity: 0.8 }}>
            Conocé los elementos que dan vida a nuestras piezas antes de elegir tu diseño.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px', marginBottom: '60px' }}>
            <div style={estiloCajaMaterial}>
              <div style={{ ...estiloImagenMaterial, backgroundImage: "url('/Tacha.jpg')" }}></div>
              <div style={{ padding: '30px' }}>
                <h4 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Tachas</h4>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#555' }}>Selección de tachas metálicas para personalización.</p>
              </div>
            </div>
            <div style={estiloCajaMaterial}>
              <div style={{ ...estiloImagenMaterial, backgroundImage: "url('/Cuero.png')" }}></div>
              <div style={{ padding: '30px' }}>
                <h4 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Cueros</h4>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#555' }}>Vaqueta curtida vegetal y cueros engrasados de alta densidad.</p>
              </div>
            </div>
             <div style={estiloCajaMaterial}>
              <div style={{ ...estiloImagenMaterial, backgroundImage: "url('/hebillas.jpg')" }}></div>
              <div style={{ padding: '30px' }}>
                <h4 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Hebillas</h4>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#555' }}>Bronce macizo y metales fundidos con detalles de diseño.</p>
              </div>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <button onClick={() => setVerCatalogo(true)} style={estiloBotonSeccion(colores)}>
              IR AL CATÁLOGO DE PIEZAS
            </button>
          </div>
        </div>
      </section>

      <footer style={{ padding: '80px 20px', textAlign: 'center', backgroundColor: colores.marronOscuro, color: colores.fondoClaro }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '30px' }}>
          <Instagram style={{ cursor: 'pointer', color: colores.blancoCrema }} />
          <Mail style={{ cursor: 'pointer', color: colores.blancoCrema }} />
          <MapPin style={{ cursor: 'pointer', color: colores.blancoCrema }} />
        </div>
        <p style={{ fontSize: '0.7rem', letterSpacing: '2px', opacity: '0.7' }}>© 2026 CAUCE CUEROS. HECHO A MANO.</p>
      </footer>
    </div>
  );
}

// --- ESTILOS REORGANIZADOS Y OPTIMIZADOS PARA MÓVIL ---

const estiloNavbar = (c) => ({
  padding: '15px clamp(15px, 5vw, 70px)', 
  display: 'flex', 
  flexWrap: 'wrap', // Permite que los elementos bajen si no hay espacio
  justifyContent: 'space-between', 
  alignItems: 'center',
  gap: '15px',
  backgroundImage: "linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/banne.jpg')",
  backgroundSize: 'cover', 
  backgroundPosition: 'center', 
  borderBottom: `1px solid rgba(255,255,255,0.1)`,
  color: '#fff', 
  backgroundColor: c.marronOscuro, 
  position: 'relative', 
  zIndex: 10, 
  boxShadow: '0px 10px 30px rgba(0,0,0,0.5)'
});

const estiloContenedorLogo = { 
  flex: '1 1 auto', 
  display: 'flex', 
  justifyContent: 'flex-start',
  minWidth: '100px'
};

const estiloImagenLogo = { 
  width: 'clamp(70px, 10vw, 100px)', 
  height: 'auto' 
};

const estiloMenuNav = { 
  flex: '2 1 auto', 
  display: 'flex', 
  flexWrap: 'wrap', // Importante para móviles
  justifyContent: 'center', 
  gap: 'clamp(15px, 3vw, 35px)', 
  fontSize: 'clamp(0.7rem, 2vw, 0.85rem)', 
  fontWeight: 'bold', 
  letterSpacing: '1px' 
};

const estiloContenedorCarrito = { 
  flex: '1 1 auto', 
  display: 'flex', 
  justifyContent: 'flex-end' 
};

// ... Resto de los estilos se mantienen igual ...
const estiloOverlayGeneral = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.92)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000, animation: 'fadeIn 0.3s ease-in-out' };
const estiloModalColeccion = { width: '90%', maxWidth: '1200px', maxHeight: '90vh', overflowY: 'auto', textAlign: 'center', position: 'relative', padding: '40px' };
const estiloGrillaResenas = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' };
const estiloTarjetaResena = { backgroundColor: 'white', borderRadius: '4px', overflow: 'hidden', textAlign: 'left', color: '#333', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' };
const estiloFotoResena = { height: '350px', backgroundSize: 'cover', backgroundPosition: 'center' };
const estiloModalContacto = { backgroundColor: '#f4f1ee', padding: '60px', borderRadius: '4px', maxWidth: '450px', width: '90%', position: 'relative', textAlign: 'center', color: '#41251c' };
const estiloEtiquetaContacto = (c) => ({ margin: '0 0 5px 0', fontSize: '0.8rem', color: c.marronCrema, letterSpacing: '1px' });
const estiloDegradadoTransicion = { width: '100%', height: '60px', background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 100%)', marginTop: '-1px', position: 'absolute', zIndex: 5, pointerEvents: 'none' };
const estiloHero = (c) => ({ padding: 'clamp(80px, 15vh, 150px) 20px', textAlign: 'center', maxWidth: '900px', margin: '-1px auto 0', position: 'relative' });
const estiloBotonHero = (c) => ({ padding: '18px 45px', backgroundColor: c.marronOscuro, color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 'bold' });
const estiloBotonSeccion = (c) => ({ padding: '22px 50px', backgroundColor: c.marronOscuro, color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem', letterSpacing: '3px', fontWeight: 'bold', boxShadow: '0 10px 20px rgba(65, 37, 28, 0.3)' });
const estiloBotonCerrarModal = { position: 'absolute', top: '20px', right: '20px', cursor: 'pointer', color: 'white' };
const estiloContador = { position: 'absolute', top: '-5px', right: '-5px', backgroundColor: '#e74c3c', color: 'white', borderRadius: '50%', padding: '2px 6px', fontSize: '0.65rem', fontWeight: 'bold', border: '1px solid #fff' };
const estiloOverlayCarrito = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 100, display: 'flex', justifyContent: 'flex-end' };
const estiloPanelCarrito = { width: '100%', maxWidth: '400px', height: '100%', backgroundColor: '#41251c', color: 'white', padding: '40px 30px', boxShadow: '-5px 0 15px rgba(0,0,0,0.5)', fontFamily: 'serif', display: 'flex', flexDirection: 'column' };
const estiloHeaderCarrito = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid rgba(188, 193, 195, 0.2)', paddingBottom: '20px' };
const estiloContenedorItemsCarrito = { display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto', maxHeight: '70vh', paddingRight: '10px' };
const estiloItemCarrito = { display: 'flex', alignItems: 'center', gap: '15px', borderBottom: '1px solid rgba(188, 193, 195, 0.1)', paddingBottom: '15px' };
const estiloImagenCarrito = { width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' };
const estiloBotonEliminar = { background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', fontSize: '0.6rem', fontWeight: 'bold', letterSpacing: '1px' };
const estiloBotonFinalizar = { marginTop: 'auto', padding: '20px', backgroundColor: '#bcc1c3', color: '#41251c', border: 'none', borderRadius: '4px', fontWeight: 'bold', letterSpacing: '2px', cursor: 'pointer', textTransform: 'uppercase' };
const estiloCajaMaterial = { backgroundColor: 'white', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 15px 40px rgba(0,0,0,0.08)', textAlign: 'left' };
const estiloImagenMaterial = { height: '300px', backgroundSize: 'cover', backgroundPosition: 'center' };

export default App;