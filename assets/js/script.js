/**
 * Application: Threat Intel Artifact Analyzer
 * DevSecOps Focus: Strict CSP, Safe DOM Manipulation & Zero External Data Leakage.
 */

'use strict';

// Frame Busting (Proteção contra Clickjacking)
if (self !== top) {
    top.location = self.location;
}

document.addEventListener('DOMContentLoaded', () => {
    const btnProcess = document.getElementById('btnProcess');
    if (btnProcess) {
        btnProcess.addEventListener('click', processArtifact);
    }
});

/**
 * Remove todos os filhos de um elemento do DOM com segurança.
 * @param {HTMLElement} element
 */
function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

/**
 * Adiciona um parágrafo/linha formatado dentro do container sem usar innerHTML desprotegido.
 * @param {HTMLElement} parent
 * @param {string} label
 * @param {string} value
 * @param {string} [className]
 */
function appendMetaLine(parent, label, value, className = '') {
    const div = document.createElement('div');
    if (className) {
        div.className = className;
    }

    if (label) {
        const strong = document.createElement('strong');
        strong.textContent = label + ' ';
        div.appendChild(strong);
    }

    const textNode = document.createTextNode(value);
    div.appendChild(textNode);
    parent.appendChild(div);
}

async function processArtifact() {
    const apiKeyInput = document.getElementById('apiKey');
    const filePicker = document.getElementById('filePicker');
    const metaBox = document.getElementById('metaBox');
    const resultsPanel = document.getElementById('resultsPanel');

    const apiKey = apiKeyInput.value.trim();
    if (!apiKey) {
        alert('Por favor, insira sua API Key do VirusTotal. Ela é processada localmente e não fica salva.');
        return;
    }

    if (!filePicker.files || !filePicker.files[0]) {
        alert('Selecione um artefato de arquivo para gerar a assinatura digital.');
        return;
    }

    metaBox.style.display = 'block';
    clearElement(metaBox);
    appendMetaLine(metaBox, '', '[*] Lendo arquivo e calculando assinatura SHA-256 local...');
    resultsPanel.style.display = 'none';

    const file = filePicker.files[0];

    try {
        // 1. GERAÇÃO DO HASH LOCAL VIA WEBCRYPTO API
        const arrayBuffer = await file.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const calculatedHash = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

        clearElement(metaBox);
        appendMetaLine(metaBox, 'Arquivo:', file.name);
        appendMetaLine(metaBox, 'Tamanho:', `${file.size} bytes`);
        appendMetaLine(metaBox, 'SHA-256 local:', calculatedHash);
        appendMetaLine(metaBox, '', '[*] Consultando base de Threat Intelligence do VirusTotal...');

        // 2. REQUISIÇÃO À API V3 DO VIRUSTOTAL
        const url = `https://www.virustotal.com/api/v3/files/${calculatedHash}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'x-apikey': apiKey,
            },
        });

        if (response.status === 404) {
            appendMetaLine(
                metaBox,
                '',
                '✔ Este hash não foi encontrado na base de dados global. O arquivo pode ser inédito ou seguro.',
                'text-success'
            );
            return;
        }

        if (!response.ok) {
            throw new Error(`Erro na comunicação (${response.status}) ou API Key inválida/expirada.`);
        }

        const reportData = await response.json();
        if (reportData && reportData.data && reportData.data.attributes) {
            renderThreatIntel(reportData.data.attributes);
        } else {
            throw new Error('Estrutura de resposta da API inválida.');
        }
    } catch (err) {
        appendMetaLine(metaBox, '❌ Erro:', err.message, 'text-danger');
    }
}

function renderThreatIntel(attributes) {
    const resultsPanel = document.getElementById('resultsPanel');
    const engineLogs = document.getElementById('engineLogs');
    const stats = attributes.last_analysis_stats || {};

    document.getElementById('statMalicious').textContent = stats.malicious ?? 0;
    document.getElementById('statSuspicious').textContent = stats.suspicious ?? 0;
    document.getElementById('statUndetected').textContent = stats.undetected ?? 0;
    document.getElementById('statHarmless').textContent = stats.harmless ?? 0;

    clearElement(engineLogs);
    const results = attributes.last_analysis_results || {};

    const targetEngines = [
        'Kaspersky',
        'Microsoft',
        'CrowdStrike',
        'Symantec',
        'Sophos',
        'BitDefender',
        'McAfee',
        'TrendMicro',
    ];

    targetEngines.forEach((engine) => {
        if (results[engine]) {
            const li = document.createElement('li');
            li.className = 'engine-item';

            const nameSpan = document.createElement('span');
            nameSpan.textContent = engine;
            nameSpan.style.fontWeight = '600';

            const resSpan = document.createElement('span');
            if (results[engine].category === 'malicious') {
                resSpan.className = 'engine-detected';
                resSpan.textContent = `[!] Malicioso: ${results[engine].result || 'Detectado'}`;
            } else {
                resSpan.className = 'engine-clean';
                resSpan.textContent = '✔ Indetectado / Limpo';
            }

            li.appendChild(nameSpan);
            li.appendChild(resSpan);
            engineLogs.appendChild(li);
        }
    });

    resultsPanel.style.display = 'block';
}