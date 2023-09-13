urlpseudo = "./jsFiles/sorting/algoCode/insertionSort";
urlcpp = "./jsFiles/sorting/algoCode/insertionSort.cpp";
urljava = "./jsFiles/sorting/algoCode/insertionSort.java";
urlpython = "./jsFiles/sorting/algoCode/insertionSort.py";
d3.select("#algo-name").text("Insertion Sort");
displayCodeFromFile(urlpseudo);
sortData();

function swap(i, j)
{
    var temp = dataSet[i];
    dataSet[i] = dataSet[j]; 
    dataSet[j] = temp;
}
//insertionSort
function sorting()
{
    if(playIndex >= 0 && playIndex<record.length )
    {
        dataSet = cloneData(record[playIndex]);
        hline = extraRecord[playIndex][0];
        strAction = extraRecord[playIndex][1];
        if(urlindex == 0) highlightCode(hline);
        actionLabel(strAction);
        redrawBars(dataSet);
        playIndex++;
    }
    else
    {
        clearInterval(timer);
    }
}

function sortData()
{
    record = []; extraRecord = []; hline = -1; playIndex = 0;
    strAction = "Starting to Sort";
    recordData(dataSet);

    for(var i=0; i<dataSet.length ; i++)
    {
        var key = {value:dataSet[i].value, state: dataSet[i].state }, j = i - 1;
        //set the ith element to compare state
        dataSet[i].state = states.compare;
        strAction = dataSet[i].value + " is selected as key value";
        hline = 1; recordData(dataSet);

        if(j>=0)
        {
            //start comparing with previous elements
            dataSet[j].state = states.compare;
            controlFlag = 2;
            strAction = "Comparing key value " + key.value + " and " + dataSet[j].value + ".";
            hline = 3; recordData(dataSet);
        }

        while(j>=0 && dataSet[j].value > key.value)
        {
            dataSet[j].state = states.swapping;
            dataSet[j+1].state = states.swapping;
            strAction = "Copying " + dataSet[j].value + " to index " + (j+1) + ".";
            hline = 4; recordData(dataSet);

            dataSet[j+1] = {value: dataSet[j].value, state: dataSet[j].state}; 
            strAction = dataSet[j].value + " copied to index " + (j+1) + ".";
            recordData(dataSet);

            dataSet[j+1].state = states.sorted;
            dataSet[j].state = states.compare; 
            strAction = dataSet[j].value + " is sorted till " + (i+1) + " elements."; 
            hline = 4; recordData(dataSet);
        
            if(j>0)
            {
                //start comparing with previous elements
                dataSet[j-1].state = states.compare;
                strAction = "Comparing key value " + key.value + " and " + dataSet[j-1].value + ".";
                hline = 3; recordData(dataSet);
            }
            j--;
        } //end of while loop

        dataSet[j+1].state = states.swapping;
        strAction = "Copying key value " + key.value + " to index " + (j+2) + ".";
        hline = 6; recordData(dataSet);

        dataSet[j+1] = {value: key.value, state: key.state}; dataSet[j+1].state = states.swapping;
        

        strAction = key.value + " is copied to index " + (j+2) + ".";
        recordData(dataSet); 

        dataSet[j+1].state = states.sorted;
        if(j>=0) dataSet[j].state = states.sorted;
        strAction = dataSet[j+1].value + " is sorted till " + (i+1) + " elements.";
        hline = 6; recordData(dataSet); 
        if(i == dataSet.length - 1)
        {
            strAction = "All data has been sorted.";
            recordData(dataSet);
        }
    }
}

function init()
{
    initPlay = false;
    for(var k = 0; k< num; k++)
    {
        dataSet[k].state = states.default;
    }    
}
function startSort(firstPlay) // if firstPlay is true then playing, else its resume
{
    if(firstPlay === true) init();
    timer = setInterval(function() { sorting() }, speed );   
}