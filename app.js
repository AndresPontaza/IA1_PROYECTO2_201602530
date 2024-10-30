function loadCSV() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Por favor, selecciona un archivo CSV.');
        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
        const text = event.target.result;

        // Usar PapaParse para convertir el CSV en un array de objetos
        Papa.parse(text, {
            header: true,
            complete: function (results) {
                displayDataPreview(results.data);

                // Verifica que Danfo.js se haya cargado correctamente
                const df = new dfd.DataFrame(results.data);
                df.head().print();
            },
            error: function (error) {
                console.error('Error al parsear el CSV:', error);
            }
        });
    };

    reader.readAsText(file);
}

function displayDataPreview(data) {
    const dataPreview = document.getElementById('dataPreview');

    // Limpiar contenido anterior
    dataPreview.innerHTML = '';

    if (data.length === 0) {
        dataPreview.innerHTML = '<p>No se encontraron datos.</p>';
        return;
    }

    // Crear tabla
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');

    // Crear cabeceras de la tabla
    Object.keys(data[0]).forEach(key => {
        const th = document.createElement('th');
        th.textContent = key;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Agregar filas de datos
    data.forEach(row => {
        // Asegurarse de que la fila tenga al menos un valor significativo
        if (Object.values(row).some(value => value !== '' && value !== null && value !== undefined)) {
            const tr = document.createElement('tr');
            Object.values(row).forEach(value => {
                const td = document.createElement('td');
                td.textContent = value !== null && value !== undefined ? value : '';
                tr.appendChild(td);
            });
            table.appendChild(tr);
        }
    });

    // Agregar la tabla al contenedor de previsualización
    dataPreview.appendChild(table);
}

// Actualizar el nombre del modelo seleccionado
function updateModelName() {
    const modelSelect = document.getElementById('modelSelect');
    const modelNameDiv = document.getElementById('modelName');
    const selectedModel = modelSelect.options[modelSelect.selectedIndex].text;
    modelNameDiv.textContent = selectedModel;
}

// Actualizar los parámetros del modelo seleccionado
function updateModelName() {
    const modelSelect = document.getElementById('modelSelect').value;
    const modelName = document.getElementById('modelName');

    // Oculta todas las secciones al cambiar de modelo
    document.querySelectorAll('.model-section').forEach(section => {
        section.style.display = 'none';
    });

    // Muestra la sección correspondiente al modelo seleccionado
    switch (modelSelect) {
        case 'linearRegression':
            document.getElementById('linearRegressionSection').style.display = 'block';
            modelName.innerText = 'Linear Regression';
            break;
        case 'polynomialRegression':
            document.getElementById('polynomialRegressionSection').style.display = 'block';
            modelName.innerText = 'Polynomial Regression';
            break;
        case 'decisionTree':
            document.getElementById('decisionTreeSection').style.display = 'block';
            modelName.innerText = 'Decision Tree';
            break;
        case 'naiveBayes':
            document.getElementById('naiveBayesSection').style.display = 'block';
            modelName.innerText = 'Naive Bayes';
            break;
        case 'neuralNetwork':
            document.getElementById('neuralNetworkSection').style.display = 'block';
            modelName.innerText = 'Neural Network';
            break;
        case 'kmeans':
            document.getElementById('kmeansSection').style.display = 'block';
            modelName.innerText = 'K-Means';
            break;
        case 'knn':
            document.getElementById('knnSection').style.display = 'block';
            modelName.innerText = 'K-Nearest Neighbors';
            break;
        default:
            modelName.innerText = 'Selecciona un modelo';
            break;
    }
}

// Función de entrenamiento para Linear Regression
function trainLinearRegression() {
    const param1 = document.getElementById('lr-param1').value;
    console.log(`Entrenando Linear Regression con parámetro: ${param1}`);
    // Lógica para entrenamiento aquí
}

// Función de entrenamiento para Polynomial Regression
function trainPolynomialRegression() {
    const param1 = document.getElementById('lr-param1').value;
    console.log(`Entrenando Polynomial Regression con parámetro: ${param1}`);
    // Lógica para entrenamiento aquí
}

// Función de entrenamiento para Decision Tree
function trainDecisionTree() {
    const param1 = document.getElementById('lr-param1').value;
    console.log(`Entrenando Decision Tree con parámetro: ${param1}`);
    // Lógica para entrenamiento aquí
}

// Función de entrenamiento para Naive Bayes
function trainNaiveBayes() {
    const param1 = document.getElementById('lr-param1').value;
    console.log(`Entrenando Naive Bayes con parámetro: ${param1}`);
    // Lógica para entrenamiento aquí
}

// Función de entrenamiento para Neural Network
function trainNeuralNetwork() {
    const param1 = document.getElementById('lr-param1').value;
    console.log(`Entrenando Neural Network con parámetro: ${param1}`);
    // Lógica para entrenamiento aquí
}

// Función de entrenamiento para K-Means
function trainKMeans() {
    const param1 = document.getElementById('lr-param1').value;
    console.log(`Entrenando K-Means con parámetro: ${param1}`);
    // Lógica para entrenamiento aquí
}

// Función de entrenamiento para K-Nearest Neighbors
function trainKNN() {
    const param1 = document.getElementById('lr-param1').value;
    console.log(`Entrenando K-Nearest Neighbors con parámetro: ${param1}`);
    // Lógica para entrenamiento aquí
}