const month = new Date().getMonth() + 1;
const year = new Date().getFullYear();
const daysInMonth = new Date(year, month, 0).getDate();

export function getDataSet(dateGroups) {
    
    var result = [];
    for (var i = 1; i <= daysInMonth; i++) {
        var date = month + "/" + i + "/" + year;
        var initalData = {x: date, y: 0}
        result.push(initalData);
    }
    for (var j = 0; j < dateGroups.length; j++) {
        var number = Number(dateGroups[j].sum.toFixed(2))
        result[dateGroups[j].day - 1].y = number ;
        // result[dateGroups[i].day - 1] = (dateGroups[i].sum.toFixed(2));
    }
    return result;
    
}

