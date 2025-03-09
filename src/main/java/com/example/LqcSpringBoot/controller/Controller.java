package com.example.LqcSpringBoot.controller;


import com.example.LqcSpringBoot.ut.MainPartimportBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.InputStream;

/**
 * to page
 * liuqingchen 2025/03/09
 */
@org.springframework.stereotype.Controller
@RequestMapping("/plist")
public class Controller {

    @Autowired
    private MainPartimportBean mainPartimportBean;

    /**
     * to index Product list page
     * @return liuqingchen
     */
    @RequestMapping("/index")
    public String tz (){
    return "ProductList";
    }





    /**
     * 导入
     *
     * @return
     */
    @RequestMapping("/dr")
    public String dr(HttpServletRequest request, @RequestParam(required = false) MultipartFile file) throws IOException {
        InputStream fileInputStream = null;
        fileInputStream = file.getInputStream();
        mainPartimportBean.insertDB(fileInputStream);
        request.getSession().setAttribute("message", "导入成功");
        request.getSession().setAttribute("url", "container/shouye");
        return String.format("redirect:/message");
    }


}
