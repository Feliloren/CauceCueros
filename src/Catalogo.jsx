import React, { useState, useEffect } from 'react'; 
import { ArrowLeft, X } from 'lucide-react';

export default function Catalogo({ volver, onAgregar }) {
  const [seccionActiva, setSeccionActiva] = useState('menu');
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [pasoCustom, setPasoCustom] = useState(1);
  const [customItem, setCustomItem] = useState({ cuero: null, hebilla: null });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [seccionActiva, pasoCustom]); 

  const colores = {
    marronOscuro: '#41251c',
    plataletra: '#bcc1c3',
    blanco: '#ffffff',
    marronCrema: '#724734',
  };

  const BotonRegresar = ({ destino }) => (
    <button onClick={destino} style={estiloBotonRegresar}>
      <ArrowLeft size={16} /> VOLVER
    </button>
  );

  const seccionesMateriales = {
    cueros: [
      { id: 1, nombre: 'Vaqueta Natural', desc: 'Ideal para grabado a fuego. Cuero vacuno de 4mm.', img: '/cuero-natural.jpg', color: 'Natural', material: 'Vacuno' },
      { id: 2, nombre: 'Engrasado Marrón', desc: 'Resistente y rústico. Proceso de engrasado profundo.', img: '/cuero-marron.jpg', color: 'Marrón', material: 'Vacuno' },
    ],
    hebillas: [
      { id: 4, nombre: 'Hebilla Sol', desc: 'Bronce macizo fundido a la tierra.', img: '/Sol.jpg', material: 'Bronce' },
      { id: 5, nombre: 'Estrella de Mar', desc: 'Aleación de zamak con baño en plata vieja.', img: '/hebilla-estrella.jpg', material: 'Plata Vieja' },
    ],
    tachas: [
      { id: 20, nombre: 'Línea Central', desc: 'Distribución minimalista de 5 tachas en el centro.', img: '/tacha-linea.jpg', material: 'Níquel' },
      { id: 21, nombre: 'Bordes Dobles', desc: '10 tachas en ambos márgenes del brazalete.', img: '/tacha-bordes.jpg', material: 'Bronce' },
      { id: 22, nombre: 'Patrón Pampa', desc: 'Diseño geométrico tradicional con 8 tachas.', img: '/tacha-pampa.jpg', material: 'Plata Vieja' },
    ]
  };

  const seccionesProductos = {
    armados: {
      titulo: "CINTURONES TERMINADOS",
      items: [
        { id: 7, nombre: 'Cinto Correntino', desc: 'Costura manual cruzada.', img: '/cinto-1.jpg', color: 'Habano', material: 'Cuero + Bronce' },
      ]
    },
    brazaletes: {
      titulo: "BRAZALETES TERMINADOS",
      items: [
        { id: 10, nombre: 'Muñequera Pampa', desc: 'Grabado tradicional.', img: '/brazalete-1.jpg', color: 'Negro', material: 'Cuero' },
      ]
    }
  };

  const manejarSeleccion = (item, tipo = null) => {
    setProductoSeleccionado({ ...item, tipoPersonalizacion: tipo });
  };

  const confirmarAccion = (item) => {
    if (item.tipoPersonalizacion === 'cuero') {
      setCustomItem({ ...customItem, cuero: item });
      setPasoCustom(2);
    } else if (item.tipoPersonalizacion === 'hebilla' || item.tipoPersonalizacion === 'tacha') {
      const esCinto = seccionActiva === 'personalizarCinto';
      onAgregar({ 
        id: Date.now(), 
        nombre: `${esCinto ? 'Cinto' : 'Brazalete'} Personalizado`, 
        desc: `${customItem.cuero.nombre} + ${item.nombre}`,
        img: customItem.cuero.img,
        material: item.material || 'Artesanal',
        color: customItem.cuero.color 
      });
      setSeccionActiva('menu');
      setPasoCustom(1);
    } else {
      onAgregar(item);
    }
    setProductoSeleccionado(null);
  };

  const ModalZoom = () => {
    if (!productoSeleccionado) return null;
    return (
      <div style={estiloModalOverlay} onClick={() => setProductoSeleccionado(null)}>
        <div style={estiloModalContenido} onClick={(e) => e.stopPropagation()}>
          <X onClick={() => setProductoSeleccionado(null)} style={estiloBotonCerrar} size={24} />
          <img src={productoSeleccionado.img} style={estiloFotoZoom} alt="zoom" />
          <div style={estiloDetalleZoom}>
            <h2 style={{ letterSpacing: '2px', marginBottom: '10px' }}>{productoSeleccionado.nombre}</h2>
            <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '20px' }}>{productoSeleccionado.desc}</p>
            <button onClick={() => confirmarAccion(productoSeleccionado)} style={estiloBotonCompra}>
              {productoSeleccionado.tipoPersonalizacion === 'cuero' ? 'SELECCIONAR CUERO' : 'AGREGAR A LA BOLSA'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (seccionActiva === 'personalizarCinto' || seccionActiva === 'personalizarBrazalete') {
    const esCinto = seccionActiva === 'personalizarCinto';
    let itemsAMostrar = pasoCustom === 1 ? seccionesMateriales.cueros : (esCinto ? seccionesMateriales.hebillas : seccionesMateriales.tachas);
    
    return (
      <div style={{ padding: '40px', minHeight: '100vh', textAlign: 'center', color: 'white' }}>
        <BotonRegresar destino={() => { setSeccionActiva('menu'); setPasoCustom(1); }} />
        <h1 style={{ letterSpacing: '4px', fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }}>ARMA TU {esCinto ? 'CINTO' : 'BRAZALETE'}</h1>
        <p style={{ opacity: 0.6, marginBottom: '40px' }}>Paso {pasoCustom} de 2: Seleccioná {pasoCustom === 1 ? 'tu cuero' : 'el detalle'}</p>
        <div style={estiloGrillaMateriaPrima}>
          {itemsAMostrar.map(item => (
            <div key={item.id} style={estiloTarjetaMateriaPrima} onClick={() => manejarSeleccion(item, pasoCustom === 1 ? 'cuero' : (esCinto ? 'hebilla' : 'tacha'))}>
              <div style={{ ...estiloFotoTarjetaMateriaPrima, backgroundImage: `url(${item.img})` }} />
              <div style={estiloInfoTarjeta}>{item.nombre}</div>
            </div>
          ))}
        </div>
        <ModalZoom />
      </div>
    );
  }

  if (seccionActiva !== 'menu') {
    const data = seccionesProductos[seccionActiva];
    return (
      <div style={{ padding: '40px', minHeight: '100vh', textAlign: 'center' }}>
        <BotonRegresar destino={() => setSeccionActiva('menu')} />
        <h1 style={{ color: '#fff', letterSpacing: '3px', marginBottom: '40px', fontSize: 'clamp(1.5rem, 5vw, 2.5rem)' }}>{data.titulo}</h1>
        <div style={estiloGrillaProductos}>
          {data.items.map(item => (
            <div key={item.id} style={estiloTarjetaProducto} onClick={() => manejarSeleccion(item)}>
              <div style={{ ...estiloFotoTarjetaProducto, backgroundImage: `url(${item.img})` }} />
              <div style={estiloInfoTarjetaProducto}>
                <h3 style={{ margin: '0', fontSize: '1.2rem' }}>{item.nombre}</h3>
                <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <ModalZoom />
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <BotonRegresar destino={volver} />
      </div>
      <h1 style={{ letterSpacing: '5px', marginBottom: '60px', color: colores.blanco, fontSize: 'clamp(2rem, 8vw, 3rem)' }}>CATÁLOGO</h1>
      <div style={estiloGrillaMenuPrincipal}>
        <div onClick={() => setSeccionActiva('personalizarCinto')} style={{ ...estiloBloqueSimple, backgroundImage: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/armado2.jpg')" }}>
          <div style={estiloContenedorTexto}><h2 style={estiloTextoMenu}>Arma tu Cinto</h2></div>
        </div>
        <div onClick={() => setSeccionActiva('personalizarBrazalete')} style={{ ...estiloBloqueSimple, backgroundImage: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/armado1.jpg')" }}>
          <div style={estiloContenedorTexto}><h2 style={estiloTextoMenu}>Arma tu Brazalete</h2></div>
        </div>
        <div onClick={() => setSeccionActiva('armados')} style={{ ...estiloBloqueSimple, backgroundImage: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/cinturon.jpg')" }}>
          <div style={estiloContenedorTexto}><h2 style={estiloTextoMenu}>Cinturones</h2></div>
        </div>
        <div onClick={() => setSeccionActiva('brazaletes')} style={{ ...estiloBloqueSimple, backgroundImage: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/brazalete.png')" }}>
          <div style={estiloContenedorTexto}><h2 style={estiloTextoMenu}>Brazaletes</h2></div>
        </div>
      </div>
    </div>
  );
}

// --- ESTILOS RESTAURADOS ---
const estiloGrillaMenuPrincipal = { 
  display: 'grid', 
  gridTemplateColumns: 'repeat(auto-fit, 350px)', // Forzamos el tamaño de la foto que te gusta
  gap: '40px', 
  width: '100%',
  justifyContent: 'center' // Centra los bloques en la pantalla
};

const estiloBloqueSimple = { 
  border: '3px solid #ffffff', 
  width: '350px',   // Ancho fijo igual al de tu foto
  height: '350px',  // Alto fijo igual al de tu foto
  display: 'flex', 
  justifyContent: 'flex-end', 
  alignItems: 'flex-end', 
  cursor: 'pointer', 
  backgroundSize: 'cover', 
  backgroundPosition: 'center', 
  borderRadius: '4px', 
  position: 'relative', 
  overflow: 'hidden' 
};

const estiloContenedorTexto = { 
  padding: '25px', 
  textAlign: 'right' 
};

const estiloTextoMenu = { 
  fontSize: '1.8rem', 
  fontWeight: 'bold', 
  margin: '0', 
  color: '#ffffff', 
  textTransform: 'uppercase', 
  letterSpacing: '2px', 
  textShadow: '2px 2px 10px rgba(0,0,0,0.6)' 
};

// ... Otros estilos para que no se rompa nada ...
const estiloBotonRegresar = { padding: '12px 30px', backgroundColor: '#41251c', color: 'white', border: '1px solid #bcc1c3', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem', letterSpacing: '2px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px' };
const estiloGrillaProductos = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' };
const estiloTarjetaProducto = { backgroundColor: 'rgba(65, 37, 28, 0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', textAlign: 'left' };
const estiloFotoTarjetaProducto = { height: '250px', backgroundSize: 'cover', backgroundPosition: 'center' };
const estiloInfoTarjetaProducto = { padding: '30px', color: 'white' };
const estiloGrillaMateriaPrima = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '20px', maxWidth: '800px', margin: '0 auto' };
const estiloTarjetaMateriaPrima = { backgroundColor: 'rgba(65, 37, 28, 0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', textAlign: 'center' };
const estiloFotoTarjetaMateriaPrima = { height: '150px', backgroundSize: 'cover', backgroundPosition: 'center' };
const estiloInfoTarjeta = { padding: '20px', color: 'white' };
const estiloModalOverlay = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, padding: '10px' };
const estiloModalContenido = { backgroundColor: '#2a1a14', border: '1px solid #bcc1c3', borderRadius: '8px', maxWidth: '500px', width: '100%', padding: 'clamp(20px, 5vw, 40px)', position: 'relative', color: 'white', textAlign: 'center', maxHeight: '90vh', overflowY: 'auto' };
const estiloFotoZoom = { width: '100%', borderRadius: '4px' };
const estiloDetalleZoom = { marginTop: '20px' };
const estiloBotonCerrar = { position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', cursor: 'pointer', color: 'white' };
const estiloBotonCompra = { marginTop: '30px', padding: '15px 40px', backgroundColor: '#41251c', color: 'white', border: '1px solid #bcc1c3', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', letterSpacing: '2px' };