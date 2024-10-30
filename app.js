// Cargar el archivo CSV y mostrar una vista previa
function loadCSV() {
    const fileInput = document.getElementById('fileInput');

    const file = fileInput.files[0];
    if (!file) {
        alert('Por favor, selecciona un archivo CSV primero.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const text = event.target.result;
        const data = parseCSV(text);
        displayData(data);
    };
    reader.readAsText(file);
}

// Parsear el contenido del archivo CSV
function parseCSV(text) {
    const rows = text.split('\n').map(row => row.split(','));
    return rows;
}

// Muestra una vista previa de los datos en una tabla
function displayData(data) {
    const dataPreview = document.getElementById('dataPreview');
    // Limpiar contenido previo
    dataPreview.innerHTML = '';

    const table = document.createElement('table');
    const headerRow = document.createElement('tr');

    // Crear encabezados
    data[0].forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Crear filas de datos
    for (let i = 1; i < data.length; i++) {
        const row = document.createElement('tr');

        // Filtrar celdas vacías al final de cada fila
        const filteredRow = data[i].filter(cell => cell !== '');

        filteredRow.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            row.appendChild(td);
        });

        table.appendChild(row);
    }

    dataPreview.appendChild(table);
}

// Entrenar el modelo seleccionado con TytusJS
function trainModel() {
    const modelType = document.getElementById('modelSelect').value;
    const trainTestSplit = document.getElementById('trainTestSplit').value;

    // Configurar el modelo de acuerdo con el tipo seleccionado
    let model;
    switch (modelType) {
        case 'linearRegression':
            model = new TytusJS.LinearRegression();
            break;
        case 'kmeans':
            model = new TytusJS.KMeans();
            break;
        case 'knn':
            model = new TytusJS.KNN();
            break;
        // Agregar más modelos aquí
        default:
            console.error('Modelo no soportado');
            return;
    }
}

// Realizar predicción con el modelo entrenado
function predict() {
    const modelType = document.getElementById('modelSelect').value;

    // Dependiendo del modelo, realiza predicciones
    if (modelType === 'linearRegression') {
        const predictions = model.predict(/* datos de prueba */);
        console.log(predictions);
    }
}

// Mostrar los resultados en una gráfica usando Chart.js
function showGraph() {
    const ctx = document.getElementById('resultsChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: [/* etiquetas de datos de prueba */],
            datasets: [{
                label: 'Resultados',
                data: [/* datos predichos */],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
    });
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