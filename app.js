document.addEventListener('DOMContentLoaded', () => {
    // Referências dos Elementos
    const origemInput = document.getElementById('origemA');
    const destinoInput = document.getElementById('destinoB');
    const btnMaps = document.getElementById('btnOpenGoogleMaps');
    const autoVehicleSelect = document.getElementById('autoVehicleSelect');
    
    const distanciaKm = document.getElementById('distanciaKm');
    const fuelPrice = document.getElementById('fuelPrice');
    const maintenancePerKm = document.getElementById('maintenancePerKm');
    const tolls = document.getElementById('tolls');
    const fixedCostMonthly = document.getElementById('fixedCostMonthly');
    const monthlyKmAvg = document.getElementById('monthlyKmAvg');
    const passengers = document.getElementById('passengers');
    const kml = document.getElementById('kml');

    const btnCalculate = document.getElementById('btnCalculate');
    const btnClear = document.getElementById('btnClear');
    const btnExportCsv = document.getElementById('btnExportCsv');
    
    const resultBox = document.getElementById('result');
    const resRouteDist = document.getElementById('resRouteDist');
    const resFuelCost = document.getElementById('resFuelCost');
    const resFixedCost = document.getElementById('resFixedCost');
    const resCostPerKm = document.getElementById('resCostPerKm');
    const resCostPerPassenger = document.getElementById('resCostPerPassenger');
    const resTotalCost = document.getElementById('resTotalCost');
    const historyList = document.getElementById('historyList');

    // 1. Atualização Dinâmica do Link do Google Maps com Origem e Destino
    function atualizarLinkGoogleMaps() {
        const origem = encodeURIComponent(origemInput.value.trim());
        const destino = encodeURIComponent(destinoInput.value.trim());

        if (origem && destino) {
            btnMaps.href = `https://www.google.com/maps/dir/?api=1&origin=${origem}&destination=${destino}`;
        } else {
            btnMaps.href = 'https://www.google.com/maps';
        }
    }

    origemInput.addEventListener('input', atualizarLinkGoogleMaps);
    destinoInput.addEventListener('input', atualizarLinkGoogleMaps);

    // 2. Tabela de Veículos Inmetro (Preenchimento Automático de Consumo)
    const veiculosConsumo = {
        // Motos
        "honda_pop_110": 55.0, "honda_biz_125": 50.0, "honda_cg_160": 38.0,
        "yamaha_factor_150": 40.0, "yamaha_fazer_250": 31.0, "honda_cb_300f": 30.0,
        "honda_xre_300": 28.0, "yamaha_lander_250": 30.0,
        // Carros Hatch
        "renault_kwid_10": 15.3, "fiat_mobi_10": 13.5, "fiat_argo_10": 13.4,
        "chevrolet_onix_10": 13.3, "hyundai_hb20_10": 12.8, "volkswagen_polo_10": 13.8,
        "toyota_yaris_13": 13.0,
        // Sedãs & SUVs
        "chevrolet_onix_plus": 13.7, "volkswagen_virtus_10t": 13.2, "toyota_corolla_20": 11.9,
        "toyota_corolla_hybrid": 17.9, "chevrolet_tracker_12": 11.2, "hyundai_creta_10t": 11.5,
        "jeep_renegade_13t": 11.0, "volkswagen_nivus_10t": 12.1,
        // Utilitários & Picapes
        "fiat_strada_13": 12.5, "fiat_toro_13t": 9.8, "toyota_hilux_28": 10.1,
        "chevrolet_s10_28": 10.3, "fiat_fiorino_14": 11.8, "renault_master_23": 10.0,
        "hyundai_hr_25": 8.5, "vw_delivery_3150": 7.5, "scania_r450": 2.2
    };

    autoVehicleSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        if (veiculosConsumo[val]) {
            kml.value = veiculosConsumo[val].toString().replace('.', ',');
        }
    });

    // Função Auxiliar para converter formato PT-BR (vírgula) para número JS
    function parseNumber(value) {
        if (!value) return 0;
        return parseFloat(value.toString().replace(/\./g, '').replace(',', '.')) || 0;
    }

    // 3. Lógica de Cálculo de Custos
    btnCalculate.addEventListener('click', () => {
        const dist = parseNumber(distanciaKm.value);
        const precoL = parseNumber(fuelPrice.value);
        const manutenKm = parseNumber(maintenancePerKm.value);
        const pedagio = parseNumber(tolls.value);
        const custoFixoM = parseNumber(fixedCostMonthly.value);
        const kmMedioM = parseNumber(monthlyKmAvg.value);
        const pass = parseInt(passagens.value || passengers.value) || 1;
        const consumoL = parseNumber(kml.value);

        if (consumoL <= 0) {
            alert('Por favor, informe um consumo válido em Km/L.');
            return;
        }

        // Cálculos
        const litrosGastos = dist / consumoL;
        const custoCombustivel = litrosGastos * precoL;
        const custoManutencao = dist * manutenKm;
        
        // Custo fixo proporcional à distância da viagem
        let custoFixoProporcional = 0;
        if (kmMedioM > 0) {
            const custoPorKmFixo = custoFixoM / kmMedioM;
            custoFixoProporcional = dist * custoPorKmFixo;
        }

        const custoTotal = custoCombustivel + custoManutencao + pedagio + custoFixoProporcional;
        const custoPorKmFinal = dist > 0 ? (custoTotal / dist) : 0;
        const custoPorPassageiroFinal = pass > 0 ? (custoTotal / pass) : custoTotal;

        // Exibição dos Resultados
        resRouteDist.textContent = `${dist.toFixed(1).replace('.', ',')} km`;
        resFuelCost.textContent = `R$ ${custoCombustivel.toFixed(2).replace('.', ',')}`;
        resFixedCost.textContent = `R$ ${custoFixoProporcional.toFixed(2).replace('.', ',')}`;
        resCostPerKm.textContent = `R$ ${custoPorKmFinal.toFixed(2).replace('.', ',')}`;
        resCostPerPassenger.textContent = `R$ ${custoPorPassageiro.toFixed(2).replace('.', ',')}`;
        resTotalCost.textContent = `R$ ${custoTotal.toFixed(2).replace('.', ',')}`;

        resultBox.style.display = 'block';

        // Salvar no Histórico Local
        salvarNoHistorico({
            origem: origemInput.value || 'Não informada',
            destino: destinoInput.value || 'Não informado',
            distancia: dist,
            custoTotal: custoTotal,
            data: new Date().toLocaleDateString('pt-BR')
        });
    });

    // 4. Limpar Campos
    btnClear.addEventListener('click', () => {
        origemInput.value = '';
        destinoInput.value = '';
        distanciaKm.value = '0,0';
        tolls.value = '0,00';
        resultBox.style.display = 'none';
        atualizarLinkGoogleMaps();
    });

    // 5. Histórico e Exportação CSV
    function salvarNoHistorico(viagem) {
        let historico = JSON.parse(localStorage.getItem('calkm_history')) || [];
        historico.unshift(viagem);
        if (historico.length > 20) historico.pop(); // Mantém os últimos 20
        localStorage.setItem('calkm_history', JSON.stringify(historico));
        carregarHistorico();
    }

    function carregarHistorico() {
        let historico = JSON.parse(localStorage.getItem('calkm_history')) || [];
        if (historico.length === 0) {
            historyList.innerHTML = '<p style="color: #777;">Nenhuma viagem salva ainda.</p>';
            return;
        }

        let html = '<ul style="padding-left: 15px; margin: 0;">';
        historico.forEach(item => {
            html += `<li style="margin-bottom: 6px;"><b>${item.origem} ➔ ${item.destino}</b> (${item.distancia} km) - <b>R$ ${item.custoTotal.toFixed(2).replace('.', ',')}</b> <span style="font-size: 11px; color: #888;">(${item.data})</span></li>`;
        });
        html += '</ul>';
        historyList.innerHTML = html;
    }

    btnExportCsv.addEventListener('click', () => {
        let historico = JSON.parse(localStorage.getItem('calkm_history')) || [];
        if (historico.length === 0) {
            alert('Não há histórico para exportar.');
            return;
        }

        let csvContent = "data:text/csv;charset=utf-8,Origem;Destino;Distancia (km);Custo Total (R$);Data\n";
        historico.forEach(item => {
            csvContent += `"${item.origem}";"${item.destino}";"${item.distancia}";"${item.custoTotal.toFixed(2)}";"${item.data}"\n`;
        });

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "historico_calkm.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // Carregar histórico ao iniciar a aplicação
    carregarHistorico();
});
