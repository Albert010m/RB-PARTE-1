// Espera a que todo el HTML esté cargado para empezar
document.addEventListener('DOMContentLoaded', function() {

    // --- 1. VARIABLES Y CONSTANTES ---
    const precios = {
        blackout: 1480,
        austria: 820,
        traslucida: 480
    };
    const FACTOR_CONFECCION = 6.16;
    const ANCHO_PANEL_ESTANDAR = 1.40;
    const FACTOR_PLISADO = 1.5;

    // --- 2. REFERENCIAS A ELEMENTOS DEL HTML ---
    const form = document.getElementById('cotizador-form');
    const resultadoDiv = document.getElementById('resultado-cotizacion');

    // --- 3. EVENTO PRINCIPAL: ESCUCHAR EL CLIC EN EL BOTÓN ---
    form.addEventListener('submit', function(event) {
        // Evita que la página se recargue al enviar el formulario
        event.preventDefault();

        // --- 4. OBTENER VALORES DEL FORMULARIO ---
        const anchoSolicitado = parseFloat(document.getElementById('ancho').value);
        const alto = parseFloat(document.getElementById('alto').value);
        const modeloSeleccionado = document.getElementById('modelo').value;

        // Validar que los campos no estén vacíos
        if (isNaN(anchoSolicitado) || isNaN(alto) || !modeloSeleccionado) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        // --- 5. REALIZAR LOS CÁLCULOS ---
        const anchoConfeccion = anchoSolicitado * FACTOR_PLISADO;
        const paneles = Math.ceil(anchoConfeccion / ANCHO_PANEL_ESTANDAR);
        // Usamos el ancho real de los paneles para el costo
        const anchoTotalConfeccionado = paneles * ANCHO_PANEL_ESTANDAR;

        let costoTotal = 0;
        let detalleCalculo = '';
        let notaAdicional = '';

        // Fórmula para calcular el costo de un modelo
        const calcularCosto = (precioBase) => {
            return (anchoTotalConfeccionado * alto * precioBase) / FACTOR_CONFECCION;
        };

        switch (modeloSeleccionado) {
            case 'paquete_blackout':
                const costoBlackout = calcularCosto(precios.blackout);
                const costoTraslucidaB = calcularCosto(precios.traslucida);
                costoTotal = costoBlackout + costoTraslucidaB;
                detalleCalculo = `Blackout ($${costoBlackout.toFixed(2)}) + Traslúcida ($${costoTraslucidaB.toFixed(2)})`;
                notaAdicional = '📦 Paquete doble cortinero. Incluye cortina principal y traslúcido.';
                break;
            
            case 'paquete_austria':
                const costoAustria = calcularCosto(precios.austria);
                const costoTraslucidaA = calcularCosto(precios.traslucida);
                costoTotal = costoAustria + costoTraslucidaA;
                detalleCalculo = `Austria ($${costoAustria.toFixed(2)}) + Traslúcida ($${costoTraslucidaA.toFixed(2)})`;
                notaAdicional = '📦 Paquete doble cortinero. Incluye cortina principal y traslúcido.';
                break;

            case 'blackout':
                costoTotal = calcularCosto(precios.blackout);
                detalleCalculo = 'Blackout DELUX';
                notaAdicional = 'Requiere unión para alcanzar el ancho solicitado.';
                break;

            case 'austria':
                costoTotal = calcularCosto(precios.austria);
                detalleCalculo = 'Austria Classic';
                notaAdicional = 'Requiere unión para alcanzar el ancho solicitado.';
                break;

            case 'traslucida':
                costoTotal = calcularCosto(precios.traslucida);
                detalleCalculo = 'Traslúcida Premium';
                notaAdicional = 'Requiere unión para alcanzar el ancho solicitado.';
                break;
        }

        // --- 6. MOSTRAR LOS RESULTADOS EN LA PÁGINA ---
        resultadoDiv.innerHTML = `
            <h2 class="presentacion_enlaces_subtitulo">Tu Cotización</h2>
            <p><strong>Modelo elegido:</strong> ${detalleCalculo}</p>
            <p><strong>Paneles recomendados:</strong> ${paneles}</p>
            <p><strong>Ancho total confeccionado:</strong> ${anchoTotalConfeccionado.toFixed(2)} metros</p>
            <p class="resultado_costo_total">Costo Total: $${costoTotal.toFixed(2)} MXN</p>
            <p class="resultado_nota"><em>${notaAdicional}</em></p>
            <hr>
            <p><strong>Tiempo de entrega estimado:</strong> 5 a 8 días hábiles después del anticipo.</p>
        `;
        resultadoDiv.style.display = 'block'; // Hace visible la sección de resultados
    });
});