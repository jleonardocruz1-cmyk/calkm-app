// Banco de veículos estruturado por marcas e modelos com consumos atualizados (incluindo elétricos/híbridos)
const vehicleBrandsDatabase = {
    "BYD": {
        "byd_dolphin_mini": { name: "Dolphin Mini (Elétrico)", kml: 65.0 },
        "byd_dolphin_ev": { name: "Dolphin EV", kml: 62.0 },
        "byd_seal_ev": { name: "Seal EV", kml: 48.0 },
        "byd_yuan_plus": { name: "Yuan Plus", kml: 52.0 },
        "byd_song_plus_phev": { name: "Song Plus DM-i (Híbrido)", kml: 21.5 },
        "byd_king_phev": { name: "King DM-i (Híbrido)", kml: 25.6 }
    },
    "Honda": {
        "honda_pop_110": { name: "Pop 110i", kml: 55.0 },
        "honda_biz_125": { name: "Biz 125", kml: 50.0 },
        "honda_cg_160": { name: "CG 160 Titan / Fan", kml: 38.0 },
        "honda_cb_300f": { name: "CB 300F Twister", kml: 30.0 },
        "honda_xre_300": { name: "XRE 300", kml: 28.0 },
        "honda_hrv_15": { name: "HR-V 1.5", kml: 12.7 }
    },
    "Toyota": {
        "toyota_yaris_13": { name: "Yaris 1.3", kml: 13.0 },
        "toyota_corolla_20": { name: "Corolla 2.0 Dynamic", kml: 11.9 },
        "toyota_corolla_hybrid": { name: "Corolla Híbrido", kml: 17.9 },
        "toyota_corolla_cross_hybrid": { name: "Corolla Cross Híbrido", kml: 17.8 },
        "toyota_hilux_28": { name: "Hilux 2.8 Diesel", kml: 10.1 }
    },
    "Volkswagen": {
        "volkswagen_polo_10": { name: "Polo 1.0", kml: 13.8 },
        "volkswagen_virtus_10t": { name: "Virtus 1.0 TSI", kml: 13.2 },
        "volkswagen_nivus_10t": { name: "Nivus 1.0 TSI", kml: 12.1 },
        "volkswagen_t_cross_10t": { name: "T-Cross 1.0 TSI", kml: 12.0 },
        "vw_delivery_3150": { name: "Delivery Express 3.150", kml: 7.5 }
    },
    "Fiat": {
        "fiat_mobi_10": { name: "Mobi 1.0", kml: 13.5 },
        "fiat_argo_10": { name: "Argo 1.0", kml: 13.4 },
        "fiat_strada_13": { name: "Strada 1.3 Flex", kml: 12.5 },
        "fiat_toro_13t": { name: "Toro 1.3 Turbo Flex", kml: 9.8 },
        "fiat_fastback_13t": { name: "Fastback 1.3 Turbo", kml: 11.3 },
        "fiat_pulse_10t": { name: "Pulse 1.0 Turbo", kml: 12.2 },
        "fiat_fiorino_14": { name: "Fiorino 1.4 EVO", kml: 11.8 }
    },
    "Chevrolet": {
        "chevrolet_onix_10": { name: "Onix 1.0 Flex", kml: 13.3 },
        "chevrolet_onix_plus": { name: "Onix Plus 1.0 Turbo", kml: 13.7 },
        "chevrolet_tracker_12": { name: "Tracker 1.2 Turbo", kml: 11.2 },
        "chevrolet_montana_12t": { name: "Montana 1.2 Turbo", kml: 12.0 },
        "chevrolet_s10_28": { name: "S10 2.8 Diesel", kml: 10.3 }
    },
    "Yamaha": {
        "yamaha_factor_150": { name: "Factor 150", kml: 40.0 },
        "yamaha_fazer_250": { name: "Fazer 250", kml: 31.0 },
        "yamaha_lander_250": { name: "Lander 250", kml: 30.0 }
    },
    "GWM": {
        "gwm_ora_03": { name: "Ora 03 (Elétrico)", kml: 55.0 },
        "gwm_haval_h6_hev": { name: "Haval H6 HEV (Híbrido)", kml: 16.5 },
        "gwm_haval_h6_phev": { name: "Haval H6 PHEV (Híbrido)", kml: 28.0 }
    },
    "Renault": {
        "renault_kwid_10": { name: "Kwid 1.0", kml: 15.3 },
        "renault_kwid_e_tech": { name: "Kwid E-Tech (Elétrico)", kml: 62.0 },
        "renault_master_23": { name: "Master 2.3 Diesel", kml: 10.0 }
    },
    "Hyundai": {
        "hyundai_hb20_10": { name: "HB20 1.0", kml: 12.8 },
        "hyundai_creta_10t": { name: "Creta 1.0 Turbo", kml: 11.5 },
        "hyundai_hr_25": { name: "HR 2.5 Diesel", kml: 8.5 }
    },
    "Volvo": {
        "volvo_ex30": { name: "EX30 (Elétrico)", kml: 48.0 },
        "volvo_xc40_recharge": { name: "XC40 Recharge (Elétrico)", kml: 42.0 },
        "volvo_xc60_phev": { name: "XC60 Recharge (Híbrido)", kml: 24.5 }
    },
    "Outras Marcas": {
        "jeep_renegade_13t": { name: "Jeep Renegade 1.3 Turbo", kml: 11.0 },
        "jeep_compass_13t": { name: "Jeep Compass 1.3 Turbo", kml: 10.5 },
        "nissan_versa_16": { name: "Nissan Versa 1.6", kml: 12.4 },
        "nissan_leaf": { name: "Nissan Leaf (Elétrico)", kml: 45.0 },
        "peugeot_208_10": { name: "Peugeot 208 1.0", kml: 13.6 },
        "citroen_c3_10": { name: "Citroën C3 1.0", kml: 13.2 },
        "ram_rampage_20t": { name: "RAM Rampage 2.0 Turbo", kml: 9.7 },
        "ford_ranger_30_v6": { name: "Ford Ranger 3.0 V6 Diesel", kml: 9.2 },
        "mitsubishi_l200_24": { name: "Mitsubishi L200 Triton", kml: 9.8 },
        "bmw_i4": { name: "BMW i4 (Elétrico)", kml: 44.0 },
        "bmw_r1250_gs": { name: "BMW R 1250 GS", kml: 20.0 },
        "tesla_model_3": { name: "Tesla Model 3 (Elétrico)", kml: 58.0 },
        "voltz_ev1_eletrica": { name: "Voltz EV1 (Moto Elétrica)", kml: 60.0 },
        "scania_r450": { name: "Scania R 450 Carreta", kml: 2.2 }
    }
};

