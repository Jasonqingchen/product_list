package com.example.LqcSpringBoot.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.LqcSpringBoot.model.Productlist;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ProductlistMapper extends BaseMapper<Productlist> {
    //查询产品信息
    List<Productlist> selectAll();
}
