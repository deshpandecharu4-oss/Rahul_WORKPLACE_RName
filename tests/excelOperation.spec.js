
const ExcelJs =require ('exceljs')
async function excelTest(){
const workbook = new ExcelJs.Workbook();
await workbook.xlsx.readFile("C:\Users\yocha\Downloads\download.xlsx");

const worksheet=workbook.getWorksheet('Sheet1')

worksheet.eachRow((row,rowNumber) =>
{
    row.eachCell((cell,colNumber)=>
    {
        if(cell.value =="Apple"){
            
            console.log(rowNumber)
            console.log(colNumber)
        }
    })
    

})
}