const STATE_FUEL_PRICES = {
    SP: 5.82, RJ: 6.15, MG: 5.89, PA: 6.25, BA: 5.99,
    RS: 6.05, PR: 5.75, SC: 5.80, DF: 5.90, GO: 5.85,
    PE: 6.10, CE: 6.02, AM: 6.30, MA: 6.18, MT: 6.12,
    MS: 5.95, ES: 5.98, RN: 6.08, PB: 6.04, AL: 6.12,
    SE: 6.09, PI: 6.15, TO: 6.10, RO: 6.35, AC: 6.50,
    RR: 6.45, AP: 6.20, DEFAULT: 5.95
};

// Carrega o histórico salvo no localStorage ao iniciar
let travelHistory = JSON.parse(localStorage.getItem('calkm_travel_history')) || [];

function parseFormattedNumber(val) {
    if (!val) return 0;
    let cleanStr = val.toString().trim();
    cleanStr = cleanStr.replace(/\./g, '').replace(',', '.');
    const num = parseFloat(cleanStr);
    return isNaN(num) ? 0 : num;
}

function formatBR(val, decimals = 2) {
    return val.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

// 1. Função online para buscar coordenadas geográficas (Lat/Lon) pelo Nominatim
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

// 2. Consulta a rota rodoviária REAL pelas estradas via API OSRM (Gratuita e ultra precisa)
async function obterDistanciaRodoviariaReal(lat1, lon1, lat2, lon2) {
    try {
        const url = `https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=false`;
        const response = await fetch(url);
        const data = await response.json();

        if (data && data.routes && data.routes.length > 0) {
            // A API retorna a distância exata em metros -> converte para km
            return data.routes[0].distance / 1000;
        }
    } catch (e) {
        console.error("Erro ao obter rota rodoviária real via OSRM:", e);
    }
    return null;
}

// 3. Função de fallback em linha reta ajustada com multiplicador 1.22
function calcularDistanciaGeoFallback(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c) * 1.22;
}

