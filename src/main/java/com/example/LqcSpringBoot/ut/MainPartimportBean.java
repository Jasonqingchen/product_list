package com.example.LqcSpringBoot.ut;

import com.example.LqcSpringBoot.mapper.ClientMapper;
import com.example.LqcSpringBoot.model.Client;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.InputStream;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;


/**
 * @author：liuqingchen
 * @since：2024/02/19
 */
@Component
public class MainPartimportBean {

    @Autowired
    public ClientMapper clientMapper;

    public  void insertDB(InputStream fileInputStream) {

        DateFormat format=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            //HSSFWorkbook workbook = new HSSFWorkbook(fileInputStream);// 创建工作薄
            XSSFWorkbook workbook = new XSSFWorkbook(fileInputStream);
            Sheet sheet = workbook.getSheetAt(0);// 得到工作表
            Row row = null;// 对应excel的行
            Cell cell = null;// 对应excel的列
            String Var="";
            row = sheet.getRow((short)0);


            int totalRow = sheet.getLastRowNum();// 得到excel的总记录条数
            String ssxs = "";//第1列
            String name = "";//第2列
            String xydj = "";//3列
            String sex = "";//第4列
            String phone = "";//第5列
            String ed = "";//第6列
            String address  = "";//第7列
            String bz = "";//第8列
            int x =0;
            for (short i = 1; i <=totalRow; i++) {
                Client mp1 = new Client();
                cell = sheet.getRow(i).getCell((short)0);
                if(cell!=null){
                    sheet.getRow(i).getCell(0).setCellType(CellType.STRING);
                    ssxs = sheet.getRow(i).getCell(0).getStringCellValue().toString();
                    mp1.setSsxs(ssxs);
                }
                cell = sheet.getRow(i).getCell((short)1);
                if(cell!=null){
                    sheet.getRow(i).getCell(1).setCellType(CellType.STRING);
                    name =sheet.getRow(i).getCell(1).getStringCellValue().toString();
                    mp1.setName(name);

                }
                cell = sheet.getRow(i).getCell((short)2);
                if(cell!=null){
                    sheet.getRow(i).getCell(2).setCellType(CellType.STRING);
                    xydj =sheet.getRow(i).getCell(2).getStringCellValue().toString();
                    mp1.setXydj(xydj);

                }
                cell = sheet.getRow(i).getCell((short)3);
                if(cell!=null){
                    sheet.getRow(i).getCell(3).setCellType(CellType.STRING);
                    sex =sheet.getRow(i).getCell(3).getStringCellValue().toString();
                    mp1.setSex(sex);

                }
                cell = sheet.getRow(i).getCell((short)4);
                if(cell!=null){
                    sheet.getRow(i).getCell(4).setCellType(CellType.STRING);
                    phone =sheet.getRow(i).getCell(4).getStringCellValue().toString();
                    mp1.setPhone(phone);

                }
                cell = sheet.getRow(i).getCell((short)5);
                if(cell!=null){
                    sheet.getRow(i).getCell(5).setCellType(CellType.STRING);
                    ed =sheet.getRow(i).getCell(5).getStringCellValue().toString();
                    mp1.setEd(ed);

                }
                cell = sheet.getRow(i).getCell((short)6);
                if(cell!=null){
                    sheet.getRow(i).getCell(6).setCellType(CellType.STRING);
                    address  =sheet.getRow(i).getCell(6).getStringCellValue().toString();
                    mp1.setAddress(address);

                }
                cell = sheet.getRow(i).getCell((short)7);
                if(cell!=null){
                    sheet.getRow(i).getCell(7).setCellType(CellType.STRING);
                    bz =sheet.getRow(i).getCell(7).getStringCellValue().toString();
                    mp1.setBz(bz);

                }
                    mp1.setId(UUID.randomUUID().toString());
                    mp1.setDate(format.format(new Date()));
                    mp1.setGjdate(format.format(new Date()));
                    mp1.setFlag("0");
                    clientMapper.insert(mp1);
            }

        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
