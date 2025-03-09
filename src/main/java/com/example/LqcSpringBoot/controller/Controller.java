package com.example.LqcSpringBoot.controller;

import com.example.LqcSpringBoot.mapper.ClientFollowMapper;
import com.example.LqcSpringBoot.mapper.ClientMapper;
import com.example.LqcSpringBoot.mapper.OrderMapper;
import com.example.LqcSpringBoot.model.Client;
import com.example.LqcSpringBoot.model.Clientfollow;
import com.example.LqcSpringBoot.model.Orders;
import com.example.LqcSpringBoot.ut.MainPartimportBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.swing.text.html.Option;
import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 跳转page
 * liuqingchen 2024/02/04
 */
@org.springframework.stereotype.Controller
public class Controller {
    @Autowired
    private MainPartimportBean mainPartimportBean;
    @Autowired
    private ClientMapper clientMapper;

    @Autowired
    private ClientFollowMapper clientFollowMapper;

    @Autowired
    private OrderMapper orderMapper;

    /**
     * 热力图
     *
     * @return
     */
    @RequestMapping("/rltjk")
    @ResponseBody
    public List<List<Object>> rltjk() {
        List liss = new ArrayList();
        List<Orders> lis = orderMapper.selectRlt();
        if(lis.size()>0) {//如果没有结果的判断操作
            lis.forEach(l->{
                List<Object> lll = new ArrayList();
                lll.add(l.getDate());
                lll.add(Double.parseDouble(l.getMoney()));
                liss.add(lll);
            });
        }
        return liss;
    }
    /**
     * 月统计数据
     *
     * @return
     */
        @RequestMapping("/xsqk")
        @ResponseBody
        public List<Map<String,Object>> xsqk(Orders order) {
            if(order.getDate()=="" || order.getDate()==null){
                SimpleDateFormat formatm = new SimpleDateFormat("MM");
                order.setDate(formatm.format(new Date()));
            }
            return orderMapper.selectxsblance(order.getDate(),order.getSsxs());
        }
    /**
     * 月统计数据
     *
     * @return
     */
    @RequestMapping("/getxsdate")
    @ResponseBody
    public List getxsdate(Orders order) {

        if(order.getDate()=="" || order.getDate()==null){
            SimpleDateFormat formatm = new SimpleDateFormat("MM");
            order.setDate(formatm.format(new Date()));
        }
        List list = new ArrayList();
        List name = orderMapper.selectDataByDateAndSsxs(order.getDate(),order.getSsxs());
        List sales = orderMapper.selectDataByDateAndSsxssales(order.getDate(),order.getSsxs());
        List balance = orderMapper.selectDataByDateAndSsxsbalance(order.getDate(),order.getSsxs());
        List numorder = orderMapper.selectDataByDateAndSsxsnumorder(order.getDate(),order.getSsxs());
        list.add(name);
        list.add(sales);
        list.add(balance);
        list.add(numorder);
        return list;
    }

    /**
     * 新订单
     *
     * @return
     */
    @RequestMapping("/addorder")
    @ResponseBody
    public Integer addorder(Orders order) {
        Client client = clientMapper.selectById(order.getCid());
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat formatm = new SimpleDateFormat("MM");
        order.setId(UUID.randomUUID().toString());
        order.setDate(formatter.format(new Date()));
        order.setSsxs(client.getSsxs());
        order.setMonth(formatm.format(new Date()));
        order.setName(client.getName());
        order.setBalance(String.valueOf(Integer.parseInt(order.getMoney())-Integer.parseInt(order.getPay())));
        //order.setBalance(client.getBalance());
         return orderMapper.insert(order);
    }

    /**
     * 跟进详情
     *
     * @return
     */
    @RequestMapping("/detail")
    @ResponseBody
    public List<Clientfollow> detail(Client client) {
        List<Clientfollow> clientfollow = clientFollowMapper.selectByCid(client.getId());
        return clientfollow;
    }

