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
                fillColumnSelectorsPoly(df.columns);
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

// Función para obtener los valores de las columnas seleccionadas
function fillColumnSelectorsPoly(columns) {
    const xColumnSelect = document.getElementById('xColumnSelectPoly');
    const yColumnSelect = document.getElementById('yColumnSelectPoly');
    const predictColumnSelect = document.getElementById('predictColumnSelectPoly');

    // Limpiar opciones previas
    xColumnSelect.innerHTML = '';
    yColumnSelect.innerHTML = '';
    predictColumnSelect.innerHTML = '';

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

        const optionPredict = document.createElement('option');
        optionPredict.value = column;
        optionPredict.textContent = column;
        predictColumnSelect.appendChild(optionPredict);
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
    texto += `<br/>El resultado de la Prediccion en Y es: ${resp[0]}<br/>`;
    Resp.innerHTML = texto;

    // Prepara datos para la gráfica, incluyendo cabeceras
    datos.unshift(['X', 'Y']);
    graficar(datos, 'Grafia Linear Regression');

    function graficar(datos, componente) {
        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {
            var data = google.visualization.arrayToDataTable(datos);

            var options = {
                title: 'Grafica de Predicciones',
                hAxis: { title: 'X' },
                vAxis: { title: 'Y' },
                legend: 'none',
                trendlines: { 0: {} }
            };

            var chart = new google.visualization.ScatterChart(document.getElementById(componente));
            chart.draw(data, options);
        }
    }
}

// Función para entrenar y predecir con Polynomial Regression
function trainPolynomialRegression() {
    if (!df) {
        alert('Por favor, carga un archivo CSV primero.');
        return;
    }

    // Obtener columnas seleccionadas
    const xColName = document.getElementById("xColumnSelectPoly").value;
    const yColName = document.getElementById("yColumnSelectPoly").value;
    const predictColName = document.getElementById("predictColumnSelectPoly").value;

    // Verificar que se hayan seleccionado columnas
    if (!xColName || !yColName || !predictColName) {
        alert("Por favor, selecciona las columnas X e Y.");
        return;
    }

    // Extraer los valores de las columnas seleccionadas
    const xValues = df[xColName].values.map(Number);
    const yValues = df[yColName].values.map(Number);
    const predictValues = df[predictColName].values.map(Number);

    // Prepara datos para entrenamiento y predicción
    const xTrain = xValues;
    const yTrain = yValues;
    const predictArray = predictValues;

    // Crear la instancia de PolynomialRegression
    var polynomial = new PolynomialRegression();

    // Ajustar el modelo y predecir para diferentes grados
    let yPredict = [];
    let yPredict2 = [];
    let yPredict3 = [];
    let r2, r22, r23;

    polynomial.fit(xTrain, yTrain, 2);
    yPredict = polynomial.predict(predictArray);
    r2 = polynomial.getError();

    polynomial.fit(xTrain, yTrain, 3);
    yPredict2 = polynomial.predict(predictArray);
    r22 = polynomial.getError();

    polynomial.fit(xTrain, yTrain, 4);
    yPredict3 = polynomial.predict(predictArray);
    r23 = polynomial.getError();

    // Redondear resultados
    for (let i = 0; i < predictArray.length; i++) {
        yPredict[i] = Number(yPredict[i].toFixed(2));
        yPredict2[i] = Number(yPredict2[i].toFixed(2));
        yPredict3[i] = Number(yPredict3[i].toFixed(2));
    }

    // Mostrar resultados
    document.getElementById("log1").innerHTML += 'X Train: [' + xTrain + ']';
    document.getElementById("log2").innerHTML += 'Y Train: [' + yTrain + ']';
    document.getElementById("log3").innerHTML += 'X To Predict: [' + predictArray + ']';
    document.getElementById("log4").innerHTML += 'Y Prediction Degree 2: [' + yPredict + ']';
    document.getElementById("log5").innerHTML += 'Y Prediction Degree 3: [' + yPredict2 + ']';
    document.getElementById("log6").innerHTML += 'Y Prediction Degree 4: [' + yPredict3 + ']';
    document.getElementById("log7").innerHTML += 'R^2 for Degree 2: ' + Number(r2.toFixed(2));
    document.getElementById("log8").innerHTML += 'R^2 for Degree 3: ' + Number(r22.toFixed(2));
    document.getElementById("log9").innerHTML += 'R^2 for Degree 4: ' + Number(r23.toFixed(2));

    function joinArrays() {
        var a = []
        if (arguments.length == 10) {
            a.push([arguments[0], arguments[2], arguments[4], arguments[6], arguments[8]]);
            for (var i = 0; i < arguments[1].length; i++) {
                a.push([arguments[1][i], arguments[3][i], arguments[5][i], arguments[7][i], arguments[9][i]]);
            }
        }
        return a;
    }

    // Preparar datos para Google Charts
    var a = joinArrays('x', xTrain, 'Training', yTrain, 'Prediction Degree 2', yPredict, 'Prediction Degree 3', yPredict2, 'Prediction Degree 4', yPredict3);

    console.log(a);

    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable(a);
        var options = {
            title: 'Gráfica de Tendencias',
            hAxis: { title: 'X' },
            vAxis: { title: 'Y' },
            seriesType: 'scatter',
            series: {
                1: { type: 'line' },
                2: { type: 'line' },
                3: { type: 'line' }
            }
        };
        var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }
}

// Función de entrenamiento para Decision Tree
function trainDecisionTree() {
    if (!df) {
        alert('Por favor, carga un archivo CSV primero.');
        return;
    }

    // Convertir el dataframe a array
    const headers = df.columns;
    const dataWithoutHeaders = df.values;
    const dataArr = [headers, ...dataWithoutHeaders];

    function parseCSV(csvText) {
        // Divide el texto en líneas y luego en celdas por cada coma
        const rows = csvText.trim().split('\n');
        return rows.map(row => row.split(','));
    }

    // Obtener el texto del CSV desde el textarea
    const csvText = document.getElementById('csvInput').value;
    const predictionData = parseCSV(csvText);

    console.log(predictionData);

    // Crear el árbol de decisión ID3
    let decisionTree = new DecisionTreeID3(dataArr);
    let root = decisionTree.train(decisionTree.dataset);
    // Puedes hacer que solicite el texto del csv para predecir
    let predict = decisionTree.predict(predictionData, root)
    
    const dotStr = decisionTree.generateDotString(root);
    displayTree(dotStr);

    // Mostrar el resultado de la predicción
    console.log("Predicción:", predict);

    // Convertir y mostrar el árbol
    displayTree(dotStr);

    // Función para mostrar el árbol usando vis-network
    function displayTree(dotStr) {
        const parsedData = vis.network.convertDot(dotStr);
        const container = document.getElementById("tree");
        document.getElementById('prediction').innerText = "Valor Patron: " + predict.value + " \n Tag: " + predict.tag;

        const options = {
            layout: {
                hierarchical: {
                    levelSeparation: 100,
                    nodeSpacing: 100,
                    parentCentralization: true,
                    direction: 'UD',
                    sortMethod: 'directed',
                }
            }
        };

        new vis.Network(container, parsedData, options);
    }
}
