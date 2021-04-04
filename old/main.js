const { createClient } = supabase
supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const urlParams = new URLSearchParams(window.location.search);
const ORDER_ID = parseInt(urlParams.get('orderID'));

function getObjectByPropertyValue(array, propertyName, propertyValue) {
    return array.find(o => o[propertyName] == propertyValue)
}

function getIndexByPropertyValue(array, propertyName, propertyValue) {
    return array.findIndex(o => o[propertyName] == propertyValue)
}

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
};

Array.prototype.clone = function () {
    return JSON.parse(JSON.stringify(this))
}

Object.prototype.displayProxy = function () {
    return JSON.parse(JSON.stringify(this))
}

async function getData(tableName, orderCol) {
    return await supabase
        .from(tableName)
        .select('*')
        .order(orderCol == undefined ? 'id' : orderCol)
}

async function getRow(tableName, id) {
    return await supabase
        .from(tableName)
        .select('*')
        .eq('id', id)
}

async function getSomeRowsByArray(tableName, colName, filterValue) {
    return await supabase
        .from(tableName)
        .select('*')
        .cs(colName, [filterValue])
}

async function addRow(tableName, rowData) {
    return await supabase
        .from(tableName)
        .insert([
            rowData,
        ]);
}

async function updateCell(tableName, id, colName, cellData) {
    return await supabase
        .from(tableName)
        .update({ [colName]: cellData })
        .eq('id', id);
}