document.addEventListener('DOMContentLoaded', () => {
    const brandSelect = document.getElementById('brandSelect');
    const autoVehicleSelect = document.getElementById('autoVehicleSelect');
    const origemInput = document.getElementById('origemA');
    const destinoInput = document.getElementById('destinoB');
    const distanciaInput = document.getElementById('distanciaKm');
    const fuelPriceInput = document.getElementById('fuelPrice');
    const regionPriceLabel = document.getElementById('regionPriceLabel');
    const btnCalculate = document.getElementById('btnCalculate');
    const btnClear = document.getElementById('btnClear');
    const btnExportCsv = document.getElementById('btnExportCsv');
    const btnOpenGoogleMaps = document.getElementById('btnOpenGoogleMaps');

    // Popular o primeiro select com as marcas disponíveis
    function popularMarcas() {
        brandSelect.innerHTML = '<option value="">Selecione a marca...</option>';
        Object.keys(vehicleBrandsDatabase).forEach(brand => {
            const option = document.createElement('option');
            option.value = brand;
            option.textContent = brand;
            brandSelect.appendChild(option);
        });
    }

    popularMarcas();

    // Evento ao mudar a Marca: carrega os modelos correspondentes no segundo select
    brandSelect.addEventListener('change', (e) => {
        const selectedBrand = e.target.value;
        autoVehicleSelect.innerHTML = '<option value="">Selecione o modelo...</option>';
        
        if (selectedBrand && vehicleBrandsDatabase[selectedBrand]) {
            autoVehicleSelect.disabled = false;
            const modelos = vehicleBrandsDatabase[selectedBrand];
            Object.keys(modelos).forEach(modelKey => {
                const option = document.createElement('option');
                option.value = modelKey;
                option.textContent = `${modelos[modelKey].name} (${modelos[modelKey].kml} km/L)`;
                autoVehicleSelect.appendChild(option);
            });
        } else {
            autoVehicleSelect.disabled = true;
        }
    });

    // Evento ao mudar o Modelo: atualiza automaticamente o campo de consumo (Km/L)
    autoVehicleSelect.addEventListener('change', (e) => {
        const selectedBrand = brandSelect.value;
        const selectedModelKey = e.target.value;
        if (selectedBrand && selectedModelKey && vehicleBrandsDatabase[selectedBrand][selectedModelKey]) {
            const kmlVal = vehicleBrandsDatabase[selectedBrand][selectedModelKey].kml;
            document.getElementById('kml').value = formatBR(kmlVal, 1);
        }
    });

    function updateHistoryUI() {
        const historyList = document.getElementById('historyList');
        if (!historyList) return;
        
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

    updateHistoryUI();

    function atualizarLinkGoogleMaps() {
        const origemVal = origemInput.value.trim();
        const destinoVal = destinoInput.value.trim();

        if (origemVal && destinoVal) {
            btnOpenGoogleMaps.href = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origemVal)}&destination=${encodeURIComponent(destinoVal)}&travelmode=driving`;
        } else {
            btnOpenGoogleMaps.href = 'https://www.google.com/maps';
        }
    }

    origemInput.addEventListener('input', () => {
        atualizarLinkGoogleMaps();
        
        const text = origemInput.value.toUpperCase();
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

    destinoInput.addEventListener('input', atualizarLinkGoogleMaps);

    btnCalculate.addEventListener('click', async () => {
        const origemVal = origemInput.value.trim();
        const destinoVal = destinoInput.value.trim();

        // Se houver origem e destino preenchidos, calcula a distância rodoviária REAL via API OSRM
        if (origemVal && destinoVal) {
            const coordsOrigem = await geocodeAddress(origemVal);
            const coordsDestino = await geocodeAddress(destinoVal);

            if (coordsOrigem && coordsDestino) {
                // Tenta consultar a malha rodoviária real primeiro
                let calcKm = await obterDistanciaRodoviariaReal(coordsOrigem.lat, coordsOrigem.lon, coordsDestino.lat, coordsDestino.lon);
                
                // Se a API OSRM por algum motivo não retornar, aplica o fallback otimizado
                if (!calcKm) {
                    calcKm = calcularDistanciaGeoFallback(coordsOrigem.lat, coordsOrigem.lon, coordsDestino.lat, coordsDestino.lon);
                }

                distanciaInput.value = formatBR(calcKm, 1);
            }
        }

        const distanciaKm = parseFormattedNumber(distanciaInput.value);
        const kml = parseFormattedNumber(document.getElementById('kml').value) || 1;
        const fuelPrice = parseFormattedNumber(fuelPriceInput.value) || 0;
        const maintenancePerKm = parseFormattedNumber(document.getElementById('maintenancePerKm').value) || 0;
        const tolls = parseFormattedNumber(document.getElementById('tolls').value) || 0;
        const fixedCostMonthly = parseFormattedNumber(document.getElementById('fixedCostMonthly').value) || 0;
        const monthlyKmAvg = parseFormattedNumber(document.getElementById('monthlyKmAvg').value) || 1000;
        const passengers = Math.max(1, parseInt(document.getElementById('passengers').value) || 1);
        
        const vehicleName = autoVehicleSelect.selectedIndex > 0 
            ? autoVehicleSelect.options[autoVehicleSelect.selectedIndex].text.split('(')[0].trim() 
            : "Personalizado";

        if (distanciaKm <= 0) {
            alert('Por favor, informe a distância da viagem em quilômetros ou preencha cidades válidas.');
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
        localStorage.setItem('calkm_travel_history', JSON.stringify(travelHistory));
        updateHistoryUI();
    });

    btnClear.addEventListener('click', () => {
        origemInput.value = '';
        destinoInput.value = '';
        distanciaInput.value = '';
        document.getElementById('fuelPrice').value = '5,95';
        document.getElementById('maintenancePerKm').value = '0,20';
        document.getElementById('tolls').value = '0,00';
        document.getElementById('fixedCostMonthly').value = '0,00';
        document.getElementById('monthlyKmAvg').value = '1000';
        document.getElementById('passengers').value = '1';
        document.getElementById('kml').value = '12,5';
        brandSelect.selectedIndex = 0;
        autoVehicleSelect.innerHTML = '<option value="">Primeiro selecione a marca...</option>';
        autoVehicleSelect.disabled = true;
        document.getElementById('result').style.display = 'none';
        btnOpenGoogleMaps.href = 'https://www.google.com/maps';
        regionPriceLabel.innerHTML = `📍 Preço Combustível por Região (Média Nacional): <b>R$ 5,95</b>`;
    });

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
});
