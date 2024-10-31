// DataFrame global
let df;

// Funcion para cargar un archivo CSV y crear el DataFrame
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
                // Filtra las filas que tengan valores inválidos o estén vacías
                const validData = results.data.filter(row => {
                    return Object.values(row).every(value => value !== '' && value !== undefined && value !== null);
                });

                displayDataPreview(validData);

                // Crear un DataFrame con los datos válidos
                df = new dfd.DataFrame(validData);
                df.head().print();

                // Llenar los selectores de columnas
                fillColumnSelectors(df.columns);
            },
            error: function (error) {
                console.error('Error al parsear el CSV:', error);
            }
        });
    };

    reader.readAsText(file);
}

// Función para obtener los valores de las columnas seleccionadas
function fillColumnSelectors(columns) {
    const xColumnSelect = document.getElementById('xColumnSelect');
    const yColumnSelect = document.getElementById('yColumnSelect');

    // Limpiar opciones previas
    xColumnSelect.innerHTML = '';
    yColumnSelect.innerHTML = '';

    // Agregar opciones de columnas
    columns.forEach(column => {
        const optionX = document.createElement('option');
        optionX.value = column;
        optionX.textContent = column;
        xColumnSelect.appendChild(optionX);

        const optionY = document.createElement('option');
        optionY.value = column;
        optionY.textContent = column;
        yColumnSelect.appendChild(optionY);
    });
}

// Función para mostrar una previsualización de los datos cargados
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

// Función para actualizar el nombre del modelo seleccionado
function updateModelName() {
    const modelSelect = document.getElementById('modelSelect');
    const modelNameDiv = document.getElementById('modelName');
    const selectedModel = modelSelect.options[modelSelect.selectedIndex].text;
    modelNameDiv.textContent = selectedModel;
}

// Función para actualizar los parámetros del modelo seleccionado
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
    if (!df) {
        alert('Por favor, carga un archivo CSV primero.');
        return;
    }

    // Obtener columnas seleccionadas
    const xColumn = document.getElementById('xColumnSelect').value;
    const yColumn = document.getElementById('yColumnSelect').value;

    // Extraer las columnas seleccionadas como arreglos
    const xValues = df[xColumn].values;
    const yValues = df[yColumn].values;

    // Combina X e Y en un formato de lista de listas para MinimosCuadrados
    const datos = xValues.map((x, i) => {
            return [Number(x), Number(yValues[i])];
    });
    
    // Ejecuta la regresión lineal usando MinimosCuadrados de G8_RegresionLineal.js
    MinimosCuadrados(datos);
    
    // Obtiene el valor de X ingresado por el usuario
    const xValue = document.getElementById('xValueInput').value;
    if (!xValue) {
        alert('Por favor, ingrese un valor de X para la predicción.');
        return;
    }

    // Realiza la predicción con el valor de X ingresado
    let resp = Predecir(Number(xValue));
    
    // Muestra la ecuación de la recta en pantalla
    let Resp = document.getElementById("Resp");
    let texto = `Y = ${resp[1]}X `;
    texto += resp[2] >= 0 ? `+ ${resp[2]}` : `- ${Math.abs(resp[2])}`;
    texto += `<br/>El resultado (Y) es: ${resp[0]}<br/>`;
    Resp.innerHTML = texto;

    // Prepara datos para la gráfica, incluyendo cabeceras
    datos.unshift(['X', 'Y']);
    graficar(datos, 'Grafia Linear Regression');
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

// Función para graficar los datos
function graficar(datos, componente) {
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable(datos);

        var options = {
            title: 'Tendencia',
            hAxis: {title: 'X'},
            vAxis: {title: 'Y'},
            legend: 'none',
            trendlines: { 0: {} }    // Draw a trendline for data series 0.
        };

        var chart = new google.visualization.ScatterChart(document.getElementById(componente));
        chart.draw(data, options);
    }
}