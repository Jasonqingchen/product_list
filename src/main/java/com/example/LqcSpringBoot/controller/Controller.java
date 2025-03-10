package com.example.LqcSpringBoot.controller;


import com.example.LqcSpringBoot.mapper.ProductlistMapper;
import com.example.LqcSpringBoot.model.Productlist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

/**
 * to page
 * liuqingchen 2025/03/09
 */
@org.springframework.stereotype.Controller
@RequestMapping("/plist")
public class Controller {

    @Autowired
    private ProductlistMapper productlistMapper;

    /**
     * to index Product list page
     * @return liuqingchen
     */
    @RequestMapping("/index")
    public String tz (){
    return "ProductList";
    }
    @RequestMapping("/indexs")
    public String tzd (){
        return "ProductDetail";
    }

    @RequestMapping("/list")
    @ResponseBody
    public List<Productlist> selectByid() {
        List<Productlist> lists = (List<Productlist>) productlistMapper.selectAll();
        return lists;
    }
    @RequestMapping("/listbyid")
    @ResponseBody
    public Productlist listbyid(Productlist productlist) {
        Productlist lists = (Productlist)productlistMapper.selectById(productlist.getId());
        return lists;
    }

}
