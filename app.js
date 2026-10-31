const vehicleDatabase = {
    "honda_pop_110": 55.0,
    "honda_biz_125": 50.0,
    "honda_cg_160": 38.0,
    "yamaha_factor_150": 40.0,
    "yamaha_fazer_250": 31.0,
    "honda_cb_300f": 30.0,
    "honda_xre_300": 28.0,
    "yamaha_lander_250": 30.0,
    "renault_kwid_10": 15.3,
    "fiat_mobi_10": 13.5,
    "fiat_argo_10": 13.4,
    "chevrolet_onix_10": 13.3,
    "hyundai_hb20_10": 12.8,
    "volkswagen_polo_10": 13.8,
    "toyota_yaris_13": 13.0,
    "chevrolet_onix_plus": 13.7,
    "volkswagen_virtus_10t": 13.2,
    "toyota_corolla_20": 11.9,
    "toyota_corolla_hybrid": 17.9,
    "chevrolet_tracker_12": 11.2,
    "hyundai_creta_10t": 11.5,
    "jeep_renegade_13t": 11.0,
    "volkswagen_nivus_10t": 12.1,
    "fiat_strada_13": 12.5,
    "fiat_toro_13t": 9.8,
    "toyota_hilux_28": 10.1,
    "chevrolet_s10_28": 10.3,
    "fiat_fiorino_14": 11.8,
    "renault_master_23": 10.0,
    "hyundai_hr_25": 8.5,
    "vw_delivery_3150": 7.5,
    "scania_r450": 2.2
};

const STATE_FUEL_PRICES = {
    SP: 5.82, RJ: 6.15, MG: 5.89, PA: 6.25, BA: 5.99,
    RS: 6.05, PR: 5.75, SC: 5.80, DF: 5.90, GO: 5.85,
    PE: 6.10, CE: 6.02, AM: 6.30, MA: 6.18, MT: 6.12,
    MS: 5.95, ES: 5.98, RN: 6.08, PB: 6.04, AL: 6.12,
    SE: 6.09, PI: 6.15, TO: 6.10, RO: 6.35, AC: 6.50,
    RR: 6.45, AP: 6.20, DEFAULT: 5.95
};

let travelHistory = [];

function parseFormattedNumber(val) {
    if (!val) return 0;
    const cleanStr = val.toString().replace(/\./g, '').replace(',', '.');
    return parseFloat(cleanStr) || 0;
}

function formatBR(val, decimals = 2) {
    return val.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function calcularDistanciaGeo(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c) * 1.25; // Fator rodoviário brasileiro
}

async function geocodeAddress(address) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
        const data = await response.json();
        if (data && data.length > 0) {
            return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
        }
    } catch (e) {
        console.error("Erro na geocodificação:", e);
    }
    return null;
}

