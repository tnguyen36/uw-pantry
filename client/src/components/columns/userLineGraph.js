export function getDataSet(dateGroups) {
    var result = [];
    const year = new Date().getFullYear();

    for (var i = 1; i <= 12; i++) {
        var initialData = {x: i + '/' + 1 + '/' + year, y: 0 };
        result.push(initialData);
    }
    for (var j = 0; j < dateGroups.length; j++) {
        result[dateGroups[j]._id - 1].y = dateGroups[j].total
    }
    return result;
}