    /**
     * 统计数据客户分布
     *
     * @return
     */
    @RequestMapping("/tjclient")
    @ResponseBody
    public List<Map<String, Object>> tjclient() {
        List<Map<String, Object>> maps = clientMapper.selectGroupAddess();
        return maps;
    }

    @RequestMapping("/selectByid")
    @ResponseBody
    public List<Client> selectByid(Client client) {
        List<Client> list = new ArrayList();
        Client cli = clientMapper.selectById(client.getId());
        list.add(cli);
        return list;
    }

    @RequestMapping("/selectOrderByCid")
    @ResponseBody
    public List<Orders> selectOrderByCid(Client client) {
        List<Orders> cli = orderMapper.selectOrderByCid(client.getId());
        return cli;
    }

    /**
     * 后台保存
     */
    @RequestMapping("/tjdata")
    @ResponseBody
    public Map tjdata() {
        Map map = new HashMap();
        Integer A = clientMapper.selectTjdataA();
        Integer B = clientMapper.selectTjdataB();
        Integer C = clientMapper.selectTjdataC();
        Integer D = clientMapper.selectTjdataD();
        map.put("A", A);
        map.put("B", B);
        map.put("C", C);
        map.put("D", D);
        return map;
    }

    /**
     * 跳转
     */
    @RequestMapping("/clients")
    public String clients() {
        return "client";
    }

    /**
     * 后台保存
     */
    @RequestMapping("/addhtdata")
    @ResponseBody
    public Integer addhtdata(Client client) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        client.setId(UUID.randomUUID().toString());
        client.setDate(formatter.format(new Date()));
        client.setGjdate(formatter.format(new Date()));
        return clientMapper.insert(client);
    }

    /**
     * follow
     */
    @RequestMapping("/follow")
    @ResponseBody
    public Integer follow(Client client) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Client cl = clientMapper.selectById(client.getId());
        cl.setBz(client.getBz());
        cl.setGjdate(formatter.format(new Date()));
        cl.setFlag("2");
        cl.setBalance(client.getBalance());
        Clientfollow cf = new Clientfollow();
        cf.setCid(cl.getId());
        cf.setName(cl.getName());
        cf.setSex(cl.getSex());
        cf.setBalance(cl.getBalance());
        cf.setBz(cl.getBz());
        cf.setId(UUID.randomUUID().toString());
        cf.setSsxs(cl.getSsxs());
        cf.setGjdate(cl.getGjdate());
        clientFollowMapper.insert(cf);
        return clientMapper.updateById(cl);
    }

    /**
     * 后台查询
     */
    @RequestMapping("/listdata")
    @ResponseBody
    public List<Client> listdata() {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date date = new Date();
        List<Client> clients = clientMapper.selectList(null);
        clients.forEach(cl -> {
            Date parse = null;
            try {
                parse = formatter.parse(cl.getGjdate());
            } catch (ParseException e) {
                throw new RuntimeException(e);
            }
            //long hoursBetween = ChronoUnit.HOURS.between((Temporal) parse,(Temporal)date);
            long time = date.getTime();
            long l = time - parse.getTime();
            long hours = l / 3600000;
            if (hours > 72) {
                cl.setFlag("1");
            } else {
                cl.setFlag("2");
            }
            clientMapper.updateById(cl);
        });
        return clientMapper.selectList(null);
    }

    /**
     * 后台删除
     */
    @RequestMapping("/delete")
    @ResponseBody
    public Integer delete(Client Client) {
        Integer count = clientMapper.deleteById(Client.getId());
        return count;
    }

    /**
     * 条件搜索
     */
    @RequestMapping("/search")
    @ResponseBody
    public List<Client> seach(Client client) {

        return clientMapper.selectBytj((String) client.getName(), (String) client.getPhone(), (String) client.getXydj(), (String) client.getSsxs());
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