document.addEventListener('DOMContentLoaded', () => {
    const autoVehicleSelect = document.getElementById('autoVehicleSelect');
    const origemInput = document.getElementById('origemA');
    const destinoInput = document.getElementById('destinoB');
    const distanciaInput = document.getElementById('distanciaKm');
    const fuelPriceInput = document.getElementById('fuelPrice');
    const regionPriceLabel = document.getElementById('regionPriceLabel');
    const btnCalculate = document.getElementById('btnCalculate');
    const btnClear = document.getElementById('btnClear');
    const btnGps = document.getElementById('btnGps');
    const btnExportCsv = document.getElementById('btnExportCsv');
    const btnOpenGoogleMaps = document.getElementById('btnOpenGoogleMaps');

    autoVehicleSelect.addEventListener('change', (e) => {
        const selectedKey = e.target.value;
        if (selectedKey && vehicleDatabase[selectedKey]) {
            document.getElementById('kml').value = formatBR(vehicleDatabase[selectedKey], 1);
        }
    });

    origemInput.addEventListener('input', (e) => {
        const text = e.target.value.toUpperCase();
        let foundUf = 'DEFAULT';
        Object.keys(STATE_FUEL_PRICES).forEach((uf) => {
            if (uf !== 'DEFAULT') {
                const regex = new RegExp(`\\b${uf}\\b`, 'i');
                if (regex.test(text)) foundUf = uf;
            }
        });
        const price = STATE_FUEL_PRICES[foundUf];
        fuelPriceInput.value = formatBR(price, 2);
        regionPriceLabel.innerHTML = `📍 Preço Combustível por Região (${foundUf !== 'DEFAULT' ? 'Estado: ' + foundUf : 'Média Nacional'}): <b>R$ ${formatBR(price, 2)}</b>`;
    });

    btnCalculate.addEventListener('click', async () => {
        const origemVal = origemInput.value.trim();
        const destinoVal = destinoInput.value.trim();

        if (origemVal && destinoVal) {
            const coordsOrigem = await geocodeAddress(origemVal);
            const coordsDestino = await geocodeAddress(destinoVal);

            if (coordsOrigem && coordsDestino) {
                const calcKm = calcularDistanciaGeo(coordsOrigem.lat, coordsOrigem.lon, coordsDestino.lat, coordsDestino.lon);
                distanciaInput.value = formatBR(calcKm, 1);
            }

            btnOpenGoogleMaps.href = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origemVal)}&destination=${encodeURIComponent(destinoVal)}&travelmode=driving`;
        }

        const kml = parseFormattedNumber(document.getElementById('kml').value) || 1;
        const fuelPrice = parseFormattedNumber(fuelPriceInput.value) || 0;
        const maintenancePerKm = parseFormattedNumber(document.getElementById('maintenancePerKm').value) || 0;
        const tolls = parseFormattedNumber(document.getElementById('tolls').value) || 0;
        const fixedCostMonthly = parseFormattedNumber(document.getElementById('fixedCostMonthly').value) || 0;
        const monthlyKmAvg = parseFormattedNumber(document.getElementById('monthlyKmAvg').value) || 1000;
        const passengers = Math.max(1, parseInt(document.getElementById('passengers').value) || 1);
        const distanciaKm = parseFormattedNumber(distanciaInput.value) || 0;
        
        const vehicleName = autoVehicleSelect.selectedIndex > 0 
            ? autoVehicleSelect.options[autoVehicleSelect.selectedIndex].text.split('(')[0].trim() 
            : "Personalizado";

        if (distanciaKm <= 0) {
            alert('Por favor, informe a distância da viagem em quilômetros ou digite cidades válidas.');
            return;
        }

        const fuelCost = (distanciaKm / kml) * fuelPrice;
        const fixedCostPerKm = monthlyKmAvg > 0 ? fixedCostMonthly / monthlyKmAvg : 0;
        const tripFixedCost = distanciaKm * fixedCostPerKm;
        const totalMaintenanceCost = distanciaKm * maintenancePerKm;
        
        const totalCost = fuelCost + totalMaintenanceCost + tolls + tripFixedCost;
        const costPerKm = totalCost / distanciaKm;
        const costPerPassenger = totalCost / passengers;

        document.getElementById('resRouteDist').innerText = `${formatBR(distanciaKm, 1)} km`;
        document.getElementById('resFuelCost').innerText = `R$ ${formatBR(fuelCost, 2)}`;
        document.getElementById('resFixedCost').innerText = `R$ ${formatBR(tripFixedCost, 2)}`;
        document.getElementById('resCostPerKm').innerText = `R$ ${formatBR(costPerKm, 2)}`;
        document.getElementById('resCostPerPassenger').innerText = `R$ ${formatBR(costPerPassenger, 2)}`;
        document.getElementById('resTotalCost').innerText = `R$ ${formatBR(totalCost, 2)}`;
        document.getElementById('result').style.display = 'block';

        const tripRecord = {
            data: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'}),
            veiculo: vehicleName,
            origem: origemVal || "Não informada",
            destino: destinoVal || "Não informado",
            distancia: distanciaKm,
            kml,
            precoLitro: fuelPrice,
            manutencaoKm: maintenancePerKm,
            pedagios: tolls,
            custoFixo: tripFixedCost,
            passageiros: passengers,
            custoKm: costPerKm,
            custoPassageiro: costPerPassenger,
            custoTotal: totalCost
        };
        travelHistory.unshift(tripRecord);
        updateHistoryUI();
    });

    btnClear.addEventListener('click', () => {
        origemInput.value = '';
        destinoInput.value = '';
        distanciaInput.value = '0,0';
        document.getElementById('fuelPrice').value = '5,95';
        document.getElementById('maintenancePerKm').value = '0,20';
        document.getElementById('tolls').value = '0,00';
        document.getElementById('fixedCostMonthly').value = '0,00';
        document.getElementById('monthlyKmAvg').value = '1000';
        document.getElementById('passengers').value = '1';
        document.getElementById('kml').value = '12,5';
        autoVehicleSelect.selectedIndex = 0;
        document.getElementById('result').style.display = 'none';
        btnOpenGoogleMaps.href = 'https://www.google.com/maps';
        regionPriceLabel.innerHTML = `📍 Preço Combustível por Região (Média Nacional): <b>R$ 5,95</b>`;
    });

    function updateHistoryUI() {
        const historyList = document.getElementById('historyList');
        if (travelHistory.length === 0) {
            historyList.innerHTML = '<p style="color: #777;">Nenhuma viagem salva ainda.</p>';
            return;
        }

        let html = '';
        travelHistory.forEach((trip, index) => {
            html += `<div style="padding: 8px; border-bottom: 1px solid #eee; margin-bottom: 4px;">
                <b>#${travelHistory.length - index} (${trip.data})</b><br>
                🚗 <b>Veículo:</b> ${trip.veiculo} (${trip.kml} km/L)<br>
                📍 <b>Rota:</b> ${trip.origem} ➔ ${trip.destino}<br>
                📏 <b>Distância:</b> ${formatBR(trip.distancia, 1)} km | ⛽ <b>Combustível:</b> R$ ${formatBR(trip.precoLitro, 2)}/L<br>
                🛠️ <b>Manutenção:</b> R$ ${formatBR(trip.manutencaoKm, 2)} | 🎫 <b>Pedágios:</b> R$ ${formatBR(trip.pedagios, 2)}<br>
                👥 <b>Passageiros:</b> ${trip.passageiros} (R$ ${formatBR(trip.custoPassageiro, 2)}/cada)<br>
                💰 <b>Custo/Km:</b> R$ ${formatBR(trip.custoKm, 2)} | 🟢 <b>Total:</b> <b>R$ ${formatBR(trip.custoTotal, 2)}</b>
            </div>`;
        });
        historyList.innerHTML = html;
    }

    btnExportCsv.addEventListener('click', () => {
        if (travelHistory.length === 0) {
            alert('Não há viagens no histórico para exportar.');
            return;
        }

        let csvContent = "data:text/csv;charset=utf-8,Data;Veiculo;Origem;Destino;Distancia_Km;Consumo_KmL;Preco_Litro_R$;Manutencao_Km_R$;Pedagios_R$;Custo_Fixo_R$;Passageiros;Custo_Por_Km_R$;Custo_Por_Passageiro_R$;Custo_Total_R$\n";
        travelHistory.forEach(trip => {
            csvContent += `${trip.data};"${trip.veiculo}";"${trip.origem}";"${trip.destino}";${trip.distancia.toFixed(2)};${trip.kml.toFixed(1)};${trip.precoLitro.toFixed(2)};${trip.manutencaoKm.toFixed(2)};${trip.pedagios.toFixed(2)};${trip.custoFixo.toFixed(2)};${trip.passageiros};${trip.custoKm.toFixed(2)};${trip.custoPassageiro.toFixed(2)};${trip.custoTotal.toFixed(2)}\n`;
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "historico_calkm_completo.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    btnGps.addEventListener('click', () => {
        if (!navigator.geolocation) {
            alert('O seu dispositivo não suporta geolocalização.');
            return;
        }
        alert('Capturando coordenadas atuais via GPS...');
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            origemInput.value = `Lat: ${lat.toFixed(4)}, Lon: ${lon.toFixed(4)}`;
            btnOpenGoogleMaps.href = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
            alert('Coordenadas obtidas com sucesso!');
        }, () => {
            alert('Erro ao obter sinal do GPS.');
        }, { enableHighAccuracy: true });
    });
});